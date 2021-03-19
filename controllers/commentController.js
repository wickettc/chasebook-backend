const Comment = require('../models/comment');
const Post = require('../models/post');

exports.comment_create = async (req, res, next) => {
    try {
        const { forpost, body, author } = req.body;
        const newComment = new Comment({
            forpost,
            body,
            author,
        });
        const comment = await newComment.save();
        if (!comment) throw new Error('Comment could not be created');
        const refPost = await Post.findOneAndUpdate(
            { _id: forpost },
            { $addToSet: { comments: comment._id } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!refPost) throw new Error('Comment could not be added to post');
        res.status(201).json({ newComment, refPost });
    } catch (err) {
        next(err);
    }
};
