const { signToken } = require('../helper/jwt');
const {User, Ticket} = require('../models')
const request = require('supertest')
const app = require('../app')


beforeAll( async ()=>{
    try {
        const user = await User.create({
            email : "admin@mail.com",
            password : "admin",
        })

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
afterAll(async () =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity: true})

})