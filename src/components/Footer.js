// src/components/Footer.js
import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const Footer = () => (
  <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 3, mt: 5 }}>
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Typography variant="body1">
        © {new Date().getFullYear()} Car Auction App. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit" underline="hover">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link href="#" color="inherit" underline="hover">
          Terms of Service
        </Link>
      </Typography>
    </Container>
  </Box>
);

export default Footer;
