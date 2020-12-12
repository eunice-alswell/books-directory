require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT
const db = process.env.DB

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology: true
},()=>{
    app.listen(port,()=>{
        console.info('APPLICATION HAS STARTED')
    })
})

app.get('/',(req,res)=>{
    console.log("<h1>Hi,there!!!!</h1>")
})

