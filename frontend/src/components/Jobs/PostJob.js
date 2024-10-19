import React, { useState } from "react";
import axios from "axios";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import '../../App.css';

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    candidates: [],
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyName = sessionStorage.getItem('company');

    try {
      await axios.post(`http://localhost:5001/api/jobs/post?companyName=${companyName}`, formData);
      alert("Job posted and candidates notified");
    } catch (error) {
      console.error(error);
    }
};


  return (
    <>
      <Navbar />
      <div className="main-page">
        <Sidebar />
        <form onSubmit={handleSubmit} className="job-form">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="input-field"
            placeholder="Enter Job Title"
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Job Description</label>
          <textarea
            name="description"
            id="description"
            className="input-field textarea-field"
            placeholder="Enter Job Description"
            onChange={handleChange}
            required
          />

          <label htmlFor="experienceLevel">Experience Level</label>
          <select
            name="experienceLevel"
            id="experienceLevel"
            className="input-field"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Lead">Lead</option>
          </select>

          <label htmlFor="candidates">Add Candidate</label>
          <input
            type="text"
            name="candidates"
            id="candidates"
            className="input-field"
            placeholder="Add Candidate"
            onChange={(e) => setFormData({ ...formData, candidates: e.target.value.split(',') })}
            required
          />

          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="input-field"
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>
    </>
  );
}

export default PostJob;
