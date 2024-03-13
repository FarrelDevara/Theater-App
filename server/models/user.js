"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          notNull: {
            msg: "Email cannot be null",
          },
          isEmail: {
            msg: "Must be a valid email format",
          },
        },
      },
      password: {
        type : DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
          notNull: {
            msg: "Password cannot be null",
          },
          len:{
            args: [5,255],
            msg : "Passwords length must be 5 or more"
          }
        },
      },
      profilePicture: {
        type: DataTypes.STRING
      },
    },
    {
      hooks:{
        beforeCreate(data){
          data.password = hashPassword(data.password)
        }
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
