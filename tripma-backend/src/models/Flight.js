import mongoose from 'mongoose';

const timePointSchema = new mongoose.Schema({
    airportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport' },
    time: Date
}, { _id: false });

const ticketPriceSchema = new mongoose.Schema({
    economy: { price: Number },
    business: { price: Number },
    first: { price: Number }
}, { _id: false });

const flightSchema = new mongoose.Schema({
    aircraftId: { type: mongoose.Schema.Types.ObjectId, ref: 'Aircraft' },
    departure: timePointSchema,
    arrival: timePointSchema,
    gate: String,
    flightHours: Number,
    flightDistance: String,
    availableSeats: Number,
    ticketPrices: ticketPriceSchema,
    status: Boolean
});

export default mongoose.model('Flight', flightSchema);