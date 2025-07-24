import axios from "axios";
import { BACKEND_URL } from "../tools/Tools";

const SendLocation = async (location) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/location`, location)
        console.log(res);

    } catch (e) {
        return e.message
    }
}

export default SendLocation

