const registerUserModel = require('../models/registerUserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {
    try {
        const { nome, cognome, email, password } = req.body;

        // Effettua l'hashing della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuovo utente con i dati forniti
        const user = new registerUserModel({
            nome,
            cognome,
            email,
            password: hashedPassword
        });

        // Salva l'utente nel database
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await registerUserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await registerUserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const modifyUser = async (req, res) => {
    try {
    const userId=req.params.id;
    const { nome, cognome, email, password } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is missing' });
    }
    const updateUser = await registerUserModel.findByIdAndUpdate(userId, {
        nome,
        cognome,
        email,
        password
    });
    res.status(200).json(updateUser);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}



const deleteUser = async (req, res) => {
    try {
        const user = await registerUserModel.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    modifyUser,
    deleteUser
}