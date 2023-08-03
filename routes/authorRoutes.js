const app = require('express').Router();
const authorCtrl = require('../controllers/author');

app.get('/', authorCtrl.getAllAuthor);
app.post('/', authorCtrl.createAuthor);
app.get('/:id', authorCtrl.getOneAuthor);
app.patch('/:id', authorCtrl.updateAuthor);
app.delete('/:id', authorCtrl.deleteAuthor);

module.exports = app;