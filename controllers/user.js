const userModel = require('../models/dataModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createUser = (req, res) => {
    const cover = req.file ? req.file.path : req.body.cover;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new userModel({
                ...req.body,
                password: hash,
                cover: cover

            });
            user.save()
                .then(user => { res.status(201).json(user); })
                .catch(err => { res.status(500).json({ error: err }); });
        }
        )

}

const getAllUser = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Ottieni il numero di pagina dalla query (se non specificato, assume 1)
        const itemPerPage = parseInt(req.query.limit) || 9; // Ottieni il numero di elementi per pagina dalla query (se non specificato, assume 5)

        const totalUsers = await userModel.count(); // Calcola il numero totale di utenti
        const totalPages = Math.ceil(totalUsers / itemPerPage); // Calcola il numero totale di pagine
       const user=await userModel.find()
            .skip((itemPerPage * page) - itemPerPage) //salta gli utenti precedenti alla pagina corrente
            .limit(itemPerPage) ;
            res.status(200).json({ user, totalPages })                     // limita il numero di utenti per pagina
           

    } catch (err) {
        res.status(500).json({ error: err });
    }

}

const getOneUser = (req, res, next) => {

    userModel.findById(req.params.id)
    
        .then(user => { res.status(200).json(user); })
        .catch(err => { res.status(500).json({ error: err }); });
}

const modifyUser = (req, res, next) => {
    userModel.findByIdAndUpdate(req.params.id, {
        ...req.body, id: req.params.id
    })
        .then(user => { res.status(200).json(user); })
        .catch(err => { res.status(500).json({ error: err }); });
}

const deleteUser = (req, res, next) => {
    userModel.findByIdAndDelete(req.params.id)
        .then(user => { res.status(200).json(user); })
        .catch(err => { res.status(500).json({ error: err }); });

}

module.exports = { createUser, getAllUser, getOneUser, modifyUser, deleteUser }

