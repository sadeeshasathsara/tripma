import mongoose from 'mongoose';

const userAccountSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    appleId: String,
    facebookId: String
}, { timestamps: true });

export default mongoose.model('UserAccount', userAccountSchema);