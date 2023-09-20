const mongoose = require('mongoose')
const {MONGODB_URL} = process.env

exports.connectDB = ()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(
        console.log("DB CONNECTED SUCCESSFULLY")
    )
    .catch((err)=>{
        console.log("DATABASE CONNECTION FAILED")
        console.log(err)
        process.exit(1)
    })
}