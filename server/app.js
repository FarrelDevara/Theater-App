if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
  }

const express = require("express");
const errHandler = require("./middlewares/errHandler");
const app = express();

const cors = require("cors");
const router = require("./routers");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errHandler);

module.exports = app;
