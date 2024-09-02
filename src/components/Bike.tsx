import React from 'react'
import cycle from '../../public/assets/motorcycles-icon-removebg-preview.png'
import Image from 'next/image'
import {motion} from 'framer-motion'

const Bike = ({title , description , dateOfTheft , dateOfReported , location , image} : {title:string,description:string,dateOfTheft:string,dateOfReported:string,location:string,image:string,}) => {
    
    const unixTimestamp1 = Number(dateOfTheft);
    const date1 = new Date(unixTimestamp1 * 1000); 
    const formattedDate1 = date1.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const unixTimestamp2 = Number(dateOfReported);
      const date2 = new Date(unixTimestamp2 * 1000); 
      const formattedDate2 = date2.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
  return (
    <motion.div
    className='ease-in-out'
    initial={{ opacity:0  }}
    whileInView={{opacity:1}}
    transition={{duration:0.5}}
    viewport={{ once: true }}

    >
        
        <div className="max-xl:block flex bg-black p-2 rounded-lg">

            <div className="bg-white rounded overflow-hidden object-cover size-[250px] max-xl: mx-auto max-nin:w-full max-nin:h-auto">
                {image?
                   <picture>
                        <img
                        
                        src={image}
                        alt="bikecycle image"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                        />
                    </picture>

                :
                    <Image
                    
                    src={cycle}
                    alt="bikecycle image"
                    className="w-full h-full object-cover"
                    width={1000}
                    height={1000}
                    />

                }
            </div>

            <div className="flex flex-wrap justify-around items-center px-5 max-xl:pt-4 w-[calc(100%-250px)] max-xl:w-full text-white">

              <div className='w-[50%] max-nin:w-full'>

                <p className="mb-2 font-medium text-lg max-nin:text-base">Title : </p>
                <p className="bg-blue-700 max-xl:mb-2 px-2 py-1 rounded w-fit max-nin:text-sm">{title}</p>

              </div>

              <div className='w-[50%] max-nin:w-full'>

                <p className="mb-2 font-medium text-lg max-nin:text-base">Date of the theft : </p>
                <p className="bg-yellow-500 max-xl:mb-2 px-2 py-1 rounded w-fit max-nin:text-sm">{formattedDate1.toString()}</p>

              </div>

              <div className='w-[50%] max-nin:w-full'>

                <p className="mb-2 font-medium text-lg max-nin:text-base">Date of when the case was reported : </p>
                <p className="bg-green-700 max-xl:mb-2 px-2 py-1 rounded w-fit max-nin:text-sm">{formattedDate2.toString()}</p>

              </div>

              <div className='w-[50%] max-nin:w-full'>

                <p className="mb-2 font-medium text-lg max-nin:text-base">Location of the theft : </p>
                <p className="bg-red-700 max-xl:mb-2 px-2 py-1 rounded w-fit max-nin:text-sm">{location}</p>

              </div>

              <div className='w-[100%] max-nin:w-full'>

                <p className="mb-2 font-medium text-lg max-nin:text-base">Description : </p>
                <p className="bg-white max-xl:mb-2 px-2 py-1 rounded w-fit font-medium text-black max-nin:text-sm">{description}</p>

              </div>
            </div>

          </div>

    </motion.div>
  )
}

export default Bike