exports.homePage = (req,res)=>{
    res.status(200).json({
        success:true,
        msg: 'Welcome to Homepage'
    })
}

exports.about = (req,res)=>{
    res.status(200).json({
        success: true,
        msg: 'About Section'
    })
}