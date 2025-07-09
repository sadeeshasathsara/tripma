import mongoose from 'mongoose';

const travelerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bagsCount: Number,
    classType: String,
    seat: String,
    fare: Number
}, { _id: false });

const discountSchema = new mongoose.Schema({
    code: String,
    amount: Number,
    type: String
}, { _id: false });

const directBookingSchema = new mongoose.Schema({
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
    travelers: [travelerSchema],
    flightTicketsTotal: Number,
    taxes: Number,
    fees: Number,
    discounts: [discountSchema],
    total: Number,
    bookingTime: Date,
    paymentMethod: String,
    transactionId: String,
    status: String
});

export default mongoose.model('DirectBooking', directBookingSchema);