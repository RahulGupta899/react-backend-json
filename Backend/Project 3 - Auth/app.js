require('dotenv').config();
require('./config/database').connectDB();
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User');
const cookieParser = require('cookie-parser')
const {isAuthorized} = require('./middleware/Auth')
const {SECRET_KEY} = process.env

const app = express();
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("<h1>HomePage - Auth</h1>")
})

app.post("/register",async (req,res)=>{
    try{
        // Step1: Get Info
        const {firstName,lastName,email,password} = req.body

        // Step2: check mandatory fields
        if(!(email && password && firstName && lastName)){
            res.status(400).send("<h1>All fields are required</h1>")
        }

        // Step3: check Already registered
        const userExists = await User.findOne({email})                //PROMISE
        if(userExists){
            res.status(401).send("<h1>Email already taken</h1>")
        }

        // Step 4: Encrypt password
        const encryptPassword = await bcrypt.hash(password,10);   // 10 rounds of hash

        // Step 5: Save in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: encryptPassword
        })//Directly saved in DB

        // Step 6: Miscellaneous Work 
        //### TOKEN GENERATION ###
        const token = jwt.sign(
            {   //Payload
                userId: user._id,
                email
            },
            SECRET_KEY,
            {   //Expire
                expiresIn: '2h'
            }
        )

        user.token = token;         // ATTACHING TOKEN to use as property
        user.password = undefined   // user password will  destroyed from user obj
        res.status(200).json(user);
    }
    catch(err){
        console.log(err.message)
    }

})

app.post("/login",async (req,res)=>{
    try{
        // Step1: Get Info
        const {email,password} = req.body;

        // Step2: Check all fields available 
        if(!(email && password)){
            res.status(400).json({success:false, msg:"Please enter all fields"})
        }

        //Step3: Grab User from database
        const user = await User.findOne({email});

        //Step4: Check user and compare password
        if(user && await bcrypt.compare(password,user.password)){

            //#### Generate Token or Perform Task ####
            const token = jwt.sign(
                {userID: user._id,email},
                SECRET_KEY,
                {expiresIn: '2h'}
            )

            user.token = token;
            user.password = undefined;
            
            // res.status(200).json({success:true,user})
            // OR

            //------------------------------------------
            // Instead Setting up a COOKIE
                // Cookie options
                const options = {
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly: true  // only accessible from backend
                }
                res.status(200).cookie("token",token,options).json({
                    success:true,
                    msg:"User logged in",
                    user
                })
        }
        res.status(400).json({success: false, msg: "Invalid email or password"})
    }
    catch(err){
        console.log(err.message)
    }
})

app.post("/logout",(req,res)=>{
    try{
        const cookieExists = (req.cookies['token'])
        if(cookieExists){
            res.clearCookie("token")
            // res.clearCookie("undefined")
            res.status(200).json({success:true, msg:"cookie destroyed"});
        }
        res.status(400).json({success:false, msg:"No user is logged in"})
    }
    catch(err){
        console.log(err.message)
        res.sendStatus(500)
    }
})

app.get("/homepage",isAuthorized,(req,res)=>{
    res.json({
        success:true,
        msg:"Welcome to homepage",
        user:req.user
    })
})


//---------- Form handling -----------

module.exports = app;