import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS for styling
import Logo from '../logo.png';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="cuvette-logo" />
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
