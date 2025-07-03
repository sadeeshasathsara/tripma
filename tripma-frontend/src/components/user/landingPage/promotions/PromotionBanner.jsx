import React from 'react'
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

function PromotionBanner() {

    const [isDisplayed, setIsDisplayed] = React.useState(true);

    const handleClose = () => {
        setIsDisplayed(false);
    }

    return (
        <AnimatePresence>
            {isDisplayed && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className='w-full pt-[16px] pr-[32px] pb-[16px] pl-[32px] bg-[#605DEC] relative'>

                    <p className='text-center text-white header-h4'>Join Tripma today and save up to 20% on your flight using code TRAVEL at checkout. Promotion valid for new users only.</p>

                    <div className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={handleClose}>
                        <IoClose color='white' size={26} />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PromotionBanner