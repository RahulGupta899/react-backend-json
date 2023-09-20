const express = require('express')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const app = express();


///////////////////////
//  Middlewares
///////////////////////
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}));   //For taking data from FORMS-body
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
cloudinary.config({                             // Cloudinary configuration : Not needed in Dev, use dotenv there
    cloud_name: "dmmyphrgi",
    api_key: "654927842166636",
    api_secret: "d9L7jmwjmSxKT03UmxCtVNM2iqs"
})

/////////////////////////////////////
// ROUTES
////////////////////////////////////
app.get('/',(req,res)=>{
    res.send("<h1>HOMEPAGE </h1>")
})

//GET TYPE FORM , Data is passed in (Query)
app.get("/get-form",(req,res)=>{
    res.render('getForm')
})
app.get('/myget',(req,res)=>{
    const {userName, password} = req.query;
    res.json({
        success: true,
        msg: req.query,
        userName,
        password
    })
})

// POST TYPE FORM, Data is passed in (body)
// To handle FILES, third party package is required, data is passed in (req.files)
app.get('/post-form',(req,res)=>{
    res.render('postForm')
})
app.post('/mypost',async (req,res)=>{
    try{
        console.log(req.files)
        console.log(req.body)
        let uploaded;
        const file = req.files.profile
        if(!file.length){
            // Uploading SINGLE FILE to Cloudinary
            console.log("uploading single file")
            const filePath = file.tempFilePath
            const result = await cloudinary.uploader.upload(filePath,{folder:"User"})
            uploaded = result;
        }
        else{
            // Uploading MULTIPLE FILE to Cloudinary
            console.log("uploading multiple files")
            const restArr = [];
            for(let i=0; i<file.length; i++){
                const filePath = file[i].tempFilePath
                const result = await cloudinary.uploader.upload(filePath,{folder:"User"})
                restArr.push({
                    public_Id: result.public_id,
                    public_URL: result.secure_url
                })
            }
            uploaded = restArr
        }
        res.status(200).json({
            success: true,
            msg: req.body,
            uploaded
        })
        
    }
    catch(err){
        console.log(err.message)
        res.sendStatus(500)
    }
    

    
    
    
})

module.exports = app;