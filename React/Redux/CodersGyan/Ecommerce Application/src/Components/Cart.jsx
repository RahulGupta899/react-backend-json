import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {remove} from '../Store/cartSlice'

const Cart = () => {

  const cartStatus = useSelector((state)=>state.cart);   // Need to subscribe which state we want to use
  const dispatch = useDispatch();

  const handleClick = (product, idx)=>{
    dispatch(remove(idx))
  }

  return (
    <div className='cartWrapper'>
      {
        cartStatus.map((product,idx)=>{
          return(
            <div className='cartCard' key={idx}>
              <img src={product.image} alt=""/>
              <h4>{product.title}</h4>
              <h5>{product.price} $</h5>
              <button className='btn' onClick={()=>handleClick(product,idx)}>Remove</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Cart