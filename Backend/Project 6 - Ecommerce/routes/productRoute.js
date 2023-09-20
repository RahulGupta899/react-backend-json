const express = require('express')
const router = express.Router()
const {
    createProduct,
    getAllProduct,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct,
    addProductReview
} = require('../controllers/productController')

const {isLoggedIn, isAdmin} = require('../middlewares/user')

// Test Route
router.route('/product/test-route').get((req,res,next)=>{
    console.log(req.query)
    const json = JSON.stringify(req.query)
    console.log(json)

    const regex = /\b(gte|lte|eq)\b/g
    const updated = json.replace(regex,(str)=>{
        return `$${str}`
    })
    console.log(JSON.parse(updated))


    res.status(200).json({
        success: true,
        query: req.query
    })
})

// User Routes
router.route('/products').get(getAllProduct)
router.route('/product/:id').get(getOneProduct)
router.route('/product/review/:productId').post(isLoggedIn,addProductReview)

// admin Routes
router.route('/admin/product/add-product').post(isLoggedIn, isAdmin, createProduct)
router.route('/admin/product/:id').put(isLoggedIn,    isAdmin,    updateOneProduct)
                                  .delete(isLoggedIn, isAdmin,    deleteOneProduct)


                
module.exports = router