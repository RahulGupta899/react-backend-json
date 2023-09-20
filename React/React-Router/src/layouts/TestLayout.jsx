import React from 'react'
import {Outlet} from 'react-router-dom'
const TestLayout = ()=>{
    return(
        <div>

            <div>
                TEST LAYOUT
            </div>

            <div style={{margin:'50px'}}>
                <h4>Nested Component Route</h4>
                <h5>--</h5>
                <Outlet/>
            </div>
        </div>
    )
}

export default TestLayout