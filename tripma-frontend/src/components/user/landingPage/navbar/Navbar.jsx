import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ onSignupChanged }) {
    const links = [
        { label: 'Flights', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Sign In', href: '/login' },
        { label: 'Sign Up', href: '#', isPrimary: true },
    ];

    const [selectedLink, setSelectedLink] = React.useState('Flights');

    const location = useLocation()

    useEffect(() => {
        links.map((link) => {
            if (link.href == location.pathname) setSelectedLink(link.label)
        })
    }, [])

    const MotionLink = motion(Link);

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    }

    const handleSignupStatusChange = (status) => {
        onSignupChanged(true);
    }


    return (
        <div className="w-full flex items-center justify-between px-[24px]">

            {/* Logo */}
            <Link to='/'>
                <img src='./Logo.svg' alt='Tripma Logo' />
            </Link>

            {/* Navigation Links */}
            <div className='p-[16px] grid grid-cols-5 gap-[16px] text-center items-center '>

                {links.map((link, index) => (
                    link.isPrimary ? (
                        <MotionLink
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

            </div>
        </div>

    )
}

export default Navbar