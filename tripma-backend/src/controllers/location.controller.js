import getNearestAirports from "../api/lufthunsa/getNearestAirports.js";

const HandleLocation = async (req, res) => {
    try {
        const location = req.body;

        if (!location || typeof location.lat !== 'number' || typeof location.lon !== 'number') {
            return res.status(400).json({ message: "Lat/Lon not provided or invalid" });
        }

        const airports = await getNearestAirports(location.lat, location.lon);

        const nearestAirportCountryCode = airports[0].CountryCode;

        const filteredAirports = filterAirportsByCountryCode(airports, nearestAirportCountryCode)

        res.status(200).json(filteredAirports);

    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: e.message });
    }
};

function filterAirportsByCountryCode(airports, code) {
    const filteredAirports = []

    airports.map((airport) => {
        if (airport.CountryCode == code) {
            filteredAirports.push(airport)
        }
    })

    return filteredAirports
}

export default HandleLocation;


