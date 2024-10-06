// src/components/CarDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to access URL parameters
import api from '../services/api'; // Import the API service
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL parameters
  const [car, setCar] = useState(null); // State to hold car details

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`); // Fetch car details from backend
        setCar(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails(); // Call the function to fetch data
  }, [id]); // Dependency array ensures this runs when 'id' changes

  if (!car) {
    // Display loading message while data is being fetched
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Image section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            {car.imageUrl ? (
              <img
                src={`http://localhost:8080/images/${car.imageUrl}`} // Adjust URL as per your backend
                alt={`${car.make} ${car.model}`}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <img
                src="https://via.placeholder.com/600x400.png?text=No+Image"
                alt="No Image Available"
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </Paper>
        </Grid>
        {/* Details section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {car.make} {car.model} ({car.year})
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Price: ${car.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Mileage: {car.mileage} km
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body2" gutterBottom>
            {car.description}
          </Typography>
          {/* Additional details can be added here */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
