import React, { useEffect, useState } from 'react';
import { sampleTrips } from '../../../../tools/Tools';
import ReviewProfileImg from '../../../../assets/reviews/review_profile.png';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [expandedReviews, setExpandedReviews] = useState(new Set());

    useEffect(() => {
        const selectedReviews = sampleTrips.flatMap(trip =>
            trip.reviews.filter(review => review.stars > 3)
        );
        setReviews(selectedReviews);
    }, []);

    useEffect(() => {
        if (reviews.length === 0) return;

        const interval = setInterval(() => {
            setExpandedReviews(new Set()); // Reset expanded state when changing reviews
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentIndex(prev =>
                    prev + 3 >= reviews.length ? 0 : prev + 3
                );
                setIsAnimating(false);
            }, 500);
        }, 6000);

        return () => clearInterval(interval);
    }, [reviews.length]);

    const getCurrentReviews = () => {
        if (reviews.length === 0) return [];
        return reviews.slice(currentIndex, currentIndex + 3);
    };

    const renderStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    const toggleExpanded = (reviewKey) => {
        setExpandedReviews(prev => {
            const newSet = new Set(prev);
            if (newSet.has(reviewKey)) {
                newSet.delete(reviewKey);
            } else {
                newSet.add(reviewKey);
            }
            return newSet;
        });
    };

    const truncateText = (text, maxLength = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim();
    };

    const shouldTruncate = (text) => text.length > 120;

    if (reviews.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading reviews...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        What <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tripma</span> users are saying
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {getCurrentReviews().map((review, index) => {
                        const reviewKey = `${currentIndex}-${index}`;
                        const isExpanded = expandedReviews.has(reviewKey);
                        const shouldTruncateText = shouldTruncate(review.feedback);

                        return (
                            <div
                                key={reviewKey}
                                className={`review-card transform transition-all duration-700 ease-out ${isAnimating
                                    ? 'opacity-0 translate-y-8 scale-95'
                                    : 'opacity-100 translate-y-0 scale-100'
                                    }`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                    transitionDelay: isAnimating ? '0s' : `${index * 0.2}s`
                                }}
                            >
                                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-80 border border-gray-100 hover:border-blue-200 group flex flex-col">
                                    {/* Profile Section */}
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            {(review.username || "U").charAt(0)}
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors truncate">
                                                {review.username || "Unknown User"}
                                            </h3>
                                            <p className="text-gray-500 text-xs truncate">Verified Traveler</p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="mb-4">
                                        <div className="flex items-center">
                                            <span className="text-lg mr-2">{renderStars(review.stars)}</span>
                                            <span className="text-gray-600 font-medium text-sm">{review.stars}/5</span>
                                        </div>
                                    </div>

                                    {/* Feedback */}
                                    <div className="relative flex-1 flex flex-col">
                                        <div className="absolute -top-1 -left-1 text-blue-200 text-2xl font-serif opacity-50">"</div>
                                        <div className="pl-4 flex-1 flex flex-col">
                                            <p className="text-gray-700 leading-relaxed text-sm flex-1">
                                                {isExpanded || !shouldTruncateText
                                                    ? review.feedback
                                                    : `${truncateText(review.feedback)}...`
                                                }
                                            </p>
                                            {shouldTruncateText && (
                                                <button
                                                    onClick={() => toggleExpanded(reviewKey)}
                                                    className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-2 self-start transition-colors"
                                                >
                                                    {isExpanded ? 'Show Less' : 'See More'}
                                                </button>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 text-blue-200 text-2xl font-serif opacity-50 transform rotate-180">"</div>
                                    </div>

                                    {/* Decorative element */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                        {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentIndex / 3) === index
                                    ? 'bg-blue-600 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx='true'>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .review-card {
                    animation: slideInUp 0.8s ease-out forwards;
                }

                @media (max-width: 768px) {
                    .review-card {
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default Reviews;