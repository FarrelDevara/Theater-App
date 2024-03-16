const { signToken, verifyToken } = require('../helper/jwt');
const {User, Ticket} = require('../models')
const request = require('supertest')
const app = require('../app')

let token;

beforeAll( async ()=>{
    try {
        const user = await User.create({
            email : "admin@mail.com",
            password : "admin",
        })
        console.log(user.id, "<<<<<<<<<<<");

        token = signToken( {id : user.id})
        // console.log(user); 
    } catch (error) {
        console.log(error, "<<<<<");
    }
})

describe("POST /login", ()=>{
    test("Login success", async()=>{
        const dummy = {
            email : "admin@mail.com",
            password : "admin",
        }

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/login")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Login Success")
    
       
    })

    test("Login Email empty", async()=>{
        const dummy = {
            email : "",
            password : "admin",
        }

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/login")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email is required")
    })

    test("Login Password empty", async()=>{
        const dummy = {
            email : "admin@mail.com",
            password : "",
        }

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/login")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Password is required")
    })

    test("Login Wrong email", async()=>{
        const dummy = {
            email : "admin123@mail.com",
            password : "admin",
        }

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/login")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Email/Password")
    })

    test("Login Wrong password", async()=>{
        const dummy = {
            email : "admin@mail.com",
            password : "admin123",
        }

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/login")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Email/Password")
    })
})

describe("POST /register", ()=>{
    test("Add User Success", async()=>{
        const dummy = {
            username : "user1",
            email : "user1@mail.com",
            password : "user1"
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)
        // console.log(response.body);
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "User has been created")     
    })

    test("Email Null", async()=>{
        const dummy = {
            username : "user1",
            password : "user1"
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email cannot be null")
    })

    test("Email Empty", async()=>{
        const dummy = {
            username : "user1",
            email : "",
            password : "user1",
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email cannot be empty")
    })

    test("Email Wrong Format", async()=>{
        const dummy = {
            username : "user1",
            email : "user1",
            password : "user1",
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Must be a valid email format")
    })

    test("Password Null", async()=>{
        const dummy = {
            username : "user1",
            email : "user1@mail.com",
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Password cannot be null")
    })

    test("Password Kosong", async()=>{
        const dummy = {
            username : "user1",
            email : "user1@mail.com",
            password : "",
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Password cannot be empty")
    })

    test("Email sudah dipakai", async()=>{
        const dummy = {
            email : "admin@mail.com",
            password : "admin",
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/register")
        .send(dummy)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email must be unique")
    })

})

describe("POST /goggle-login", ()=>{ 

    test("Add google Invalid Token", async()=>{
    
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/google-login")

        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Invalid Token")     
    })

})

describe("POST /forget-password", ()=>{ 

    test("Forget Password", async()=>{
    
        const dummy = {
            email : "admin@mail.com"
        }
        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .post("/forget-password")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", expect.any(String))     
    })

    test("Forget Password wrong email", async()=>{
    
        const dummy = {
            email : "user1"
        }

        let response = await request(app)
        .post("/forget-password")
        .send(dummy)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Invalid Email")     
    })

    test("Forget Password Doesnt provide email", async()=>{
    
        const dummy = {
            email : "user1@mail.com"
        }

        let response = await request(app)
        .post("/forget-password")

        expect(response.status).toBe(500)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Internal Server Error")     
    })

})

describe("GET /reset-password/:id/:token", ()=>{ 

    test("Invalid Token", async()=>{

        let response = await request(app)
        .get(`/reset-password/1/${token}`)
        
        // console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Check your email")     
    })

    test("Forbidden", async()=>{

        let response = await request(app)
        .get(`/reset-password/5/${token}`)
        
        // console.log(response.body);
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Forbidden")     
    })

    test("Invalid Token", async()=>{

        let response = await request(app)
        .get(`/reset-password/1/asd`)
        
        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Invalid Token")     
    })

})

describe("PATCH /new-password/:id/:token", ()=>{ 

    test("Success", async()=>{
    
        // console.log(token);
        // let verify = verifyToken(token)
        // console.log(verify, "<<<<Verify");
        // console.log(typeof verify.id);

        let response = await request(app)
        .patch(`/new-password/1/${token}`)
        .send({password : "test1"})
       
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "berhasil ubah password")     
    })

    test("Invalid Token", async()=>{

        let response = await request(app)
        .patch(`/new-password/1/asdasd`)
        .send({password : "test1"})
       
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Invalid Token")     
    })

    test("Forbidden", async()=>{

        let response = await request(app)
        .patch(`/new-password/5/${token}`)
        .send({password : "test1"})
       
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Forbidden")     
    })

    test("Not sending new password", async()=>{

        let response = await request(app)
        .patch(`/new-password/5/${token}`)
       
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)       
        expect(response.body).toHaveProperty("message", "Password is required")     
    })

})


afterAll(async () =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity: true})
})