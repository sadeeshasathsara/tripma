import React from 'react'
import TripBookingModal from './TripBookingModal'

function Trip({ trip, isOpen }) {
    const [thumbnails, setThumbnails] = React.useState([])
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    React.useEffect(() => {
        const getThumbnails = () => {
            const allThumbnails = trip.places.map((place) => place.thumbnail)
            setThumbnails(allThumbnails)
        }

        getThumbnails()
    }, [trip])

    React.useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    // Auto-advance slideshow
    React.useEffect(() => {
        if (thumbnails.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % thumbnails.length)
            }, 4000)

            return () => clearInterval(interval)
        }
    }, [thumbnails.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + thumbnails.length) % thumbnails.length)
    }

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % thumbnails.length)
    }




    return (
        <>
            <div className='md:min-w-[300px] h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col'>
                {/* Image Section - Fixed height */}
                <div className='relative h-40 sm:h-48 lg:h-52 overflow-hidden bg-gray-100 flex-shrink-0'>
                    {thumbnails.length > 0 ? (
                        <>
                            {/* Smooth sliding container */}
                            <div
                                className='flex transition-transform duration-700 ease-in-out h-full'
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {thumbnails.map((thumbnail, index) => (
                                    <img
                                        key={index}
                                        src={thumbnail}
                                        alt={`${trip?.name || 'Trip'} - View ${index + 1}`}
                                        className='w-full h-full object-cover flex-shrink-0'
                                    />
                                ))}
                            </div>

                            {/* Navigation arrows - smaller on mobile */}
                            {thumbnails.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className='absolute cursor-pointer left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-opacity-90 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md'
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" color='#605dec' stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className='absolute right-2 cursor-pointer sm:right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-opacity-90 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md'
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" color='#605dec' stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Slide indicators - smaller dots */}
                            {thumbnails.length > 1 && (
                                <div className='absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5'>
                                    {thumbnails.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${index === currentSlide
                                                ? 'bg-white scale-125'
                                                : 'bg-white bg-opacity-60 hover:bg-opacity-80'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Places count badge - smaller on mobile */}
                            <div className='absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#8455fd] bg-opacity-60 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium'>
                                {thumbnails.length} {thumbnails.length === 1 ? 'place' : 'places'}
                            </div>
                        </>
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100'>
                            <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 sm:mb-3'>
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className='text-gray-500 text-xs sm:text-sm'>No images available</p>
                        </div>
                    )}
                </div>

                {/* Content Section - Flex grow to fill remaining space */}
                <div className='p-4 sm:p-5 flex-1 flex flex-col'>
                    {/* Title and Description - Fixed height */}
                    <div className='mb-3 sm:mb-4 flex-shrink-0'>
                        <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1 h-6 sm:h-7 '>
                            {trip?.name || 'Untitled Trip'}
                        </h3>
                        <p className='text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 h-8 sm:h-10'>
                            {trip?.description || 'Discover amazing destinations and create unforgettable memories.'}
                        </p>
                    </div>

                    {/* Duration and Category - Fixed height */}
                    <div className='mb-3 sm:mb-4 flex-shrink-0 h-4 sm:h-5'>
                        {(trip?.duration || trip?.category) && (
                            <div className='flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500'>
                                {trip?.duration && (
                                    <div className='flex items-center gap-1'>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{trip.duration}</span>
                                    </div>
                                )}
                                {trip?.category && (
                                    <div className='flex items-center gap-1'>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <span>{trip.category}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Spacer to push price/rating to bottom */}
                    <div className='flex-1'></div>

                    {/* Price and Action - Fixed height */}
                    <div className='flex items-center justify-between mb-3 flex-shrink-0 h-10 sm:h-12'>
                        <div className='flex flex-col justify-center'>
                            <div className='flex items-baseline gap-1'>
                                <span className='text-xl sm:text-2xl font-bold text-gray-900'>
                                    ${trip?.price || '0'}
                                </span>

                            </div>
                            {trip?.originalPrice && trip.originalPrice > trip.price && (
                                <span className='text-xs sm:text-sm text-gray-400 line-through'>
                                    ${trip.originalPrice}
                                </span>
                            )}
                        </div>

                        <button onClick={() => setIsModalOpen(true)} className='bg-[#605dec] hover:bg-[#4845e7] cursor-pointer text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0'>
                            Book Now
                        </button>
                    </div>

                    {/* Rating - Fixed height */}
                    <div className='flex-shrink-0 h-6 sm:h-7'>
                        {trip?.rating && (
                            <div className='flex items-center gap-2 pt-2 sm:pt-3 border-t border-gray-100'>
                                <div className='flex items-center'>
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(trip.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className='text-xs sm:text-sm text-gray-600'>
                                    {trip.rating} ({trip.reviewCount || 0} reviews)
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <TripBookingModal
                trip={trip}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
export default Trip