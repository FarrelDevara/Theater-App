const request = require('supertest');
const app = require('../app');

const {User, Ticket} = require('../models')

jest.mock("nodemailer");

const sendMailMock = jest.fn();
const nodemailer = require("nodemailer");
const { signToken } = require('../helper/jwt');
nodemailer.createTransport.mockReturnValue({ "sendMail": sendMailMock });

let token; // Define token outside of the try-catch block

beforeAll(async () => {
    try {
        const user = await User.create({
            email: "admin@mail.com",
            password: "admin",
        });
        // console.log(user.id, "<<<<<<<<<<<");

        const ticket = await Ticket.create({
            MovieId : 1000,
            UserId : 1,
            movieName : "Winnie The Po",
            price : 12000,
        })

        sendMailMock.mockClear();
        nodemailer.createTransport.mockClear();

        token = signToken({ id: user.id });
    } catch (error) {
        console.log(error, "<<<<<");
    }
});

describe("Mailer /payment/status/1", () => {
    test("Success", async () => {
       
        expect.assertions(3);

        const response = await request(app)
            .patch("/payment/status/1")
            .set("Authorization", `Bearer ${token}`);

        // should complete successfully
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Pembayaran berhasil");

        // Check if sendMailMock was called
        expect(sendMailMock).toHaveBeenCalled();
    });

    test("Not Found", async () => {
       
        expect.assertions(3);

        const response = await request(app)
            .patch("/payment/status/5")
            .set("Authorization", `Bearer ${token}`);

        // should complete successfully
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Not Found");

        // Check if sendMailMock was called
        expect(sendMailMock).toHaveBeenCalled();
    });

});

afterAll(async () =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity: true})
})