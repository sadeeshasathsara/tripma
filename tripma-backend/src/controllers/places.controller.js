import PlaceDTO from "./DTOs/PlaceDTO.js";
import Place from "../models/Place.js";

async function GetPlaces(req, res) {
    try {
        const places = await Place.find();
        const queue = places.map(place => new PlaceDTO(place));

        return res.status(200).json({ message: queue });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

export default GetPlaces;
