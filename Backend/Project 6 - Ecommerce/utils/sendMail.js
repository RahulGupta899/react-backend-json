const nodemailer = require('nodemailer')

const mailHelper = async(info)=>{ 
    const {
        SMTP_HOST,
        SMTP_PORT,
        SMTP_USER,
        SMTP_PASSWORD
    } = process.env


    // Nodemailer will create a Transporter
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_USER, 
          pass: SMTP_PASSWORD, 
        },
      });

    const message = {
        from: SMTP_USER,                     // sender address
        to: info.email,                     // list of receivers
        subject: info.subject,              // Subject line
        text: info.message,                 // plain text body
        // html: "<a>Hello world</a>",        // html body
    }
    
    // Now send mail using the transporter
    await transporter.sendMail(message);
}

module.exports = mailHelper

