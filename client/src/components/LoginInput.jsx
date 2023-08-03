import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { fadeInOut } from '../animations';


const LoginInput = ({placeHolder, icon, inputState, inputStateFunc, type, isSignUp}) => {

   const [isFocus, setIsFocus] = useState(false);


  return (

    <motion.div {...fadeInOut} className={`flex items-center justify-center bg-white backdrop-blur-md rounded-md gap-4 w-full px-4 py-2 ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"}`}>
        {icon}
        <input type={type} placeholder={placeHolder} className="h-full w-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)} />
    </motion.div>




  )
}

export default LoginInput
