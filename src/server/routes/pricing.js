const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');

// Get pricing by zip code
router.get('/:zipCode', async (req, res) => {
  try {
    const pricing = await Pricing.findOne({ zipCode: req.params.zipCode });
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing data not found for this zip code' });
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pricing data', error: error.message });
  }
});

// Initialize mock pricing data
router.post('/init', async (req, res) => {
  try {
    await Pricing.initializeMockData();
    res.json({ message: 'Mock pricing data initialized successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing mock data', error: error.message });
  }
});

module.exports = router; 