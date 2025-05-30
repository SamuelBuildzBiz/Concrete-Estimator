import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { formatCurrency } from '../utils/formatters';

const EstimateResult = () => {
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    const savedEstimate = localStorage.getItem('estimateResult');
    if (savedEstimate) {
      setEstimate(JSON.parse(savedEstimate));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!estimate) {
    return null;
  }

  const handleNewEstimate = () => {
    localStorage.removeItem('estimateResult');
    navigate('/');
  };

  const handleEmailEstimate = () => {
    // TODO: Implement email functionality
    console.log('Email estimate functionality to be implemented');
  };

  const handleBookQuote = () => {
    // TODO: Implement booking functionality
    console.log('Book quote functionality to be implemented');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Concrete Estimate
        </Typography>

        <Grid container spacing={3}>
          {/* Project Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Project Type"
                  secondary={estimate.projectType.charAt(0).toUpperCase() + estimate.projectType.slice(1)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Dimensions"
                  secondary={`${estimate.dimensions.length}' × ${estimate.dimensions.width}' × ${estimate.dimensions.thickness}"`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Surface Finish"
                  secondary={estimate.surfaceFinish.charAt(0).toUpperCase() + estimate.surfaceFinish.slice(1)}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Cost Breakdown */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Cost Breakdown
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Materials"
                  secondary={formatCurrency(estimate.estimate.materials)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Labor"
                  secondary={formatCurrency(estimate.estimate.labor)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Add-ons"
                  secondary={formatCurrency(estimate.estimate.addOns)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Total"
                  secondary={formatCurrency(estimate.estimate.total)}
                  sx={{ fontWeight: 'bold' }}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Price Range */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Estimated Price Range
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Based on current market conditions and material availability, your project is estimated to cost between:
            </Typography>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="h5" color="primary">
                {formatCurrency(estimate.estimate.priceRange.low)} - {formatCurrency(estimate.estimate.priceRange.high)}
              </Typography>
            </Box>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEmailEstimate}
              >
                Email Estimate
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBookQuote}
              >
                Book Free Quote
              </Button>
              <Button
                variant="outlined"
                onClick={handleNewEstimate}
              >
                New Estimate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EstimateResult; 