import mongoose from 'mongoose';

const featuredPlaceSchema = new mongoose.Schema({
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
    places: [{
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        },
        main: { type: Boolean, default: false }
    }]
}, { timestamps: true });

export default mongoose.model('FeaturedPlace', featuredPlaceSchema);