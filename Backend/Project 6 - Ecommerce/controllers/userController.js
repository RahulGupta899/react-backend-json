const User = require('../models/User')
const cookieToken = require('../utils/cookieToken')
const cloudinary = require('cloudinary');
const mailHelper = require('../utils/sendMail');
const catchResponse = require('../utils/catchResponse');
const { findById } = require('../models/User');

exports.signup = async (req,res,next)=>{
    // TBD : handle validation error
    //       Image getting save even user not registered
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password || !req.files){
            return next(new Error("Name, Email, Password and Profile Pic is mandatory for registration"))        }
        let result;
        if(req.files){
            let file = req.files.photo.tempFilePath
            result = await cloudinary.v2.uploader.upload(file,{
                folder: "Private Docs",
                width: 500,
                crop: 'scale'
            })
            console.log(result)
        }
        
        const user = await User.create({
            name,
            email,
            password,
            photo:{
                id: result.public_id,
                secure_url: result.secure_url
            }
        })
        cookieToken(user,res);  // Sending respose from here
    }
    catch(err){
        console.log("!!ERROR: ",err.message)
        res.status(500).json({
            success:false,
            msg: err.message
        })
    }
    
}

exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body;                           // user credentials
    
        const user = await User.findOne({email}).select("+password") // Get User from DB

        if(!user){                                                  // Check User
            return next(new Error('Email or Password did not match...'))
        }
        
        const isVerified = await user.isValidatedPassword(password) // Verify Password
        if(!isVerified){
            return next(new Error('Email or Password did not match...'))
        }
        cookieToken(user,res)                                       // Generate Cookie and send feedback
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
}

exports.logout = async(req,res,next)=>{
    try{
        res.cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly: true
        }).status(200).json({
            success: true,
            message: 'User successfully logged out'
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

exports.forgotPassword = async(req,res,next)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email})

        if(!user){
            return next(new Error('User not available ...'))
        }

        const forgotToken = await user.getForgetPasswordToken(); 
        // Assigns this.forgetPasswordToken and this.forgetPasswordTokenExpiry 
        // and need to save that explicitly from here
        // await user.save();                           It's fine but sometimes 
        await user.save({validateBeforeSave:false}) //  it raises error , so keep validation check as false
        
        // send forgot token string to the user
        const url = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`
        const message = `Copy pase this link in your URL and hit enter \n\n ${url}`
        
        // Send Mail 
        try{
            const arguments = {
                email: user.email,
                subject: 'Omind TStore - Password reset email',
                message
            };
            console.log(arguments)

            await mailHelper(arguments)             // CALL NODEMAILER
            res.status(200).json({                  // Feedback
                success: true,
                message: "Email sent successfully"
            })
        }
        catch(err){
            // Flush out the saved values
            user.forgetPasswordToken = undefined
            user.forgetPasswordTokenExpiry = undefined
            await user.save({validateBeforeSave: false})
            console.log("!!ERROR!! ",err.message)
            return next(new Error("Can't Send Email..."))
        }
    }
    catch(err){
        catchResponse(err,res)
    }
}

exports.resetPassword = async(req,res,next)=>{
    try{
        const forgotToken = req.params.forgotToken //Forgot password token which is stored in backend

        // Find user which have this same Forgot Token
        const user = await User.findOne({
            forgetPasswordToken: forgotToken, 
            forgotPasswordTokenExpiry: {$gt: Date.now()}   // For unexpired tokens only
        }) 

        if(!user){
            return next(new Error('Token is Invalid or Expired...'))
        }
    
        // Check Password
        if(req.body.password !== req.body.confirmPassword){
            return next(new Error('Password and confirm password did not match...'))
        }
    
        // Everything is fine then
        user.password = req.body.password  // Encrypted by pre hook
    
        user.forgetPasswordToken = undefined;  // Again make it empty
        user.forgetPasswordTokenExpiry = undefined;
        await user.save({validateBeforeSave:false});
    
        // Now Ask user to login Again or Send token
        cookieToken(user,res)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({
            success:false,
            message: err.message
        })
    }
}

exports.getLoggedInUserDetails = async(req,res,next)=>{
    // Previous Middleware will attach User to req
    res.status(200).json({
        success: true,
        user_Info : req.user
    })
}

exports.changePassword = async(req,res,next)=>{
    // User Needs to be Already Logged in
    const {oldPassword,newPassword,confirmPassword} = req.body
    
    if(newPassword !== confirmPassword){
        return next(new Error('New Password and Confirm Password did not'))
    }

    if(!await req.user.isValidatedPassword(oldPassword)){
        return next(new Error('Old Password did not match...'))
    }

    const user = await User.findById(req.user.id)
    user.password = newPassword
    await user.save({validateBeforeSave:false});

    res.status(200).json({
        success: true,
        message: "Password Updated successfully"
    })
}

exports.updateUserInfo = async(req,res,next)=>{
    try{
        // User Needs to be loggedIn First

        const {email,name} = req.body
        const newInfo = {
            email,
            name
        }

        //Handle profile pic update also
        if(req.files){
            // Destroy the PREVIOUS PHOTO
            const imageId = req.user.photo.id
            await cloudinary.v2.uploader.destroy(imageId)

            // Push New profile
            const newFilePath = req.files.photo.tempFilePath
            const result = await cloudinary.v2.uploader.upload(newFilePath,{
                folder: "Private Docs",
                width: 500,
                crop: 'scale'
            })
            console.log(newFilePath)

            newInfo.photo = {
                id: result.public_id,
                secure_url: result.secure_url
            }
        }
        
        
        const user = await User.findByIdAndUpdate(  {_id:req.user.id},
                                                    newInfo,
                                                    {
                                                        new:true,
                                                        runValidators: true,
                                                        useFindAndModify:false
                                                    }
                                                )
    
        req.user.password = undefined
        res.status(200).json({
            success: false,
            message: 'Update User',
            user
        
        })

    }
    catch(err){
        console.log(err.message)
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

exports.adminAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json({
            success: true,
            users
        })
    }
    catch(err){
        console.log("!! ERROR: ",err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.adminGetSingleUser = async(req,res,next)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id).select('name email createdAt')
        res.status(200).json({
            success: true,
            user
        })
    }
    catch(err){
        catchResponse(err,res)
    }
}

exports.adminSingleUserUpdate = async(req,res,next)=>{
    try{
        const {id} = req.params
        const {name,role} = req.body
        const newInfo = {
            name,
            role
        }
        const user = await User.findByIdAndUpdate(id,newInfo,{new:true})
        res.status(200).json({
            success: true,
            user
        })
    }
    catch(err){
        catchResponse(err,res)
    }
}

exports.managerAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find({role:'user'})
        res.status(200).json({
            success: false,
            users
        })
    }
    catch(err){
        console.log("!!ERROR: ",err.message)
        res.status(500).jsno({
            success:false,
            message: err.message
        })
    }
}

exports.adminDeleteSingleUser = async(req,res,next)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user){
            return next(new Error('User Not Available'))
        }
        // Delete the User photo from cloudinary
        const photoId = user.photo.id
        await cloudinary.v2.uploader.destroy(photoId)
        // Delete the user 
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'User Deleted successfully'
        })
    }
    catch(err){
        catchResponse(err,res)
    }
}   