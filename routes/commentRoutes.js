const app = require('express').Router();
const commentCtrl = require('../controllers/comment');


app.get('/', commentCtrl.getAllComment);
app.post('/', commentCtrl.createComment);
app.get('/:id', commentCtrl.getOneComment);
app.patch('/:id', commentCtrl.updateComment);
app.delete('/:id', commentCtrl.deleteComment);

module.exports = app;
