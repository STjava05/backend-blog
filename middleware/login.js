const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/dataModel');


exports.login = (req, res) => {
    userModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) { return res.status(401).json({ error: 'Utente non trovato!' }); }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) { return res.status(401).json({ error: 'Password errata!' }); }
                    res.status(200).json({
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }
        )
        .catch(error => res.status(500).json({ error }));
}

// handleLoginWithGithub = (req, res) => {
//     window.location.href = 'localhost:3000/auth/github' // redirect to github
// }

// exports.signup = (req, res) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new userModel({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Utente creato!' }))
//                 .catch(error => res.status(400).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// }
