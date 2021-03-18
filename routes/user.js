const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', userController.get_user);

router.post('/addrequest', userController.add_friend);

module.exports = router;
