const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Company');
const sendEmail = require('../config/nodemailer');
const sendSMS = require('../config/twilio');

exports.register = async (req, res) => {
    const { name, email, password, mobile, company  } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        mobile,
        company,
        isVerified: false,
    });

    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const mobileOtp = Math.floor(100000 + Math.random() * 900000);

    user.emailOtp = emailOtp;
    user.mobileOtp = mobileOtp;

    await sendEmail(email, 'Verify Email', `Your OTP is ${emailOtp}`);
    await sendSMS(mobile, `Your OTP is ${mobileOtp}`);

    await user.save();
    res.status(201).json({ message: 'OTP sent to email and mobile' });
};

exports.verifyEmailOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email : email });

    if (!user || user.emailOtp != otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isEmailVerified = true;
    user.emailOtp = null;
    await user.save();

    res.status(200).json({ message: 'Email verified' });
};

exports.verifyMobileOtp = async (req, res) => {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ mobile });

    if (!user || user.mobileOtp != otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isMobileVerified = true;
    user.mobileOtp = null;
    await user.save();

    res.status(200).json({ message: 'Mobile verified' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    // Respond with the token and the user's company name
    res.status(200).json({
        message: 'Logged in',
        name: user.name,
        company: user.company 
    });
};


exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
};
