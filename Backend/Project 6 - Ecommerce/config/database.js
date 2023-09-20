const mongoose = require('mongoose')
const {MONGO_URL} = process.env


const connectDB = function(){
    mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>{
            console.log("DATABASE CONNECTED SUCCESSFULLY!")
    })
    .catch((err)=>{
        console.log("DATABASE CONNECTION FAILED!");
        console.log("ERROR:",err.message)
        process.exit(1)
    })
}
module.exports = connectDB;

//////////////////////////////
// Using Try-Catch
/////////////////////////////
// const connectDB = async function(){
//     try{
//         await mongoose.connect(MONGO_URL)
//         console.log("DATABASE CONNECTED SUCCESSFULLY!")
//     }
//     catch(err){
//         console.log("DATABASE CONNECTION FAILED!")
//         console.log('Error Message: ',err.message)
//         process.exit(1)
//     }
// }
