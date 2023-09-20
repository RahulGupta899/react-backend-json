require('dotenv').config()
const connectDB = require('./config/database')
const cloudinary = require('cloudinary')
const app = require('./app')
const {
    PORT,
    CLOUDINAY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

// connect database
connectDB();

// config cloudinary
cloudinary.config({
    cloud_name:CLOUDINAY_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
})


app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${PORT}...`)
})