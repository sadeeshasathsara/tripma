import axios from 'axios'
import { BACKEND_URL } from '../tools/Tools';

export async function registerWithEmailAPI(data) {
    try {
        const formData = new FormData();

        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('dealAlerts', data.dealAlerts);
        formData.append('termsAndConditions', data.termsAndConditions);

        // Only append file if it's available
        if (data.profilePicture instanceof File) {
            formData.append('profilePicture', data.profilePicture);
        }

        const res = await axios.post(`${BACKEND_URL}/api/auth/reg/email`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        return res.data;
    } catch (e) {
        console.log(e);
        return e.response?.data || { success: false, message: 'Something went wrong' };
    }
}


export async function registerWithGoogleAPI(idToken) {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/auth/reg/google`, { idToken })
        return res.data
    } catch (e) {
        console.log(e);
        return e.response.data
    }
}

export async function loginWithEmail(formData = {}) {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/auth/log/email`, {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            profilePicture: formData.profilePicture,
            termsAndConditions: formData.termsAndConditions,
            dealAlerts: formData.dealAlerts
        }, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.log(e);
        return e.response?.data || {
            success: false,
            message: e.message || 'Login failed'
        };
    }
}


export async function logInWithGoogleAPI(idToken) {
    try {
        const res = await axios.post(
            `${BACKEND_URL}/api/auth/log/google`,
            { idToken },
            { withCredentials: true }
        );
        return res.data;
    } catch (e) {
        console.log(e);
        return e.response?.data || { success: false, message: "Unknown error" };
    }
}
