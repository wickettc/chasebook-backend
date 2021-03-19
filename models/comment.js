const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    forpost: { type: mongoose.Types.ObjectId, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
