const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    body: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId },
    date: { type: Date, default: Date.now },
    meta: {
        likes: Number,
        comments: Number,
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Post', postSchema);
