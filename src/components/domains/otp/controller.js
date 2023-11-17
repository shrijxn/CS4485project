const OTP = require("./model");
const generateOTP = require("./../../util/generateOTP");
const sendEmail = require("./../../util/sendEmail");
const { generatePath } = require("react-router-dom");
const express = require("express");
const { hashData, verifyHashedData } = require("./../../util/hashData");    
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw Error("Provide values for email, otp");
            email;
        }

        const matchedOTPRecord = await OTP.findOne({email,});

        
        if (!matchedOTPRecord) {
            throw Error("No otp records found.");
        }

        const { expiresAt } = matchedOTPRecord;
    
       if (expiresAt < Date.now()) {
        await OTP.deleteOne({email});
        throw Error("Code has expired. Request for a new one.");
       } 

       const hashedOTP = matchedOTPRecord.otp;
       const validOTP = await verifyHashedData(otp, hashedOTP);
       return validOTP;
    } catch (error) {
        throw error;
    }

}
const sendOTP = async ({ email, subject, message, duration = 1}) => {
    try {
    if (!(email && subject && message)) {
        throw Error("Provide values for email, subjects, message");
    }
    //clear any old records
    await OTP.deleteOne({ email });

    //generate pin
    const generatedOTP = await generateOTP();

    //send email
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject,
        html: '<p>${message}</p><p style="color:blue;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b> expires in ${duration} hour(s)</b>.</p>',
    };
    await sendEmail(mailOptions);


    //save otp record

    const hashedOTP = await hashData(generateOTP);
    const newOTP = await new OTP({
        email,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000 * + duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;

    } catch (error) {
        throw error;
    }
}


const deleteOTP = async () => {
    try {
        await OTP.deleteOne({ email });

    } catch (error) {
        throw error;
    }
}
module.exports = { sendOTP, verifyOTP, deleteOTP };
