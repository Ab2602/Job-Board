import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    // Fetch the company name from session storage
    const name = sessionStorage.getItem('name');
    

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Send companyName as a query parameter
                const companyName = sessionStorage.getItem('company');
                const res = await axios.get(`http://localhost:5001/api/jobs?companyName=${companyName}`);
                setJobs(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobs();
    }, []);

    const handleLogout = () => {
        // Clear specific items from session storage
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('mobile');
        sessionStorage.removeItem('company');
        
        // Redirect to login page
        navigate('/login');
    };

    const handleCreateJob = () => {
        navigate('/post-job');
    };

    return (
        <>
            <Navbar />
            <div className='main-page'>
                <Sidebar />
                <div className='job-list'>
                    {name && <h2>Welcome, {name}</h2>}
                    <button onClick={handleCreateJob} className='create-btn job-btn'>Create Interview</button>
                    <button onClick={handleLogout} className='logout job-btn'>Logout</button>
                    {jobs.map((job) => (
                        <div key={job._id}>
                            <h2>{job.title}</h2>
                            <p>{job.description}</p>
                            <p>{job.experienceLevel}</p>
                            <p>{job.endDate}</p>
                            <p>Posted by: {job.company.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default JobList;
