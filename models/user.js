const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    date: { type: Date, default: Date.now },
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

userSchema.virtual('fullname').get(() => {
    return `${this.firstname} ${this.lastname}`;
});

userSchema.virtual('url').get(() => {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('User', userSchema);
