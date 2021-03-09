const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// get all posts
router.get('/posts', postController.posts_get);

router.get('post/:id', postController.post_get);

router.post('/post', postController.post_create);

// router.put('/post/:id', postController.post_update);

router.delete('/post/:id', postController.post_delete);

module.exports = router;
