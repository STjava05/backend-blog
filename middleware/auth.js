const jwt = require('jsonwebtoken');



exports.auth = (req, res, next) => {
    try {
        if(process.env.DEV == 'true'){
            next();
            return;

        }
        const token = req.headers.authorization.split(" ")[1]; // ottieni il token dalla richiesta
        const decodedToken = jwt.verify(token, process.env.JWT_KEY); // decodifica il token
        const userId = decodedToken.userId; // ottieni l'ID utente dal token
        if (req.body.userId && req.body.userId !== userId) { // se l'ID utente non corrisponde a quello del token
             throw 'User ID non valdo';
        } else {
            next(); // se l'ID utente corrisponde a quello del token, passa alla prossima funzione
        }
    } catch {
        res.status(401).json({
            error: new Error('Richiesta non valida!')
        });
    }
}