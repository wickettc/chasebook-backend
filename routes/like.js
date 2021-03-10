const express = require('express');
const likeController = require('../controllers/likeController');
const router = express.Router();

router.post('/:id', likeController.post_like);

module.exports = router;
