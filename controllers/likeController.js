const Like = require('../models/like');

exports.post_like = async (req, res, next) => {
    try {
        // probably use async call here to create new like and
        // also push like ID onto post.meta.like array
    } catch (err) {
        next(err);
    }
};
