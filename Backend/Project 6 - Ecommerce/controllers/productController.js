const cloudinary = require('cloudinary')
const Product = require('../models/Product')
const catchResponse = require('../utils/catchResponse')
const WhereClause = require('../utils/WhereClause')

exports.createProduct = async(req,res)=>{
    try{
        const info = {...req.body}

        // Handle Images
        if(!req.files){
            return next(new Error("Product Image is required..."))
        }
        
        // Upload image in cloudinary
        const imgArray = []
        for(let i=0; i<req.files.photos.length; i++){
            const result = await cloudinary.v2.uploader.upload(req.files.photos[i].tempFilePath,{
                folder: "products"
            })
            imgArray.push({
                id: result.public_id,
                secure_url: result.secure_url
            })
        }

        info.photos = imgArray;
        info.user = req.user.id;

        const product = await Product.create(info)
        res.status(200).json({
            success: true,
            product
        })
    }
    catch(err){
        catchResponse(err,res)
    }
}

exports.getAllProduct = async(req,res,next)=>{
    try{
        const resultPerPage = 6;
        const totalCountProduct = await Product.countDocuments();
        const filteredProductsObj = new WhereClause(Product.find(), req.query).search().filter()
        console.log("FILTERED PRODUCTS OBJECT: -")
        console.log(filteredProductsObj)

        let filteredProducts = await filteredProductsObj.base
        const filteredProductsCount = filteredProducts.length
        

        filteredProductsObj.pager(resultPerPage)
        filteredProducts = await filteredProductsObj.base.clone()

        res.status(200).json({
            success: true,
            filteredProducts,
            filteredProductsCount,
            totalCountProduct
        })
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}

exports.getOneProduct = async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return next(new Error('No product found with this id'))
        }

        res.json({
            success: true,
            product
        })
    }
    catch{
        res.json({
            success: false,
            message: err.message
        })
    }
}

exports.updateOneProduct = async(req,res,next)=>{
    try{
        // console.log("Body",req.body)
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new Error('No product found with this id'))
        }

        let imgArray = []
        console.log("REQ FILES: ",req.files)
        if(req.files){
            console.log("FILES PRESENT...")
            // Destroy the existing image
            for(let i=0; i<product.photos.length; i++){
                const res = await cloudinary.v2.uploader.destroy(product.photos[i].id)
            }

            // Upload and save the images
            for(let i=0; i<req.files.photos.length; i++){
                console.log("UPLOADING IMAGES...")
                const result = await cloudinary.v2.uploader.upload(req.files.photos[i].tempFilePath,{
                    folder: "products"
                })
                imgArray.push({
                    id: result.public_id,
                    secure_url: result.secure_url
                })
            }

        }

        req.body.photos = imgArray

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators: true, 
            useFindAndModify: false
        })

        res.json({
            success: true,
            product
        })
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteOneProduct = async(req,res,next)=>{
    try{
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new Error('No product found with this id'))
        }
        // Destroy the images from cloudinary 
        for(let i=0; i<product.photos.length; i++){
            const res = await cloudinary.v2.uploader.destroy(product.photos[i].id)
        }

        await product.remove()
        res.json({
            success: true,
            message: 'Product successfully deleted'
        })    

    }
    catch(err){
        catchResponse(err,res)
    }
}

exports.addProductReview = async(req,res,next)=>{
    try{
        
        const {productId} = req.params
        const {rating, comment} = req.body;

        const product = await Product.findById(productId);
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating,
            comment
        }

        // Check Product Already reviewed by the user or Not, 
        const alreadyReviewed = product.reviews.find((review)=>{
            return req.user._id.toString() === review.user.toString()
        })
        if(alreadyReviewed){
                                            // Update the Previous Review
            product.reviews.map((review)=>{
                if(req.user._id.toString() === review.user.toString()){
                    review.comment = comment;
                    review.rating = rating;
                }
            })
        }
        else{
            product.reviews.push(review)
            product.numberOfReviews++;
        }
        
        product.ratings = (product.reviews.reduce((sum,item)=> sum+item.rating, 0) / product.numberOfReviews).toFixed(2)

        await product.save({validateBeforeSave:false})

        res.json({
            success: true,
            user: req.user,
            product,
            review
        })
    }
    catch(err){
        catchResponse(err,res)
    }
}
