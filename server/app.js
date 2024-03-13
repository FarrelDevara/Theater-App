const express = require('express')
const Controller = require('./controllers/controller')
const errHandler = require('./middlewares/errHandler')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/register', Controller.Register)

app.post('/login', Controller.Login)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})