import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

function TripmaFooter() {
    return (
        <footer className="bg-gray-50 pt-4 px-4 border border-t-[#e5e7eb]">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Tripma Logo */}
                    <div className="lg:col-span-1">
                        <img src='Logo.svg' alt='logo' />
                    </div>

                    {/* About Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    About Tripma
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    How it works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Press
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Forum
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Partner with us Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Partner with us</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Partnership programs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Affiliate program
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Connectivity partners
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Promotions and events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Loyalty program
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Contact us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Terms of service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Trust and safety
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Accessibility
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Get the app Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Get the app</h3>
                        <div className="space-y-3">
                            <div>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 block mb-2">
                                    Tripma for Android
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 block mb-4">
                                    Tripma for iOS
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 block mb-6">
                                    Mobile site
                                </a>
                            </div>

                            {/* App Store Badges */}
                            <div className="space-y-3">
                                <a href="#" className="block">
                                    <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center hover:bg-gray-800 transition-colors duration-200">
                                        <div className="mr-3">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs">Download on the</div>
                                            <div className="text-sm font-semibold">App Store</div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#" className="block">
                                    <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center hover:bg-gray-800 transition-colors duration-200">
                                        <div className="mr-3">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs">GET IT ON</div>
                                            <div className="text-sm font-semibold">Google Play</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mb-4 md:mb-0">
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-gray-500 text-sm">
                            © 2020 Tripma incorporated
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default TripmaFooter;