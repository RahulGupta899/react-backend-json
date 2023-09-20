const catchResponse = (err,res)=>{
    console.log("!!ERROR: ",err.message)
    res.status(500).json({
        success: false,
        message: err.message
    })
}

module.exports = catchResponse