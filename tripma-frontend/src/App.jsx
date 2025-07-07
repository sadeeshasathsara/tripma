import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/user/LandingPage'
import Location from './tools/Location'
import { ToastProvider } from './tools/ToastProvider'
import AboutUs from './components/user/about/AboutUs'
import ContactUs from './components/user/contact/ContactUs'
import SignIn from './components/user/login-signup/SignIn'

function App() {

  return (
    <ToastProvider>
      <Location />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/login' element={<SignIn />} />
      </Routes>

    </ToastProvider>
  )
}

export default App
