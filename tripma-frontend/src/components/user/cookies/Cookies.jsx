import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

function Cookies() {

    const [displayCookie, setDisplayCookie] = React.useState(true)

    React.useEffect(() => {
        const accepted = localStorage.getItem('cookieAccepted')
        if (accepted) {
            setDisplayCookie(false)
        } else {
            setDisplayCookie(true)
        }
    }, [])

    function handleAccept() {
        localStorage.setItem('cookieAccepted', true)
        setDisplayCookie(false)
    }

    function handleClose() {
        setDisplayCookie(false)
    }

    return (
        <AnimatePresence>
            {displayCookie && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}

                    className='border-1 border-[#605DEC] bg-[#F6F6FE] relative shadow rounded'
                >
                    <div className='text-black p-4 flex justify-between items-center shadow-md'>
                        <div className='header-h4 text-[#605DEC]'>
                            We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
                        </div>
                        <div className='flex items-center justify-center gap-3'>
                            <button className='bg-[#605DEC] cursor-pointer text-white px-7 py-2 rounded hover:bg-[#4b48b9]' onClick={handleAccept}>
                                Accept
                            </button>
                            <button className='bg-[#605DEC] cursor-pointer text-white px-7 py-2 rounded hover:bg-[#4b48b9]' onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div >
            )}
        </AnimatePresence>
    )
}

export default Cookies