'use client'

import { fetchBikeDetails, fetchBikeThefts, fetchBikeTheftsCount, fetchFilteredBikeThefts } from "@/lib/actions/getBikes";
import { useEffect, useState } from "react";
import Bike from "@/components/Bike";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { VscSearch } from "react-icons/vsc";
import Response from "@/components/Response";
import { AnimatePresence  , motion} from "framer-motion";
import { LuBike } from "react-icons/lu";

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
          <p className="max-nin:font-medium text-5xl max-nin:text-xl">Search for near Munich stolen bikes</p>
          <p className="mt-5 text-3xl max-nin:text-lg">Total number of bike stolen : {numberOfBikes}</p>
        </div>

      {/* filtering */}

        <div className="justify-around items-center bg-gradient-to-r from-gray-500 to-gray-900 mx-20 max-nin:mx-0 mt-20 py-3 rounded-lg" >

        <p className="w-full text-[27px] text-center text-white max-nin:text-lg">Filter By</p>

        <div className="py-5 max-nin:py-2">
          <p className="mx-[10%] max-nin:mx-[2%] mb-2 text-white text-xl max-nin:text-base">Title :</p>
          <input
            type="text"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Search by title"
            className="mx-[10%] max-nin:mx-[2%] mr-4 px-[2.5%] py-1 focus:border-none rounded-lg w-[80%] max-nin:w-[95%] h-10"
          />
        </div>

        <div className="flex justify-around px-[10%] max-nin:px-[2.5%] py-5 max-nin:py-2">
          <p className="flex flex-col justify-center items-center w-[33%] max-nin:w-auto text-white text-xl max-nin:text-base">Coming Soon:</p>
          
          <div className="max-nin:block flex justify-around w-[67%] max-nin:w-full">
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

          <div className="max-nin:mt-4">
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

        </div>
        <div className="flex justify-center items-center mt-10 w-full">
          <button className="flex max-nin:justify-center bg-white px-4 py-2.5 rounded-lg max-nin:w-[95%] font-medium text-2xl max-nin:text-base" onClick={() => {setSubmitSearch(!submitSearch),setWhichPage(1)}}>Search <span className="my-auto ml-2 font-bold"><VscSearch/></span></button>
        </div>

        </div>

      {bikeThefts.length>0?<>

      {/* cases  */}

        <div className="mx-20 max-nin:mx-2 mt-20">
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
      
      <div className="clear-start flex justify-center py-20 max-nin:py-10">
          
          <button  className={`bg-black mx-3 px-4 py-2 max-nin:px-2.5 max-nin:text-sm max-nin:py-1.5 max-nin:mx-2 rounded text-white ${whichPage===1&&'hidden'}`} onClick={() => setWhichPage(1)}>
                <MdKeyboardDoubleArrowLeft/>
          </button>

          {Array.from({ length: Math.ceil(numberOfBikes/10)}).map((_, index) => (
            <button key={index} className={` mx-3 px-4 py-2 rounded max-nin:px-2.5 max-nin:text-sm max-nin:py-1.5 max-nin:mx-2  ${whichPage===index+1?'text-black bg-white border border-black':'text-white bg-black'} ${((index+1<whichPage-2) || (index+1>whichPage+2))&&' hidden'}`} onClick={() => setWhichPage(index+1)} >
              {index + 1}
            </button>
          ))}

          <button  className={`bg-black mx-3 px-4 py-2 max-nin:px-2.5 max-nin:text-sm max-nin:py-1.5 max-nin:mx-2 rounded text-white ${whichPage===Math.ceil(numberOfBikes/10)&&'hidden'}`}  onClick={() => setWhichPage(Math.ceil(numberOfBikes/10))} >
                <MdKeyboardDoubleArrowRight/>
          </button>

      </div>

      </>:<>
        
        {/*  if it is empty */}
        
        <motion.div className='bg-yellow-400 mx-[25%] max-md:mx-[5%] max-lg:mx-[10%] my-[8%] max-lg:my-[25%] py-16 rounded-3xl w-[50%] max-md:w-[90%] max-lg:w-[80%] text-center break-words'
            initial={{ opacity:0  }}
            whileInView={{opacity:1}}
            transition={{duration:0.5}}
            viewport={{ once: true }}
            
            >
            
            <p className='flex justify-center my-auto px-2 font-semibold text-5xl text-white max-md:text-4xl break-words'>Empty :)</p>

            <p className='flex justify-center items-center mt-8 text-center text-white text-xl'>There is no stolen bikes <span><LuBike className="ml-3" size={44}/></span></p>

        </motion.div>
      
      </>}

    </main>
  );
}
