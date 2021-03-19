const { body, validationResults } = require('express-validator');
const Post = require('../models/post');

// all
exports.posts_get = async (req, res, next) => {
    try {
        const posts = await Post.find({})
            .populate('author', '-password')
            .populate('likes')
            .populate({
                path: 'comments',
                populate: { path: 'author' },
            });
        if (!posts.length) throw new Error('No posts found');
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

exports.get_users_posts = async (req, res, next) => {
    try {
        const posts = await Post.find({ author: req.params.id })
            .populate('author')
            .populate('likes')
            .populate({
                path: 'comments',
                populate: { path: 'author' },
            });
        if (!posts) throw new Error('No posts found');
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

// single
exports.post_get = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            'author',
            '-password'
        );
        if (!post) throw new Error('No post found');
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.post_create = async (req, res, next) => {
    try {
        const { body, author } = req.body;
        const newPost = new Post({
            body,
            author,
        });
        const post = await newPost.save();
        if (!post) throw new Error('Post could not be created');
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

// exports.post_update = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next(err);
//     }
// };

exports.post_delete = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        if (!post) throw new Error('Post was not found');
        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (err) {
        next(err);
    }
};
