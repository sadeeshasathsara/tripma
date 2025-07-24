import React from 'react'
import HeroText from '../../../../assets/landingPage/HeroText.svg'
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { MdOutlineFlightLand } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";
import { motion } from 'framer-motion';
import HeroImg from '../../../../assets/landingPage/Hero.svg';
import Select from 'react-select'
import { flightOptions } from '../../../../tools/Tools';
import DateRangePicker from '../../../../tools/DateRangePicker';
import { FaMinus, FaP } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { fetchCityCodes } from '../../../../api/FetchCities';
import { useNavigate } from 'react-router-dom';

function Hero() {

    const [dateRange, setDateRange] = React.useState({
        depart: null,
        return: null
    })

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        from: null,
        to: null,
        tripDetails: {
            type: 'round_trip',
            departDate: null,
            returnDate: null,
        },
        seats: {
            adults: 0,
            minors: 0
        }
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const { from, to, tripDetails, seats } = formData;

        const queryParams = new URLSearchParams({
            from,
            to,
            type: tripDetails.type,
            departDate: tripDetails.departDate,
            returnDate: tripDetails.returnDate,
            adults: seats.adults,
            minors: seats.minors
        });

        navigate(`/flight?${queryParams.toString()}`);
    };


    const recieveTripDetails = (tripDetails) => {
        const formatDate = (date) => date?.toISOString().split('T')[0];

        setFormData(prev => ({
            ...prev,
            tripDetails: {
                ...prev.tripDetails,
                departDate: formatDate(tripDetails.departDate),
                returnDate: formatDate(tripDetails.returnDate),
                type: tripDetails.type
            }
        }));

        console.log("Trip Details Received:", tripDetails);
    }

    const [dateRangePickerModel, setDateRangePickerModel] = React.useState(false);

    const updateDateRangePickerModelStatus = (status) => {

        if (dateRangePickerModel !== status) {
            setDateRangePickerModel(status);
        }
    }

    const [seatsModel, setSeatsModel] = React.useState(false);

    const toggleSeatsModel = () => {
        setDateRangePickerModel(false);
        setSeatsModel(!seatsModel);
    }

    const closeAllModels = () => {
        //setSeatsModel(false);
        //setDateRangePickerModel(false);
    }

    const [seats, setSeats] = React.useState({
        adults: 0,
        minors: 0
    });

    const handleSeatsCount = (type, action) => {
        if (type === 'a') {
            if (action == 'dec') {
                if (seats.adults > 0) {
                    setSeats(prev => ({ ...prev, adults: prev.adults - 1 }));
                }
            } else if (action == 'inc') {
                if (seats.adults < 10) {
                    setSeats(prev => ({ ...prev, adults: prev.adults + 1 }));
                }
            }
        } else if (type === 'm') {
            if (action == 'dec') {
                if (seats.minors > 0) {
                    setSeats(prev => ({ ...prev, minors: prev.minors - 1 }));
                }
            } else if (action == 'inc') {
                if (seats.minors < 10) {
                    setSeats(prev => ({ ...prev, minors: prev.minors + 1 }));
                }
            }
        }
    }

    React.useEffect(() => {
        setFormData({
            ...formData,
            seats: {
                adults: seats.adults,
                minors: seats.minors
            }
        })
    }, [seats])


    const [cityOptions, setCityOptions] = React.useState([]);

    React.useEffect(() => {
        const loadCityCodes = async () => {
            try {
                const res = await fetchCityCodes(0, 100); // or any suitable limit
                const formattedOptions = res.data.map((airport) => ({

                    label: airport.cityCode
                }));
                setCityOptions(formattedOptions);
            } catch (err) {
                console.error('Failed to load city codes:', err);
            }
        };

        loadCityCodes();
    }, []);



    return (
        <>
            <div onClick={closeAllModels} className="w-full h-[570px] flex items-center justify-center flex-col gap-4 bg-cover bg-no-repeat bg-center relative" style={{ backgroundImage: `url(${HeroImg})` }}>

                <div className='select-none' onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
                    <img src={HeroText} alt='Hero Image' className='' />
                </div>

                <div className='w-4/5'>
                    <form onSubmit={handleFormSubmit} className=' flex items-center justify-center gap-3'>
                        <div className='border border-[#CBD4E6] shadow rounded-[6px] p-2 grid grid-cols-4 gap-2'>

                            <div className='flex items-center justify-evenly gap-2 border-[#CBD4E6] '>
                                <MdOutlineFlightTakeoff color='#6E7491' size={20} className='w-1/6 ' />
                                <Select
                                    onChange={(selectedOption) =>
                                        setFormData(prev => ({ ...prev, from: selectedOption?.label || '' }))
                                    }
                                    name='from'
                                    options={cityOptions}
                                    classNamePrefix="select"
                                    placeholder='From Where?'
                                    className='outline-0 text-[#6E7491] body-md w-5/6 z-50'
                                />
                            </div>

                            <div className='flex items-center justify-evenly gap-2 border-[#CBD4E6]'>
                                <MdOutlineFlightLand color='#6E7491' size={20} className='w-1/6 ' />
                                <Select
                                    onChange={(selectedOption) =>
                                        setFormData(prev => ({ ...prev, to: selectedOption?.label || '' }))
                                    }
                                    name='to'
                                    options={cityOptions}
                                    classNamePrefix="select"
                                    placeholder='To Where?'
                                    className='outline-0 text-[#6E7491] body-md w-5/6 z-40'
                                />
                            </div>

                            <div className='relative flex items-center justify-evenly gap-2 border-r border-[#CBD4E6] z-50'>
                                <DateRangePicker recieveModelStatus={dateRangePickerModel} sendModelStatus={updateDateRangePickerModelStatus} sendTripDetails={recieveTripDetails} />
                            </div>

                            <div className='flex items-center justify-evenly gap-2 border-[#CBD4E6] relative'>
                                <IoPerson color='#6E7491' size={20} className='w-1/6 ' />
                                <input onClick={(e) => {
                                    e.stopPropagation(); // Prevent closing
                                    toggleSeatsModel();
                                }}
                                    value={`A-${seats.adults}  M-${seats.minors}`}
                                    readOnly name='seats' type='text' placeholder='1 Adult' className='outline-0 text-[#6E7491] body-md w-5/6 p-1 border-b border-[#CBD4E6]' />
                                {seatsModel && (
                                    <div className='absolute border border-[#CBD4E6] rounded-b-[8px] shadow py-2 w-[200px] top-13 right-0 flex flex-col items-center justify-center text-[#6E7491]'>
                                        <div className='grid grid-cols-5 items-center w-full'>
                                            <label className='col-span-2 pl-2 select-none'>Adults: </label>
                                            <div className='col-span-3 flex items-center justify-center gap-4'>
                                                <FaMinus onClick={() => { handleSeatsCount('a', 'dec') }} className='cursor-pointer' color='#605DEC' size={16} />
                                                <span className='select-none'>{seats.adults}</span>
                                                <FaPlus onClick={() => { handleSeatsCount('a', 'inc') }} className='cursor-pointer' color='#605DEC' size={16} />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-5 items-center w-full'>
                                            <label className='col-span-2 pl-2 select-none'>Minors: </label>
                                            <div className='col-span-3 flex items-center justify-center gap-4'>
                                                <FaMinus onClick={() => { handleSeatsCount('m', 'dec') }} className='cursor-pointer' color='#605DEC' size={16} />
                                                <span className='select-none'>{seats.minors}</span>
                                                <FaPlus onClick={() => { handleSeatsCount('m', 'inc') }} className='cursor-pointer' color='#605DEC' size={16} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className='flex items-center select-none body-md justify-center gap-2 bg-[#605DEC] text-white cursor-pointer border w-[120px] py-[7.8px] rounded-[6px] border-[#CBD4E6] shadow '
                        >

                            <FaSearchLocation color='#ffffff' size={17} />
                            Search

                        </motion.button>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Hero