const nodemailer = require('nodemailer') 
const config = require('../../config')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //smtp protocolo de emails
    port: 465,
    secure: true,
    auth: {
        user: config.api.correo,
        pass: config.api.emailpass
    }
})

module.exports = transporter;
