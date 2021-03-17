const Like = require('../models/like');
const Post = require('../models/post');

exports.post_like = async (req, res, next) => {
    try {
        const { forpostID, author } = req.body;
        const newLike = new Like({
            forpostID,
            author,
        });
        const like = await newLike.save();
        if (!like) throw new Error('Like could not be created');
        const refPost = await Post.findOneAndUpdate(
            { _id: forpostID },
            { $addToSet: { likes: like._id } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!refPost) throw new Error('Like could not be added to post');
        res.status(200).json({ like, refPost });
    } catch (err) {
        next(err);
    }
};

exports.post_unlike = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const removedLike = await Like.findByIdAndDelete(
            req.params.id,
            (err) => {
                if (err) next(err);
            }
        );
        if (!removedLike) throw new Error('Like could not be deleted');
        res.status(204).json({ removedLike });
    } catch (err) {
        next(err);
    }
};
