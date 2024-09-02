'use client'

import { fetchBikeDetails, fetchBikeThefts, fetchBikeTheftsCount, fetchFilteredBikeThefts } from "@/lib/actions/getBikes";
import { useEffect, useState } from "react";
import Bike from "@/components/Bike";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { VscSearch } from "react-icons/vsc";
import Response from "@/components/Response";
import { AnimatePresence } from "framer-motion";

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
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startRespone, setStartRespone] = useState<boolean>(false);
  const [submitSearch, setSubmitSearch] = useState<boolean>(false);
  const [error, setError] = useState('');

  useEffect(() => {
      
      scrollTo(0, 0);
      setStartRespone(true)
      document.body.style.overflow = 'hidden';
    async function name() {

      if(titleFilter||startDate||endDate){

        try {

              const respo = await fetchBikeTheftsCount(titleFilter, startDate, endDate);

              setNumberOfBikes(respo.proximity)
        
              const res = await fetchFilteredBikeThefts(whichPage, titleFilter, startDate, endDate);
              
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
              setStartRespone(false)
              document.body.style.overflow = 'unset';
              
          } catch (err:any) {

            setError(err.message);

          }
      }else{
        
        try {

          const respo = await fetchBikeTheftsCount("","","");

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
              setStartRespone(false)
              document.body.style.overflow = 'unset';

          } catch (err:any) {

              setError(err.message);

          }
        }
    }
    name()
  }, [whichPage ,  submitSearch])
    


  return (
    // className="bg-[url('https://www.transparenttextures.com/patterns/pw-pattern.png')]"
    <main >

      {/* Loading */}

        <AnimatePresence 
          mode='sync'
          initial={false}
          onExitComplete={() => null}
        >
            {startRespone && error &&<Response error={error} />}
            {startRespone && !error &&<Response />}
        </AnimatePresence>
      
      {/* header */}

        <div className="pt-20 w-full text-center">
          <p className="text-5xl">Search for near Munich stolen bikes</p>
          <p className="mt-5 text-3xl">Total number of bike stolen : {numberOfBikes}</p>
        </div>

      {/* filtering */}

        <div className="justify-around items-center bg-gradient-to-r from-gray-500 to-gray-900 mx-20 mt-20 py-3 rounded-lg" >

        <p className="w-full text-[27px] text-center text-white">Filter By</p>

        <div className="py-5">
          <p className="mx-[10%] mb-2 text-white text-xl">Title :</p>
          <input
            type="text"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Search by title"
            className="mx-[10%] mr-4 px-[2.5%] py-1 focus:border-none rounded-lg w-[80%] h-10"
          />
        </div>

        <div className="flex justify-around px-[10%] py-5">
          <p className="flex flex-col justify-center items-center text-white text-xl">Coming Soon:</p>
          <div>
            <p className="mb-2 text-white">Start-Date :</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mr-4 px-2 py-1 border rounded-lg h-10"
              disabled
            />
          </div>

          <div>
            <p className="mb-2 text-white">End-Date :</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-2 py-1 border rounded-lg h-10"
              disabled
            />
          </div>

        </div>
        <div className="flex justify-center items-center mt-10 w-full">
          <button className="flex bg-white px-4 py-2.5 rounded-lg font-medium text-2xl" onClick={() => {setSubmitSearch(!submitSearch),setWhichPage(1)}}>Search <span className="my-auto ml-2 font-bold"><VscSearch/></span></button>
        </div>

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
      
      <div className="clear-start flex justify-center py-20">
          
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
