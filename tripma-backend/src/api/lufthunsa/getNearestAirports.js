import axios from 'axios';
import getAccessToken from './getAccessTocken.js';

const getNearestAirports = async (lat, lon) => {
    try {
        const token = await getAccessToken();

        const res = await axios.get(
            `https://api.lufthansa.com/v1/references/airports/nearest/${lat},${lon}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }
        );

        return res.data?.NearestAirportResource.Airports;
    } catch (e) {
        if (e.response) {
            console.error('Error status:', e.response.status);
            console.error('Error data:', e.response.data);
        } else if (e.request) {
            console.error('No response received:', e.request);
        } else {
            console.error('Axios error:', e.message);
        }

        return [];
    }
};

export default getNearestAirports;
