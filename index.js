const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080;
const dbConnection = require('./config/db');
const productRouter = require('./routes/product.route')



app.use(express.json())
app.use('/api',productRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
  dbConnection()

})