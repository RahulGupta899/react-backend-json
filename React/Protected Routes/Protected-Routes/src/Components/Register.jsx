import {useRef, useState, useEffect} from 'react'
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from '../api/axios';  // BASE URL ALREADY SET




const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const ENDPOINT_REGISTER = '/register'


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    // USERNAME
    const [user,setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // PASSWORD
    const [pwd,setpwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // CONFIRM PASSWORD
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // SETTING THE FOCUS WHEN THE COMPONENT LOAD FOR THE FIRST TIME
    useEffect(()=>{
        userRef.current.focus();
    },[])

    // TO VALIDATE THE USERNAME
    useEffect(()=>{
        const result = USER_REGEX.test(user);
        console.log(result)
        console.log(user)
        setValidName(result)
    },[user])

    // TO VALIDATE THE PASSWORD AND CONFIRM PASSWORD
    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd == matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd])

    // TO HANDLE ERROR MESSAGE
    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,matchPwd])



    // ON FORM SUMBIT
    const handleRegister = async(e)=>{
        e.preventDefault();

        // If button enabled with JS Hack (Dev tool)
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        
        // CALLING API
        try{
            const {data} = await axios.post(ENDPOINT_REGISTER,{
                username: user,
                password: pwd
            })
            if(data.success){
                setSuccess(true);
            }

        }
        catch(err){
            console.log(err)
            if(!err?.response){ // NO RESPONSE (No internet) or Backend not running
                setErrMsg('No Internet Connection');
            }
            else if(err.response?.status === 400){
                setErrMsg('User not authorized')
            }
            else if(err.response?.status === 500){   // or err.code === 'ERR_BAD_RESPONSE' (server Error)
                setErrMsg('Server Error')
            }
            else{                                   // err.code === 'ERR_BAD_REQUEST' (Frontend Error)
                setErrMsg('Registration Failed')
            }
        }
    }

  return (
    <>
        {
            success 
            ? 
            (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='#'>Sign In</a>
                    </p>
                </section>
            )
            :
            (
                <section>
                    <p 
                        ref={errRef} 
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live='assertive'
                    >{errMsg}</p>

                    <h1>Register</h1>
                    <form onSubmit={handleRegister}>
                        {/* USERNAME */}
                        <label htmlFor='username'>
                            username:
                            {/* CHECKED OR UNCHECKED ICON */}
                            <span className={validName ? "valid" : 'hide'}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validName || !user ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type='text'
                            id='username'           //SHOULD BE SAME AS htmlFor
                            required
                            ref={userRef}
                            autoComplete='off'      // DON'T WANT SUGGESTED VALUE 
                            onChange={(e)=>setUser(e.target.value)}
                            onFocus={()=>setUserFocus(true)}  // WHEN USER ENTERS
                            onBlur={()=> setUserFocus(false)} // WHEN USER LEAVES
                            aria-invalid={validName ? 'false' : 'true'} // aria-labels are used for screen readers
                            aria-describedby='uidnote'
                        />
                        {/* DISPLAY USERNAME RULES */}
                        <p
                            id='uidnote'
                            className={userFocus && user && !validName ? "instructions" : "offscreen"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            4 to 24 characters. <br/>
                            Must begin with a letter. <br/>
                            Letters, numbers, underscores, hyphens allowed. 
                        </p>


                        {/* PASSWORD FIELD */}
                        <label htmlFor='password'>
                            Password: 
                            <span className={validPwd? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type="password"
                            id='password'
                            required
                            aria-describedby='pwdnote'
                            onChange={(e)=> setpwd(e.target.value)}
                            onFocus={()=> setPwdFocus(true)}
                            onBlur={()=> setPwdFocus(false)}
                        />
                        <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                                8 to 24 characters. <br/>
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: <span aria-label="exclamation mark">!</span>
                                <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
                                <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
                        </p>

                        {/* CONFIRM PASSWORD */}
                        <label htmlFor='confirm_pwd'>
                            Confirm Password: 
                            <span className={validMatch  && matchPwd  ? "valid": 'hide'}> 
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validMatch|| !matchPwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                        <input
                            type='password'
                            id='confirm_pwd'
                            required
                            onChange={(e)=>setMatchPwd(e.target.value)}
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={()=> setMatchFocus(true)}
                            onBlur={()=> setMatchFocus(false)}
                        />
                        <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions': 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Must match the first password input field.
                        </p>

                        {/* SUBMIT BUTTON */}
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                            Sign Up
                        </button>

                        <p>
                            Already registered? <br/>
                            <span className='line'>
                                <a href='#'>Sign In</a>
                            </span>
                        </p>



                    </form>
                </section>
            )
        }
    </>
  )
}

export default Register