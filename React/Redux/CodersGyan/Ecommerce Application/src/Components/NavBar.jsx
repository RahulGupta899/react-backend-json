import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const NavBar = ()=>{

    const cartStatus = useSelector((state)=> state.cart )    // useSelector takes a call back , and it has the entire redux state, and we have to subscribe whicher we want to use

    

    return(
        <div style={{
                display:'flex', 
                justifyContent:'space-between',
                alignItems:'center'
            }}
        >
            <Link to="/" className='logo'>REDUX STORE</Link>
            <div>
                <Link className='navLink' to='/' >HOME</Link>
                <Link className='navLink' to='/cart'>CART</Link>
                <span className='cartCount'>Cart Items: {cartStatus.length}</span>
            </div>
        </div>
    )
}

export default NavBar