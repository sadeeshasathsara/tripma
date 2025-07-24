import { fetchTrips } from "../services/trips.service.js";

/**
 * Controller to handle HTTP GET /api/trips
 *
 * Query Params:
 *   - lastFetched (number): Optional pagination offset (defaults to 0)
 *
 * Response:
 *   - 200: { message: TripDTO[] }
 *   - 500: { message: error }
 */
export default async function GetTrips(req, res) {
    try {
        // Parse pagination offset from query string
        const lastFetched = parseInt(req.query.lastFetched, 10) || 0;

        // Delegate to service layer
        const trips = await fetchTrips({ skip: lastFetched, limit: 20 });

        // Return JSON response
        return res.status(200).json({ message: trips });
    } catch (error) {
        // On error, return 500 with error message
        return res.status(500).json({ message: error.message });
    }
}
