import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyMobileOTP() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const mobile = sessionStorage.getItem('mobile');
            await axios.post('http://localhost:5001/api/auth/verify-mobile-otp', { mobile, otp });
            alert('Mobile verified successfully');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
            <button type="submit">Verify Mobile</button>
        </form>
    );
}

export default VerifyMobileOTP;
