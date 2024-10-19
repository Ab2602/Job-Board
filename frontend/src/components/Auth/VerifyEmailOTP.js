import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyEmailOTP() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = sessionStorage.getItem('email');
            await axios.post('http://localhost:5001/api/auth/verify-email-otp', { email , otp });
            alert('Email verified successfully');
            navigate('/verify-mobile-otp');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
            <button type="submit">Verify Email</button>
        </form>
    );
}

export default VerifyEmailOTP;
