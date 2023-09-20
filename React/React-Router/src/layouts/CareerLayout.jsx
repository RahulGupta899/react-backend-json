import React from 'react'
import {Outlet} from 'react-router-dom'

const CareerLayout = () => {
  return (
    <div className='careers-layout' >
        <h2>Careers</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, aliquam quod! Dolor, maxime aliquid porro, incidunt quia laborum sint similique debitis libero omnis asperiores vel voluptate voluptas. Optio, et quasi!</p>        
        <Outlet/>
    </div>
  )
}

export default CareerLayout