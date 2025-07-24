import React from 'react'
import { HiCalendarDateRange } from "react-icons/hi2";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DateRangePicker({ sendTripDetails, sendModelStatus, recieveModelStatus }) {

    const [clicked, setClicked] = React.useState(false);

    React.useEffect(() => {
        sendModelStatus(clicked)
    }, [clicked]);

    React.useEffect(() => {
        if (clicked !== recieveModelStatus) {
            setClicked(recieveModelStatus);
        }
    }, [recieveModelStatus]);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const [tripDetails, setTripDetails] = React.useState({
        type: 'round_trip',
        departDate: null,
        returnDate: null,
    });

    const handleTripTypeChange = (type) => {
        tripDetails.type = type;
    }

    const [dateRange, setDateRange] = React.useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleDateRangeChange = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setDateRange([ranges.selection]);
        setTripDetails(prev => ({
            ...prev,
            departDate: startDate,
            returnDate: endDate
        }));
    };

    const handleSendTripDetails = () => {
        sendTripDetails(tripDetails);
        handleClick();
    }

    return (
        <>
            {clicked ? (
                <div className='absolute z-20 top-0 w-[564px] bg-white text-[#6E7491]'>

                    {/* Date Range Picker Model */}
                    <div className='border border-[#CBD4E6] p-2 rounded-[12px] shadow-md w-full'>

                        <div className='flex items-center justify-between gap-2 w-full p-2 border-b border-[#CBD4E6]'>

                            <div className='flex items-center justify-center gap-2' onClick={() => handleTripTypeChange('round_trip')}>
                                <input type='radio' name='type' checked value='round_trip' className='border border-[#6E7491] focus:ring-[#605DEC]' />
                                <label>Round Trip</label>
                            </div>

                            <div className='flex items-center justify-center gap-2' onClick={() => handleTripTypeChange('one_way')}>
                                <input type='radio' name='type' value='one_way' className='border border-[#6E7491] focus:ring-[#605DEC]' />
                                <label>One Way</label>
                            </div>

                            <div onClick={handleClick} className='flex items-center justify-evenly gap-2'>
                                <HiCalendarDateRange color='#6E7491' size={20} className='w-1/6 cursor-pointer' />
                                <input name='date' type='' readOnly placeholder='Depart - Return' className='outline-0 text-[#6E7491] body-md w-5/6 cursor-pointer'
                                    value={
                                        tripDetails.departDate && tripDetails.returnDate
                                            ? `${tripDetails.departDate.toLocaleDateString()} - ${tripDetails.returnDate.toLocaleDateString()}`
                                            : ''
                                    }
                                />
                            </div>

                            <div className='flex items-center justify-center'>
                                <button onClick={handleSendTripDetails} className='bg-[#605DEC] px-7 py-2 text-white rounded-[4px] cursor-pointer'>Done</button>
                            </div>

                        </div>
                        <div className="w-full flex items-center justify-center">
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDateRangeChange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                className="date-range-picker mt-2"
                            />
                        </div>
                    </div>

                </div>
            ) : (
                <div onClick={handleClick} className='flex items-center justify-evenly gap-2'>
                    <HiCalendarDateRange color='#6E7491' size={20} className='w-1/6 cursor-pointer' />
                    <input name='date' type='' readOnly placeholder='Depart - Return' className='outline-0 text-[#6E7491] text-xs w-5/6 cursor-pointer'
                        value={
                            tripDetails.departDate && tripDetails.returnDate
                                ? `${tripDetails.departDate.toLocaleDateString()} - ${tripDetails.returnDate.toLocaleDateString()}`
                                : ''
                        }
                    />
                </div>
            )}
        </>
    )
}

export default DateRangePicker