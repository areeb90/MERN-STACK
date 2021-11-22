const dotenv = require('dotenv')
const mongoose = require('mongoose');
const express= require('express');
const app = express()


// MERN app json format nahi smjhti as default... to keep JSON OBJECT understandable we use this func.
app.use(express.json())  


dotenv.config({path:"./config.env"})

app.use(require("./Router/auth"))





// Database connection
require('./DB/connectDb')

const PORT = process.env.PORT;


const User = require('./models/userSchema')




// MIDDLEWARE

const middleware=(req,res,next)=>{
    console.log("THIS IS A about PAGE")
    next()
}


// app.get('/', (req, res)=>{
//     res.send("THIS IS A HOME PAGE")
// })

app.get('/about', middleware,(req, res)=>{
    res.send("THIS IS A about PAGE")
})

app.get('/contact', (req, res)=>{
    res.send("THIS IS A contact PAGE")
})

app.get('/signin', (req, res)=>{
    res.send("THIS IS A signin PAGE")
})

app.get('/signup', (req, res)=>{
    res.send("THIS IS A signup PAGE")
})

app.listen(PORT,()=>{
    console.log(`Successfully running server on port ${PORT}`)
})