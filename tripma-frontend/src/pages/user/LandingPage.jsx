import React from 'react'
import PromotionBanner from '../../components/user/landingPage/promotions/PromotionBanner'
import Navbar from '../../components/user/landingPage/navbar/Navbar'
import Hero from '../../components/user/landingPage/hero/Hero'
import Cookies from '../../components/user/cookies/Cookies'
import SignUp from '../../components/user/login-signup/SignUp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LandingPage() {

    const [signupStatus, setSignupStatus] = React.useState(false);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    }

    const sendMessage = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message)
                break
            case 'error':
                toast.error(message)
                break
            case 'info':
                toast.info(message)
                break
            case 'warning':
                toast.warning(message)
                break
            default:
                toast(message)
                break
        }
    }

    return (
        <section className=''>
            <ToastContainer position="top-center" autoClose={3000} />

            {/* Cookies Box */}
            <div className='w-full fixed bottom-0 px-3 py-2 z-50'>
                <Cookies />
            </div>

            {/* Promotion Banner */}
            <div className='w-full'>
                <PromotionBanner />
            </div>

            <div className='relative'>
                {/* Navbar */}
                <div className='w-full absolute top-0'>
                    <Navbar onSignupChanged={handleSignupStatusChange} />
                </div>

                {/* Hero Section */}
                <div className='w-full'>
                    <Hero />
                </div>
            </div>

            {/* Sign up Section */}
            <div className=''>
                <SignUp status={signupStatus} onSignupChanged={handleSignupStatusChange} sendMessage={sendMessage} />
            </div>
        </section>
    )
}

export default LandingPage