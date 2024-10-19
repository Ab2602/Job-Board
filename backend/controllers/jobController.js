const Job = require('../models/Job');
const sendEmail = require('../config/nodemailer');

exports.postJob = async (req, res) => {
    const { title, description, experienceLevel, candidates, endDate } = req.body;
    const company = req.query.companyName;

    const job = new Job({
        title,
        description,
        experienceLevel,
        endDate,
        company: company,
    });

    await job.save();

    candidates.forEach(async (candidate) => {
        await sendEmail(candidate, 'Job Alert', `Job: ${title}\nCompany: ${company}`, description);
    });

    res.status(201).json({ message: 'Job posted and candidates notified' });
};

exports.getAllJobs = async (req, res) => {
    const { companyName } = req.query;  // Get companyName from query params

    try {
        // Fetch jobs that belong to the specified company
        const jobs = await Job.find({ 'company': company }).populate('company', 'name');

        // If no companyName is provided, return all jobs (optional)
        if (!companyName) {
            return res.status(400).json({ message: 'Company name is required' });
        }

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
};

