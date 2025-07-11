import axios from "axios";
import { BACKEND_URL } from "../tools/Tools";

async function FetchPlaces() {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/places`)
        return res.data.message
    } catch (e) {
        console.log(`Error fetching tags: ${e.message}`);
        return 0
    }
}

export default FetchPlaces