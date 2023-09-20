const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.isLoggedIn = async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.header('Authorization').replace("Bearer ",'')
    
        if(!token){
            return next(new Error('Login first to access this page...'))
        }
    
        const decode = jwt.verify(token,process.env.JWT_SECRET)
    
        // Attach User to request object
        req.user = await User.findById(decode.id).select("+password")
        console.log("User Logged In..")
        next();
    }
    catch(err){
        console.log(err.message)
        res.json({
            success: false,
            message: err.message,
            possibilities: [
                "Token not found either in cookie or header",
                "Token Expired or Incorrect JWT SECRET",
                "User not Logged In"
            ]
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    // User is Already logged in , user is attached in req
    console.log(req.user.role)
    if(req.user.role === 'admin'){
        console.log("User is ADMIN")
        next()
    }
        // next();
    else
        return next(new Error('Unauthorized...'))
}

exports.isManager = (req,res,next)=>{
    // User is Already logged in , user is attached in req
    if(req.user.role === 'manager') 
        next();
    else
        return next(new Error('Unauthorized...'))
}

exports.customRole = (...roles)=>{
    return(req,res,next)=>{
        if(! roles.includes(req.user.role)){
            return next(new Error('Not Allowed to excess'))
        }
        next()
    }
}