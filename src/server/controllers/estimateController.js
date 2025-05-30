const Estimate = require('../models/Estimate');
const Pricing = require('../models/Pricing');

// Calculate cubic yards from dimensions
const calculateCubicYards = (length, width, thickness) => {
  const thicknessInFeet = thickness / 12;
  return (length * width * thicknessInFeet) / 27;
};

// Calculate square footage
const calculateSquareFeet = (length, width) => {
  return length * width;
};

exports.createEstimate = async (req, res) => {
  try {
    const {
      userType,
      projectType,
      dimensions,
      surfaceFinish,
      addOns,
      zipCode,
      contactInfo
    } = req.body;

    // Get pricing data for zip code
    const pricing = await Pricing.findOne({ zipCode });
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing data not found for this zip code' });
    }

    // Calculate basic measurements
    const cubicYards = calculateCubicYards(
      dimensions.length,
      dimensions.width,
      dimensions.thickness
    );
    const squareFeet = calculateSquareFeet(dimensions.length, dimensions.width);

    // Calculate costs
    const materialsCost = cubicYards * pricing.baseConcreteCost;
    const laborCost = squareFeet * pricing.laborRates[projectType];
    const surfaceFinishCost = laborCost * (pricing.surfaceFinishMultipliers[surfaceFinish] - 1);

    // Calculate add-ons
    let addOnsCost = 0;
    if (addOns.rebar) addOnsCost += squareFeet * pricing.addOns.rebar;
    if (addOns.wireMesh) addOnsCost += squareFeet * pricing.addOns.wireMesh;
    if (addOns.basePrep) addOnsCost += squareFeet * pricing.addOns.basePrep;
    if (addOns.demolition) addOnsCost += squareFeet * pricing.addOns.demolition;
    if (addOns.pump) addOnsCost += pricing.addOns.pump;

    // Calculate total and price range
    const total = materialsCost + laborCost + surfaceFinishCost + addOnsCost;
    const priceRange = {
      low: total * 0.9, // 10% lower
      high: total * 1.1 // 10% higher
    };

    // Create estimate
    const estimate = new Estimate({
      userType,
      projectType,
      dimensions,
      surfaceFinish,
      addOns,
      zipCode,
      contactInfo,
      estimate: {
        materials: materialsCost,
        labor: laborCost + surfaceFinishCost,
        addOns: addOnsCost,
        total,
        priceRange
      }
    });

    await estimate.save();
    res.status(201).json(estimate);
  } catch (error) {
    console.error('Error creating estimate:', error);
    res.status(500).json({ message: 'Error creating estimate', error: error.message });
  }
};

exports.getEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.find().sort({ createdAt: -1 });
    res.json(estimates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching estimates', error: error.message });
  }
}; 