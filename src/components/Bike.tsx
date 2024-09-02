import React from 'react'
import cycle from '../../public/assets/motorcycles-icon-removebg-preview.png'
import Image from 'next/image'

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
    <div>
        
        <div className="flex bg-black p-2 rounded-lg">

            <div className="bg-white rounded overflow-hidden object-cover size-[250px]">
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

            <div className="flex flex-wrap justify-around items-center px-5 w-[calc(100%-250px)] text-white">

              <div className='w-[50%]'>

                <p className="mb-2 font-medium text-lg">Title : </p>
                <p className="bg-blue-700 px-2 py-1 rounded w-fit">{title}</p>

              </div>

              <div className='w-[50%]'>

                <p className="mb-2 font-medium text-lg">Date of the theft : </p>
                <p className="bg-yellow-500 px-2 py-1 rounded w-fit">{formattedDate1.toString()}</p>

              </div>

              <div className='w-[50%]'>

                <p className="mb-2 font-medium text-lg">Date of when the case was reported : </p>
                <p className="bg-green-700 px-2 py-1 rounded w-fit">{formattedDate2.toString()}</p>

              </div>

              <div className='w-[50%]'>

                <p className="mb-2 font-medium text-lg">Location of the theft : </p>
                <p className="bg-red-700 px-2 py-1 rounded w-fit">{location}</p>

              </div>

              <div className='w-[100%]'>

                <p className="mb-2 font-medium text-lg">Description : </p>
                <p className="bg-white px-2 py-1 rounded w-fit text-black">{description}</p>

              </div>
            </div>

          </div>

    </div>
  )
}

export default Bike