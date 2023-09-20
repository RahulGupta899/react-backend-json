import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
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
// Thunks Middleware
// The word thunk is a Programming term that means 'a piece of code that does some delayed work',
// Rather than execute some logic now, we can write a function body or code that can be used to perform the work later
// thunks is a Function
// conventional method of creating Thunks in react-redux

////////////////////////////////////////////////////
// METHOD 1: Typical Way (recommended)
////////////////////////////////////////////////////
// export function fetchProducts(){
//     return async function fetchProductThunk(dispatch, getState){
//         //WRAP THIS CODE IN try-catch (Because we are going to do Network request)
//         //we can get the state also
//         const currentState = getState();  // Important
        
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//             const {data} = await axios.get('https://fakestoreapi.com/products') 
//             dispatch(setProducts(data))       // NEED TO MANUALLY DISPATCH ACTIONS (have more control over code)
//             dispatch(setStatus(STATUSES.IDLE))
//         }   
//         catch(err){
//             console.log("ERROR: ",err)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }

////////////////////////////////////////////////
// METHOD 2: Builtin REDUX TOOLKIT THUNKS
////////////////////////////////////////////////
//                                               identifier        funciton
export const fetchProducts = createAsyncThunk('products/fetch', async()=>{
    const {data} = await axios.get('https://fakestoreapi.com/products')
    return data;
})

// THIS WAY OF CREATING THUNK IS DONE IN REACT TOOLKIT FOR BETTER ERROR HANDLING
// INSPIRED FROM PROMISE SYNTAX LIKE SUCCESS, PENDING, ERROR STATUS
// BASED ON THESE STATUS ACTIONS ARE AUTOMATICALLY DISPATCHED
// HERE thunks are automatically dispatched by the builder
// react-redux we have to manually dispatch the thunks
// Thunks will be automatically called by the builder in extraReducer







