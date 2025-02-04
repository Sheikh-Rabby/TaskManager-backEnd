//Basic
const express=require('express');
const router = require('./src/routes/api');
const app= new express()
const bodyParser = require('body-parser');


//Security Middleware
const ratelimit = require('express-rate-limit')
const helmet =require('helmet')
const hpp =require('hpp')
const cors = require('cors');
const mongoSanitize= require('express-mongo-sanitize');


//Datebase
const mongoose = require('mongoose');

// Security Middleware implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

//implement bodyparser
app.use(bodyParser.json())


//ratelimit implement
const limiter= ratelimit({windowMs:15*1000,max:3000})
app.use(limiter)

//Mongodb database connection
let Url ="mongodb://127.0.0.1:27017/ToDo";
let OPTION ={user:'',pass:'',autoIndex:true}
mongoose.connect(Url,OPTION).then((res)=>{
 console.log("Database Connected")
}).catch((err)=>{
 console.log(err)
})



//Routing implement
app.use("/api/v1",router)

//undefine route implement
app.use("*",(req,res)=>{

 res.status(404).json({status:"fail",data:"Not Found"});
})

module.exports = app;