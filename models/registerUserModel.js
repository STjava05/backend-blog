const mongoose = require('mongoose');
const RegisterUserSchema = mongoose.Schema({
    nome: {
        type: String,
    },
    cognome: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },


}, { timestamps: true, strict: true });

module.exports = mongoose.model('RegisterUser', RegisterUserSchema, 'registerUsers');