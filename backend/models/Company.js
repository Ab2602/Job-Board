const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    company: String, // Added company field
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    emailOtp: Number,
    mobileOtp: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', companySchema);
