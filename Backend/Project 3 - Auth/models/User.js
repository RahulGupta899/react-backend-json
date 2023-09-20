const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        default: null
    },
    lastName:{
        type: String,
        default: null
    },
    email:{
        type: String,
        unique: [true, 'Email already taken']
    },
    password:{
        type: String
    },
    token:{
        type: String
    }
})

const User = mongoose.model('user',userSchema)

module.exports = User