import { resolveCityToIATACode } from "../api/lufthunsa/getIATACode.js";
import searchLufthansaFlights from "../api/lufthunsa/searchFlights.js";

/**
 * Controller for frontend -> fetch flights based on filters
 */
const GetFilteredFlights = async (req, res) => {
    const { from, to, tripDetails, seats } = req.body;

    if (!from || !to || !tripDetails?.departDate) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: from, to, or departDate'
        });
    }

    try {
        const originCode = await resolveCityToIATACode(from);
        const destinationCode = await resolveCityToIATACode(to);

        const result = await searchLufthansaFlights({
            fromCity: originCode,
            toCity: destinationCode,
            departDate: tripDetails.departDate,
            returnDate: tripDetails.type === 'round_trip' ? tripDetails.returnDate : null,
            adultCount: seats?.adults ?? 1,
            minorCount: seats?.minors ?? 0
        });

        res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
        console.error('Flight search error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during flight search',
            error: error.message
        });
    }
};

export default GetFilteredFlights;
