const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authorization");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", Controller.Register);

router.post("/login", Controller.Login);

// router.use(authentication);

router.get("/getMovies", Controller.fetchMovies);

module.exports = router;
