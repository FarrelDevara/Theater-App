"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User);
    }
  }
  Ticket.init(
    {
      MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "MovieId cannot be empty",
          },
          notNull: {
            msg: "MovieId cannot be null",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId cannot be empty",
          },
          notNull: {
            msg: "UserId cannot be null",
          },
        },
        
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "paymentStatus cannot be empty",
          },
          notNull: {
            msg: "paymentStatus cannot be null",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price cannot be empty",
          },
          notNull: {
            msg: "price cannot be null",
          },
        },
      },
      movieName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
