const express = require('express');
const router = express.Router();
const estimateController = require('../controllers/estimateController');

// Create new estimate
router.post('/', estimateController.createEstimate);

// Get all estimates
router.get('/', estimateController.getEstimates);

module.exports = router; 