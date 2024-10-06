// src/components/CarList.js

import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Import the API service
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  CardActions,
} from '@mui/material';

const CarList = () => {
  const [cars, setCars] = useState([]); // State to hold the list of cars

  useEffect(() => {
    // Fetch the list of cars from the backend when the component mounts
    api.get('/cars')
      .then((response) => {
        setCars(response.data); // Update the state with the fetched cars
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Cars
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card>
              {/* Display the car image if available; otherwise, show a placeholder image */}
              {car.imageUrl ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:8080/images/${car.imageUrl}`} // Adjust the URL as per your backend
                  alt={`${car.make} ${car.model}`}
                />
              ) : (
                // Placeholder image if no imageUrl
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/300x200.png?text=No+Image"
                  alt="No Image Available"
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {car.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mileage: {car.mileage} km
                </Typography>
                <Typography variant="h6" color="primary">
                  Price: ${car.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/cars/${car.id}`}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarList;
