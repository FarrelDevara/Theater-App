const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", Controller.Register);

router.post("/login", Controller.Login);

router.post('/google-login', Controller.googleLogin)

router.get("/getMovies", Controller.fetchMovies);

router.get("/movie/detail/:id", Controller.fetchMovieById);

router.use(authentication);

router.post('/create-ticket/:id', Controller.createTicket)
router.get('/ticket/:id', Controller.getTicket)

router.get('/my-ticket', Controller.fetchMyTicket)

router.post('/payment', Controller.initiatePayment)
router.patch('/payment/status/:id', Controller.updatePayment)



module.exports = router;
