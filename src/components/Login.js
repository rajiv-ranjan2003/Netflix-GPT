import  { useRef, useState } from 'react'
import Header from './Header'
import {checkValidData} from "../utils/validate.js"
import {auth} from "../utils/firebase.js"
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { BG_URL, user_avatar } from '../utils/constants.js';

const Login = () => {
    const [isSigninForm,setisSigninForm]=useState(true);
    const [errorMessage,seterrorMessage]=useState(null)
    // const name=useRef(null)
    // name regex can be done for name validation also
   
    const name=useRef(null)
    const email=useRef(null)
    const password=useRef(null)
    const dispatch=useDispatch()
    const HandleButtonClick=()=>{
        // Validate the form data
         const message=checkValidData(email.current.value,password.current.value)
         seterrorMessage(message)
         if(message) return;
        //  else sign in or sign up the user
        if(!isSigninForm){
        //  sign Up logic
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value,name.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
             photoURL: user_avatar,
          })
          .then(() => {
            // Profile updated!
            const {uid,email,displayName,photoURL} = auth.currentUser;
             dispatch(
              addUser({
               uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL
            })
              )
             
          
            }).catch((error) => {
              // An error occurred
              seterrorMessage(error)
          });
          
       
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode +"-" + errorMessage)
        });
      
        }
        else{
        // sign in logic
        signInWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode + "-" + errorMessage )
  });

        }
    }
    const toggleSignIn=()=>{
        setisSigninForm(!isSigninForm)
    }
    
  return (
    <div>
      <Header/>
      <div className='absolute '>
      <img className='h-screen object-cover md:h-full' src={BG_URL} alt='logo'></img>
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className=' md:w-96 w-full p-12 absolute bg-black  my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 '>
        <h1 className='font-bold text-3xl py-4'>{isSigninForm?"Sign In":"Sign Up"}</h1>
        {!isSigninForm && (
        <input  ref={name} type='text' placeholder='Full Name' className="p-4 my-4 w-full bg-gray-700"></input>
        )}
        <div>
      <input ref={email} type='text' placeholder='Email or phone number' className="p-4  my-4 w-full bg-gray-700 rounded-lg"></input>
        <input ref={password} type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg '></input>
        <p className='text-red-500 font-bold text-lg p-2'>{errorMessage}</p>
        </div>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg font-bold' onClick={HandleButtonClick}>{isSigninForm?"Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer text-center ' onClick={toggleSignIn}>{isSigninForm?"New to Netflix? Sign Up Now":"Already registered ? Sign In Now."} </p>
      </form>
    </div>
  )
}

export default Login
