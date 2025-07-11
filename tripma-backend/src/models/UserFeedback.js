import mongoose from 'mongoose';

const userFeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tripBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TripBooking'
  },
  feedback: String,
  stars: Number
}, { timestamps: true });

export default mongoose.model('UserFeedback', userFeedbackSchema);