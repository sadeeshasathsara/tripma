import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../tools/Logout';
import { BACKEND_URL } from '../../../../tools/Tools';

function Navbar({ onSignupChanged }) {
    const baseLinks = [
        { label: 'Flights', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const authLinks = [
        { label: 'Sign In', href: '/login' },
        { label: 'Sign Up', href: '#', isPrimary: true },
    ];

    const [selectedLink, setSelectedLink] = React.useState('Flights');

    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    React.useEffect(() => {
        if (isLoggedIn) {
            console.log("User is logged in:", user);
        }
    }, [isLoggedIn]);


    const location = useLocation()

    // Create links array based on login status
    const links = isLoggedIn ? baseLinks : [...baseLinks, ...authLinks];

    useEffect(() => {
        links.map((link) => {
            if (link.href == location.pathname) setSelectedLink(link.label)
        })
    }, [])

    const MotionLink = motion.create(Link);

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    }

    const handleSignupStatusChange = (status) => {
        onSignupChanged(true);
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const ProfileIcon = () => (
        user?.profilePic ? (
            <img
                src={`${BACKEND_URL}${user.profilePic}`}
                onClick={() => navigate('/profile')}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:brightness-90 transition"
            />
        ) : (
            <div
                onClick={() => logoutUser(dispatch)}
                className="flex items-center justify-center w-10 h-10 bg-[#605DEC] rounded-full text-white font-medium cursor-pointer hover:bg-[#5f3dec] transition-colors"
            >
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </div>
        )
    );


    return (
        <div className="w-full flex items-center justify-between px-[24px]">

            {/* Logo */}
            <Link to='/'>
                <img src='./Logo.svg' alt='Tripma Logo' />
            </Link>

            {/* Navigation Links */}
            <div className={`p-[16px] grid gap-[16px] text-center items-center ${isLoggedIn ? 'grid-cols-4' : 'grid-cols-5'}`}>

                {links.map((link, index) => (
                    link.isPrimary ? (
                        <MotionLink
                            key={index}
                            to={link.href}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="bg-[#605DEC] rounded-[4px] px-[20px] py-[12px] body-md text-white flex items-center justify-center border hover:bg-[#5f3dec]"
                            onClick={handleSignupStatusChange}
                        >
                            {link.label}
                        </MotionLink>
                    ) : (
                        <MotionLink
                            key={index}
                            to={link.href}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className={
                                link.label === selectedLink
                                    ? 'text-[#605DEC] body-md border-b-3 border-[#605DEC]'
                                    : 'text-[#7C8DB0] hover:text-[#56698e] body-md'
                            }
                            onClick={() => handleLinkClick(link.label)}
                        >
                            {link.label}
                        </MotionLink>)
                ))}

                {/* Profile Icon - only show when logged in */}
                {isLoggedIn && <ProfileIcon />}

            </div>
        </div>

    )
}

export default Navbar