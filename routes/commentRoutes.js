const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');


router.get('/', commentCtrl.getAllComment);
router.post('/', commentCtrl.createComment);
router.get('/:id', commentCtrl.getOneComment);
router.patch('/:id', commentCtrl.updateComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;
