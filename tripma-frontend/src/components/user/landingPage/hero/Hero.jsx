import React from 'react'
import HeroText from '../../../../assets/landingPage/HeroText.svg'
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { MdOutlineFlightLand } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";
import { motion } from 'framer-motion';
import HeroImg from '../../../../assets/landingPage/Hero.svg';

function Hero() {
    return (
        <div className="w-full h-[570px] flex items-center justify-center flex-col gap-4 bg-cover bg-no-repeat bg-center relative" style={{ backgroundImage: `url(${HeroImg})` }}>

            <div className=''>
                <img src={HeroText} alt='Hero Image' className='' />
            </div>

            <div className='w-4/5'>
                <form className=' flex items-center justify-center gap-3'>
                    <div className='border border-[#CBD4E6] shadow rounded-[6px] p-2 grid grid-cols-4 gap-2'>

                        <div className='flex items-center justify-evenly gap-2 border-r border-[#CBD4E6] '>
                            <MdOutlineFlightTakeoff color='#6E7491' size={20} className='w-1/6 ' />
                            <input type='text' placeholder='From Where?' className='outline-0 text-[#6E7491] body-md w-5/6' />
                        </div>

                        <div className='flex items-center justify-evenly gap-2 border-r border-[#CBD4E6]'>
                            <MdOutlineFlightLand color='#6E7491' size={20} className='w-1/6 ' />
                            <input type='text' placeholder='To Where?' className='outline-0 text-[#6E7491] body-md w-5/6' />
                        </div>

                        <div className='flex items-center justify-evenly gap-2 border-r border-[#CBD4E6]'>
                            <input type='date' placeholder='Depart - Return' className='outline-0 text-[#6E7491] body-md w-5/6' />
                        </div>

                        <div className='flex items-center justify-evenly gap-2 border-[#CBD4E6]'>
                            <IoPerson color='#6E7491' size={20} className='w-1/6 ' />
                            <input type='number' placeholder='1 Adult' className='outline-0 text-[#6E7491] body-md w-5/6' />
                        </div>

                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className='flex items-center body-md justify-center gap-2 bg-[#605DEC] text-white cursor-pointer border w-[120px] py-[7.8px] rounded-[6px] border-[#CBD4E6] shadow '
                    >

                        <FaSearchLocation color='#ffffff' size={17} />
                        Search

                    </motion.button>

                </form>
            </div>

        </div>
    )
}

export default Hero