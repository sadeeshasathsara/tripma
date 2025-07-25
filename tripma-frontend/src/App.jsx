import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/user/LandingPage'
import Location from './tools/Location'
import { ToastProvider } from './tools/ToastProvider'
import SignIn from './components/user/login-signup/SignIn'
import { tripsBuffer } from './tools/InitiateProcess'
import AboutUsPage from './pages/user/AboutUsPage'
import ContactUsPage from './pages/user/ContactUsPage'
import TripsPage from './pages/user/TripsPage'
import ProfilePage from './pages/user/ProfilePage'
import FlightSearch from './pages/user/FlightsPage'

function App() {

  return (
    <ToastProvider>
      <Location />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact' element={<ContactUsPage />} />
        <Route path='/trips' element={<TripsPage />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/flight' element={<FlightSearch />} />
      </Routes>

    </ToastProvider>
  )
}

export default App
