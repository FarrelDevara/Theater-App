const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    
    if (!authorization) {
      throw { name: "InvalidToken" };
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") throw { name: "InvalidToken" };

    const { id } = verifyToken(token);

    const user = await User.findByPk(id);
    if (!user) throw { name: "InvalidToken" };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
