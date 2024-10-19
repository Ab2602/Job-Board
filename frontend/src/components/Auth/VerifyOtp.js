import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Assuming you will style this later
import Navbar from '../Navbar';
import { GoVerified } from 'react-icons/go'; // Import the green tick icon

function VerifyOTP() {
    const [emailOtp, setEmailOtp] = useState('');  // State for Email OTP
    const [mobileOtp, setMobileOtp] = useState(''); // State for Mobile OTP
    const [isEmailVerified, setIsEmailVerified] = useState(false); // Track email OTP verification
    const [isMobileVerified, setIsMobileVerified] = useState(false); // Track mobile OTP verification
    const navigate = useNavigate();

    // Function to verify email OTP
    const handleEmailOtpSubmit = async (e) => {
        e.preventDefault();
        const email = sessionStorage.getItem('email'); // Fetch email from session storage

        try {
            await axios.post('http://localhost:5001/api/auth/verify-email-otp', { email, otp: emailOtp });
            setIsEmailVerified(true); // Set email verified to true
            alert('Email verified successfully');
        } catch (error) {
            console.error(error);
            alert('Email OTP verification failed. Please try again.');
        }
    };

    // Function to verify mobile OTP
    const handleMobileOtpSubmit = async (e) => {
        e.preventDefault();
        const mobile = sessionStorage.getItem('mobile'); // Fetch mobile from session storage

        try {
            await axios.post('http://localhost:5001/api/auth/verify-mobile-otp', { mobile, otp: mobileOtp });
            setIsMobileVerified(true); // Set mobile verified to true
            alert('Mobile verified successfully');
        } catch (error) {
            console.error(error);
            alert('Mobile OTP verification failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="intro">
                    Please enter the OTPs sent to your email and mobile number to complete the verification.
                </div>

                <div className="form-container">
                    <h3>Verify OTPs</h3>

                    {/* Email OTP Section */}
                    <div className="input-containe  ">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="emailOtp"
                                placeholder="Enter Email OTP"
                                onChange={(e) => setEmailOtp(e.target.value)}
                                disabled={isEmailVerified} // Disable input if email is verified
                            />
                            {isEmailVerified && <GoVerified className="verified-icon" />} {/* Show green tick if verified */}
                        </div>

                        {/* Show button only if not verified */}
                        {!isEmailVerified && (
                            <button onClick={handleEmailOtpSubmit} className="verify-btn">
                                Verify Email OTP
                            </button>
                        )}
                    </div>

                    {/* Mobile OTP Section */}
                    <div className="input-containe">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="mobileOtp"
                                placeholder="Enter Mobile OTP"
                                onChange={(e) => setMobileOtp(e.target.value)}
                                disabled={isMobileVerified} // Disable input if mobile is verified
                            />
                            {isMobileVerified && <GoVerified className="verified-icon" />} {/* Show green tick if verified */}
                        </div>

                        {/* Show button only if not verified */}
                        {!isMobileVerified && (
                            <button onClick={handleMobileOtpSubmit} className="verify-btn">
                                Verify Mobile OTP
                            </button>
                        )}
                    </div>

                    {/* Redirect to login if both are verified */}
                    {isEmailVerified && isMobileVerified && (
                        <button onClick={() => navigate('/login')} className="continue-btn">
                            Continue to Login
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default VerifyOTP;
