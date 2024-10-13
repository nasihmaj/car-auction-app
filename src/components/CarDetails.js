// src/components/CarDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import Carousel from 'react-material-ui-carousel';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [inquiryMessage, setInquiryMessage] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <Typography>Loading...</Typography>;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Handle the inquiry form submission (e.g., send to backend or email)
    alert('Inquiry submitted!');
    setInquiryMessage('');
  };

  // Styled component for the image
  const StyledImage = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  });

  // Prepare the images array
  const images = [];

  // Add images from imageUrls if available
  if (car.imageUrls && car.imageUrls.length > 0) {
    images.push(...car.imageUrls);
  } else if (car.imageUrl) {
    // For backward compatibility, add imageUrl if imageUrls is not available
    images.push(car.imageUrl);
  } else {
    // If no images are available, use a placeholder image
    images.push('https://via.placeholder.com/600x400.png?text=No+Image');
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Carousel indicators={false} navButtonsAlwaysVisible animation="slide">
              {images.map((image, index) => (
                <StyledImage
                  key={index}
                  src={image}
                  alt={`${car.make} ${car.model}`}
                />
              ))}
            </Carousel>
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {car.make} {car.model} ({car.year})
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Price: ${car.price.toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Mileage: {car.mileage.toLocaleString()} km
          </Typography>

          {/* Tabs for additional information */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Seller Info" />
            </Tabs>
          </Box>
          <Box sx={{ mt: 2 }}>
            {/* Description Tab */}
            {tabValue === 0 && (
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {car.description}
              </Typography>
            )}

            {/* Specifications Tab */}
            {tabValue === 1 && (
              <>
                <Typography variant="body2">Transmission: {car.transmission}</Typography>
                <Typography variant="body2">Fuel Type: {car.fuelType}</Typography>
                <Typography variant="body2">Color: {car.color}</Typography>
                <Typography variant="body2">Condition: {car.condition}</Typography>
              </>
            )}

            {/* Seller Info Tab */}
            {tabValue === 2 && (
              <>
                <Typography variant="body2">Seller: {car.user.name}</Typography>
                <Typography variant="body2">Contact: {car.user.email}</Typography>
                {/* Add more seller info if available */}
              </>
            )}
          </Box>

          {/* Inquiry Form */}
          <Box component="form" onSubmit={handleInquirySubmit} sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Interested in this car?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Message"
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Send Inquiry
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
