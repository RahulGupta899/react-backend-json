import {STATUSES} from './loaderStates'
import {addManagement, setManagementListStatus } from '../employeeSlice'
import axios from 'axios'


export const fetchManagement = ()=>{
    return async function fetchManagementThunk(dispatch, getState){
        console.log("THUNK EXECUTED...")
        const currentState = getState();
        console.log("Current State: ", currentState)

        dispatch(setManagementListStatus(STATUSES.LOADING))
        try{
            const {data} = await axios.get("http://localhost:4000/management");
            console.log("DATA: ",data)
            dispatch(addManagement(data))
            dispatch(setManagementListStatus(STATUSES.IDLE))
        }
        catch(err){
            console.log("ERROR: ", err);
            dispatch(setManagementListStatus(STATUSES.ERROR))
        }
    }
}