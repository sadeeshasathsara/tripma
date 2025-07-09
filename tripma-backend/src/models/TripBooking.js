import mongoose from 'mongoose';

const tripBookingSchema = new mongoose.Schema({
    bookedUserAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount'
    },
    forSomeoneElse: Boolean,
    bookings: [{
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DirectBooking'
        }
    }],
    createdAt: Date,
    totalAmount: Number,
    tripNotes: String,
    status: String
});

export default mongoose.model('TripBooking', tripBookingSchema);