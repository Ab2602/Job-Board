import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css';  
import Navbar from '../Navbar';
import { RiLockPasswordLine } from "react-icons/ri"; 
import { MdOutlineEmail } from "react-icons/md";

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request
            const res = await axios.post('http://localhost:5001/api/auth/login', formData);
            
            // Save company name and email to session storage
            sessionStorage.setItem('email', formData.email);
            sessionStorage.setItem('name', res.data.name);
            sessionStorage.setItem('company', res.data.company) // Save company name in session storage

            alert('Logged in successfully');
            navigate('/jobs'); // Redirect to the JobList page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="intro">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti molestias consequuntur sunt tempore maxime voluptatem fugit accusantium ullam deleniti, optio aperiam placeat accusamus.
                </div>

                <div className="form-container">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <MdOutlineEmail className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                onChange={handleChange}
                            />
                        </div>

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
                    <p>Lorem Ipsum is simply dummy text of the printing industry.</p>
                </div>
            </div>
        </>
    );
}

export default Login;
