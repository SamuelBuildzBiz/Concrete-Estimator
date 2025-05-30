import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
} from '@mui/material';

function EstimateResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              No estimate data found
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Back to Calculator
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Calculate concrete volume in cubic yards
  const length = parseFloat(formData.length);
  const width = parseFloat(formData.width);
  const depth = parseFloat(formData.depth) / 12; // Convert inches to feet
  const volume = (length * width * depth) / 27; // Convert to cubic yards

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Estimate Results
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Project Details:</Typography>
              <Typography>Length: {length} feet</Typography>
              <Typography>Width: {width} feet</Typography>
              <Typography>Depth: {formData.depth} inches</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Estimated Materials:</Typography>
              <Typography>Concrete Volume: {volume.toFixed(2)} cubic yards</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                fullWidth
                sx={{ mt: 2 }}
              >
                Calculate Another Estimate
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default EstimateResults; 