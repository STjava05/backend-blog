const express = require('express');
const github = express.Router();
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const GithubStrategy = require('passport-github2');

require('dotenv').config();

// Configura il middleware di sessione con la chiave segreta del client GitHub
github.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));
//Configura Passport.js per l'utilizzo con Express e il middleware di sessione. Passport è un framework di autenticazione per Node.js.
github.use(passport.initialize());
github.use(passport.session());

//Configura le funzioni di serializzazione e deserializzazione degli utenti per Passport. Queste funzioni sono necessarie per salvare e ripristinare gli oggetti utente nella sessione.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configura la strategia di autenticazione con GitHub
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Rotta per l'autenticazione con GitHub
github.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
  const redirectUrl = `${process.env.GTIHUB_FE_URL}/success?user=${encodeURIComponent(
    JSON.stringify(req.user)
  )}`;

  // Reindirizza all'URL specificato per l'autenticazione con GitHub
  res.redirect(redirectUrl);
});

// Rotta di callback dopo l'autenticazione con GitHub
github.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  // Genera un token JWT contenente l'ID dell'utente
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_KEY, { expiresIn: '1h' });

  // Costruisci l'URL di reindirizzamento con il token come parametro
  const redirectUrl = `${process.env.GITHUB_FE_URL}/success?token=${encodeURIComponent(token)}`;

  // Reindirizza all'URL specificato dopo aver completato l'autenticazione con GitHub
  res.redirect(redirectUrl);
});

// Rotta per il reindirizzamento alla home dopo il completamento dell'autenticazione
github.get('/success', (req, res) => {
  res.redirect(`${process.env.GITHUB_FE_URL}/home`);
});

module.exports = github;
