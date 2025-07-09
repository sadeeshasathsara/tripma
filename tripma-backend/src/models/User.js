import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount',
        default: null
    },
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    type: { type: String, enum: ['adult', 'minor'] },
    dob: Date,
    email: String,
    phoneNumber: String,
    address: {
        house: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String }
    },
    knownTravellerNumber: String,
    emergencyContacts: [String],
    bagsCount: Number
});

export default mongoose.model('User', userSchema);