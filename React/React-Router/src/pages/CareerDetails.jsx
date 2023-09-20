import { useParams, useLoaderData } from "react-router-dom"

const CareerDetails = ()=>{
    const {id} = useParams()
    const career = useLoaderData()

    return(
        <div className="career-details">
            <h2>Career Details for {career.title} </h2>
            <p>Starting Salary: {career.salary}</p>
            <p>Location: {career.location}</p>
            <div className="details">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos non dolore enim placeat autem quae vero? Cumque, vel! Quia necessitatibus facere consectetur. In optio nihil iusto porro dolores harum id temporibus a voluptatum voluptatibus possimus ex magnam, impedit rem ipsa nam voluptates. Necessitatibus neque a minus facere doloribus maxime reprehenderit.</p>
            </div>
        </div>
    )
}

export default CareerDetails


// LOADER FUNCTION
export const CareerDetailsLoader = async ({params})=>{
    console.log("PARAMS: ", params)
    const {id} = params;
    const res = await fetch("http://localhost:4000/careers/"+id)

    // MEANS NOT GOT A SUCCESSFUL RESPONSE
    if(!res.ok){
        throw new Error(`Could not found data for id: ${id}`)
    }

    return res.json();
}