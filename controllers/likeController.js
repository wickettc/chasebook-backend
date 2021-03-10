const Like = require('../models/like');
const Post = require('../models/post');

exports.post_like = async (req, res, next) => {
    try {
        // probably use async call here to create new like and
        // also push like ID onto post.meta.like array
        const { forpostID, author } = req.body;
        const newLike = new Like({
            forpostID,
            author,
        });
        const like = await newLike.save();
        if (!like) throw new Error('Like could not be created');
        let update = { $push: { likes: like._id } };
        // find post like refers to and add like to meta.likes
        const refPost = await Post.findByIdAndUpdate(
            forpostID,
            update,
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!refPost) throw new Error('Like could not be added to post');
        res.status(204).json({ like, refPost });
    } catch (err) {
        next(err);
    }
};
