import {configureStore} from '@reduxjs/toolkit'
import employeeReducer from './employeeSlice'


const store = configureStore({
    reducer: {
        employee: employeeReducer   //REGISTERING THE SLICE
    }
})

export default store;