const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const { authorization, authForgetPass } = require("../middlewares/authorization");

router.post("/register", Controller.Register);
router.post("/login", Controller.Login);

router.post("/forget-password", Controller.forgetPassword);
router.get('/reset-password/:id/:token', Controller.resetPassword)
router.patch('/new-password/:id/:token', Controller.newPassword)

router.post('/google-login', Controller.googleLogin)

router.get("/getMovies", Controller.fetchMovies);

router.get("/movie/detail/:id", Controller.fetchMovieById);

router.use(authentication);

router.post('/create-ticket/:id', Controller.createTicket)
router.get('/my-ticket', Controller.fetchMyTicket)
router.get('/ticket/:id',authorization, Controller.getTicket)

router.post('/payment', Controller.initiatePayment)
router.patch('/payment/status/:id',authorization, Controller.updatePayment)

router.delete('/ticket/delete/:id',authorization, Controller.deleteTicket)


module.exports = router;

