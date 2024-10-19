const express = require('express');
const { register, login, verifyEmailOtp, verifyMobileOtp, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/verify-email-otp', verifyEmailOtp);
router.post('/verify-mobile-otp', verifyMobileOtp);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
