const express = require('express');
const cors = require('cors');
const {createTransport} = require('nodemailer');
const email = express.Router();


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'van.ortiz7@ethereal.email',
        pass: 'wkQUXJuQVEaW1XqKpH'
    }
});

email.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from:'zeus@hotmail.it',
        to: email,
        subject: `Message from ${name}`,
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('success');
        }
    }
    );
});

module.exports = email;
