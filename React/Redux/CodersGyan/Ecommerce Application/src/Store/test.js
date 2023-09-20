

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ENUM like mechanism
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})  // WE MADE IT READ-ONLY NOW


const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],            // API RESPONSE DATA
        status: STATUSES.IDLE
    },
    reducers: {

        // setProducts(state,action){
        //     //NOTE: NEVER DO THIS , we are not allowed to do this because reducers are called synchronouly
        //     // const response = await fetch('https://faker.api/products')
        //     // Then HOW we can do API calls here
        //     // Solution: we use THUNKS middleware
        //     state.data = action.payload
        // }, 
        // setStatus(state,action){
        //     state.status = action.payload
        // }

    },
    extraReducers: (builder)=>{   // Needed when we are using the redux toolkit thunks way 
        builder
            .addCase(fetchProducts.pending, (state, action)=>{
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.data = action.payload
                state.status = STATUSES.IDLE
            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.status = STATUSES.Error
            })
    }
})


export const {setProducts,setStatus}  = productSlice.actions;   // Destructuring also so that we can use it below also
export default productSlice.reducer;





//  #######  THUNKS RELATED TO THIS SLICE #######
// Thunks will be automatically called by the builder
export const fetchProducts = createAsyncThunk('products/fetch', async()=>{
    const {data} = await axios.get('https://fakestoreapi.com/products')
    return data;
})

// THIS WAY OF CREATING THUNK IS DONE IN REACT TOOLKIT FOR BETTER ERROR HANDLING
// INSPIRED FROM PROMISE SYNTAX LIKE SUCCESS, PENDING, ERROR STATUS
// BASED ON THESE STATUS ACTIONS ARE AUTOMATICALLY DISPATCHED
// HERE thunks are automatically dispatched by the builder
// react-redux we have to manually dispatch the thunks



