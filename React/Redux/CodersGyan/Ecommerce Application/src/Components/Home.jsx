import React from 'react'
// import Products from './Products'
import ProductsV2 from './ProductsV2' // USED THUNKS HERE

const Home = () => {
  return (
    <div>
        <h2 className='heading'>Welcome to Redux Toolkit Store</h2>
        <section>
            <h3>Products</h3>
            {/* <Products/> */}
            <ProductsV2/>
        </section>
    </div>
  )

}

export default Home