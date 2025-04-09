const express = require('express');
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080;
const dbConnection = require('./config/db');
const productRouter = require('./routes/product.route')
const authROuter = require('./routes/auth.route')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use('/api',productRouter)
app.use('/api/auth',authROuter)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Example app listening on port ${port}`)
})
=======
  console.log(`http://localhost:${port}`)
  dbConnection()

})
>>>>>>> 08f4eedea601ac26c38b36305e812ebdbf757dc9
