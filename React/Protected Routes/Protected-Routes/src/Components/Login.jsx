import React,{useEffect, useRef, useState, useContext} from 'react'
import axios from '../api/axios'
import AuthContext  from '../Context/AuthProvider'

const LOGIN_URL = '/lgin'

const Login = () => {

    const {setAuth} = useContext(AuthContext)


    const userRef = useRef(); //To set the focus initally on user input when the component Loads
    const errRef = useRef();

    const [user,    setUser] =    useState('')
    const [pwd,     setPwd] =     useState('')
    const [errMsg,  setErrMsg] =  useState('')
    const [success, setSuccess] = useState(false)

    console.log("User: ",user)


    // SET FOCUS TO USER INPUT WHEN COMPONENT LOADS INITIALLY
    useEffect(()=>{
        userRef.current.focus();
    },[])

    // MAKE ERROR MESSAGE DISAPPER WHEN USERNAME OR PASSWORD IS CHANGED 
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])


    // ON FORM SUBMIT
    const handleLogin = async(e)=>{
        e.preventDefault(); 

        try{
            const response = await axios.post(LOGIN_URL,
                    {
                        username: user, 
                        password: pwd
                    },
                )
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken})    // STORING ALL USER INFORMATION IN GLOBAL CONTEXT
            setUser('');
            setPwd('');
            setSuccess(true);
        }
        catch(err){
            console.log(err)
            if(!err?.response){
                setErrMsg('No Internet connection')
            }
            else if(err?.response?.status === 401){
                setErrMsg('Not authorized user')
            }
            else if(err?.response?.status === 500){
                setErrMsg('Server Error')
            }
            else if(err?.code === 'ERR_BAD_REQUEST'){
                setErrMsg('Client Error')
            }
            else{
                setErrMsg('Login Failed')
            }
        }
        
    }
    

  return (
    <>
        {
            success?(
                <section>
                    <h1>You are logged in!</h1>
                    <br/>
                    <p>
                        <a href='#'>Go to Home</a>
                    </p>
                </section>
            ):(
                <section>
                    {/* ERROR MESSAGE */}
                    <p ref={errRef} 
                        className={errMsg ? 'errmsg': 'offscreen'}
                        aria-live='assertive'>{errMsg}</p>
                    
                    <h1>Sign In</h1>

                    <form onSubmit={handleLogin}>
                        {/* USERNAME */}
                        <label htmlFor='username'>Username:</label>
                        <input
                            id='username'
                            type='text'
                            ref={userRef}
                            autoComplete='off'
                            value={user}
                            onChange={(e)=>{setUser(e.target.value)}}
                            required
                        />

                        {/* PASSWORD */}
                        <label htmlFor='password'>Password: </label>
                        <input
                            id='password'
                            type='password'
                            value={pwd}
                            onChange={(e)=> setPwd(e.target.value)}
                            required
                        />

                        {/* SING IN BUTTON */}
                        <button>
                            Sign In
                        </button>
                    </form>
                    <p>
                        Need an Account? <br/>
                        <span className='line'>
                            <a href='#'>Sign up</a>
                        </span>
                    </p>
                </section>
            )

        }
    </>
  )
}

export default Login

