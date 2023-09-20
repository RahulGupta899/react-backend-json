const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: [40, 'Name should uder 40 characters'],
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password should be atleast 6 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    photo: {
        id: {
            type: String,
            required: [true, 'Photo id should be provided']
        },
        secure_url: {
            type: String,
            required: [true, 'Photo secure url should be provided']
        }
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

// Encrypt password before save - HOOKS
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){  //If password field is not 
        return next();                 // Modified then move forward
    }
    else{// New password will travel only in user registration & reset password , only then update in database
        this.password = await bcrypt.hash(this.password, 10)
        console.log("Password Updated and encrypted successfully, (pre hook)...")
    }
})

// Password verification while Login - METHOD
userSchema.methods.isValidatedPassword = async function(userPlanPassword){
    return await bcrypt.compare(userPlanPassword, this.password)
}

// Generate JW Token - METHOD
userSchema.methods.getJWToken = function(){
    const {JWT_SECRET, JWT_EXPIRY} = process.env
    return jwt.sign(
        {id: this._id},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRY}
    )
}

// Generate Forget Password Token (LONG RANDOM STRING)
userSchema.methods.getForgetPasswordToken = function(){
    const {FORGOT_PASSWORD_EXPIRY} = process.env
    const forgotToken = crypto.randomBytes(20).toString("hex"); // Generate a long random String
    this.forgetPasswordToken = forgotToken;
    this.forgetPasswordTokenExpiry = Date.now() + parseInt(FORGOT_PASSWORD_EXPIRY); // Expiry Time of Token
    return forgotToken;
}


module.exports =  mongoose.model('user',userSchema)