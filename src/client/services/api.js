import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createEstimate = async (estimateData) => {
  try {
    const response = await api.post('/estimates', estimateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating estimate');
  }
};

export const getPricing = async (zipCode) => {
  try {
    const response = await api.get(`/pricing/${zipCode}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching pricing data');
  }
};

export const initializePricing = async () => {
  try {
    const response = await api.post('/pricing/init');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error initializing pricing data');
  }
};

export default api; 