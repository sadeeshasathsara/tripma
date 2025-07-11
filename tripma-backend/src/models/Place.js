import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    airportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport' },
    name: String,
    bio: String,
    city: String,
    country: String,
    thumbnail: String,
    gallary: [String],
    cover: String,
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);