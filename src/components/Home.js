// src/components/Home.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg'; // Import the hero image

const Home = () => (
  <Box
    sx={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Container>
      <Typography variant="h2" color="white" gutterBottom>
        Welcome to Car Auction App
      </Typography>
      <Typography variant="h5" color="white" paragraph>
        Buy and sell cars with ease.
      </Typography>
      <Button variant="contained" color="secondary" component={Link} to="/cars">
        View Cars
      </Button>
    </Container>
  </Box>
);

export default Home;
