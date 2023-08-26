const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postsModel = require('../models/postsModel');



const createPost = async (req, res) => {
  try {
    const postToSave =new postsModel({
        ...req.body,

    });
    const post = await postToSave.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }  
}


const getAllPost = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Ottieni il numero di pagina dalla query (se non specificato, assume 1)
        const itemPerPage = parseInt(req.query.limit) || 9; // Ottieni il numero di elementi per pagina dalla query (se non specificato, assume 5)

        const totalUsers = await postsModel.count(); // Calcola il numero totale di utenti
        const totalPages = Math.ceil(totalUsers / itemPerPage); // Calcola il numero totale di pagine
        const posts = await postsModel.find().sort({ createdAt: 'desc' })//ordina gli utenti in ordine decrescente di creazione
            .skip((itemPerPage * page) - itemPerPage) //salta gli utenti precedenti alla pagina corrente
            .limit(itemPerPage);
        res.status(200).json({ posts, totalPages })                     // limita il numero di utenti per pagina


    } catch (err) {
        res.status(500).json({ error: err });
    }

}

const getOnePost = (req, res, next) => {

    postsModel.findById(req.params.id)

        .then(user => { res.status(200).json(user); })
        .catch(err => { res.status(500).json({ error: err }); });
}

const updatePost = (req, res, next) => {
    postsModel.findByIdAndUpdate(req.params.id, {
        ...req.body, id: req.params.id
    })
        .then(user => { res.status(200).json(user); })
        .catch(err => { res.status(500).json({ error: err }); });
}

const deletePost = (req, res, next) => {
    postsModel.findByIdAndDelete(req.params.id)
        .then(user => { res.status(200).json(user); })
        .catch(err => { res.status(500).json({ error: err }); });

}

module.exports = { createPost, getAllPost, getOnePost, updatePost, deletePost };