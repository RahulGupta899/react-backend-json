import CustomizedSnackbars from './Snackbar';

// REDUX RELATED
import {useDispatch} from 'react-redux'
import {addEmployee,removeEmployee} from '../Redux/employeeSlice'
import { useState } from 'react'



export default function Home() {
  const [employee,setEmployee] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleAdd = ()=>{
    console.log("#####")
    console.log("Add Button Clicked")
    if(employee.trim() === '') return;
    dispatch(addEmployee({
      empName: employee,
      empNameLength: employee.length
    }))
    setEmployee('');
    setOpen(true);
  }

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
      handleAdd();
    }
  }

  return (
    <div className="home">
      <h2>Welcome</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolor assumenda, itaque nesciunt alias voluptatum nobis blanditiis eos officiis aperiam earum eum vel quas odio optio, distinctio ab sunt unde incidunt ipsum omnis amet magnam accusantium aut! Excepturi, cupiditate iusto!</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus veniam ducimus eligendi nihil, cumque ab eveniet modi architecto quidem, non odit saepe facere voluptas esse mollitia illo fuga exercitationem id dicta iusto eaque numquam quaerat ad! Fugit velit beatae laudantium.</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus veniam ducimus eligendi nihil, cumque ab eveniet modi architecto quidem, non odit saepe facere voluptas esse mollitia illo fuga exercitationem id dicta iusto eaque numquam quaerat ad! Fugit velit beatae laudantium.</p>
      
      <div className='add_employee'>
        <p>REDUX STORE</p>
        <h4>Add New Employee</h4>
        <input value={employee} onChange={(e)=>{setEmployee(e.target.value)}} onKeyDown={handleKeyDown}/>
        <button onClick={handleAdd}  variant='contained' sx={{height:'50px',width:'80px',marginLeft:'20px'}}>Add</button>
      </div>
      <CustomizedSnackbars open={open} setOpen={setOpen}/>
    </div>
  )
}