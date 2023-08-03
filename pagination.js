const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dataModel = require('./models/dataModel');



const itemPerPage = 5;

app.get('/api/users', async (req, res) => {
    const page = parseInt(req.query.page)|| 1; // Ottieni il numero di pagina dalla query (se non specificato, assume 1)

    try {
        const totalUsers = await dataModel.countDocuments({}); // Calcola il numero totale di utenti
        const totalPages = Math.ceil(totalUsers / itemPerPage); // Calcola il numero totale di pagine
        const users = await dataModel.find({})
            .skip((itemPerPage * page) - itemPerPage) //salta gli utenti precedenti alla pagina corrente 
            .limit(itemPerPage);                      // limita il numero di utenti per pagina
        res.status(200).json({ users, totalPages });

    } catch (err) {
        res.status(500).json({ error: err });


    }
});