const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS } = process.env; 
let transporter = nodemailer.createTransport({
    host: "smtp-email.outlook.com",
    auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
    },
});

//test transporter 
transporter.verify((error,success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("ready for message");
        console.log(success);
    }
}); 

const sendEmail = async(mailOptions) => P
