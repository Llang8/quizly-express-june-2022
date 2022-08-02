const express = require('express')

// Loading in our environment variables
const dotenv = require('dotenv')
dotenv.config()

const { connectDB } = require('./src/db')

const app = express()

connectDB()

app.get('/', (req,res) => {
    res.send('Hello world')
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on PORT ${ process.env.PORT }`)
})