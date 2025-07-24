import axios from 'axios'
import { BACKEND_URL } from '../tools/Tools';

export default async function InitialUserAPI() {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/user/initial`, {}, { withCredentials: true })
        return res.data
    } catch (e) {
        console.log(e);
        return e.message
    }
}

export async function FullUserAPI() {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/user/details`, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.error('FullUserAPI error:', e);
        return { success: false, message: e.message };
    }
}