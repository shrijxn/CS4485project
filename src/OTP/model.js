const mongoose = require("mongoose");
const schema = mongoose.schema;

const OTPSChema =  new Schema({
    email: { type: String, unique: true },
    otp: String,
    CreatedAt: Date,
    expiresAt: Date,
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;

