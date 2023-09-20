import React from 'react'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const userName = useSelector((state)=> state.user.value.userName)
  return (
    <div>
        <NavLink to='/login'>Login</NavLink>
        <h1>Homepage</h1>
        <h3>User: {userName}</h3>
    </div>
  )
}

export default Homepage