import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  RadioGroup,
  Radio,
} from '@mui/material';
import axios from 'axios';

const EstimateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: 'homeowner',
    projectType: 'driveway',
    dimensions: {
      length: '',
      width: '',
      thickness: '',
    },
    surfaceFinish: 'smooth',
    addOns: {
      rebar: false,
      wireMesh: false,
      basePrep: false,
      demolition: false,
      pump: false,
    },
    zipCode: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddOnsChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/estimates', formData);
      localStorage.setItem('estimateResult', JSON.stringify(response.data));
      navigate('/result');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Residential Concrete Estimator
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* User Type Selection */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">I am a:</Typography>
                <RadioGroup
                  row
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="homeowner"
                    control={<Radio />}
                    label="Homeowner"
                  />
                  <FormControlLabel
                    value="salesRep"
                    control={<Radio />}
                    label="Sales Representative"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Project Type */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Project Type</InputLabel>
                <Select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <MenuItem value="driveway">Driveway</MenuItem>
                  <MenuItem value="patio">Patio</MenuItem>
                  <MenuItem value="athleticCourt">Athletic Court</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Dimensions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Dimensions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Length (ft)"
                    type="number"
                    name="dimensions.length"
                    value={formData.dimensions.length}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Width (ft)"
                    type="number"
                    name="dimensions.width"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Thickness (in)"
                    type="number"
                    name="dimensions.thickness"
                    value={formData.dimensions.thickness}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Surface Finish */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Surface Finish</InputLabel>
                <Select
                  name="surfaceFinish"
                  value={formData.surfaceFinish}
                  onChange={handleChange}
                >
                  <MenuItem value="smooth">Smooth</MenuItem>
                  <MenuItem value="broom">Broom</MenuItem>
                  <MenuItem value="stamped">Stamped</MenuItem>
                  <MenuItem value="exposedAggregate">Exposed Aggregate</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Add-ons */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Add-ons
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rebar"
                        checked={formData.addOns.rebar}
                        onChange={handleAddOnsChange}
                      />
                    }
                    label="Rebar"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="wireMesh"
                        checked={formData.addOns.wireMesh}
                        onChange={handleAddOnsChange}
                      />
                    }
                    label="Wire Mesh"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="basePrep"
                        checked={formData.addOns.basePrep}
                        onChange={handleAddOnsChange}
                      />
                    }
                    label="Base Prep"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="demolition"
                        checked={formData.addOns.demolition}
                        onChange={handleAddOnsChange}
                      />
                    }
                    label="Demolition"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="pump"
                        checked={formData.addOns.pump}
                        onChange={handleAddOnsChange}
                      />
                    }
                    label="Pump"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Zip Code */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Contact Info (if sales rep) */}
            {formData.userType === 'salesRep' && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Homeowner Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="contactInfo.name"
                      value={formData.contactInfo.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      name="contactInfo.email"
                      value={formData.contactInfo.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="contactInfo.phone"
                      value={formData.contactInfo.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Calculate Estimate
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EstimateForm; 