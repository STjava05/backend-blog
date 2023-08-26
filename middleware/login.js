const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authorModel = require('../models/authorModel');


exports.login = (req, res) => {
   authorModel.findOne({ email: req.body.email })
        .then(user => {
            console.log(user);
            if (!user) { return res.status(401).json({ error: 'Utente non trovato!' }); }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    if (!valid) { return res.status(401).json({ error: 'Password errata!' }); }
                   
                    res.status(200).json({

                        token: jwt.sign(
                            {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                dateOfBirth: user.dateOfBirth,
                                cover: user.cover,
                                email: user.email,

                             },
                            process.env.JWT_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }
        )
    }