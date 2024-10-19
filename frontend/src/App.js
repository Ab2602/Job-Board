import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
// import VerifyEmailOTP from './components/Auth/VerifyEmailOTP';
// import VerifyMobileOTP from './components/Auth/VerifyMobileOTP';
import PostJob from './components/Jobs/PostJob';
import JobList from './components/Jobs/JobList';
import VerifyOTP from './components/Auth/VerifyOtp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        {/* <Route path="/verify-email-otp" element={<VerifyEmailOTP />} />
        <Route path="/verify-mobile-otp" element={<VerifyMobileOTP />} /> */}
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<JobList />} />
      </Routes>
    </Router>
  );
}

export default App;
