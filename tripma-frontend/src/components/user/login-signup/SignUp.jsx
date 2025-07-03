import React from 'react';
import { IoClose } from 'react-icons/io5';
import Google from '../../../assets/login-signup/google.svg';
import Facebook from '../../../assets/login-signup/facebook.svg';
import Apple from '../../../assets/login-signup/apple_mac.svg';
import { AnimatePresence, motion } from 'framer-motion';
import SignupAPI from '../../../api/SignupApi';

function SignUp({ status, onSignupChanged, sendMessage }) {
    const [signupStatus, setSignupStatus] = React.useState(false);
    const [checkBox1, setCheckbox1] = React.useState(false);
    const [checkBox2, setCheckbox2] = React.useState(false);
    const [submiting, setSubmiting] = React.useState(false)

    React.useEffect(() => {
        setSignupStatus(status);
    }, [status]);

    const handleClose = () => {
        setSignupStatus(false);
        onSignupChanged(false);
    }

    React.useEffect(() => {
        document.body.style.overflow = signupStatus ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [signupStatus]);

    const handleCheckBox1 = () => {
        setCheckbox1(!checkBox1);
    }

    const handleCheckBox2 = () => {
        setCheckbox2(!checkBox2);
    }

    const [formData, setFormData] = React.useState({
        email: '',
        phone: '',
        password: '',
        termsAndConditions: checkBox1,
        dealAlerts: checkBox2,
    });

    React.useEffect(() => {
        setFormData({
            ...formData,
            termsAndConditions: checkBox1,
            dealAlerts: checkBox2
        })
    }, [checkBox1, checkBox2]);

    const handlePasswordChange = (e) => {
        setFormData({
            ...formData,
            password: e.target.value
        })
    }

    const handleEmailOrPhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value)) {
            // If the input is all digits, treat it as a phone number
            setFormData({ ...formData, phone: value, email: '' });
        } else {
            // Otherwise, treat it as an email
            setFormData({ ...formData, email: value, phone: '' });
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setSubmiting(true)
            const res = SignupAPI(formData)
            if (res == true) {
                sendMessage('Account has been successfully created.', 'success')
            } else {
                sendMessage(`Error: ${res.err}`, 'error')
            }
            setSubmiting(false)
            handleClose()
        }
    }

    const isFormValid = () => {
        const { email, phone, password, termsAndConditions } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const minLength = /.{8,}/;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const digit = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!email && !phone) {
            sendMessage('Please enter an email or phone number', 'error');
            return false;
        }
        if (!password) {
            sendMessage('Please enter a password', 'error');
            return false;
        }
        if (!termsAndConditions) {
            sendMessage('Please agree to the terms and conditions.', 'error');
            return false;
        }
        if (email && !emailRegex.test(email)) {
            sendMessage('Please enter a valid email address.', 'error');
            return false;
        }
        if (phone && phone.length < 10) {
            sendMessage('Please enter a valid phone number.', 'error');
            return false;
        }
        if (!minLength.test(password)) {
            sendMessage('Password should atleast 8 characters', 'error');
            return false;
        }
        if (!uppercase.test(password)) {
            sendMessage('Password should contain at least one uppercase letter', 'error');
            return false;
        }
        if (!lowercase.test(password)) {
            sendMessage('Password should contain at least one lowercase letter', 'error');
            return false;
        }
        if (!digit.test(password)) {
            sendMessage('Password should contain at least one digit', 'error');
            return false;
        }
        if (!specialChar.test(password)) {
            sendMessage('Password should contain at least one special character', 'error');
            return false;
        }

        return true
    }

    return (
        <AnimatePresence>
            {signupStatus && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-[#52527A] bg-opacity-20 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.form
                        onSubmit={handleFormSubmit}
                        className="absolute top-1/2 left-1/2 z-40 bg-[#fff] flex items-center justify-center flex-col gap-[12px] p-[50px] rounded-[12px] text-[#6E7491] shadow-md transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll only-scrollbar-thumb max-h-[90vh] w-[90%] max-w-[500px]"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="w-full relative flex items-baseline justify-center flex-col gap-2">
                            <div className="w-full body-lg flex items-center justify-between">
                                <p className="header-h3">Signup for Tripma</p>
                                <IoClose color="#6E7491" size={25} className="cursor-pointer" onClick={handleClose} />
                            </div>
                            <p>Tripma is totally free to use. Sign up using your email address or phone number below to get started.</p>
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Email or phone number"
                                name='emailOrPhone'
                                onChange={handleEmailOrPhoneChange}
                                className="border text-[#6E7491] border-[#A1B0CC] outline-[#8099c7] rounded-[4px] w-full p-2"
                            />
                        </div>

                        <div className="w-full">
                            <input
                                type="password"
                                name='password'
                                placeholder="Password"
                                onChange={handlePasswordChange}
                                className="border text-[#6E7491] border-[#A1B0CC] outline-[#8099c7] rounded-[4px] w-full p-2"
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <div className="flex items-center gap-2" onClick={handleCheckBox1}>
                                <input type="checkbox" id='checkbox-1' checked={checkBox1} />
                                <label className=''>I agree to the <a href="" target='_blanck' className="underline text-[#605DEC] cursor-pointer">terms and conditions</a></label>
                            </div>
                            <div className="flex items-center gap-2" onClick={handleCheckBox2}>
                                <input type="checkbox" id='checkbox-2' checked={checkBox2} />
                                <label className=''>Send me the latest deal alerts</label>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            {(submiting == false) ? (
                                <button
                                    type="submit"
                                    className="w-full body-lg px-[20px] py-[12px] cursor-pointer hover:bg-[#4d4bea] rounded-[4px] bg-[#605DEC] text-white text-center"
                                >
                                    Create Acount
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full body-lg px-[20px] py-[12px] cursor-wait rounded-[4px] bg-[#605DEC] text-white text-center opacity-70"
                                >
                                    Creating your account...
                                </button>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-center w-full">
                                <div className="flex-grow border-t border-[#CBD4E6]"></div>
                                <span className="px-4 text-gray-500 text-sm">or continue with</span>
                                <div className="flex-grow border-t border-[#CBD4E6]"></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full flex items-center justify-center gap-2 border border-[#605DEC] text-[#605DEC] text-md rounded-[4px] px-[20px] py-[12px] hover:bg-[#605DEC] hover:text-white cursor-pointer hover:border-[#4e4beab3]">
                                <img src={Google} alt="Google" className="h-5 w-5 object-contain" />
                                <p>Continue with Google</p>
                            </div>

                            <div className="w-full flex items-center justify-center gap-2 border border-[#605DEC] text-[#605DEC] text-md rounded-[4px] px-[20px] py-[12px] hover:bg-[#605DEC] hover:text-white cursor-pointer hover:border-[#4e4beab3]">
                                <img src={Apple} alt="Apple" className="h-5 w-5 object-contain" />
                                <p>Continue with Apple</p>
                            </div>

                            <div className="w-full flex items-center justify-center gap-2 border border-[#605DEC] text-[#605DEC] text-md rounded-[4px] px-[20px] py-[12px] hover:bg-[#605DEC] hover:text-white cursor-pointer hover:border-[#4e4beab3]">
                                <img src={Facebook} alt="Facebook" className="h-5 w-5 object-contain" />
                                <p>Continue with Facebook</p>
                            </div>
                        </div>
                    </motion.form>
                </>
            )}
        </AnimatePresence>
    );
}

export default SignUp;
