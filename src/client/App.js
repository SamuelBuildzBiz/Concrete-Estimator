import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import EstimateForm from './components/EstimateForm';
import EstimateResult from './components/EstimateResult';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EstimateForm />} />
          <Route path="/result" element={<EstimateResult />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 