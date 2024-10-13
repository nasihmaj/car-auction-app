// src/components/Home.js

import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/system';
import heroImage1 from '../assets/hero1.jpg';
import heroImage2 from '../assets/hero2.jpg';
import featuresImage from '../assets/features.jpg';

// Styled components for consistent styling
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const FeaturesImage = styled('img')({
  width: '100%',
  borderRadius: '8px',
});

const Home = () => {
  // Array of images and content for the carousel
  const carouselItems = [
    {
      image: heroImage1,
      title: 'Find Your Dream Car',
      description: 'Browse through thousands of listings to find the perfect car.',
    },
    {
      image: heroImage2,
      title: 'Sell Your Car Quickly',
      description: 'List your car and reach millions of potential buyers.',
    },
  ];

  return (
    <>
      {/* Hero Carousel */}
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible
        animation="slide"
        sx={{ minHeight: '80vh' }}
      >
        {carouselItems.map((item, index) => (
          <HeroSection
            key={index}
            sx={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
              ), url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Container maxWidth="md">
              <Typography variant="h2" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="h5" paragraph>
                {item.description}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/cars"
                sx={{ mr: 2 }}
              >
                View Cars
              </Button>
              <Button variant="outlined" color="inherit" component={Link} to="/register">
                Get Started
              </Button>
            </Container>
          </HeroSection>
        ))}
      </Carousel>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Why Choose Us?
            </Typography>
            <Typography variant="body1" paragraph>
            We provide a seamless and secure platform where customers can list their cars effortlessly. Our extensive network of trusted dealers bids on your vehicle, ensuring a quick sale at the best price. 
            With us, you benefit from secure transactions and all the tools you need to make informed decisions. Experience a fast, reliable, and efficient way to sell your car today.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/cars">
              Explore Cars
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <FeaturesImage src={featuresImage} alt="Features" />
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Ready to Start?
          </Typography>
          <Typography variant="body1" paragraph>
            Join our community and find your next car today.
          </Typography>
          <Button variant="contained" color="secondary" component={Link} to="/register">
            Sign Up Now
          </Button>
        </Container>
      </Box> */}
    </>
  );
};

export default Home;
