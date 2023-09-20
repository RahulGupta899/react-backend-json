const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env
const User = require('../models/User')

exports.isAuthorized =(req,res,next)=>{
    try{
        console.log(req.cookies)
        // Step1: Get the Token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")

        // Step2: Check Token Available or Not             
        if(!token){
            res.status.json({
                success: false,
                msg: "Token not found"
            })
        }

        // Step3: Verify the Token
        jwt.verify(token,SECRET_KEY,async(err,payload)=>{
            if(err){
                res.status(400).json({success:false,msg:"Invalid token"})
            }
            // Else token verified
            // Now apply own logic find all info of user from db and attach with req body
            console.log(payload);
            req.user = payload;
            next();
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

