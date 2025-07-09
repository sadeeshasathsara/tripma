import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: String,
    slug: String,
    type: String
});

export default mongoose.model('Tag', tagSchema);