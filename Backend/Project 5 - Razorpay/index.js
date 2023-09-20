const express = require('express')
const Razorpay = require('razorpay')
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("<h1>Hello world</h1>")
})

app.post('/orders',async(req,res)=>{
    const {amount} = req.body;
    const  instance = new Razorpay({ 
        key_id: 'YOUR_KEY_ID',
        key_secret: 'YOUR_SECRET'
    })
    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
    }
    const myOrder = await instance.orders.create(options)

    res.status(200).json({
        success:true,
        amount,
        order:myOrder
    })
})

app.listen(5000,()=>{
    console.log("SERVER IS RUNNING AT PORT 5000...")
})