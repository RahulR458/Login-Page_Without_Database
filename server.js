const express = require('express');
const path = require("path")
const bodyparser = require("body-parser")


const router = require("./router")

const app = express(); 

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//home route


app.use('/',router)


app.listen(port,()=>{
    console.log("Lostening to the server on http://localhost:3000")
})

