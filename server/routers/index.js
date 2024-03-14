const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authorization");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", Controller.Register);

router.post("/login", Controller.Login);

router.post('/google-login', Controller.googleLogin)

router.get("/getMovies", Controller.fetchMovies);

router.get("/movie/detail/:id", Controller.fetchMovieById);

router.use(authentication);

module.exports = router;
