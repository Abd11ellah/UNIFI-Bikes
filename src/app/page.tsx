'use client'

import { fetchBikeDetails, fetchBikeThefts, fetchBikeTheftsCount } from "@/lib/actions/getBikes";
import { useEffect, useState } from "react";
import Bike from "@/components/Bike";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface BikeTheft {

  id: number;
  title: string;
  description: string;
  dateOfTheft: string;
  dateOfReported: string;
  location:string;
  image:string;

}

export default function Home() {


  const [bikeThefts, setBikeThefts] = useState<BikeTheft[]>([]);
  const [numberOfBikes, setNumberOfBikes] = useState<number>(0);
  const [whichPage, setWhichPage] = useState<number>(1);


  useEffect(() => {
      
      scrollTo(0, 0);

    async function name() {

      const respo = await fetchBikeTheftsCount();

      setNumberOfBikes(respo.proximity)

      const res = await fetchBikeThefts(whichPage);
      
      const detailedBikes = await Promise.all(res.map((bike: any) => fetchBikeDetails(bike.id)));

      const bikeList = detailedBikes.map((bike: any) => ({
        id: bike.id,
        title: bike.title?bike.title:'Unavailable',
        description: bike.description?bike.description:'Unavailable',
        dateOfTheft: bike.date_stolen?bike.date_stolen:'Unavailable',
        dateOfReported: bike.stolen_record.created_at?bike.stolen_record.created_at:'Unavailable',
        location: bike.stolen_location?bike.stolen_location:'Unavailable',
        image: bike.thumb,
      }));
      setBikeThefts(bikeList);
    }
    name()
  }, [whichPage])
    

  return (
    <main>
      
      {/* header */}
        <div className="mt-20 w-full text-center">
          <p className="text-5xl">Search for near Munich stolen bikes</p>
          <p className="mt-5 text-3xl">Total number of bike stolen : {numberOfBikes}</p>
        </div>

      {/* cases  */}
        <div className="mx-20 mt-20">
          {bikeThefts?.map((bikeTheft:BikeTheft) =>{
            
            return (

            <div className="mb-5" key={bikeTheft.id}>
            
              <Bike
              title={bikeTheft.title}
              description={bikeTheft.description}
              dateOfTheft={bikeTheft.dateOfTheft}
              dateOfReported={bikeTheft.dateOfReported}
              location={bikeTheft.location}
              image={bikeTheft.image}
              />

            </div>
             );
          })}

        </div>

      {/* paginate  */}
      
      <div className="clear-start flex justify-center my-20">
          
          <button  className={`bg-black mx-3 px-4 py-2 rounded text-white ${whichPage===1&&'hidden'}`} onClick={() => setWhichPage(1)}>
                <MdKeyboardDoubleArrowLeft/>
          </button>

          {Array.from({ length: Math.ceil(numberOfBikes/10)}).map((_, index) => (
            <button key={index} className={` mx-3 px-4 py-2 rounded  ${whichPage===index+1?'text-black bg-white border border-black':'text-white bg-black'} ${((index+1<whichPage-2) || (index+1>whichPage+2))&&' hidden'}`} onClick={() => setWhichPage(index+1)} >
              {index + 1}
            </button>
          ))}

          <button  className={`bg-black mx-3 px-4 py-2 rounded text-white ${whichPage===Math.ceil(numberOfBikes/10)&&'hidden'}`}  onClick={() => setWhichPage(Math.ceil(numberOfBikes/10))} >
                <MdKeyboardDoubleArrowRight/>
          </button>

      </div>

    </main>
  );
}
