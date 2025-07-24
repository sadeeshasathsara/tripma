import React from 'react'

function TripBookingModal({ trip, isOpen, onClose }) {
    const [activeTab, setActiveTab] = React.useState('overview')
    const [selectedPlace, setSelectedPlace] = React.useState(null)
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
    const [isHeaderSticky, setIsHeaderSticky] = React.useState(false)
    const [isPriceSticky, setIsPriceSticky] = React.useState(false)

    if (!isOpen || !trip) return null

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop
        const headerHeight = 256 // 64 * 4 = 256px (h-64)
        const priceHeight = headerHeight + 120 // Additional height for price section
        setIsHeaderSticky(scrollTop >= headerHeight - 80) // 80px offset for smooth transition
        setIsPriceSticky(scrollTop >= priceHeight - 80) // Show price when past price section
    }

    const openPlaceGallery = (place) => {
        setSelectedPlace(place)
        setCurrentImageIndex(0)
    }

    const nextImage = () => {
        if (selectedPlace && selectedPlace.gallery) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedPlace.gallery.length)
        }
    }

    const prevImage = () => {
        if (selectedPlace && selectedPlace.gallery) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedPlace.gallery.length) % selectedPlace.gallery.length)
        }
    }

    const averageRating = trip.rating || 0
    const totalReviews = trip.reviews?.length || 0

    return (
        <div className="fixed inset-0 bg-[#52527a5c] flex items-center justify-center z-50 p-4" onClick={handleOverlayClick}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl relative overflow-hidden">
                {/* Scrollable Content */}
                <div className="h-[90vh] overflow-y-auto" onScroll={handleScroll}>
                    {/* Header Image */}
                    <div className="relative h-64">
                        {trip.places?.[0]?.cover && (
                            <div className="h-full bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
                                <img
                                    src={trip.places[0].cover}
                                    alt={trip.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        )}

                        {/* Trip Info Overlay */}
                        <div className="absolute bottom-4 left-6 text-white">
                            <h1 className="text-3xl font-bold mb-2">{trip.name}</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {trip.duration} hours flights
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {averageRating} ({totalReviews} reviews)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        {/* Price Section */}
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-4xl font-bold text-gray-900">${trip.price}</div>
                                    <div className="text-sm text-gray-500">
                                        <div>per person</div>
                                        {trip.originalPrice && trip.originalPrice > trip.price && (
                                            <div className="line-through text-gray-400">${trip.originalPrice}</div>
                                        )}
                                    </div>
                                </div>
                                <button className="bg-[#605dec] cursor-pointer hover:bg-[#5449c7] text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="flex gap-8 px-6">
                                {['overview', 'places', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 cursor-pointer px-2 text-sm font-medium border-b-2 transition-colors duration-200 capitalize ${activeTab === tab
                                            ? 'border-[#605dec] text-[#605dec]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Tags */}
                                    {trip.tags && trip.tags.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Trip Highlights</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {trip.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-[#605dec] bg-opacity-10 text-white px-3 py-1 rounded-full text-sm font-medium"
                                                    >
                                                        {`#${tag.slug}`}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Places Preview */}
                                    {trip.places && trip.places.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Destinations ({trip.places.length})</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {trip.places.slice(0, 4).map((place, index) => (
                                                    <div key={place.placeId || index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                                                        <div className="h-32 bg-gray-100 relative">
                                                            {place.thumbnail && (
                                                                <img
                                                                    src={place.thumbnail}
                                                                    alt={place.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            )}
                                                            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                                                                {place.city}, {place.country}
                                                            </div>
                                                        </div>
                                                        <div className="p-3">
                                                            <h4 className="font-semibold text-gray-900 mb-1">{place.name}</h4>
                                                            <p className="text-sm text-gray-600 line-clamp-2">{place.bio}</p>
                                                            {place.nearestAirport && (
                                                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                                    </svg>
                                                                    {place.nearestAirport}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'places' && (
                                <div className="space-y-6">
                                    {trip.places && trip.places.length > 0 ? (
                                        trip.places.map((place, index) => (
                                            <div key={place.placeId || index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                                <div className="h-48 bg-gray-100 relative">
                                                    {place.cover && (
                                                        <img
                                                            src={place.cover}
                                                            alt={place.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                    <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                                                        {place.city}, {place.country}
                                                    </div>
                                                    {place.gallery && place.gallery.length > 0 && (
                                                        <button
                                                            onClick={() => openPlaceGallery(place)}
                                                            className="absolute cursor-pointer bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                                                        >
                                                            View Gallery ({place.gallery.length})
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                                                    <p className="text-gray-600 mb-4">{place.bio}</p>

                                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                        {place.nearestAirport && (
                                                            <div className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                                </svg>
                                                                Nearest Airport: {place.nearestAirport}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {place.tags && place.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {place.tags.map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                                                                >
                                                                    {`#${tag.slug}`}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No places information available
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {/* Rating Summary */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-[#605dec]">{averageRating}</div>
                                                <div className="text-sm text-gray-500">out of 5</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-600">Based on {totalReviews} reviews</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    {trip.reviews && trip.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {trip.reviews.map((review, index) => (
                                                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-[#605dec] rounded-full flex items-center justify-center text-white font-semibold">
                                                            {review.username?.charAt(0)?.toUpperCase() || 'U'}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="font-medium text-gray-900">{review.username}</span>
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <svg
                                                                            key={i}
                                                                            className={`w-4 h-4 ${i < (review.stars || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                        </svg>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-700">{review.feedback}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No reviews available yet
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Close Button - Always Sticky */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={onClose}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 cursor-pointer shadow-lg"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Sticky Header */}
                <div className={`absolute top-0 left-0 right-0 z-10 transition-all duration-300 ${isHeaderSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`relative overflow-hidden rounded-t-2xl transition-all duration-300 ${isPriceSticky ? 'h-24' : 'h-20'}`}>
                        {/* Blurred Background */}
                        {trip.places?.[0]?.cover && (
                            <div className="absolute inset-0">
                                <img
                                    src={trip.places[0].cover}
                                    alt={trip.name}
                                    className="w-full h-full object-cover scale-110"
                                    style={{ filter: 'blur(10px)' }}
                                />
                                <div className="absolute inset-0 bg-[#5856bb] bg-opacity-40"></div>
                                <div className="absolute inset-0 backdrop-blur-sm"></div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center justify-between px-6 text-white">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-bold">{trip.name}</h2>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {trip.duration} hours flights
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {averageRating} ({totalReviews})
                                    </span>
                                </div>
                            </div>

                            {/* Price and Book Now Button - Show when scrolled past price section */}
                            <div className={`transition-all duration-300 ${isPriceSticky ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">${trip.price}</div>
                                        <div className="text-xs opacity-90">per person</div>
                                    </div>
                                    <button className="bg-white text-[#5856bb] bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border border-white border-opacity-30 px-6 py-2 rounded-lg font-bold text-md transition-all duration-200 cursor-pointer">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Place Gallery Modal */}
            {selectedPlace && selectedPlace.gallery && (
                <div className="fixed inset-0 bg-[#000000a8] flex items-center justify-center z-60" onClick={() => setSelectedPlace(null)}>
                    <div className="relative max-w-4xl max-h-[80vh] bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="relative h-96">
                            <img
                                src={selectedPlace.gallery[currentImageIndex]}
                                alt={`${selectedPlace.name} - Gallery ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {selectedPlace.gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => setSelectedPlace(null)}
                                className="absolute cursor-pointer top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 bg-white">
                            <h3 className="font-semibold text-gray-900">{selectedPlace.name}</h3>
                            <p className="text-sm text-gray-600">Image {currentImageIndex + 1} of {selectedPlace.gallery.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TripBookingModal