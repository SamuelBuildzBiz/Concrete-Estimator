import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message || 'An unexpected error occurred'}
        {onRetry && (
          <Box sx={{ mt: 1 }}>
            <button onClick={onRetry}>Try Again</button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorMessage; 