import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productReducer from './productSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,       // REGISTERING THE MINI STATE
        product: productReducer  // REGISTERED TO THE STORE   
    }
})

export default store