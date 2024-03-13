const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");
const axios = require("axios");

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

      res
        .status(200)
        .json({ message: "User has successfully logged in", access_token });
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
      //   .then(function (response) {
      //     // console.log(response.data);
      //     // res.status(200).json(response.data);
      //   });

      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
