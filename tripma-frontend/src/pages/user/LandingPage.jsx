import React from 'react'
import PromotionBanner from '../../components/user/landingPage/promotions/PromotionBanner'
import Navbar from '../../components/user/landingPage/navbar/Navbar'
import Hero from '../../components/user/landingPage/hero/Hero'
import Cookies from '../../components/user/cookies/Cookies'
import SignUp from '../../components/user/login-signup/SignUp'
import FlightDeals from '../../components/user/flights/FlightDeals'
import XScrollContainer from '../../components/user/flights/XScrollContainer'
import Reviews from '../../components/user/landingPage/reviews/Reviews'
import TripmaFooter from '../../components/user/landingPage/footer/Footer'

function LandingPage() {

    const [signupStatus, setSignupStatus] = React.useState(false);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    }

    return (
        <section className=''>

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
                <div className='w-full absolute top-0 z-30'>
                    <Navbar onSignupChanged={handleSignupStatusChange} />
                </div>

                {/* Hero Section */}
                <div className='w-full'>
                    <Hero />
                </div>
            </div>

            {/* Sign up Section */}
            <div className=''>
                <SignUp status={signupStatus} onSignupChanged={handleSignupStatusChange} />
            </div>

            {/* Sign up Section */}
            <div className='w-full'>
                <FlightDeals />
            </div>

            {/* Trips by category */}
            <XScrollContainer tag={'Hiking'} />
            <XScrollContainer tag={'Scenic Views'} />

            {/* Reviews Section */}
            <Reviews />

            {/* Reviews Section */}
            <TripmaFooter />
        </section>
    )
}

export default LandingPage