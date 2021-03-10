const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    body: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', postSchema);
