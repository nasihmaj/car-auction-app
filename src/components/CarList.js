// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get('/cars')
      .then((response) => {
        
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Cars
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card>
              {car.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
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
                  Mileage: {car.mileage}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${car.price}
                </Typography>
                <Button component={Link} to={`/cars/${car.id}`} variant="outlined" sx={{ mt: 2 }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarList;
