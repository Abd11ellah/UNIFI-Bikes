'use client'

import { fetchBikeThefts } from "@/lib/actions/getBikes";
import { useEffect, useState } from "react";
import Bike from "@/components/Bike";

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


  useEffect(() => {
    
    async function name() {

      const res = await fetchBikeThefts(1);
      const bikeList = res.map((bike: any) => ({
        id: bike.id,
        title: bike.title?bike.title:'Unavailable',
        description: bike.description?bike.description:'Unavailable',
        dateOfTheft: bike.date_stolen?bike.date_stolen:'Unavailable',
        dateOfReported: bike.year?bike.year:'Unavailable',
        location: bike.stolen_location?bike.stolen_location:'Unavailable',
        image: bike.thumb,
      }));
      setBikeThefts(bikeList);
    }
    name()
  }, [])
  

    useEffect(() => {
     console.log(bikeThefts)
    }, [bikeThefts])
    

  return (
    <main>
      
        <div className="mt-20 w-full text-center">
          <p className="text-5xl">Search for near Munich stolen bikes</p>
        </div>

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
    </main>
  );
}
