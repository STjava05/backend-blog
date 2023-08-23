const app = require('express').Router();
const registerUserCtrl = require('../controllers/registerUser');

app.get('/', registerUserCtrl.getAllUsers);
app.post('/', registerUserCtrl.createUser);
app.get('/:id', registerUserCtrl.getOneUser);
app.patch('/:id', registerUserCtrl.modifyUser);
app.delete('/:id', registerUserCtrl.deleteUser);

module.exports = app;