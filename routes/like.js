const express = require('express');
const likeController = require('../controllers/likeController');
const router = express.Router();

router.post('/:id', likeController.post_like);

router.delete('/:id', likeController.post_unlike);

module.exports = router;
