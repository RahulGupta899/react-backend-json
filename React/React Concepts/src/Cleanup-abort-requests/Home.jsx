import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [data,setData] = useState(null)

    useEffect(()=>{
        console.log("####")
        console.log("Use Effect Executed")
        
        const productRequestToken = axios.CancelToken.source();
        console.log("PRODUCT REQUEST TOKEN : ", productRequestToken)

        const fetchData = async ()=>{
            const {data} = await axios.get('https://fakestoreapi.com/products/1',{
                cancelToken: productRequestToken.token
            })
            console.log(data)
        }
        fetchData(); 
        // If we'll not destroy this request then everytime we we mount this component, 
        // the existing or pending request will be there. 
        // and when we ABORT this during unmount , there will be no previous response
        

        const timerID = setTimeout(()=>{
            console.log("SetTimeout Executed")
            setData("Today's Quality Score 90%");
        },5000)


        // CLEAN UP FUNCTION
        return ()=>{
            // use to abort Network calls done by this component
            // use to Destroy event listeners attached with this componet  
            // use to clearIntervals or clearTimeouts
            // unmounted means (Removes from DOM, when route changed or we disabled this component)
            console.log("  #####")
            console.log("HomePage Component unmounted")

            clearTimeout(timerID)
            console.log("Timer Aborted")

            productRequestToken.cancel();       // Now if, I try to change the route , the request will be cancels from (pending to cancel state)
        }
    },[]);


  return (
    <>
        <h3>Home page</h3>
        <h4>Data: {data? data : "Not Available"}</h4>
    </>

  )
}

export default Home