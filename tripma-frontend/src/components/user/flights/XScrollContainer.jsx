import React from 'react'
import Trip from './Trip'
import { sampleTrips } from '../../../tools/Tools'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TripsHandler from '../../../api/TripsHandler';
import { Link } from 'react-router-dom';

function XScrollContainer({ tag }) {

    const [trips, setTrips] = React.useState(null)
    const scrollContainerRef = React.useRef(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    const tagTitles = {
        Adventure: "Thrill Seeker's Picks",
        Mountains: "Majestic Mountain Escapes",
        Photography: "Picture-Perfect Places",
        Hiking: "Top Trails to Trek",
        Scenic: "Views That Wow",
        ScenicViews: "Scenic Gems Await",
        Alpine: "Alpine Wonders",
        AlpineCulture: "Charming Alpine Culture",
        Lake: "Lakeside Bliss",
        Relaxation: "Relax & Recharge",
        WineCountry: "Vineyards & Vibes",
        Beach: "Sun, Sand & Surf",
        City: "City Lights & Culture",
        Culture: "Cultural Treasures",
        Nature: "Nature at Its Best",
        Romantic: "Romantic Getaways",
        Family: "Fun for the Whole Family",
        Luxury: "Live the Luxe Life",
        Budget: "Affordable Adventures",
        Wildlife: "Into the Wild",
        RoadTrip: "Hit the Road",
        Island: "Island Escapes",
        Winter: "Snowy Escapes",
        Summer: "Summer Favourites",
        History: "Timeless Historic Sites",
        Food: "Tastes of the World",
        Safari: "Safari Adventures",
        Desert: "Desert Discoveries",
        Jungle: "Into the Jungle",
        Waterfalls: "Chasing Waterfalls",
        Backpacking: "Backpacker Trails",
        HiddenGems: "Hidden Gems to Explore"
    };

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
        }
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -270, // Scroll by one card width plus gap
                behavior: 'smooth'
            })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 270, // Scroll by one card width plus gap
                behavior: 'smooth'
            })
        }
    }

    React.useEffect(() => {
        async function filterByCategory() {
            try {
                setIsLoading(true)
                const trips = await TripsHandler.getInstance().getTrips();

                const seenIds = new Set();
                const filtered = [];

                for (const trip of trips) {
                    if (
                        trip.tags.some(tagObj => tagObj.name === tag) &&
                        !seenIds.has(trip._id)
                    ) {
                        seenIds.add(trip._id);
                        filtered.push(trip);
                    }
                }
                setTrips(filtered);
                setIsLoading(false) // Set loading to false after data is loaded
            } catch (err) {
                console.error("Error filtering trips:", err);
                setIsLoading(false) // Set loading to false even on error
            }
        }

        filterByCategory();
    }, [tag]);

    // Auto-scroll demonstration after component loads
    React.useEffect(() => {
        if (trips && !isLoading && scrollContainerRef.current) {
            const timer1 = setTimeout(() => {
                scrollContainerRef.current.scrollBy({
                    left: 135, // Scroll halfway to show it's scrollable
                    behavior: 'smooth'
                })
            }, 1000) // Delay of 1 second after loading

            const timer2 = setTimeout(() => {
                scrollContainerRef.current.scrollTo({
                    left: 0, // Scroll back to the beginning
                    behavior: 'smooth'
                })
            }, 1500) // Wait 2.5 seconds, then scroll back to start

            return () => {
                clearTimeout(timer1)
                clearTimeout(timer2)
            }
        }
    }, [trips, isLoading])

    React.useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            checkScrollButtons()
            container.addEventListener('scroll', checkScrollButtons)
            return () => container.removeEventListener('scroll', checkScrollButtons)
        }
    }, [trips])

    // Show loading shimmer cards while data is being fetched
    if (isLoading) {
        return (
            <div className='mx-5 my-2 p-3 text-[#6E7491] flex flex-col gap-3 mt-5 bg-gradient-to-r from-white to-[#f3f8fe] rounded-lg border border-gray-200 shadow-sm'>
                <div className='w-full flex items-center justify-between '>
                    <div className='h-6 w-48 bg-gray-200 rounded animate-pulse'></div>
                    <div className='h-8 w-16 bg-gray-200 rounded-full animate-pulse'></div>
                </div>

                <div className='relative'>
                    <div className='w-full overflow-x-auto scrollbar-hide p-2'>
                        <div className='flex flex-row gap-18'>
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className='w-[250px] flex-shrink-0'>
                                    <Trip trip={null} isLoading={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=''>
            {trips && (
                <div className='mx-5 my-2 p-3 text-[#6E7491] flex flex-col gap-3 mt-5 bg-gradient-to-r from-white to-[#f3f8fe] rounded-lg border border-gray-200 shadow-sm'>

                    <div className='w-full flex items-center justify-between '>
                        <p className='text-lg font-semibold text-[#6E7491]'>{tagTitles[tag] || `Trips tagged: ${tag}`}</p>
                        <Link to='/trips' className='flex items-center justify-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200'>
                            <p className='text-[#A1B0CC] text-sm font-medium'>All</p>
                            <FaArrowRight size={12} color='#A1B0CC' />
                        </Link>
                    </div>

                    {/* Horizontal Scrollable Container with Navigation */}
                    <div className='relative'>
                        {/* Left Navigation Button */}
                        <button
                            onClick={scrollLeft}
                            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#7776be] shadow-lg flex items-center justify-center transition-opacity duration-200 ${canScrollLeft ? 'opacity-100 hover:bg-[#6867b4] cursor-pointer' : 'opacity-30 cursor-not-allowed'
                                }`}
                            disabled={!canScrollLeft}
                        >
                            <FaChevronLeft size={16} color='#fff' />
                        </button>

                        {/* Right Navigation Button */}
                        <button
                            onClick={scrollRight}
                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#7776be] shadow-lg flex items-center justify-center transition-opacity duration-200 ${canScrollRight ? 'opacity-100 hover:bg-[#6867b4] cursor-pointer' : 'opacity-30 cursor-not-allowed'
                                }`}
                            disabled={!canScrollRight}
                        >
                            <FaChevronRight size={16} color='#fff' />
                        </button>

                        {/* Scrollable Container */}
                        <div
                            ref={scrollContainerRef}
                            className='w-full overflow-x-auto scrollbar-hide p-2'
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className='flex flex-row gap-18 '>
                                {trips.map((trip, index) => (
                                    <div key={index} className='w-[250px] flex-shrink-0'>
                                        <Trip trip={trip} isLoading={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>

    )
}

export default XScrollContainer