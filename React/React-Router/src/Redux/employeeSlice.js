import {createSlice} from '@reduxjs/toolkit'
import {STATUSES} from './thunks/loaderStates'

// STEP 1: CREATE SLICE
const employeeSlice = createSlice({
    name: 'employeeList',
    initialState: {
        employees: [
            {
                empName: 'Rahul Gupta',
                empNameLength: 11
            }
        ],
        management: {
            data: [],
            status: STATUSES.IDLE
        }
    },
    reducers: {

        // ADD EMPLOYEE
        addEmployee(state,action){
            console.log("EMPLOYEE ADDED")
            const {payload} = action

            // TWO WAYS TO REFLECT THE CHANGES
            // METHOD 1: MODIFYING THE EXISTING STATE(DRAFT)
            // state.employees.push(action.payload)


            // METHOD 2: RETURNING A NEW VALUE
            const updatedInfo = JSON.parse(JSON.stringify(state))
            updatedInfo.employees.push(payload)
            return updatedInfo;
        },

        // REMOVE EMPLOYEE
        removeEmployee(state,action){
            console.log("REMOVE EMPLOYEE")
            const {payload:idx} = action
            state.employees.splice(idx,1)
        },

        // ADD PEOPLE FROM MANAGEMENT (USED THUNK)
        addManagement(state, action){
            const {payload: data} = action
            console.log("REDUCER: ", data)
            state.management.data = data;
            console.log(state.management.data)
        },
        // MANAGEMENT STATUS
        setManagementListStatus(state,action){
            state.management.status = action.payload
        }
    }
})


// STEP 2: EXPORT ACTIONS
export const {
    addEmployee,
    removeEmployee,
    addManagement,
    setManagementListStatus
} = employeeSlice.actions;

// STEP 3: EXPORT REDUCER
export default employeeSlice.reducer;
