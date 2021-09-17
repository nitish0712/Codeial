const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
//router.get('/base', homeController.base);

router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));


//for any further routes , access from here
//router.use('/routerName' , require('./filePath'))

router.use('/api', require('./api'));

module.exports = router;

