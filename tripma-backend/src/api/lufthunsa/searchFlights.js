import axios from 'axios';
import getAccessToken from './getAccessTocken.js';
import { format } from 'date-fns';
import fs from 'fs/promises';
import path from 'path';

/**
 * Format YYYY-MM-DD to Lufthansa format: DDMMMyy (e.g., 24JUL25)
 */
const toLufthansaDate = (isoDate) => format(new Date(isoDate), 'ddMMMyy').toUpperCase();

/**
 * Load cached city data from a local JSON file
 */
let cachedCities = null;
const loadCachedCities = async () => {
    if (!cachedCities) {
        const filePath = path.join(process.cwd(), 'src/api/lufthunsa/cachedCities.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const parsed = JSON.parse(data);
        cachedCities = parsed?.CityResource?.Cities?.City || [];
    }
    return cachedCities;
};

/**
 * Resolves a city name to its IATA city code using cached Lufthansa cities.
 */
export const resolveCityToIATACode = async (cityName) => {
    if (!cityName) throw new Error("City name is required");

    const cities = await loadCachedCities();

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

    console.error(`resolveCityToIATACode error: No airport found for city "${cityName}"`);
    throw new Error('Unable to resolve IATA code');
};

/**
 * Search Lufthansa passenger flights based on given parameters.
 */
const searchLufthansaFlights = async ({
    fromCity,
    toCity,
    departDate,
    returnDate,
    adultCount = 1,
    minorCount = 0
}) => {
    if (!fromCity || !toCity || !departDate) {
        throw new Error('fromCity, toCity, and departDate are required');
    }

    try {
        const token = await getAccessToken();

        const fetchFlights = async (origin, destination, date) => {
            const formattedDate = toLufthansaDate(date);
            const url = `https://api.lufthansa.com/v1/operations/schedules/${origin}/${destination}/${formattedDate}?directFlights=1`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            return response.data;
        };

        const departFlights = await fetchFlights(fromCity, toCity, departDate);
        let returnFlights = null;

        if (returnDate) {
            returnFlights = await fetchFlights(toCity, fromCity, returnDate);
        }

        return {
            success: true,
            data: {
                departFlights,
                returnFlights,
                passengers: {
                    adults: Number(adultCount),
                    minors: Number(minorCount)
                }
            }
        };
    } catch (error) {
        console.error('Lufthansa flight search error:', error.message);
        return {
            success: false,
            message: 'Failed to fetch flight data',
            error: error.message
        };
    }
};

export default searchLufthansaFlights;