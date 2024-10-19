const express = require('express');
const { postJob, getAllJobs } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post', postJob);
router.get('/', getAllJobs);

module.exports = router;
