const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const google = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const session = require('express-session');


google.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}));
//Configura Passport.js per l'utilizzo con Express e il middleware di sessione. Passport è un framework di autenticazione per Node.js.
google.use(passport.initialize());
google.use(passport.session());

//Configura le funzioni di serializzazione e deserializzazione degli utenti per Passport. Queste funzioni sono necessarie per salvare e ripristinare gli oggetti utente nella sessione.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: "http://localhost:3000/auth/google/callback"
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

google.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
        const redirectUrl = `${process.env.GOOGLE_FE_URL}/success?user=${encodeURIComponent(
            JSON.stringify(req.user)
        )}`;

        res.redirect(redirectUrl);


    });

google.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
        const redirectUrl = `${process.env.GOOGLE_FE_URL}/success?token=${encodeURIComponent(token)}`;
        res.redirect(redirectUrl);


        // Reindirizza all'URL specificato dopo aver completato l'autenticazione con GitHub
    },

    google.get('/success', (req, res) => {
        res.redirect(`${process.env.GOOGLE_FE_URL}/success?user=${encodeURIComponent(
            JSON.stringify(req.user)
        )}`);
    })

);

module.exports = google;






