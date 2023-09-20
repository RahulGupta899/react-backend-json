import {useSelector,useDispatch} from 'react-redux'
import {removeEmployee} from '../../Redux/employeeSlice'
import {fetchManagement} from '../../Redux/thunks/fetchManagementThunk'
import { useEffect } from 'react'
import {STATUSES} from '../../Redux/thunks/loaderStates'
import axios from 'axios'

const  Employee = ()=>{
    const employeeStates = useSelector((state)=>state.employee)
    const  dispatch = useDispatch()

    console.log("EMPLOYEE COMPONENT RE-RENEDRED")
    console.log(employeeStates)

    const handleRemoveEmployee = (idx)=>{
        console.log("Remove Index Executed")
        console.log("Idx: ",idx)
        dispatch(removeEmployee(idx))      // DISPATCHING THE ACTION 
    }

    // FETCH MANAGEMENT LIST
    useEffect(()=>{
        dispatch(fetchManagement());
    },[])



    return(
        <div>
            <h3>List of Employees</h3>
            {
                employeeStates.employees.map((emp,idx)=>{
                    return(
                        <div className='employee' key={idx}>
                            <a>
                                <p>{emp.empName}</p>
                                <p>Confidence, {emp.empNameLength} </p>
                            </a>
                            <button onClick={()=>{handleRemoveEmployee(idx)}}>X</button>
                        </div>
                    )
                })
            }
            <div>
                {employeeStates.employees.length==0 && <div style={{fontSize:'13px'}}>No Data</div>}
            </div>

            <h3 style={{marginTop:'20px'}}>Management</h3>
            {
                employeeStates.management.status === STATUSES.LOADING
                &&
                <div>Loading...</div>
            }
            {
                employeeStates.management.status === STATUSES.ERROR
                &&
                <div>Something went wrong!</div>
            }
            {
                employeeStates.management.data.map((person,idx)=>{
                    return(
                        <div className='employee' key={idx}>
                            <a>
                                <p>{person.name}</p>
                                <p>{person.designation} </p>
                            </a>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Employee;