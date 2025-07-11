import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
    airportCode: String,
    cityCode: String,
    countryCode: String,
    name: String,
    coordinate: {
        latitude: Number,
        longitude: Number,
    }
}, { timestamps: true });

export default mongoose.model('Airport', airportSchema);