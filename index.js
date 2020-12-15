//modules
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const dbLink = process.env.DBLINK
const port = process.env.PORT
const authorRoute = require('./src/routes/authorRoute')
const bookRoute = require('./src/routes/bookRoute')

// database connection
mongoose.connect(dbLink,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},() => {
    app.listen(port,() =>{
        console.info('APP HAS STARTED')
    })
})

//middleware
app.use(express.json())

//routes
app.use(authorRoute)
app.use(bookRoute)

// app.use(express.static('public'))

app.get('/',(req,res) => {
    res.status(200).send('<h1>Hey, there!!</h1>')
})