import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, Headphones, Calendar, Zap } from 'lucide-react';
import Navbar from '../landingPage/navbar/Navbar';
import Cookies from '../cookies/Cookies';
import PromotionBanner from '../landingPage/promotions/PromotionBanner';
import SignUp from '../login-signup/SignUp';
import TripmaFooter from '../landingPage/footer/Footer';

function ContactUs() {
    const [signupStatus, setSignupStatus] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                urgency: 'medium'
            });

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    const contactMethods = [
        {
            icon: <Mail className="w-8 h-8" color='white' />,
            title: "Email Support",
            description: "Get detailed help via email",
            contact: "support@tripma.com",
            gradientColor: "from-blue-500 to-cyan-600",
            bgGradient: "from-blue-50 to-cyan-50",
            borderColor: "border-blue-200"
        },
        {
            icon: <Phone className="w-8 h-8" color='white' />,
            title: "Phone Support",
            description: "Speak directly with our team",
            contact: "+1 (555) 123-4567",
            gradientColor: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
            borderColor: "border-green-200"
        },
        {
            icon: <MessageSquare className="w-8 h-8" color='white' />,
            title: "Live Chat",
            description: "Instant support when you need it",
            contact: "Available 24/7",
            gradientColor: "from-purple-500 to-violet-600",
            bgGradient: "from-purple-50 to-violet-50",
            borderColor: "border-purple-200"
        },
        {
            icon: <Headphones className="w-8 h-8" color='white' />,
            title: "Premium Support",
            description: "Priority assistance for urgent matters",
            contact: "For verified travelers",
            gradientColor: "from-orange-500 to-red-600",
            bgGradient: "from-orange-50 to-red-50",
            borderColor: "border-orange-200"
        }
    ];

    const quickHelp = [
        {
            icon: <Calendar className="w-6 h-6" color='white' />,
            title: "Booking Issues",
            description: "Problems with reservations or cancellations",
            color: "from-blue-500 to-purple-600"
        },
        {
            icon: <MapPin className="w-6 h-6" color='white' />,
            title: "Travel Changes",
            description: "Modify dates, destinations, or preferences",
            color: "from-green-500 to-teal-600"
        },
        {
            icon: <Zap className="w-6 h-6" color='white' />,
            title: "Technical Support",
            description: "App or website functionality issues",
            color: "from-orange-500 to-red-600"
        },
        {
            icon: <CheckCircle className="w-6 h-6" color='white' />,
            title: "General Inquiries",
            description: "Questions about our services",
            color: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Promotion Banner */}
            <div className='w-full'>
                <PromotionBanner />
            </div>

            {/* Navbar */}
            <div className='w-full z-30'>
                <Navbar onSignupChanged={handleSignupStatusChange} />
            </div>

            {/* Cookies Box */}
            <div className='w-full fixed bottom-0 px-3 py-2 z-50'>
                <Cookies />
            </div>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>
                </div>
                <div className="relative flex items-center justify-center flex-col gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Get in Touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Tripma</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto opacity-90">
                            We're here to help make your travel dreams come true. Reach out to us anytime, anywhere.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                            Contact Us Now
                        </button>
                        <button className="border-2 cursor-pointer border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                            Browse Help Center
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Methods */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Choose Your <span className="text-blue-600">Preferred</span> Way
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Multiple ways to connect with our support team - pick what works best for you
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {contactMethods.map((method, index) => (
                        <div key={index} className={`bg-gradient-to-br ${method.bgGradient} cursor-default rounded-2xl p-8 border ${method.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}>
                            <div className={`w-16 h-16 bg-gradient-to-br ${method.gradientColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{method.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{method.description}</p>
                            <p className="text-gray-900 font-semibold">{method.contact}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Help Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Quick <span className="text-blue-600">Help</span> Topics
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get instant assistance with common travel questions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickHelp.map((item, index) => (
                            <div key={index} className="bg-white cursor-pointer rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
                                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                <p className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                                        Priority Level
                                    </label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    >
                                        <option value="low">Low - General Inquiry</option>
                                        <option value="medium">Medium - Standard</option>
                                        <option value="high">High - Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="What's this regarding?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#605dec] text-white font-semibold py-3 px-6 rounded-lg  hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Send className="w-5 h-5 mr-2" />
                                        Send Message
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-8">
                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-6">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">How quickly will you respond?</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">We typically respond within 2-4 hours during business days. Urgent inquiries are prioritized and handled immediately.</p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Can I modify my booking after contacting support?</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">Yes! Our support team can help you modify dates, destinations, or other booking details based on availability.</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Do you offer phone support?</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">Absolutely! Call us during business hours for immediate assistance with urgent travel matters.</p>
                                </div>
                            </div>
                        </div>

                        {/* Support Hours */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Support Hours</h3>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                                    <span className="font-semibold text-gray-900">6:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Saturday - Sunday</span>
                                    <span className="font-semibold text-gray-900">8:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Live Chat</span>
                                    <span className="font-semibold text-green-600">24/7 Available</span>
                                </div>
                            </div>
                            <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                                <div className="flex items-center">
                                    <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
                                    <p className="text-blue-800 text-sm font-medium">
                                        For urgent travel emergencies outside business hours, use our 24/7 live chat or mark your inquiry as "High Priority"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TripmaFooter />
            {/* Sign up Section */}
            <div className=''>
                <SignUp status={signupStatus} onSignupChanged={handleSignupStatusChange} />
            </div>
        </div>
    );
}

export default ContactUs;