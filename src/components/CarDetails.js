// src/components/CarDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, Box } from '@mui/material';

const CarDetails = () => {
  const { id } = useParams();  // Get the car ID from the URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`); // Fetch car details from the backend
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <Typography>Loading...</Typography>;  // Show loading while car data is being fetched
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {car.make} {car.model} ({car.year})
      </Typography>
      <Box>
        {car.imageUrl && (
          <img 
            src={`http://localhost:8080/images/${car.imageUrl.split('/').pop()}`} 
            alt={`${car.make} ${car.model}`} 
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </Box>
      <Typography variant="body1" gutterBottom>
        Mileage: {car.mileage} km
      </Typography>
      <Typography variant="body1" gutterBottom>
        Price: ${car.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {car.description}
      </Typography>
    </Container>
  );
};

export default CarDetails;
