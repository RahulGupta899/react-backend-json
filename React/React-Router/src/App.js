import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,

  Route,
} from "react-router-dom"


// pages
import Home from './pages/Home'
import About from './pages/About'
import FAQs from "./pages/help/FAQs"          // Route: /help/faq
import Contact, { contactAction } from "./pages/help/Contact"    // Route: /help/contact
import Employee from "./pages/help/Employee"                     // Route: /help/contact/employeeList
import NotFound from "./pages/NotFound"
import Careers from "./pages/Careers"
import CareerDetails from "./pages/CareerDetails"


// LAYOUTS

import RootLayout from './layouts/RootLayout'
import TestLayout from './layouts/TestLayout'
import HelpLayout from './layouts/HelpLayout'
import CareerLayout from "./layouts/CareerLayout"
import CareerError from "./pages/CareerError"

// LOADERS
import {careersLoader} from './pages/Careers'
import {CareerDetailsLoader} from './pages/CareerDetails'


// REDUX
import store from './Redux/store'
import {Provider} from 'react-redux'



// BROWSER ROUTER SETUP
// REACT ROUTE DOM RELATED SETUP 
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<RootLayout/>}>     /*The Inner component will wrap this component*/
          <Route   index          element={<Home />}/>
          <Route   path="about"   element={<About />}/>
          <Route   path="help"    element={<HelpLayout/>}>
            <Route path='faq'     element={<FAQs/>} />
            <Route path='contact' element={<Contact/>} action={contactAction} />  // ACTION will realated with the Form
            <Route path='employeeList' element={<Employee/>} />
          </Route>
          <Route path='career' element={<CareerLayout/>} errorElement={<CareerError/>}>
            <Route
               index 
               element={<Careers/>} 
               loader={careersLoader}        // function will execute even before the element={Careers} re-render
            />
            <Route
              path=":id"
              element={<CareerDetails/>}
              loader={CareerDetailsLoader}
              errorElement={<CareerError/>}
            />
          </Route>
          
          
          
          // If none of the Route will triggered then this will execute
          <Route path="*" element={<NotFound/>}/>
    </Route>


    // TESTING OTHER BASE ROUTES
    <Route path='/test' element={<TestLayout/>}>   
      <Route index element={<h3>Test Home Route</h3>} />
      <Route path="route2" element={<h3>Test - About Component</h3>} />
    </Route>

    <Route path='/demo' element={<TestLayout/>}>   
      <Route index element={<h3>Demo Home Route </h3>} />
      <Route path="route2" element={<h3>Demo - route2 </h3>} />
    </Route>

    // If none of the Route will triggered then this will execute
    <Route path="*" element={<NotFound/>}/>
    </>
  )
)


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

export default App