import mongoose from 'mongoose';

const userTripSchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'TripBooking' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tripBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TripBooking' }
});

export default mongoose.model('UserTrip', userTripSchema);