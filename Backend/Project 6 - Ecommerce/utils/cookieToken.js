const cookieToken = (user,res)=>{
    const {COOKIE_EXPIRY_DAYS} = process.env;
    const token = user.getJWToken(); //Schema Method
    const options = {
        expires: new Date(Date.now() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
        httpOnly: true              // read only
    }
    user.password = undefined
    res.status(200).cookie("token",token,options).json({
        success: true,
        message: "Token Generated",
        token,
        user
    })
}

module.exports = cookieToken;