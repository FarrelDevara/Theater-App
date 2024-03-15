const {User} = require('../models')

const authorization = async (req, res, next) => {
    try {
      // console.log(req.user.role, "<<<<< di authorize");

      const findUser = await User.findByPk(req.user.id)
      if (!findUser) throw {name : "Forbidden"}
  
      next()
    } catch (error) {
      next(error)
    }
  };

  
module.exports = {authorization}