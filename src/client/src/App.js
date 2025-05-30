import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EstimateForm from './components/EstimateForm';
import EstimateResults from './components/EstimateResults';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<EstimateForm />} />
        <Route path="/results" element={<EstimateResults />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 