import Flight from '../models/Flight.js';
import Airport from '../models/Airport.js';

/**
 * POST /api/flights/search
 * Body: {
 *   from: "BKL",
 *   to: "MDR",
 *   tripDetails: { type, departDate, returnDate },
 *   seats: { adults, minors }
 * }
 */
export const searchFlights = async (req, res) => {
    try {
        const { from, to, tripDetails, seats } = req.body;

        const totalPassengers = (seats?.adults || 0) + (seats?.minors || 0);
        if (totalPassengers === 0) {
            return res.status(400).json({ message: 'At least one passenger is required.' });
        }

        // Get Airport ObjectIds from city codes
        const [fromAirport, toAirport] = await Promise.all([
            Airport.findOne({ cityCode: from }),
            Airport.findOne({ cityCode: to })
        ]);

        if (!fromAirport || !toAirport) {
            return res.status(404).json({ message: 'Invalid city code(s).' });
        }

        // Define time range for the departure date
        const departStart = new Date(tripDetails.departDate);
        const departEnd = new Date(tripDetails.departDate);
        departEnd.setHours(23, 59, 59, 999);

        // Find matching flights
        const flights = await Flight.find({
            'departure.airportId': fromAirport._id,
            'arrival.airportId': toAirport._id,
            'departure.time': { $gte: departStart, $lte: departEnd },
            availableSeats: { $gte: totalPassengers },
            status: true
        }).populate('aircraftId departure.airportId arrival.airportId');

        return res.status(200).json({ flights });
    } catch (err) {
        console.error('Flight search failed:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
