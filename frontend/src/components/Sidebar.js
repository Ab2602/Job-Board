import React from 'react';
import { GoHomeFill } from 'react-icons/go'; // Assuming you're using react-icons for the home icon
import { useNavigate } from 'react-router-dom'; // To navigate between pages
import '../App.css'; // Import your CSS for sidebar styling

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="sidebar-icon" onClick={() => navigate('/jobs')}>
                <GoHomeFill size={30} />
            </div>
        </div>
    );
}

export default Sidebar;
