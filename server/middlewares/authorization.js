const { verifyToken } = require('../helper/jwt');
const {User, Ticket} = require('../models')

const authorization = async (req, res, next) => {
    try {

      const ticket = await Ticket.findOne({where : {
        id : req.params.id
      }})

      if (!ticket) {
        throw {name : "notFound"}
      }

      if (ticket.UserId !== req.user.id) {
        throw {name : "Forbidden"}
      }
  
      next()
    } catch (error) {
      next(error)
    }
  };

const authForgetPass = async (req,res,next) =>{
  try {
    console.log(req.params.id, "params");
    console.log(req.params.token);

    // let verify = verifyToken(req.params.token)
    // console.log(req.user.id, "req,user");

    if (req.params.id !== req.user.id) {
      throw {name : "Forbidden"}
    }

    next()
  } catch (error) {
    next(error)
  }
}

  
module.exports = {authorization,authForgetPass}