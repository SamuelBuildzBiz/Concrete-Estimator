const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['homeowner', 'salesRep'],
    required: true
  },
  projectType: {
    type: String,
    enum: ['driveway', 'patio', 'athleticCourt'],
    required: true
  },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    thickness: { type: Number, required: true }
  },
  surfaceFinish: {
    type: String,
    enum: ['smooth', 'broom', 'stamped', 'exposedAggregate'],
    required: true
  },
  addOns: {
    rebar: { type: Boolean, default: false },
    wireMesh: { type: Boolean, default: false },
    basePrep: { type: Boolean, default: false },
    demolition: { type: Boolean, default: false },
    pump: { type: Boolean, default: false }
  },
  zipCode: {
    type: String,
    required: true
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  estimate: {
    materials: Number,
    labor: Number,
    addOns: Number,
    total: Number,
    priceRange: {
      low: Number,
      high: Number
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Estimate', EstimateSchema); 