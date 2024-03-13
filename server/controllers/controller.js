const { comparePassword } = require('../helper/bcrypt');
const { signToken } = require('../helper/jwt');
const {User} = require('../models')

class Controller{

    static async Register(req,res,next){
        try {

            await User.create({
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            })

            res.status(201).json({message : "User has been created"})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async Login(req,res,next){
        try {
            // validasi
            if (!req.body.email) throw {name : "EmailRequired"}
            if (!req.body.password) throw {name : "PasswordRequired"}

            const findUser = await User.findOne({
                where : {
                    email : req.body.email
                }
            })

            if (!findUser) throw {name : "InvalidLogin"}

            const checkPass = comparePassword(req.body.password, findUser.password)

            if (!checkPass) throw {name : "InvalidLogin"}

            //generateToken

            const payload = {id : findUser.id}
            const access_token = signToken(payload)

            res.status(200).json({message : "User has successfully logged in", access_token})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller