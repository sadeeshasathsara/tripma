import React from 'react'
import Cookies from '../../components/user/cookies/Cookies';
import PromotionBanner from '../../components/user/landingPage/promotions/PromotionBanner';
import Navbar from '../../components/user/landingPage/navbar/Navbar';
import SignUp from '../../components/user/login-signup/SignUp';
import TripmaFooter from '../../components/user/landingPage/footer/Footer';
import HeroBannerSlider from '../../components/user/tripsPage/Banner';
import TripsContainer from '../../components/user/tripsPage/TripsContainer';

function TripsPage() {
    const [signupStatus, setSignupStatus] = React.useState(false);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    }

    return (
        <div>
            {/* Cookies Box */}
            <div className='w-full fixed bottom-0 px-3 py-2 z-50'>
                <Cookies />
            </div>

            {/* Promotion Banner */}
            <div className='w-full'>
                <PromotionBanner />
            </div>

            {/* Navbar */}
            <div className='w-full top-0 z-30'>
                <Navbar onSignupChanged={handleSignupStatusChange} />
            </div>

            {/* Sign up Section */}
            <div className=''>
                <SignUp status={signupStatus} onSignupChanged={handleSignupStatusChange} />
            </div>

            {/* Add Banner Section */}
            <div>
                <HeroBannerSlider />
            </div>

            {/* Add Banner Section */}
            <div>
                <TripsContainer />
            </div>

            {/* Reviews Section */}
            <TripmaFooter />
        </div>
    )
}

export default TripsPage