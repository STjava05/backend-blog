const app = require('express').Router();
const userCtrl = require('../controllers/user');
const fileexist = require('../middleware/fileexist');




app.get('/', userCtrl.getAllUser);
app.get('/:id', userCtrl.getOneUser);
app.patch('/:id', userCtrl.modifyUser);
app.delete('/:id', userCtrl.deleteUser);
app.post('/register', fileexist, userCtrl.createUser);

module.exports = app;