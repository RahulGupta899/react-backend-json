import {useRouteError, Link} from 'react-router-dom'

const CareerError = ()=>{
    const error = useRouteError()
    console.log("Error: ", error)
    return(
        <div className='careers-error'>
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to='/'>Back to the homepage</Link>
        </div>
    )
}
export default CareerError