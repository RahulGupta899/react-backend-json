import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import Home from './Home'
import Contacts from './contacts'

function App() {

  return (
    <div>
        <div style={{display:'flex', margin: '60px', justifyContent:'space-evenly'}}>
          <Link to='/'>HOME</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<div>About</div>}/>
            <Route path='/contact' element={<Contacts/>}/>
        </Routes>
    </div>
  )
}

export default App
