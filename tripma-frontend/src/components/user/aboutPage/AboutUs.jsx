import React from 'react'
import Navbar from '../landingPage/navbar/Navbar'
import { Users, Globe, Award, Heart, MapPin, Plane, Star, CheckCircle } from 'lucide-react';
import TripmaFooter from '../landingPage/footer/Footer';
import SignUp from '../login-signup/SignUp';
import Cookies from '../cookies/Cookies';
import PromotionBanner from '../landingPage/promotions/PromotionBanner';


function AboutUs() {
    const [signupStatus, setSignupStatus] = React.useState(false);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    }

    const stats = [
        { number: '10M+', label: 'Happy Travelers', icon: Users },
        { number: '150+', label: 'Countries Covered', icon: Globe },
        { number: '50+', label: 'Awards Won', icon: Award },
        { number: '24/7', label: 'Customer Support', icon: Heart }
    ];

    const values = [
        {
            title: 'Innovation',
            description: 'We constantly push the boundaries of travel technology to create seamless experiences.',
            icon: Star,
            color: 'from-blue-500 to-purple-600'
        },
        {
            title: 'Trust',
            description: 'Your safety and security are our top priorities in every journey you take.',
            icon: CheckCircle,
            color: 'from-green-500 to-teal-600'
        },
        {
            title: 'Global Reach',
            description: 'Connect with destinations worldwide through our extensive network of partners.',
            icon: MapPin,
            color: 'from-orange-500 to-red-600'
        },
        {
            title: 'Excellence',
            description: 'We strive for perfection in every aspect of your travel experience.',
            icon: Plane,
            color: 'from-purple-500 to-pink-600'
        }
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            bio: 'Former travel industry executive with 15+ years of experience building innovative travel solutions.'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            bio: 'Tech visionary who led engineering teams at top Silicon Valley companies before joining Tripma.'
        },
        {
            name: 'Emma Rodriguez',
            role: 'Head of Design',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            bio: 'Award-winning designer passionate about creating intuitive and beautiful user experiences.'
        },
        {
            name: 'David Kim',
            role: 'VP of Operations',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
            bio: 'Operations expert who ensures smooth travel experiences for millions of customers worldwide.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">

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
            <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Tripma</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
                        We're revolutionizing the way the world travels, one journey at a time.
                        Discover how we're making travel more accessible, affordable, and amazing for everyone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                            Our Story
                        </button>
                        <button className="border-2 cursor-pointer border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                            Join Our Team
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center cursor-default group">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {stat.number}
                                    </h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                Our <span className="text-blue-600">Story</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Founded in 2018, Tripma began with a simple yet powerful vision: to make travel planning
                                    as exciting as the journey itself. What started as a small team of travel enthusiasts
                                    has grown into a global platform trusted by millions.
                                </p>
                                <p>
                                    We noticed that booking travel was often complicated, time-consuming, and expensive.
                                    Our founders, who were frequent travelers themselves, decided to create a solution that
                                    would simplify the entire process while offering the best prices and experiences.
                                </p>
                                <p>
                                    Today, we're proud to serve over 10 million travelers worldwide, helping them discover
                                    new destinations, save money, and create unforgettable memories. Our commitment to
                                    innovation and customer satisfaction drives everything we do.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
                                alt="Our Story"
                                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Our <span className="text-blue-600">Values</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These core principles guide every decision we make and every experience we create
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white cursor-default rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Meet Our <span className="text-blue-600">Team</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate individuals behind Tripma's success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-gray-50 cursor-default rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        Join millions of travelers who trust Tripma to make their adventures extraordinary
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                            Start Planning
                        </button>
                        <button className="border-2 cursor-pointer border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <TripmaFooter />

            {/* Sign up Section */}
            <div className=''>
                <SignUp status={signupStatus} onSignupChanged={handleSignupStatusChange} />
            </div>
        </div>
    );
}

export default AboutUs;