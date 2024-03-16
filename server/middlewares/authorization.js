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


  
module.exports = {authorization}