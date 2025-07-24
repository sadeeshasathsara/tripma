import axios from 'axios';
import getAccessToken from './getAccessTocken.js';

/**
 * Resolves a city name to its IATA city code using Lufthansa MDS Cities API.
 *
 * @param {string} cityName - The city name to resolve (e.g., "Tokyo")
 * @returns {Promise<string>} - Resolved IATA city code (e.g., "TYO")
 */
export const resolveCityToIATACode = async (cityName) => {
    if (!cityName) throw new Error("City name is required");

    const token = await getAccessToken();

    let limit = 100;
    let offset = 0;
    let totalFound = false;

    while (!totalFound) {
        const response = await axios.get(
            `https://api.lufthansa.com/v1/mds-references/cities?limit=${limit}&offset=${offset}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }
        );

        const cities = response?.data?.CityResource?.Cities?.City;
        if (!cities || !Array.isArray(cities)) break;

        for (const city of cities) {
            const nameVariants = Array.isArray(city?.Names?.Name)
                ? city.Names.Name
                : [city.Names?.Name];

            for (const nameEntry of nameVariants) {
                const name = nameEntry?.['$']?.toLowerCase();
                if (name && name.includes(cityName.toLowerCase())) {
                    if (city.CityCode) return city.CityCode;
                }
            }
        }

        const totalCount = parseInt(response?.data?.CityResource?.Meta?.TotalCount || '0');
        offset += limit;
        if (offset >= totalCount) {
            totalFound = true;
        }
    }

    console.error(`resolveCityToIATACode error: No airport found for city "${cityName}"`);
    throw new Error('Unable to resolve IATA code');
};
