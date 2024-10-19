const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    experienceLevel: String,
    endDate: Date,
    company: String,
});

module.exports = mongoose.model('Job', jobSchema);
