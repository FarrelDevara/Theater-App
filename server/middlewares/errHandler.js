const { JsonWebTokenError } = require("jsonwebtoken");

const errHandler = (error, req, res,next) => {
  switch (error.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: error.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: "Email sudah dipakai" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Email is required" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Password is required" });
      break;
    case "InvalidLogin":
      res.status(401).json({ message: "Invalid Email/Password" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errHandler;
