const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPost);
router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.patch('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

 
module.exports = router;   