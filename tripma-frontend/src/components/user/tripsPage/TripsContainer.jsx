import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Search, Filter, X, ChevronDown, DollarSign, Clock, Star, Tag, MapPin, SlidersHorizontal } from 'lucide-react';
import Trip from '../flights/Trip';
import TripsHandler from '../../../api/TripsHandler';
import FetchTags from '../../../api/FetchTags';
import FetchPlaces from '../../../api/FetchPlaces';

function TripsContainer() {
    const [trips, setTrips] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [activeThumb, setActiveThumb] = useState(null);
    const [availableTags, setAvailableTags] = useState([]);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [tagSearchTerm, setTagSearchTerm] = useState('');
    const [placeSearchTerm, setPlaceSearchTerm] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    const [searchParameters, setSearchParameters] = useState({
        search: '',
        sortBy: 'choose',
        priceRange: {
            min: 0,
            max: 100000
        },
        flightHours: {
            0: false, // 0-2 hours
            1: false, // 2-5 hours
            2: false, // 5-10 hours
            3: false  // 10+ hours
        },
        ratings: {
            0: false, // 5 stars
            1: false, // 4 stars
            2: false, // 3 stars
            3: false, // 2 stars
            4: false  // 1 star
        },
        tags: {},
        places: {}
    });

    const LIMIT = 10;
    const MIN_PRICE = 0;
    const MAX_PRICE = 100000;

    // Helper function to convert search parameters to URL search params
    const searchParametersToURLParams = (params) => {
        const urlParams = new URLSearchParams();

        if (params.search) urlParams.set('search', params.search);
        if (params.sortBy && params.sortBy !== 'choose') urlParams.set('sortBy', params.sortBy);

        if (params.priceRange.min !== MIN_PRICE) urlParams.set('minPrice', params.priceRange.min.toString());
        if (params.priceRange.max !== MAX_PRICE) urlParams.set('maxPrice', params.priceRange.max.toString());

        // Flight hours
        const selectedFlightHours = Object.keys(params.flightHours).filter(key => params.flightHours[key]);
        if (selectedFlightHours.length > 0) {
            urlParams.set('flightHours', selectedFlightHours.join(','));
        }

        // Ratings
        const selectedRatings = Object.keys(params.ratings).filter(key => params.ratings[key]);
        if (selectedRatings.length > 0) {
            urlParams.set('ratings', selectedRatings.join(','));
        }

        // Tags
        const selectedTags = Object.keys(params.tags).filter(key => params.tags[key]);
        if (selectedTags.length > 0) {
            urlParams.set('tags', selectedTags.join(','));
        }

        // Places
        const selectedPlaces = Object.keys(params.places).filter(key => params.places[key]);
        if (selectedPlaces.length > 0) {
            urlParams.set('places', selectedPlaces.join(','));
        }

        return urlParams;
    };

    // Helper function to convert URL search params to search parameters
    const urlParamsToSearchParameters = (urlParams, availableTags, availablePlaces) => {
        const params = {
            search: urlParams.get('search') || '',
            sortBy: urlParams.get('sortBy') || 'choose',
            priceRange: {
                min: parseInt(urlParams.get('minPrice')) || MIN_PRICE,
                max: parseInt(urlParams.get('maxPrice')) || MAX_PRICE
            },
            flightHours: {
                0: false,
                1: false,
                2: false,
                3: false
            },
            ratings: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
            tags: {},
            places: {}
        };

        // Initialize tags and places
        availableTags.forEach(tag => {
            params.tags[tag._id] = false;
        });
        availablePlaces.forEach(place => {
            params.places[place._id] = false;
        });

        // Parse flight hours from URL
        const flightHoursParam = urlParams.get('flightHours');
        if (flightHoursParam) {
            flightHoursParam.split(',').forEach(hour => {
                if (params.flightHours.hasOwnProperty(hour)) {
                    params.flightHours[hour] = true;
                }
            });
        }

        // Parse ratings from URL
        const ratingsParam = urlParams.get('ratings');
        if (ratingsParam) {
            ratingsParam.split(',').forEach(rating => {
                if (params.ratings.hasOwnProperty(rating)) {
                    params.ratings[rating] = true;
                }
            });
        }

        // Parse tags from URL
        const tagsParam = urlParams.get('tags');
        if (tagsParam) {
            tagsParam.split(',').forEach(tagId => {
                if (params.tags.hasOwnProperty(tagId)) {
                    params.tags[tagId] = true;
                }
            });
        }

        // Parse places from URL
        const placesParam = urlParams.get('places');
        if (placesParam) {
            placesParam.split(',').forEach(placeId => {
                if (params.places.hasOwnProperty(placeId)) {
                    params.places[placeId] = true;
                }
            });
        }

        return params;
    };

    // Update URL when search parameters change
    useEffect(() => {
        if (!isInitialized) return; // Don't update URL during initial load

        const urlParams = searchParametersToURLParams(searchParameters);
        const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;

        // Only update URL if it's different from current
        if (window.location.href !== window.location.origin + newUrl) {
            window.history.replaceState({}, '', newUrl);
        }
    }, [searchParameters, isInitialized]);

    // Handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            if (isInitialized && availableTags.length > 0 && availablePlaces.length > 0) {
                const urlParams = new URLSearchParams(window.location.search);
                const newSearchParams = urlParamsToSearchParameters(urlParams, availableTags, availablePlaces);
                setSearchParameters(newSearchParams);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isInitialized, availableTags, availablePlaces]);

    // Fetch trips when search parameters change
    React.useEffect(() => {
        if (!isInitialized) return; // Don't fetch during initial setup

        setTrips([]);
        setPage(0);
        setHasMore(false);

        // Fetch new search results
        async function updateTrips() {
            setIsLoading(true);
            try {
                const res = await TripsHandler.getInstance().search(searchParameters);
                setTrips(res);
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setIsLoading(false);
            }
        }

        updateTrips();
    }, [searchParameters, isInitialized]);

    const observer = useRef();

    const lastTripElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        if (!isInitialized) return; // Don't fetch more trips during initial setup

        const fetchTrips = async () => {
            setIsLoading(true);
            const data = await TripsHandler.getInstance().getTrips({ offset: page * LIMIT, limit: LIMIT });

            if (data.length < LIMIT) setHasMore(false);
            setTrips(prevTrips => [...prevTrips, ...data]);
            setIsLoading(false);
        };

        if (page > 0) { // Only fetch more trips if we're not on the first page
            fetchTrips();
        }
    }, [page, isInitialized]);

    // Fetch tags and places on component mount, then initialize from URL
    useEffect(() => {
        const fetchTagsAndPlaces = async () => {
            try {
                const [tagsData, placesData] = await Promise.all([
                    FetchTags(),
                    FetchPlaces()
                ]);

                setAvailableTags(tagsData || []);
                setAvailablePlaces(placesData || []);

                // Initialize search parameters from URL or defaults
                const urlParams = new URLSearchParams(window.location.search);
                const initialSearchParams = urlParamsToSearchParameters(urlParams, tagsData || [], placesData || []);

                setSearchParameters(initialSearchParams);
                setIsInitialized(true);
            } catch (error) {
                console.error('Error fetching tags and places:', error);
            }
        };

        fetchTagsAndPlaces();
    }, []);

    const onSearch = (e) => {
        setSearchParameters(prev => ({
            ...prev,
            search: e.target.value
        }));
    };

    const onSortByChange = (e) => {
        setSearchParameters(prev => ({
            ...prev,
            sortBy: e.target.value
        }));
    };

    const handlePriceRangeChange = (type, value) => {
        const numValue = Number(value);
        setSearchParameters(prev => {
            const newRange = { ...prev.priceRange };

            if (type === 'min') {
                newRange.min = Math.min(numValue, prev.priceRange.max);
            } else {
                newRange.max = Math.max(numValue, prev.priceRange.min);
            }

            return {
                ...prev,
                priceRange: newRange
            };
        });
    };

    const handleFlightHoursChange = (index) => {
        setSearchParameters(prev => ({
            ...prev,
            flightHours: {
                ...prev.flightHours,
                [index]: !prev.flightHours[index]
            }
        }));
    };

    const handleRatingChange = (index) => {
        setSearchParameters(prev => ({
            ...prev,
            ratings: {
                ...prev.ratings,
                [index]: !prev.ratings[index]
            }
        }));
    };

    const handleTagChange = (tagId) => {
        setSearchParameters(prev => ({
            ...prev,
            tags: {
                ...prev.tags,
                [tagId]: !prev.tags[tagId]
            }
        }));
    };

    const handlePlaceChange = (placeId) => {
        setSearchParameters(prev => ({
            ...prev,
            places: {
                ...prev.places,
                [placeId]: !prev.places[placeId]
            }
        }));
    };

    const clearAllFilters = () => {
        const initialTags = {};
        const initialPlaces = {};

        availableTags.forEach(tag => {
            initialTags[tag._id] = false;
        });

        availablePlaces.forEach(place => {
            initialPlaces[place._id] = false;
        });

        setSearchParameters({
            search: '',
            sortBy: 'choose',
            priceRange: {
                min: MIN_PRICE,
                max: MAX_PRICE
            },
            flightHours: {
                0: false,
                1: false,
                2: false,
                3: false
            },
            ratings: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
            tags: initialTags,
            places: initialPlaces
        });

        setTagSearchTerm('');
        setPlaceSearchTerm('');
    };

    const applyFilters = () => {
        // Reset pagination when applying filters
        setPage(0);
        setTrips([]);
        setHasMore(true);

        // For now, just trigger a re-fetch
        // In a real implementation, you'd pass searchParameters to your API call
    };

    // Filter functions for search
    const getFilteredTags = () => {
        return availableTags.filter(tag =>
            tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
        );
    };

    const getFilteredPlaces = () => {
        return availablePlaces.filter(place =>
            place.name.toLowerCase().includes(placeSearchTerm.toLowerCase())
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Left Filter Sidebar - Made Sticky */}
                <div className="w-80 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
                    <div className="p-6">
                        {/* Filter Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5 text-[#605DEC]" />
                                Filters
                            </h2>
                            <button
                                onClick={clearAllFilters}
                                className="text-[#605DEC] hover:text-[#4C49D8] text-sm font-medium transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Filter Sections */}
                        <div className="space-y-6">
                            {/* Price Range */}
                            <div className="filter-section">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <DollarSign className="w-4 h-4 text-[#605DEC]" />
                                    Price Range
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={searchParameters.priceRange.min}
                                            onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                            placeholder="Min"
                                            min={MIN_PRICE}
                                            max={MAX_PRICE}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605DEC] focus:border-transparent outline-none text-sm"
                                        />
                                        <input
                                            type="number"
                                            value={searchParameters.priceRange.max}
                                            onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                                            placeholder="Max"
                                            min={MIN_PRICE}
                                            max={MAX_PRICE}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605DEC] focus:border-transparent outline-none text-sm"
                                        />
                                    </div>

                                    {/* Fixed Dual Slider */}
                                    <div className="relative w-full h-8 flex items-center justify-center">
                                        {/* Slider Track */}
                                        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />

                                        {/* Active Range Fill */}
                                        <div
                                            className="absolute h-2 bg-[#605DEC] rounded-full"
                                            style={{
                                                left: `${(searchParameters.priceRange.min / MAX_PRICE) * 100}%`,
                                                width: `${((searchParameters.priceRange.max - searchParameters.priceRange.min) / MAX_PRICE) * 100}%`
                                            }}
                                        />

                                        {/* Min Range Slider */}
                                        <input
                                            type="range"
                                            min={MIN_PRICE}
                                            max={MAX_PRICE}
                                            value={searchParameters.priceRange.min}
                                            onChange={(e) => {
                                                handlePriceRangeChange('min', e.target.value);
                                                setActiveThumb('min');
                                            }}
                                            onMouseDown={() => setActiveThumb('min')}
                                            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10 slider-thumb"
                                            style={{
                                                zIndex: activeThumb === 'min' ? 20 : 10
                                            }}
                                        />

                                        {/* Max Range Slider */}
                                        <input
                                            type="range"
                                            min={MIN_PRICE}
                                            max={MAX_PRICE}
                                            value={searchParameters.priceRange.max}
                                            onChange={(e) => {
                                                handlePriceRangeChange('max', e.target.value);
                                                setActiveThumb('max');
                                            }}
                                            onMouseDown={() => setActiveThumb('max')}
                                            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10 slider-thumb"
                                            style={{
                                                zIndex: activeThumb === 'max' ? 20 : 10
                                            }}
                                        />
                                    </div>

                                    {/* Price Range Display */}
                                    <div className="text-xs text-gray-500 text-center">
                                        ${searchParameters.priceRange.min.toLocaleString()} - ${searchParameters.priceRange.max.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Flight Hours */}
                            <div className="filter-section">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <Clock className="w-4 h-4 text-[#605DEC]" />
                                    Flight Hours
                                </h3>
                                <div className="space-y-2">
                                    {['0-2 hours', '2-5 hours', '5-10 hours', '10+ hours'].map((option, index) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={searchParameters.flightHours[index]}
                                                onChange={() => handleFlightHoursChange(index)}
                                                className="w-4 h-4 text-[#605DEC] border-gray-300 rounded focus:ring-[#605DEC] focus:ring-2"
                                            />
                                            <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Ratings */}
                            <div className="filter-section">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <Star className="w-4 h-4 text-[#605DEC]" />
                                    Ratings
                                </h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((rating, index) => (
                                        <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={searchParameters.ratings[index]}
                                                onChange={() => handleRatingChange(index)}
                                                className="w-4 h-4 text-[#605DEC] border-gray-300 rounded focus:ring-[#605DEC] focus:ring-2"
                                            />
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                                <span className="text-sm text-gray-700 ml-1">& up</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="filter-section">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <Tag className="w-4 h-4 text-[#605DEC]" />
                                    Tags
                                </h3>
                                <div className="space-y-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={tagSearchTerm}
                                            onChange={(e) => setTagSearchTerm(e.target.value)}
                                            placeholder="Search tags..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605DEC] focus:border-transparent outline-none text-sm"
                                        />
                                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {getFilteredTags().map((tag) => (
                                            <label key={tag._id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={searchParameters.tags[tag._id] || false}
                                                    onChange={() => handleTagChange(tag._id)}
                                                    className="w-4 h-4 text-[#605DEC] border-gray-300 rounded focus:ring-[#605DEC] focus:ring-2"
                                                />
                                                <span className="text-sm text-gray-700">{tag.name}</span>
                                            </label>
                                        ))}
                                        {getFilteredTags().length === 0 && (
                                            <div className="text-sm text-gray-500 text-center py-2">
                                                No tags found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Places */}
                            <div className="filter-section">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <MapPin className="w-4 h-4 text-[#605DEC]" />
                                    Places
                                </h3>
                                <div className="space-y-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={placeSearchTerm}
                                            onChange={(e) => setPlaceSearchTerm(e.target.value)}
                                            placeholder="Search places..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605DEC] focus:border-transparent outline-none text-sm"
                                        />
                                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {getFilteredPlaces().map((place) => (
                                            <label key={place._id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={searchParameters.places[place._id] || false}
                                                    onChange={() => handlePlaceChange(place._id)}
                                                    className="w-4 h-4 text-[#605DEC] border-gray-300 rounded focus:ring-[#605DEC] focus:ring-2"
                                                />
                                                <span className="text-sm text-gray-700">{place.name}</span>
                                            </label>
                                        ))}
                                        {getFilteredPlaces().length === 0 && (
                                            <div className="text-sm text-gray-500 text-center py-2">
                                                No places found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 min-h-screen">
                    {/* Search Bar */}
                    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                        <div className="p-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-[#5f5decd8]" />
                                </div>
                                <input
                                    type="text"
                                    value={searchParameters.search}
                                    onChange={onSearch}
                                    placeholder="Search trips by name, destination, or description..."
                                    className="w-full pl-12 p-3 border border-[#5f5decd8] rounded-xl focus:ring-2 focus:ring-[#605DEC] focus:border-transparent outline-none text-md placeholder-gray-400 shadow-sm"
                                />
                            </div>

                            {/* Search Results Info */}
                            <div className="flex items-center justify-between mt-1">
                                <div className="text-sm text-gray-600">
                                    Showing <span className="font-semibold text-gray-800">1,247</span> trips
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Sort by:</span>
                                    <select
                                        value={searchParameters.sortBy}
                                        onChange={onSortByChange}
                                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-[#605DEC] focus:border-transparent outline-none"
                                    >
                                        <option value="choose">Choose Option</option>
                                        <option value="lowToHigh">Price: Low to High</option>
                                        <option value="highToLow">Price: High to Low</option>
                                        <option value="rating">Rating</option>
                                        <option value="duration">Duration</option>
                                        <option value="newest">Newest</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trips Grid */}
                    <div className='p-6'>
                        <div className='w-full h-auto grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6'>
                            {trips.map((trip, index) => {
                                const isLast = index === trips.length - 1;
                                return (
                                    <div key={index} ref={isLast ? lastTripElementRef : null}>
                                        <Trip trip={trip} isLoading={false} />
                                    </div>
                                );
                            })}

                            {isLoading &&
                                [...Array(4)].map((_, index) => (
                                    <div key={`loading-${index}`} className='w-full'>
                                        <Trip trip={null} isLoading={true} />
                                    </div>
                                ))}
                        </div>

                        {/* No Results State */}
                        {!isLoading && trips.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No trips found</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-[#605DEC] hover:text-[#4C49D8] font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom CSS for slider styling */}
            <style jsx>{`
                .slider-thumb::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #605DEC;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                }
                
                .slider-thumb::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #605DEC;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default TripsContainer;