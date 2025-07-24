import axios from 'axios';
import { BACKEND_URL } from '../tools/Tools';

/**
 * Fetch paginated city codes from the backend
 * @param {number} skip - number of records to skip
 * @param {number} limit - number of records to fetch
 * @returns {Promise<{ data: Array, total: number, hasMore: boolean }>}
 */
export const fetchCityCodes = async (skip = 0, limit = 10) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/city-codes?skip=${skip}&limit=${limit}`);
        return response.data; // { data, total, hasMore }
    } catch (error) {
        console.error('Error fetching city codes:', error);
        throw error;
    }
};
