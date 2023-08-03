const app = require('express').Router();
const postCtrl = require('../controllers/post');

app.get('/', postCtrl.getAllPost);
app.post('/', postCtrl.createPost);
app.get('/:id', postCtrl.getOnePost);
app.patch('/:id', postCtrl.updatePost);
app.delete('/:id', postCtrl.deletePost);

 
module.exports = app;   