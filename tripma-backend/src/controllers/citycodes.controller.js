// controllers/airport.controller.js
import Airport from "../models/Airport.js";

/**
 * GET /api/airports/city-codes?skip=0&limit=10
 */
export const getCityCodes = async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 10;

        const airports = await Airport.find({})
            .skip(skip)
            .limit(limit)
            .select('cityCode cityName')
            .lean();

        const total = await Airport.countDocuments();

        return res.status(200).json({
            data: airports,
            total,
            hasMore: skip + limit < total
        });
    } catch (err) {
        console.error('Failed to fetch city codes:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
