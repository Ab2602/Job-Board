import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Import the CSS file for consistent styling
import Navbar from '../Navbar';
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";  // For Password

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '', company: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/auth/register', formData);
            sessionStorage.setItem('name', formData.name);
            sessionStorage.setItem('email', formData.email);
            sessionStorage.setItem('mobile', formData.mobile);
            alert('OTP sent to email and mobile');
            navigate('/verify-otp');
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="intro">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti molestias consequuntur sunt tempore maxime voluptatem fugit accusantium ullam deleniti, optio aperiam placeat accusamus.
                </div>

                <div className="form-container">
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        {/* Name Input with Icon */}
                        <div className="input-container">
                            <IoPersonOutline className="input-icon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Mobile Input with Icon */}
                        <div className="input-container">
                            <FaPhoneAlt className="input-icon" />
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Enter Mobile"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Company Name Input with Icon */}
                        <div className="input-container">
                            <IoPersonOutline className="input-icon" />
                            <input
                                type="text"
                                name="company"
                                placeholder="Enter Company Name"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Input with Icon */}
                        <div className="input-container">
                            <MdOutlineEmail className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Input with Icon */}
                        <div className="input-container">
                            <RiLockPasswordLine className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Proceed</button>
                    </form>

                    <p>
                        By clicking on proceed you will accept our 
                        <span style={{ color: "#0B66EFB2", fontWeight: "bolder" }}> Terms & Conditions</span>
                    </p>

                    {/* New line for "Already signed up? Login" */}
                    <p>
                        If already signed up?{' '}
                        <span 
                            style={{ color: "#0B66EFB2", fontWeight: "bolder", cursor: "pointer" }}
                            onClick={handleLoginRedirect}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
