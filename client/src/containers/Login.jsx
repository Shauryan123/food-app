import React, { useState } from 'react';
import {LoginBg} from '../assets'
import {Logo} from '../assets'
import { LoginInput } from '../components';
import {FaEnvelope, FcGoogle} from '../assets/icons'
import {FaLock} from '../assets/icons'
import {motion} from 'framer-motion';
import { buttonClick } from '../animations';
import {getAuth, signInWithPopup , GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from '../config/firebase.config'
import { FirebaseError } from 'firebase/app';
import { validateUserJWTToken } from '../api';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userActions';
import { useEffect } from 'react';
import { alertInfo, alertWarning } from '../context/actions/alertActions';

export default function Login() {

  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useSelector(state => state.alert);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {

    if (user) {
      navigate('/', {replace: true})
    }
  }, [user])

  const loginWithGoogle = async () => {
    // console.log("Clicked")
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {

      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {

            validateUserJWTToken(token).then((data) => {
              console.log(data);
              dispatch(setUserDetails(data));
            })

            navigate('/', {replace: true});
          })

        }
      })

    })

  }

  const signUpWithEmailPass = async () => {
    if (userEmail === '' || password === '' || confirmPassword === '') {

      console.log("They are Empty!");
       //alert message

       dispatch(alertInfo('Required Fields should not be empty'));
    } else {



      if (password === confirmPassword) {

        setUserEmail("");
        setPassword("");
        setConfirmPassword("");

        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {

          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {

                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                  dispatch(setUserDetails(data));
                })
                navigate('/', {replace: true});
              })

            }
          })

        })


      } else {

        dispatch(alertWarning("Password doesn't match"))

        //alert message
      }
    }
  }



  //actions

  //reducers

  //store -> Globalised Store

  //dispatch


  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {

      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {

        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {

              validateUserJWTToken(token).then((data) => {
                console.log(data);
                dispatch(setUserDetails(data));
              })
              navigate('/', {replace: true});
            })

          }
        })

      })
    } else {

      dispatch(alertInfo('Required Fields should not be empty'))
      //alert message
    }
  }
  return (

    <div className='w-screen h-screen overflow-hidden relative flex top-0 left-0'>

        <img src={LoginBg} className='w-full h-full object-cover absolute' alt="" />



    <div className="flex-col flex items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
      <div className="flex items-center justify-start gap-4 w-full ">
      <img src={Logo} className="w-8" alt="" />
      <p className="text-headingColor font-semibold text-2xl">City</p>
      </div>
      <p className="text-3xl text-headingColor font-semibold">Welcome Back</p>
      <p className="text-xl text-white -mt-6"> {!isSignUp ? "Sign in with following" : "Sign up with following"}</p>

      <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
        <LoginInput placeHolder={"Email Here"} icon={<FaEnvelope className='text-xl text-textColor'/>} inputState={userEmail} inputStateFunc={setUserEmail} type="email" isSignUp={isSignUp} />
        <LoginInput placeHolder={"Password Here"} icon={<FaLock className='text-xl text-textColor'/>} inputState={password} inputStateFunc={setPassword} type="password" isSignUp={isSignUp} />
        {isSignUp && <LoginInput placeHolder={"Confirm Password Here"} icon={<FaLock className='text-xl text-textColor'/>} inputState={confirmPassword} inputStateFunc={setConfirmPassword} type="password" isSignUp={isSignUp} />}
        {!isSignUp ? <p className='text-white'>Doesn't have an account:  <motion.button {...buttonClick} onClick={() => setIsSignUp(true)} className='text-red-400 underline cursor-pointer bg-transparent'>Create One</motion.button></p> :<p className='text-headingColor'>Already have an account:  <motion.button {...buttonClick} onClick={() => setIsSignUp(false)} className='text-red-400 underline cursor-pointer bg-transparent' onClick={signInWithEmailPass}>Sign in here</motion.button></p>}
        {isSignUp ? <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md cursor-pointer bg-red-400 text-white text-xl capitalize hover:bg-red-500 transition-all duration-156' onClick={signUpWithEmailPass}>Sign Up</motion.button>
        : <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md cursor-pointer bg-red-400 text-white text-xl capitalize hover:bg-red-500 transition-all duration-156'>Sign In</motion.button>}
      </div>
      <div className="flex items-center justify-between gap-16">
<div className="w-24 h-[1px] rounded-md bg-white"></div>
<p className="text-white">or</p>
<div className="w-24 h-[1px] rounded-md bg-white"></div>
      </div>
      <motion.div {...buttonClick} className='flex items-center justify-center px-20 py-2 bg-slate-100 backdrop-blur-md cursor-pointer rounded-3xl gap-4'>
        <FcGoogle className='text-3xl'/>
        <p className='capitalize text-base text-headingColor' onClick={loginWithGoogle}>Sign in with Google </p>
      </motion.div>
    </div>
    </div>
  )
}