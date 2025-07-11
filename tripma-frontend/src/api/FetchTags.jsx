import axios from "axios";
import { BACKEND_URL } from "../tools/Tools";

async function FetchTags() {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/tags`)
        return res.data.message
    } catch (e) {
        console.log(`Error fetching tags: ${e.message}`);
        return 0
    }
}

export default FetchTags