import React from 'react' 
import { Form, redirect, useActionData } from 'react-router-dom'

const Contact = ()=>{
    const data = useActionData();  // Whatever action we've returned we receive here
    console.log("Returned Value: ", data)

    return(
        <div className='contact'>
            <h3>Contact Us</h3>

            {/* ROUTER FORM */}
            <Form method='post' action=''>
                <label>
                    <span>Your email:</span>
                    <input type="email" name='email' required />
                </label>
                <label>
                    <span>Your message:</span>
                    <textarea name='message' required></textarea>
                </label>
                {
                    data && data.error && <p className="validation_error">{data.error}</p>
                }
                <button>Submit</button>

            </Form>
        </div>
    )
}
export default Contact


export const contactAction = async({request})=>{
  // When form will be submitted this function will execute
  // This request argument contains all the values of form

  console.log("REQUEST: ",request)
 
  const data = await request.formData(); 

  const submission = {
    email: data.get('email'),
    message: data.get('message')
  }
  console.log(submission)

  // VALIDATION CHECK
  if(!submission.email.includes("omindtech")){
    return {
        error: 'Email must belongs to omind tech: @omindtech.com'
    }
  }
  else if(submission.message.length < 10){
    return {
        error: 'Message must be over 10 characters'
    }
  }

  // SEND POST REQUEST TO SERVER

  // REDIRECT THE USER

  return redirect('/')
  

}