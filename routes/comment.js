const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.post('/', commentController.comment_create);

module.exports = router;
