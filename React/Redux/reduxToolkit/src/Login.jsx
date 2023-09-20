import {useState} from 'react'
import {login, logout} from './Store'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'


const Login = ()=>{
    const dispatch = useDispatch();
    const userName = useSelector((state)=> state.user.value.userName)
    
    const [user,setUser] = useState('')
    

    return (
        <div>
            <NavLink to='/'>HOME</NavLink>
            <h1>Login page</h1>
            <h3>User: {userName}</h3>
            <input type="text"  onChange={(e)=> setUser(e.target.value)}/>
            <button onClick={()=>dispatch(login({userName: user}))}>Submit</button>
            <button onClick={()=>dispatch(logout())}>Logout</button>
        </div>
    )
}
export default Login