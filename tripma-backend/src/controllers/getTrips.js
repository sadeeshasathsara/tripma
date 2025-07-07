import { trips } from "../models/testFlightData.js"

const GetTrips = async (req, res) => {
    const filteredTrips = trips?.slice(0, 20)

    console.log(trips);

}

