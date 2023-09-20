// USED THUNK FOR NETWORK REQUEST

import React, { useEffect } from "react"
import {add} from '../Store/cartSlice'
import {fetchProducts, STATUSES} from '../Store/productSlice'
import {useDispatch, useSelector} from 'react-redux'


const ProductsV2 = ()=>{
    const dispatch = useDispatch()  
    // Using this same dispatch, we can dispatch THUNKS also


    // CALLING THE fetchProduct THUNK
    useEffect(()=>{
        dispatch(fetchProducts()); // CALLING THE THUNK (we can also pass arguments to thunks also  fetchProducts(args1, args2))
    },[])

    
    // PRODUCT STATES
    const info = useSelector((state)=>state.product)
    const {data: products, status} = info   // CREATED products as an ALIAS name for data

    // HANDLE CLICK
    const handleClick = (product)=>{
        dispatch(add(product))
        window.scroll({top:0, behavior:'smooth'})
    }

    if(status === STATUSES.LOADING){
        return (
            <h3>LOADING...</h3>
        )
    }

    if(status === STATUSES.ERROR){
        return (
            <h3>{`SOMETHING WENT WRONG :(`}</h3>
        )
    }


    return(
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

export default ProductsV2