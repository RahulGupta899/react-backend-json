import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'

const Careers = () => {

  const careers = useLoaderData()   // result of loader function is stored here

  return (
    <div className='careers'>
      {
        careers.map((career)=>{
          return(
            <Link to={`${career.id}`} key={career.id}>
              <p>{career.title}</p>
              <p>Based in {career.location}</p>
            </Link>)
        })
      }
    </div>
  )
}

export default Careers


// LOADER FUNCTIONS
export const careersLoader = async()=>{
  const res = await fetch("http://localhost:4000/careers")
  

  return res.json()
}


/*
    We'll be using Router loading to load the careers, by which data will be 
    loaded even before this component renders

    Adv: No need to use the useEffect hook
    Or store the data in any local state
*/