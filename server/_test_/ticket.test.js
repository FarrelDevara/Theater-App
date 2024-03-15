const { signToken } = require('../helper/jwt');
const {User, Ticket} = require('../models')
const request = require('supertest')
const app = require('../app')

beforeAll( async ()=>{
    try {
        const user = await User.bulkCreate([{
            email : "user1@mail.com",
            password : "user1",
        },{
            email : "user2@mail.com",
            password : "user2",
        }])

        token1 = signToken( {id : user[0].id})
        token2 = signToken( {id : user[1].id})

        const ticket = await Ticket.create({
            MovieId : 1000,
            UserId : 1,
            movieName : "Winnie The Po",
            price : 12000,
        })
    } catch (error) {
        console.log(error, "<<<<<");
    }
})


describe("POST /create-ticket/:id", ()=>{

    test("Create Ticket Success", async()=>{

        const dummy = {
            MovieId : 1000,
            UserId : 1,
            movieName : "Winnie The Po",
            price : 12000,
            }
        console.log(dummy);

        let response = await request(app)
        .post("/create-ticket/1")
        .set("Authorization", `Bearer ${token1}`)
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id")
    
    })

    test("Create Ticket Failed not loggin", async()=>{

        const dummy = {
            MovieId : 1000,
            UserId : 1,
            movieName : "Winnie The Po",
            price : 12000,
            }
        console.log(dummy);

        let response = await request(app)
        .post("/create-ticket/1")
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test("Create Ticket Failed Token", async()=>{

        const dummy = {
            MovieId : 1000,
            UserId : 1,
            movieName : "Winnie The Po",
            price : 12000,
            }
        console.log(dummy);

        let response = await request(app)
        .post("/create-ticket/2")
        .set("Authorization", `Bearer asdasdasdasd`)
        .send(dummy)

        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

})


describe("GET /ticket/:id", ()=>{

    test("Get Ticket Success", async()=>{

        let response = await request(app)
        .get("/ticket/1")
        .set("Authorization", `Bearer ${token1}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("movieName", expect.any(String))
    
    })

    test("Get Ticket not Login", async()=>{

        let response = await request(app)
        .get("/ticket/1")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test("Get Ticket Failed Token", async()=>{

        let response = await request(app)
        .get("/ticket/1")
        .set("Authorization", `Bearer asdasd`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test("Get Ticket Not Found", async()=>{

        let response = await request(app)
        .get("/ticket/10000")
        .set("Authorization", `Bearer ${token1}`)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Not Found")
    })

    test("Get Ticket Forbidden", async()=>{

        let response = await request(app)
        .get("/ticket/1")
        .set("Authorization", `Bearer ${token2}`)

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Forbidden")
    })

})

describe("GET /my-ticket", ()=>{

    test("Get Ticket Success", async()=>{

        let response = await request(app)
        .get("/my-ticket")
        .set("Authorization", `Bearer ${token1}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body[0]).toHaveProperty("movieName", expect.any(String))
    
    })

    test("Get Ticket Not loggin", async()=>{

        let response = await request(app)
        .get("/my-ticket")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    
    })

    test("Get Ticket Failed Token", async()=>{

        let response = await request(app)
        .get("/my-ticket")
        .set("Authorization", `Bearer asdasd`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
})



afterAll(async () =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity: true})
    await Ticket.destroy({truncate : true, cascade : true, restartIdentity: true})

})