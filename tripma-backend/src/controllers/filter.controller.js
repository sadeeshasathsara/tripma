import { fetchTrips } from "../services/trips.service.js";

/**
 * Controller to handle HTTP POST /api/trips/filter
 *
 * Body Params:
 *   - search: string (optional)           - Keyword to search in trip name or description
 *   - priceRange: { min: number, max: number } (optional)
 *   - flightHours: Record<string, boolean> (optional)  - Object mapping duration buckets (0–3) to boolean
 *   - ratings: Record<string, boolean> (optional)      - Object mapping rating floors (0–5) to boolean
 *   - tags: Record<string, boolean> (optional)         - Object mapping tag IDs to boolean
 *   - places: Record<string, boolean> (optional)       - Object mapping place IDs to boolean
 *   - sortBy: string (optional)       - Sort key: "lowToHigh", "highToLow", "rating", "duration", "newest"
 *
 * Response:
 *   - 200: { message: TripDTO[] }     - Filtered and sorted trip list
 *   - 500: { message: error }         - Error message
 */
export default async function GetFilteredTrips(req, res) {
    try {
        const {
            search = "",
            priceRange = { min: 0, max: Infinity },
            flightHours = {},
            ratings = {},
            tags = {},
            places = {},
            sortBy = ""
        } = req.body;

        let trips = await fetchTrips();

        // 1) Search filter: match name or description
        if (search.trim()) {
            const q = search.toLowerCase();
            trips = trips.filter(t =>
                t.name.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q)
            );
        }

        // 2) Price filter: within range
        trips = trips.filter(t => {
            const p = Number(t.price);
            return p >= priceRange.min && p <= priceRange.max;
        });

        // 3) Duration filter: based on flightHours buckets
        const durationRanges = [[0, 2], [2, 5], [5, 10], [10, Infinity]];
        const activeDurations = Object.entries(flightHours)
            .filter(([_, on]) => on)
            .map(([idx]) => durationRanges[Number(idx)])
            .filter(Boolean);
        if (activeDurations.length) {
            trips = trips.filter(t => {
                const d = Number(t.duration);
                return activeDurations.some(([min, max]) => d >= min && d < max);
            });
        }

        // 4) Ratings filter: filter for “selected rating and up”
        //    index 0 → 5 stars+, 1 → 4 stars+, 2 → 3 stars+, etc.
        const selectedThresholds = Object.entries(ratings)
            .filter(([_, on]) => on)
            // map index to the numeric threshold
            .map(([idx]) => 5 - Number(idx));

        if (selectedThresholds.length) {
            // if multiple are checked, we want the *lowest* threshold
            const minThreshold = Math.min(...selectedThresholds);
            trips = trips.filter(trip =>
                Number(trip.rating) >= minThreshold
            );
        }

        // 5) Tags filter: trip tags or place tags
        const activeTagIds = Object.entries(tags)
            .filter(([_, on]) => on)
            .map(([id]) => id);
        if (activeTagIds.length) {
            trips = trips.filter(t =>
                t.tags.some(tag => activeTagIds.includes(tag._id.toString())) ||
                t.places.some(place =>
                    place.tags.some(tag => activeTagIds.includes(tag._id.toString()))
                )
            );
        }

        // 6) Places filter: match by place ID
        const activePlaceIds = Object.entries(places)
            .filter(([_, on]) => on)
            .map(([id]) => id);
        if (activePlaceIds.length) {
            trips = trips.filter(t =>
                t.places.some(p => activePlaceIds.includes(p._id.toString()))
            );
        }

        // 7) Sorting logic
        switch (sortBy) {
            case "lowToHigh":
                trips.sort((a, b) => a.price - b.price);
                break;
            case "highToLow":
                trips.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                trips.sort((a, b) => b.rating - a.rating);
                break;
            case "duration":
                trips.sort((a, b) => a.duration - b.duration);
                break;
            case "newest":
                trips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }

        return res.status(200).json({ message: trips });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
