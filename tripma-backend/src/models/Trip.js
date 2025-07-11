import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    duration: { type: Number, default: null },
    price: { type: Number, default: null },
    originalPrice: { type: Number, default: null },
    rating: { type: Number, default: null },

    tags: [{
        tagId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            default: null
        }
    }],

    places: [{
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place',
            default: null
        }
    }],

    reviews: [{
        reviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserFeedback',
            default: null
        }
    }]
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;