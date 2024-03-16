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

        token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODczNzY0YWUxY2ViZWJhYzI2ODc0ZTI3Y2RmOTEyMCIsInN1YiI6IjY1ZjE1YmY2NDcwZWFkMDE3ZTljYmM2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0StnX-MY-PfPmh8s5Nj-Oya98d8xdI_6FBS9CEVTOlQ"
        // console.log(user); 

    } catch (error) {
        console.log(error, "<<<<<");
    }
})

describe("GET /getMovies", ()=>{

    test("Get Movies success", async()=>{

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .get("/getMovies")
        .set("Authorization", `Bearer ${token}`)

        // console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

    })

})

describe("GET /movie/detail/:id", ()=>{

    test("Get Movies Detail success", async()=>{

        // console.log(token, "<<<<<<<<<<<<");
        let response = await request(app)
        .get("/movie/detail/10000")
        .set("Authorization", `Bearer ${token}`)

        // console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

    })

})


afterAll(async () =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity: true})

})