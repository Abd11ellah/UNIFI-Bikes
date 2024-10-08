'use clinet'
import React from 'react'
import {motion} from 'framer-motion'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Response = ({error} : {error?:string}) => {

    
  return (
    <>
        
    <motion.div className='top-0 left-0 z-[51] fixed bg-[#000000e1] opacity-[0] w-full h-full' 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5  , delay:0}}
    />
        {!error?

            <motion.div className='z-[52] absolute bg-green-600 mx-[25%] max-md:mx-[5%] max-lg:mx-[10%] my-[15%] max-lg:my-[25%] py-16 rounded-3xl w-[50%] max-md:w-[90%] max-lg:w-[80%] text-center break-words'
            initial={{ opacity:0 , y:'-100vh' }}
            animate={{opacity:1, y:'0vh'}}
            exit={{ opacity:0 , y:'100vh' }}
            transition={{duration:0.5}}
            >
            

                <motion.div className='z-[10000] mx-auto text-white size-fit'
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "loop", 
                              duration: 1, 
                              ease: "linear" 
                            }} 
                >
                    <AiOutlineLoading3Quarters size={100}/>
                </motion.div>

                <p className='mt-5 text-4xl text-center text-white'>Loading ...</p>

            </motion.div>

        :
            <motion.div className='z-[52] absolute bg-red-600 mx-[25%] max-md:mx-[5%] max-lg:mx-[10%] my-[15%] max-lg:my-[25%] py-16 rounded-3xl w-[50%] max-md:w-[90%] max-lg:w-[80%] text-center break-words'
            initial={{ opacity:0 , y:'-100vh' }}
            animate={{opacity:1, y:'0vh'}}
            exit={{ opacity:0 , y:'100vh' }}
            transition={{duration:0.5}}
            
            >
            
            <p className='flex justify-center my-auto px-2 font-semibold text-5xl text-white max-md:text-4xl break-words'>Error : {error}</p>

            <p className='mx-2 mt-8 text-center text-white text-xl'>Something went wrong. Please refresh the page and try again</p>

            </motion.div>

        }
    </>
  )
}

export default Response