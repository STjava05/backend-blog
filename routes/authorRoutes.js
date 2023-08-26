const express = require('express');
const router = express.Router();
const authorCtrl = require('../controllers/author');

router.get('/', authorCtrl.getAllAuthor);
router.post('/', authorCtrl.createAuthor);
router.get('/:id', authorCtrl.getOneAuthor);
router.patch('/:id', authorCtrl.updateAuthor);
router.delete('/:id', authorCtrl.deleteAuthor);

module.exports = router;