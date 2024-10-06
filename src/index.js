// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom MUI theme
import CssBaseline from '@mui/material/CssBaseline'; // To reset CSS defaults

// Create the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS defaults */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
