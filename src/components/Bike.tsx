import React from 'react'
import cycle from '../../public/assets/motorcycles-icon-removebg-preview.png'
import Image from 'next/image'

const Bike = ({title , description , dateOfTheft , dateOfReported , location , image} : {title:string,description:string,dateOfTheft:string,dateOfReported:string,location:string,image:string,}) => {
    
    const unixTimestamp = Number(dateOfTheft);
    const date = new Date(unixTimestamp * 1000); 

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

            <div className="flex flex-wrap justify-around items-center px-3 w-[calc(100%-250px)] text-white">

              <div>

                <p className="mb-2 font-medium text-lg">Title : </p>
                <p className="bg-blue-700 px-2 py-1 rounded">{title}</p>

              </div>

              <div>

                <p className="mb-2 font-medium text-lg">Description : </p>
                <p className="bg-green-700 px-2 py-1 rounded">{description}</p>

              </div>

              <div>

                <p className="mb-2 font-medium text-lg">Date of the theft : </p>
                <p className="bg-yellow-500 px-2 py-1 rounded">{date.toString()}</p>

              </div>

              <div>

                <p className="mb-2 font-medium text-lg">Date of when the case was reported : </p>
                <p className="bg-white px-2 py-1 rounded text-black">{dateOfReported}</p>

              </div>

              <div>

                <p className="mb-2 font-medium text-lg">Location of the theft : </p>
                <p className="bg-red-700 px-2 py-1 rounded">{location}</p>

              </div>
            </div>

          </div>

    </div>
  )
}

export default Bike