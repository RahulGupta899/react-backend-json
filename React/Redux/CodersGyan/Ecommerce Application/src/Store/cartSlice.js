import { createSlice } from '@reduxjs/toolkit'



const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state,action){
            state.push(action.payload)
        },
        remove(state, action){

            const newInfo = [...state]
            newInfo.splice(action.payload,1)
            return newInfo;

            // OR
            
            // state.splice(action.payload,1)
            // state = state.filter((item)=> item.id !== action.payload)
        }
    }
})

export const {add, remove}  = cartSlice.actions;
export default cartSlice.reducer;