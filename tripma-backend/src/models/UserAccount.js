import mongoose from 'mongoose';

const userAccountSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    appleId: String,
    facebookId: String,
    dealAlerts: Boolean,
    termsAndConditions: Boolean
}, { timestamps: true });

export default mongoose.model('UserAccount', userAccountSchema);