const OTP = require("./model");
const generateOTP = require("./../../util/generateOTP");
const sendEmail = require("./../../util/sendEmail");
const { SendToMobile } = require("@mui/icons-material");
const { AUTH_EMAIL } = process.env;
const sendOTP = async () = ({ email, subject, message, duration = 1}) => {
    try {
        if (!(email, && subject && message)) {
            throw Error("Provide values for email, subject, message");
        }

        await OTP.deleteOne({ email });

        const genereteOTP = await generateOTP();

        const mailOptions = {
            from: AUTH_EMAIL,
            to:email,
            subject,
            html: '<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP)</b></p><p>This code </b>expires in ${duration} hour(s)</b>.</p>',
        };
        await sendEmail(mailOptions);

        //save otp record
        const newOTP = await new OTP({
            email,
            createdAt:Date.now(),
            createdAt:Date.now() + 3600000 * + duration,
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        throw error;
    } 
};

module.exports = { sendOTP };
