const express = require('express')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload')
const path = require('path')
const CronJob = require('cron').CronJob
const app = express();

const PORT = process.env.PORT || 5000

const courses = [
    {
        id: 111,
        name: 'Learn Backend Dev',
        instructor: 'Hitesh Choudhary',
        price: 399
    },
    {
        id: 222,
        name: 'React Noob to Pro',
        instructor: 'Saksham Choudhary',
        price: 499
    },
    {
        id: 333,
        name: 'Django for beginners',
        instructor: 'Kailash Choudhary',
        price: 199
    }
]

app.use(fileUpload())       //Now request can take files
app.use(express.json())     //Now request can take json 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/',(req,res)=>{
    res.status(200).json({
        success: 'yes',
        message: 'This is homepage'
    })
})

app.get('/api/v1/courses-string',(req,res)=>{
    res.send(`<h1>We are launching our courses soon</h1>
              <h2>Enroll Now...</h2>`)
})

app.get('/api/v1/courses-object',(req,res)=>{
    res.send({
        id: 10475,
        name: 'Learn Backend Dev',
        instructor: 'Hitesh Choudhary',
        price: 399
    })
})

app.get('/api/v1/courses-array',(req,res)=>{
    res.send(courses)
})

app.get('/api/v1/course/:id',(req,res)=>{
    const course = courses.find((item)=>item.id == req.params.id)
    res.send(course || {}) 
})

app.post('/api/v1/add-course',(req,res)=>{
    const newCourse = req.body;
    courses.push(newCourse)
    res.send(true)
})

app.get('/api/v1/course-search',(req,res)=>{
    const location = req.query.location
    const device = req.query.device
    const price = Number(req.query.price)
    const course = courses.find((item)=>item.price === price)
    
    if(course){
        res.status(200).send({
            location,
            device,
            course
        })
    }
    else{
        res.sendStatus(404)
    }
})

app.post('/api/v1/course-upload',(req,res)=>{
    // Task on Server: File received from client(frontend)
    // we'll store that file in server resources folder with the name as Date.now()
    
    const img = req.files.sampleFile;
    const fileName = Date.now() + ".jpg";
    const destPath = path.join(__dirname,'server data',fileName)
    img.mv(destPath,(err)=>{
        if(err) res.sendStatus(500)
        else res.status(200).json({
            message: 'file uploaded successfully...',
            fileName: Date.now() + '.jpg'
        }) 
    })
})

app.post('/api/v1/course-header',(req,res)=>{
    console.log(req.headers)
    res.status(200).json({
        message: "Success"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})