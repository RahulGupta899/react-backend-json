import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='pageNotFound'>
        <h1>Page Not Found</h1>
        <Link to='/' className="homeButton">HOME</Link>
    </div>
  )
}

export default NotFound