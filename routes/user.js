const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', userController.get_user);

router.post('/sendrequest', userController.send_request);

router.put('/acceptrequest', userController.accept_request);

router.put('/denyrequest', userController.deny_request);

router.put('/removefriend', userController.remove_friend);

module.exports = router;
