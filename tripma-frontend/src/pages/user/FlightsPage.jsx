import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineFlightTakeoff, MdOutlineFlightLand, MdAccessTime, MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoPerson, IoCalendarOutline } from "react-icons/io5";
import { FaPlane, FaClock, FaDollarSign } from "react-icons/fa";
import { motion } from 'framer-motion';
import { BACKEND_URL } from '../../tools/Tools';
import Navbar from '../../components/user/landingPage/navbar/Navbar';

function FlightSearch() {
    const location = useLocation();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(null);

    const [signupStatus, setSignupStatus] = React.useState(false);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    }

    // Parse URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const params = {
            from: urlParams.get('from'),
            to: urlParams.get('to'),
            tripDetails: {
                type: urlParams.get('type') || 'round_trip',
                departDate: urlParams.get('departDate'),
                returnDate: urlParams.get('returnDate')
            },
            seats: {
                adults: parseInt(urlParams.get('adults')) || 1,
                minors: parseInt(urlParams.get('minors')) || 0
            }
        };

        setSearchParams(params);
    }, [location.search]);

    // Fetch flights when search parameters are available
    useEffect(() => {
        if (searchParams && searchParams.from && searchParams.to) {
            fetchFlights();
        }
    }, [searchParams]);

    const fetchFlights = async () => {
        if (!searchParams) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFlights(data.flights || data || []); // Handle different response structures
        } catch (err) {
            console.error('Error fetching flights:', err);
            setError('Failed to fetch flights. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const calculateDuration = (departure, arrival) => {
        if (!departure || !arrival) return 'N/A';

        const dep = new Date(`2000-01-01T${departure}`);
        const arr = new Date(`2000-01-01T${arrival}`);

        let diff = arr - dep;
        if (diff < 0) diff += 24 * 60 * 60 * 1000; // Handle overnight flights

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const FlightCard = ({ flight, isReturn = false }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaPlane className="text-blue-600" size={16} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {flight.airline || 'Airline'} {flight.flightNumber || 'FL001'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {isReturn ? 'Return Flight' : 'Outbound Flight'}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                        ${flight.price || flight.totalPrice || '0'}
                    </p>
                    <p className="text-sm text-gray-500">per person</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center mb-4">
                {/* Departure */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <MdOutlineFlightTakeoff className="text-blue-600" size={20} />
                        <span className="font-semibold text-lg">
                            {flight.departureTime ? formatTime(flight.departureTime) : 'N/A'}
                        </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                        {isReturn ? searchParams?.to : searchParams?.from}
                    </p>
                    <p className="text-xs text-gray-500">
                        {formatDate(isReturn ? searchParams?.tripDetails.returnDate : searchParams?.tripDetails.departDate)}
                    </p>
                </div>

                {/* Flight Path */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <FaClock className="text-gray-400" size={14} />
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                        {calculateDuration(flight.departureTime, flight.arrivalTime)}
                    </p>
                    <p className="text-xs text-gray-500">
                        {flight.stops ? `${flight.stops} stops` : 'Direct'}
                    </p>
                </div>

                {/* Arrival */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <MdOutlineFlightLand className="text-green-600" size={20} />
                        <span className="font-semibold text-lg">
                            {flight.arrivalTime ? formatTime(flight.arrivalTime) : 'N/A'}
                        </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                        {isReturn ? searchParams?.from : searchParams?.to}
                    </p>
                    <p className="text-xs text-gray-500">
                        {formatDate(isReturn ? searchParams?.tripDetails.returnDate : searchParams?.tripDetails.departDate)}
                    </p>
                </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <MdAirlineSeatReclineNormal size={16} />
                        <span>{flight.class || 'Economy'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IoPerson size={16} />
                        <span>{flight.availableSeats || 'Available'} seats</span>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => {
                        // This is where booking functionality would be implemented
                        console.log('Book flight:', flight);
                        alert('Booking functionality to be implemented');
                    }}
                >
                    Select Flight
                </motion.button>
            </div>
        </motion.div>
    );

    if (!searchParams) {
        return (
            <>
                <Navbar onSignupChanged={handleSignupStatusChange} />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaPlane className="text-gray-400" size={24} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid Search Parameters</h2>
                        <p className="text-gray-600">Please check your search URL and try again.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Summary Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <MdOutlineFlightTakeoff className="text-blue-600" size={20} />
                                <span className="font-semibold">{searchParams.from}</span>
                                <span className="text-gray-400">→</span>
                                <MdOutlineFlightLand className="text-green-600" size={20} />
                                <span className="font-semibold">{searchParams.to}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <IoCalendarOutline size={16} />
                                    <span>{formatDate(searchParams.tripDetails.departDate)}</span>
                                    {searchParams.tripDetails.type === 'round_trip' && (
                                        <>
                                            <span>-</span>
                                            <span>{formatDate(searchParams.tripDetails.returnDate)}</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-1">
                                    <IoPerson size={16} />
                                    <span>
                                        {searchParams.seats.adults} Adult{searchParams.seats.adults !== 1 ? 's' : ''}
                                        {searchParams.seats.minors > 0 && `, ${searchParams.seats.minors} Minor${searchParams.seats.minors !== 1 ? 's' : ''}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={fetchFlights}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Search Again'}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {loading && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Searching for flights...</h2>
                        <p className="text-gray-600">Please wait while we find the best options for you.</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 font-bold">!</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-red-800">Error</h3>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && flights.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaPlane className="text-gray-400" size={24} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">No flights found</h2>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria or dates.</p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={fetchFlights}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Search Again
                        </motion.button>
                    </div>
                )}

                {!loading && flights.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Available Flights ({flights.length} found)
                            </h2>
                            <div className="text-sm text-gray-600">
                                Prices shown per person
                            </div>
                        </div>

                        <div className="space-y-4">
                            {flights.map((flight, index) => (
                                <FlightCard key={flight.id || index} flight={flight} />
                            ))}
                        </div>

                        {/* Show return flights for round trip */}
                        {searchParams.tripDetails.type === 'round_trip' && flights.some(f => f.returnFlight) && (
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Return Flights</h3>
                                <div className="space-y-4">
                                    {flights.filter(f => f.returnFlight).map((flight, index) => (
                                        <FlightCard key={`return-${flight.id || index}`} flight={flight.returnFlight} isReturn={true} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FlightSearch;