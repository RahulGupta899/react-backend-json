import './App.css'
import {Routes, Route, NavLink} from 'react-router-dom'
import Login from './Login'
import Homepage from './Homepage'
import {Provider} from 'react-redux'
import {store} from './Store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/contacts' element={<h1>Contact Page</h1>}/>
      </Routes>    
    </Provider>
  )
}

export default App
