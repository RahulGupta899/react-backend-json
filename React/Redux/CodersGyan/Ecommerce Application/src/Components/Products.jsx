import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import {useDispatch} from 'react-redux'
import {add,remove} from  '../Store/cartSlice'



const Products = () => {

    const dispatch = useDispatch();

    const [products,setProducts] = useState([]);
    
    const handleClick = (product)=>{
      dispatch(add(product))         // CALLING THE ACTION (also sending the payload)
      window.scrollTo({top:0, behavior:'smooth'})
    }

    useEffect(()=>{
        const fetchProducts = async()=>{
            const {data} = await axios.get('https://fakestoreapi.com/products');
            setProducts(data)
        }
        fetchProducts();
    },[])

  return (
    <div className='productsWrapper'>
      {
        products.map((product)=>{
          return(
            <div className='card' key={product.id}>
              <img src={product.image} alt=""/>
              <h4>{product.title}</h4>
              <h5>{product.price} $</h5>
              <button className='btn' onClick={()=>handleClick(product)}>Add to Cart</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Products