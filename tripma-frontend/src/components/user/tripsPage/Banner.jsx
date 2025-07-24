import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ShoppingCart, ArrowRight } from 'lucide-react';

const HeroBannerSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample banner data
    const banners = [
        {
            id: 1,
            title: "Summer Collection 2024",
            description: "Discover our latest summer trends with premium quality fabrics and contemporary designs. Perfect for every occasion.",
            actionButton: "Shop Now",
            banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            buttonIcon: <ShoppingCart className="w-4 h-4" />,
            accent: "from-[#605DEC] to-[#4C49D8]"
        },
        {
            id: 2,
            title: "Tech Innovation Hub",
            description: "Experience cutting-edge technology solutions designed to transform your digital presence and boost productivity.",
            actionButton: "Learn More",
            banner: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
            buttonIcon: <Play className="w-4 h-4" />,
            accent: "from-[#7873F0] to-[#605DEC]"
        },
        {
            id: 3,
            title: "Exclusive Offers",
            description: "Limited time deals on premium products. Don't miss out on incredible savings and exclusive member benefits.",
            actionButton: "Get Started",
            banner: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
            buttonIcon: <ArrowRight className="w-4 h-4" />,
            accent: "from-[#8B87F3] to-[#605DEC]"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const currentBanner = banners[currentSlide];

    return (
        <div className="relative w-full h-[50vh] sm:h-[80vh] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden transition-all duration-1000 ease-in-out">
                <img
                    src={currentBanner.banner}
                    alt="Banner"
                    className="w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        {/* Content Background Shade */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20">
                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                {currentBanner.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
                                {currentBanner.description}
                            </p>

                            {/* Action Button */}
                            <button className={`group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentBanner.accent} text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 transform`}>
                                {currentBanner.buttonIcon}
                                <span>{currentBanner.actionButton}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-[#605DEC]/20 hover:bg-[#605DEC]/30 backdrop-blur-sm rounded-full border border-[#605DEC]/30 transition-all duration-300 hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-[#605DEC]/20 hover:bg-[#605DEC]/30 backdrop-blur-sm rounded-full border border-[#605DEC]/30 transition-all duration-300 hover:scale-110"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide
                            ? 'bg-[#fff] scale-125 shadow-lg shadow-[#605DEC]/50'
                            : 'bg-[#fff]/50 hover:bg-[#fff]/70'
                            }`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
                <div
                    className={`h-full bg-gradient-to-r ${currentBanner.accent} transition-all duration-300`}
                    style={{ width: `${((currentSlide + 1) / banners.length) * 100}%` }}
                />
            </div>

            {/* Slide Counter */}
            <div className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <span className="text-white font-medium">
                    {currentSlide + 1} / {banners.length}
                </span>
            </div>
        </div>
    );
};

export default HeroBannerSlider;