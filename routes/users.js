const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication ,usersController.profile);

router.get('/signin', usersController.signin);

router.get('/signup', usersController.signup);

router.post('/create', usersController.create);

//use passport as middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), usersController.createSession );

module.exports = router;