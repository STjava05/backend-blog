const multer = require('multer');  
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');



cloudinary.config({
    cloud_name: 'det3ogegq',
    api_key: '173525867179237',
    api_secret: 'R5E4ld6sYk-vHL66GbU-YFfpnt0'
    
});



const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'images',
        allowedFormats: ['jpg', 'png']
    }    
});



/* const storage = multer.diskStorage({ //indica dove salvare i file
    destination: (req, file, callback) => { //indica la cartella di destinazione
        callback(null, 'images');
    },
    filename: (req, file, callback) => { //indica il nome del file
        console.log(file);
        const name = file.originalname.split(' ').join('_'); //rimuove gli spazi dal nome del file
        
        callback(null, name);
    }
});
 */


module.exports = multer({ storage: cloudinaryStorage }).single('imageRef'); //esporta il middleware multer configurato per caricare un solo file chiamato image
