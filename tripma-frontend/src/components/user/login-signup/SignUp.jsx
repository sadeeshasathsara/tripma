import React from 'react';
import { IoClose } from 'react-icons/io5';
import Google from '../../../assets/login-signup/google.svg';
import Facebook from '../../../assets/login-signup/facebook.svg';
import Apple from '../../../assets/login-signup/apple_mac.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useToastProvider } from '../../../tools/ToastProvider';
import { logInWithGoogleAPI, registerWithEmailAPI, registerWithGoogleAPI } from '../../../api/AuthAPI';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import User from '../../../tools/User';
import Cookies from 'js-cookie';
import InitialUserAPI from '../../../api/UserAPI';

function SignUp({ status, onSignupChanged }) {
    const [signupStatus, setSignupStatus] = React.useState(false);
    const [checkBox1, setCheckbox1] = React.useState(false);
    const [checkBox2, setCheckbox2] = React.useState(false);
    const [submiting, setSubmiting] = React.useState(false);
    const [profilePicturePreview, setProfilePicturePreview] = React.useState(null);

    const { sendMessage } = useToastProvider()

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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        profilePicture: null,
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

    const handleFirstNameChange = (e) => {
        setFormData({
            ...formData,
            firstName: e.target.value
        })
    }

    const handleLastNameChange = (e) => {
        setFormData({
            ...formData,
            lastName: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setFormData({
            ...formData,
            password: e.target.value
        })
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
    }

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                sendMessage('Profile picture must be less than 5MB', 'error');
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                sendMessage('Please select a valid image file (JPEG, PNG, GIF, or WebP)', 'error');
                return;
            }

            setFormData({
                ...formData,
                profilePicture: file
            });

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicturePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const removeProfilePicture = () => {
        setFormData({
            ...formData,
            profilePicture: null
        });
        setProfilePicturePreview(null);
        // Reset the file input
        const fileInput = document.getElementById('profile-picture');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setSubmiting(true)
            const res = await registerWithEmailAPI(formData)
            if (res.success) {
                setSignupStatus(false)
                sendMessage(res.message, 'success')
            } else {
                sendMessage(`Error: ${res.message}`, 'error')
            }
            setSubmiting(false)
            handleClose()
        }
    }

    const isFormValid = () => {
        const { firstName, lastName, email, password, termsAndConditions } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const minLength = /.{8,}/;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const digit = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!firstName.trim()) {
            sendMessage('Please enter your first name', 'error');
            return false;
        }
        if (!lastName.trim()) {
            sendMessage('Please enter your last name', 'error');
            return false;
        }
        if (!email) {
            sendMessage('Please enter an email', 'error');
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

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSuccess = async (credentialResponse) => {
        const idToken = credentialResponse.credential;

        try {
            const res = await registerWithGoogleAPI(idToken)
            if (res.success) {
                sendMessage(res.message, "success");
                const logRes = await logInWithGoogleAPI(idToken)
                console.log(idToken);


                if (logRes) {
                    const userRes = InitialUserAPI()
                    if (userRes.success) {
                        dispatch(login(userRes.message))
                    }
                    setSignupStatus(false)
                    navigate('/')
                } else {
                    sendMessage('Login Unsuccessfull', 'error')
                }
            } else {
                sendMessage(res.message, "error");
            }

        } catch (err) {
            const message = err.message || "Login failed";
            sendMessage(message, "error");
        }
    };

    const handleError = () => {
        sendMessage("Google login failed", "error");
    };

    return (
        <AnimatePresence>
            {signupStatus && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-[#52527A] bg-opacity-50 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.form
                        onSubmit={handleFormSubmit}
                        className="absolute top-1/2 left-1/2 z-40 bg-[#fff] flex items-center flex-col gap-[12px] px-[50px] py-[30px] rounded-[12px] text-[#6E7491] shadow-md transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll only-scrollbar-thumb max-h-[90vh] w-[90%] max-w-[500px]"
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

                        {/* Profile Picture Section */}
                        <div className="w-full flex flex-col items-center gap-3">
                            <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-[#A1B0CC] rounded-full bg-gray-50 relative overflow-hidden">
                                {profilePicturePreview ? (
                                    <img
                                        src={profilePicturePreview}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="text-2xl text-[#A1B0CC] mb-1">👤</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <label
                                    htmlFor="profile-picture"
                                    className="px-3 py-1 text-sm bg-[#605DEC] text-white rounded cursor-pointer hover:bg-[#4d4bea] transition-colors"
                                >
                                    {profilePicturePreview ? 'Change' : 'Upload'}
                                </label>
                                {profilePicturePreview && (
                                    <button
                                        type="button"
                                        onClick={removeProfilePicture}
                                        className="px-3 py-1 text-sm border border-[#A1B0CC] text-[#6E7491] rounded hover:bg-gray-50 transition-colors"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <input
                                type="file"
                                id="profile-picture"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                            <p className="text-xs text-[#A1B0CC] text-center">Optional: Upload a profile picture (max 5MB)</p>
                        </div>

                        {/* Name Fields */}
                        <div className="w-full flex gap-3">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleFirstNameChange}
                                    className="border text-[#6E7491] border-[#A1B0CC] outline-[#8099c7] rounded-[4px] w-full p-2"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleLastNameChange}
                                    className="border text-[#6E7491] border-[#A1B0CC] outline-[#8099c7] rounded-[4px] w-full p-2"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Email address"
                                name='email'
                                value={formData.email}
                                onChange={handleEmailChange}
                                className="border text-[#6E7491] border-[#A1B0CC] outline-[#8099c7] rounded-[4px] w-full p-2"
                            />
                        </div>

                        <div className="w-full">
                            <input
                                type="password"
                                name='password'
                                placeholder="Password"
                                value={formData.password}
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
                                    Create Account
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
                            <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />

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