const express =require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');

router.get('/1',postController.post1);
router.get('/2',postController.post2);


module.exports = router;