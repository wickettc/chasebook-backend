const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
    forpostID: { type: mongoose.Types.ObjectId, required: true },
    author: { type: mongoose.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', likeSchema);
