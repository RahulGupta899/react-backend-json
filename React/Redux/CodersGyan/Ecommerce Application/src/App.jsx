import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home' 
import Cart from './Components/Cart'
import NavBar from './Components/NavBar'
import {Provider} from 'react-redux'
import store from './Store/store'


function App() {
  return (
    <Provider store={store}>
      <NavBar/>
      <Routes>
        <Route path='/'     element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*'     element={<Home/>}/>
      </Routes>
    </Provider>
  )

}

export default App
