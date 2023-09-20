const express = require('express')
const app = express();
const moment = require('moment')
// Swagger and Yaml for API Docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


const PORT =  process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running at PORT: ${PORT} ...`)
})

// ############  ROUTES   ###################
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // API Doc

app.get('/',(req,res)=>{
    res.status(200).send("<h1>HomePage</h1>")
})

app.get('/api/v1/instagram',(req,res)=>{
    try{
        const instagramDataFromDb = {
            userName: 'its_rahulgupta',
            follwers: 664,
            follows:  268,
            accessTime: moment().format("MMMM Do YYYY, h:mm:ss a")
        }
        res.status(200).json(instagramDataFromDb)
    }
    catch(err){
        console.log("ERROR: ",err.message)
        res.sendStatus(500)
    }
})

app.get('/api/v1/linkedIn',(req,res)=>{
    try{
        const linkedInDataFromDb = {
            userName: 'RahulGupta899',
            follwers: 500,
            follows:  434,
            accessTime: moment().format("MMMM Do YYYY, h:mm:ss a")
        }
        res.status(200).json(linkedInDataFromDb)
    }
    catch(err){
        console.log("ERROR: ",err.message)
        res.sendStatus(500)
    }
})

app.get('/api/v1/facebook',(req,res)=>{
    try{
        const facebookDataFromDb = {
            userName: 'its_rahulgupta',
            follwers: 287,
            follows:  30,
            accessTime: moment().format("MMMM Do YYYY, h:mm:ss a")
        }
        res.status(200).json(facebookDataFromDb)
    }
    catch(err){
        console.log("ERROR: ",err.message)
        res.sendStatus(500)
    }
})

app.get('/api/v1/:id',(req,res)=>{
    res.status(200).json({
        param: req.params.id
    })
})