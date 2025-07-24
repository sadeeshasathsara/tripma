import React from 'react'
import MapImg from '../assets/location-access-model/Map.svg'
import { AnimatePresence, motion } from 'framer-motion'
import SendLocation from '../api/SendLocationAPI'
import { useToastProvider } from './ToastProvider'

export default function Location() {
    const [location, setLocation] = React.useState(null)
    const [locationAllowed, setLocationAllowed] = React.useState('prompt')
    const [showModal, setShowModal] = React.useState(true)
    const { sendMessage } = useToastProvider()

    // Load from localStorage or check permission
    React.useEffect(() => {
        const saved = localStorage.getItem('location')
        if (saved) {
            const parsed = JSON.parse(saved)
            setLocation(parsed)
            SendLocation(parsed)
            setShowModal(false)
        } else if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setLocationAllowed(result.state)
                if (result.state === 'granted') {
                    fetchLocation()
                    setShowModal(false)
                }
            }).catch((e) => {
                console.warn('Permissions API error:', e.message)
            })
        }
    }, [])

    const fetchLocation = () => {
        if (!navigator.geolocation) {
            sendMessage('Geolocation is not supported by this browser.', 'error')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                }
                setLocation(coords)
                SendLocation(coords)
                localStorage.setItem('location', JSON.stringify(coords))
                setLocationAllowed('granted')
                setShowModal(false)
            },
            (error) => {
                setLocationAllowed('denied')
                SendLocation(null)
                const messages = {
                    1: 'Permission denied. Please allow location access.',
                    2: 'Location unavailable. Try turning on Wi-Fi or GPS, or disable VPN.',
                    3: 'Location request timed out. Try again.',
                }
                const msg = messages[error.code] || 'Unknown location error.'
                console.error('Location error:', error)
                sendMessage(msg, 'warning')
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
    }

    return (
        <AnimatePresence>
            {locationAllowed !== 'granted' && showModal && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        className='absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#52527A] opacity-40'></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className='absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center'>
                        <div className='max-w-2/5 py-[20px] rounded-md shadow-md bg-white p-3 flex flex-col gap-5 items-center justify-center'>
                            <div className='flex flex-col items-center justify-center '>
                                <img src={MapImg} alt='map-img' className='rounded' />
                                <span className='header-h2 text-center text-[#7a73fd] p-1'>You have to allow location access to proceed!</span>
                                <span className='text-sm text-gray-400'>
                                    Click allow after pressing <span className='font-semibold'>Grant</span>
                                </span>
                            </div>
                            <div className='flex items-center justify-center gap-7'>
                                <button
                                    onClick={() => setShowModal(false)}
                                    type='button'
                                    className='text-white bg-[#5f5decc1] w-[100px] px-3 py-2 rounded text-md text-center cursor-pointer transform transition hover:scale-102 active:scale-97'>
                                    Close
                                </button>
                                <button
                                    onClick={fetchLocation}
                                    type='button'
                                    className='text-white bg-[#5f5decc1] w-[100px] px-3 py-2 rounded text-md text-center cursor-pointer transform transition hover:scale-102 active:scale-97'>
                                    Grant
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
