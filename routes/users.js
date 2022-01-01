const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication ,usersController.profile);
router.post('/update/:id',passport.checkAuthentication ,usersController.update);

router.get('/signin', usersController.signin);

router.get('/signup', usersController.signup);

router.post('/create', usersController.create);

router.get('/forgot', usersController.forgot);

router.post('/reset', usersController.reset);

router.post('/resetPass', usersController.resetPassword);

//use passport as middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), usersController.createSession );

router.get('/signout', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), usersController.createSession);

module.exports = router;