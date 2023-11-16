const nodemailer = require("nodemailer");


const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: { 
        user: 'onlinetutor123@hotmail.com',
        pass: 'Finalproject123',
    },
    
});

//test trasporter
transporter.verify((error, success) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});


const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;