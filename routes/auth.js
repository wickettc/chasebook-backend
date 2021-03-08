const express = require('express');
const userController = require('../controllers/authController');
const router = express.Router();
require('dotenv').config();

router.post('/login', userController.login_post);

router.post('/signup', userController.signup_post);

module.exports = router;
