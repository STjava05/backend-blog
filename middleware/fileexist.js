const multer = require('./multer-config')


const fileexist = (req, res, next) => {
    if (req.body.cover) {
        next();
    } else {
        multer(req, res, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            else {
        next();
            }
        });
    }
}


module.exports = fileexist;