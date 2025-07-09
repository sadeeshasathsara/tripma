import mongoose from 'mongoose';

const userRelationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    relations: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
});

export default mongoose.model('UserRelation', userRelationSchema);