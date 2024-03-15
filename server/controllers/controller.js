const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User, Ticket } = require("../models");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const midtransClient = require("midtrans-client");

let movieName;
let id
class Controller {
  static async Register(req, res, next) {
    try {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      res.status(201).json({ message: "User has been created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      // validasi
      if (!req.body.email) throw { name: "EmailRequired" };
      if (!req.body.password) throw { name: "PasswordRequired" };

      const findUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!findUser) throw { name: "InvalidLogin" };

      const checkPass = comparePassword(req.body.password, findUser.password);

      if (!checkPass) throw { name: "InvalidLogin" };

      //generateToken

      const payload = { id: findUser.id };
      const access_token = signToken(payload);

      res.status(200).json({ message: "Login Success", access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client();

    try {
      // console.log(req.body.googleToken);
      const googleToken = req.body.googleToken;

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "224565751584-3eu74pi5cvbq0n5v1j62e72oar9c6n5s.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });

      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      console.log(user);

      if (!user) {
        user = await User.create({
          username: payload.name,
          email: payload.email,
          password: Date.now() + Math.random() + "randomPass",
        });
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ message: "Login Google Success", access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  
  static async fetchMovies(req, res, next) {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.themoviedb.org/3/movie/now_playing",
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODczNzY0YWUxY2ViZWJhYzI2ODc0ZTI3Y2RmOTEyMCIsInN1YiI6IjY1ZjE1YmY2NDcwZWFkMDE3ZTljYmM2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0StnX-MY-PfPmh8s5Nj-Oya98d8xdI_6FBS9CEVTOlQ",
        },
      });

      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchMovieById(req, res, next) {
    try {
      id = req.params.id;
      // console.log(id);

      const { data } = await axios({
        method: "get",
        url: "https://api.themoviedb.org/3/movie/" + id,
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODczNzY0YWUxY2ViZWJhYzI2ODc0ZTI3Y2RmOTEyMCIsInN1YiI6IjY1ZjE1YmY2NDcwZWFkMDE3ZTljYmM2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0StnX-MY-PfPmh8s5Nj-Oya98d8xdI_6FBS9CEVTOlQ",
        },
      });
      data.poster_path = `https://image.tmdb.org/t/p/w500` + data.poster_path;
      // console.log(data);
      movieName = data.title
      // console.log(movieName);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchMyTicket(req, res, next) {
    try {
      console.log(req.user.id);

      const ticket = await Ticket.findAll({
        where : {
          UserId : req.user.id
        }
      })
      console.log(ticket);

      res.status(200).json(ticket);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteTicket(req, res, next) {
    try {
      const ticket = await Ticket.delete({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ message: "Ticket has been deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async createTicket(req,res,next){
    // console.log(req.user);
    // console.log(movieName, "<<<moviename");
    // console.log(id, "<<<<params");
    try {
      const ticket = await Ticket.create({
        MovieId : id,
        UserId : req.user.id,
        movieName : movieName,
        price : 45000
      })

     res.status(201).json(ticket)
    } catch (error) {
      next(error)
    }
  }

  static async getTicket(req,res,next){
    try {
      const ticket = await Ticket.findByPk(req.params.id)
      if(!ticket) throw {name : "notFound"}
      res.status(200).json(ticket)
    } catch (error) {
      next(error)
    }
  }

  static async initiatePayment(req, res, next) {
    
    try {

      ////////////////////////////////////////////////////////////////////////////////////
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-Qae5O6HkfLFJ1fDQgS76RVdw",
      });


      const order_id = Math.random().toString()
      let parameter = {
        //data detail order
        transaction_details: {
          order_id: order_id,
          gross_amount: 45000,
        },
        //data jenis pembayaran
        credit_card: {
          secure: true,
        },
        //data detail customer
        customer_details: {
          first_name: req.user.username,
          email: req.user.email,
          phone: "08111222333",
        },
      };

      const transaction = await snap.createTransaction(parameter)
      let transactionToken = transaction.token

      res.status(200).json({message : "Order created", transactionToken, order_id})
    } catch (error) {
      next(error);
    }
  }

  static async updatePayment(req, res, next) {
    try {
        console.log(req.params.id);
        // const {order_id} = req.body
        console.log("masuk?");
        const ticket = await Ticket.findByPk(req.params.id)
        if (ticket.paymentStatus === true) throw {name : "AlreadyPaid"}

        await Ticket.update({paymentStatus : true}, {
          where : {
            id : req.params.id
        }
      })

      res.status(200).json({message : "pembayaran berhasil"})
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
