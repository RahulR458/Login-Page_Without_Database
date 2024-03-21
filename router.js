var express = require("express");
var router = express.Router();
const session = require("express-session")
const{v4:uuidv4}=require("uuid");
const cookieParser = require('cookie-parser')


router.use(cookieParser());
let credential = {
    email:"admin@gmail.com",
    password:"admin123"
}

router.use((req, res, next)=>{
    res.setHeader('Cache-Control','no-store');
    next();
})

router.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
    cookie: { secure: false }
}));

//login user

router.get('/',(req, res)=>{
    if(req.session.userId){
        res.render("dashboard",{user:req.session.userId})    }
    else{
        res.render('base',{title:"Login System"});
  
    }
})


router.post('/login',(req, res)=>{
    if(req.body.email==credential.email && req.body.password == credential.password){
        req.session.userId = req.body.email;
        if(req.session.userId){
        res.redirect('dashboard')
        // }else{
        //     res.render('base',{title:"Login System"});
        //     res.end("Login successful...!")
        }
        
    }else{
        const errorMessage = "Invalid Username or Password";
        res.render('base', { title: "Login System", error: errorMessage });
        // res.end("Invalid Username or Password")
    }
})

//route for dashbord
router.get("/dashboard",(req, res)=>{
    if(req.session.userId){
        res.render("dashboard",{user:req.session.userId})
    }else{
        // res.send("Unauthorize User")
        res.redirect('/')
    }
})

//route for logout
router.get("/logout",(req, res)=>{
    req.session.destroy();
    res.setHeader('Cache-Control', 'no-store');
    res.render("base",{title:"Express",logout:"logout Successfully...!"})
})

module.exports=router;