import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, AlertCircle, Plane, Globe, Star } from 'lucide-react';
import Navbar from '../landingPage/navbar/Navbar';
import TripmaFooter from '../landingPage/footer/Footer';
import Cookies from '../cookies/Cookies';
import PromotionBanner from '../landingPage/promotions/PromotionBanner';
import SignUp from './SignUp';

function SignIn() {
    const [signupStatus, setSignupStatus] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginStatus, setLoginStatus] = useState(null);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setLoginStatus(null);

        // Simulate login process
        setTimeout(() => {
            // Simulate successful login
            setLoginStatus('success');
            setIsSubmitting(false);

            // Reset form after successful login
            setTimeout(() => {
                setFormData({
                    email: '',
                    password: '',
                    rememberMe: false
                });
                setLoginStatus(null);
            }, 2000);
        }, 1500);
    };

    const benefits = [
        {
            icon: <Plane className="w-5 h-5" />,
            text: "Book flights to 150+ destinations worldwide"
        },
        {
            icon: <Globe className="w-5 h-5" />,
            text: "Access exclusive travel deals and discounts"
        },
        {
            icon: <Star className="w-5 h-5" />,
            text: "Earn rewards points with every booking"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

            {/* Cookies Box */}
            <div className='w-full fixed bottom-0 px-3 py-2 z-50'>
                <Cookies />
            </div>

            {/* Promotion Banner */}
            <div className='w-full z-50'>
                <PromotionBanner />
            </div>

            {/* Navbar */}
            <div className='w-full z-30'>
                <Navbar onSignupChanged={handleSignupStatusChange} />
            </div>



            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center pb-10">
                        {/* Left Side - Welcome Content */}
                        <div className="text-center lg:text-left">
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Welcome back to{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                        Tripma
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Sign in to continue your journey and discover amazing travel experiences around the world.
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-4 mb-8">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center justify-center lg:justify-start space-x-3 text-gray-700">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                                            {benefit.icon}
                                        </div>
                                        <span className="text-lg">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">10M+</div>
                                    <div className="text-gray-600">Happy Travelers</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">150+</div>
                                    <div className="text-gray-600">Destinations</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                                    <div className="text-gray-600">Support</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Sign In Form */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                                    <p className="text-gray-600">Enter your credentials to access your account</p>
                                </div>

                                {/* Success Message */}
                                {loginStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                        <p className="text-green-800">Welcome back! Redirecting to your dashboard...</p>
                                    </div>
                                )}

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="mt-2 flex items-center text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="mt-2 flex items-center text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                                checked={formData.rememberMe}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                                Remember me
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Signing in...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                Sign In
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </button>
                                </form>

                                {/* Social Login */}
                                <div className="mt-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="ml-2">Google</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </svg>
                                            <span className="ml-2">Twitter</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Sign Up Link */}
                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            Sign up for free
                                        </button>
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

export default SignIn;