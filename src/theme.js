// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2E7D32', // Slightly brighter dark green
    },
    secondary: {
      main: '#FF8F00',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
  },
  typography: {
    // ... (same as before)
  },
  components: {
    // ... (same as before)
  },
});

export default theme;
