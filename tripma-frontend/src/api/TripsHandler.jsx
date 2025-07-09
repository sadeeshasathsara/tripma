import axios from 'axios'
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

        this.fetchQueues()
    }

    async fetchQueues() {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/trips`, {
                params: { lastFetched: this.#lastFetched }
            });

            this.#lastFetched = this.trips.length;

            res.data.message.map((trip) => {
                const tripObj = new TripDSO(trip)

                trip.places.map((place) => {
                    tripObj.putPlaces(place)
                })

                trip.tags.map((tag) => {
                    tripObj.putTag(tag)
                })

                trip.reviews.map((review) => {
                    tripObj.putReviews(review)
                })

                this.trips.push(tripObj)
            })

            return 1
        } catch (e) {
            console.log(`Error fetching trips: ${e}`);
            return 0
        }
    }

    async getTrips() {
        if (this.trips.length === 0) {
            await this.fetchQueues();
        }
        return this.trips;
    }

    static getInstance() {
        if (!TripsHandler.#instance) {
            TripsHandler.#instance = new TripsHandler();
        }
        return TripsHandler.#instance;
    }
}

export default TripsHandler