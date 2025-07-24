import mongoose from 'mongoose';

const seatMapSchema = new mongoose.Schema({
    seatMap: [String],
}, { _id: false });

const aircraftSchema = new mongoose.Schema({
    airline: String,
    flightNumber: String,
    aircraftType: String,
    totalSeats: Number,
    classTypes: {
        economy: seatMapSchema,
        business: seatMapSchema,
        first: seatMapSchema
    },
}, { timestamps: true });

export default mongoose.model('Aircraft', aircraftSchema);