const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  zipCode: {
    type: String,
    required: true,
    unique: true
  },
  baseConcreteCost: {
    type: Number,
    required: true
  },
  laborRates: {
    driveway: Number,
    patio: Number,
    athleticCourt: Number
  },
  surfaceFinishMultipliers: {
    smooth: Number,
    broom: Number,
    stamped: Number,
    exposedAggregate: Number
  },
  addOns: {
    rebar: Number,
    wireMesh: Number,
    basePrep: Number,
    demolition: Number,
    pump: Number
  }
});

// Mock pricing data
const mockPricingData = {
  '90210': {
    baseConcreteCost: 150,
    laborRates: {
      driveway: 8.50,
      patio: 7.50,
      athleticCourt: 9.50
    },
    surfaceFinishMultipliers: {
      smooth: 1.0,
      broom: 1.1,
      stamped: 1.5,
      exposedAggregate: 1.4
    },
    addOns: {
      rebar: 2.50,
      wireMesh: 1.75,
      basePrep: 3.00,
      demolition: 4.00,
      pump: 500
    }
  }
};

// Initialize with mock data if collection is empty
PricingSchema.statics.initializeMockData = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany(Object.entries(mockPricingData).map(([zipCode, data]) => ({
      zipCode,
      ...data
    })));
    console.log('Mock pricing data initialized');
  }
};

module.exports = mongoose.model('Pricing', PricingSchema); 