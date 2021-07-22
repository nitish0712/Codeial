const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/signin', usersController.signin);

router.get('/signup', usersController.signup);


module.exports = router;