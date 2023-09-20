const express = require('express')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const ejs = require('ejs')
const app = express();

/////////////////////////////
// Middlewares
////////////////////////////
app.set('view engine', ejs)
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //?


///////////////////////////
// Routers
///////////////////////////
const homeRouter = require('./routes/homeRoute')
const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')

app.get('/signup',(req,res)=>{
    res.render('signupForm.ejs')
})

///////////////////////////
// Router Middlewares
///////////////////////////
app.use('/api/v1',homeRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',productRouter)


module.exports = app;