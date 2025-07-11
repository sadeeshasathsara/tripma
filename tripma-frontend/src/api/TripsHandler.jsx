import axios from 'axios';
import { BACKEND_URL } from '../tools/Tools';
import TripDSO from '../DSOs/TripDSO';

class TripsHandler {
    static #instance = null;
    trips = [];
    #lastFetched = 0;

    constructor() {
        if (TripsHandler.#instance) {
            return TripsHandler.#instance;
        }
        TripsHandler.#instance = this;

        this.fetchTrips();
    }

    /**
     * Fetches trips incrementally and appends to internal array
     * Used for default loading strategy
     */
    async fetchTrips() {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/trips`, {
                params: { lastFetched: this.#lastFetched }
            });

            const newTrips = res.data.message.map((trip) => {
                const tripObj = new TripDSO(trip);

                trip.places?.forEach((place) => tripObj.putPlaces(place));
                trip.tags?.forEach((tag) => tripObj.putTag(tag));
                trip.reviews?.forEach((review) => tripObj.putReviews(review));

                return tripObj;
            });

            this.trips.push(...newTrips);
            this.#lastFetched = this.trips.length;

            return 1;
        } catch (e) {
            console.error(`Error fetching trips: ${e}`);
            return 0;
        }
    }

    /**
     * Returns paginated trip results without affecting internal `trips` array
     * Used for infinite scroll / lazy loading
     * @param {Object} options
     * @param {number} options.offset - number of trips to skip
     * @param {number} options.limit - number of trips to fetch
     * @returns {Promise<TripDSO[]>}
     */
    async getTrips({ offset = 0, limit = 10 } = {}) {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/trips`, {
                params: { offset, limit }
            });

            const paginatedTrips = res.data.message.map((trip) => {
                const tripObj = new TripDSO(trip);

                trip.places?.forEach((place) => tripObj.putPlaces(place));
                trip.tags?.forEach((tag) => tripObj.putTag(tag));
                trip.reviews?.forEach((review) => tripObj.putReviews(review));

                return tripObj;
            });

            return paginatedTrips;
        } catch (e) {
            console.error(`Error fetching paginated trips: ${e}`);
            return [];
        }
    }

    async search(paramsObj = {}) {

        try {
            const res = await axios.post(`${BACKEND_URL}/api/filter`, paramsObj)
            return res.data.message
        } catch (e) {
            console.error(e.message);
        }

    }

    static getInstance() {
        if (!TripsHandler.#instance) {
            TripsHandler.#instance = new TripsHandler();
        }
        return TripsHandler.#instance;
    }
}

export default TripsHandler;
