import React, { useEffect, useState } from 'react'

const Contacts = () => {

    
    const [text,setText] = useState('')

    useEffect(()=>{
        console.log("####")
        console.log(" Contacts UseEffect Executed")

        return ()=>{
            console.log("    >>Contacts CleaUp Executed")
        }
    })

  return (
    <div>
      <div>Contacts</div>
      <input value={text} onChange={(e)=>setText(e.target.value)}/>
    </div>
    
  )
}

export default Contacts