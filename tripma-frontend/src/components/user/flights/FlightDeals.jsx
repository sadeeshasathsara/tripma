import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import Trip from './Trip';
import { sampleTrips } from '../../../tools/Tools';

function FlightDeals() {

    const [trips, setTrips] = React.useState([]);

    React.useEffect(() => {
        if (sampleTrips) {
            const selectedTrips = sampleTrips.slice(0, 3);
            setTrips(selectedTrips);
        }
    }, []);


    return (
        <div className={`w-full px-5 text-[#6E7491] flex flex-col items-center justify-center gap-3`}>

            <div className='w-full flex items-center justify-between'>
                <p className='text-lg'>Find your next adventure with these <span className='text-[#605DEC]'>Flight Deals</span></p>
                <div className='flex items-center justify-center gap-1 cursor-pointer'>
                    <p className='text-[#A1B0CC] text-md'>All</p>
                    <FaArrowRight size={14} color='#A1B0CC' />
                </div>
            </div>


            <div className='grid grid-cols-3 items-center gap-3'>
                {trips?.map((trip, index) => (
                    <div key={index}>
                        <Trip trip={trip} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FlightDeals