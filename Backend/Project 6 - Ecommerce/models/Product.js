const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: [true,'Please provide product name'],
        trim: true,
        maxlength: [150, 'Product name should not be more than 120 characters']
    },

    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        maxlength: [6, "Product price should not be more than 6 digits"]
    },

    description:{
        type: String,
        required: [true,'Please provide product description']
    },

    photos: [
        {
            id:{
                type: String,
                required: true
            },
            secure_url:{
                type: String,
                required: true
            }
        }
    ],

    category:{
        type: String,
        required: [true,'Please select category from ( short-sleeves, Long-sleeves, sweat-shirts, hoddies )'],
        enum: {
            values: [
                'shortSleeves',
                'longSleeves',
                'sweatShirts',
                'hoddies'
            ], 
            message: 'Please select category from (short-sleeves, long-sleeves, sweat-shirts, hoddies)'
        }
    },

    brand: {
        type: String,
        required: [true, 'Please add a brand for clothing']
    },
    
    ratings:{
        type: Number,
        default:0
    },

    numberOfReviews:{
        type: Number,
        default: 0
    },

    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'users',
                required: true
            }, 
            name: {
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            _id: false          // (Explicitly defining) Otherwise everytime we push info it creates a new _id for that particular object
        }
    ],

    user: {  //The manager who has added the product
        type: mongoose.Schema.ObjectId,
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('product',productSchema)







