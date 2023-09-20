import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
const HelpLayout = ()=>{
    return(
        <div className='help-layout'>
            
            <h2>Website Help</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Sint harum alias in doloremque doloribus nostrum soluta ea eos impedit omnis. 
                Tempora, vel minus est voluptatem dicta harum aliquam fugiat, laborum molestias, 
                maiores sequi eum praesentium. Minima magnam soluta tempore in ab recusandae ducimus 
                esse tempora assumenda maiores ut eius, minus magni asperiores temporibus molestias
                possimus nisi quae voluptates autem! Dignissimos eos quidem molestias quia, soluta 
                voluptatem voluptatum harum quas, aspernatur accusantium, minima earum modi sequi 
                reiciendis possimus labore unde dolorum! Nisi porro fugiat omnis, incidunt odio
                quibusdam reiciendis unde cum tempora blanditiis repudiandae, iure quas distinctio 
                error repellendus quasi! Expedita?
            </p>
            
            <nav>
                <NavLink to="faq">View the FAQs</NavLink>
                <NavLink to='contact'>Contact Us</NavLink>
                <NavLink to='employeeList'>Employees</NavLink>
            </nav>

            <Outlet/>
        </div>

    )
}
export default HelpLayout