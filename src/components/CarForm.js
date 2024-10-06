// src/components/CarForm.js

import React, { useState } from 'react';
import api from '../services/api'; // Import the API service
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const CarForm = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    imageFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update the state when form fields change
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    // Update the state when the image file changes
    setCarData({
      ...carData,
      imageFile: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append('make', carData.make);
    formData.append('model', carData.model);
    formData.append('year', carData.year);
    formData.append('mileage', carData.mileage);
    formData.append('price', carData.price);
    formData.append('description', carData.description);
    if (carData.imageFile) {
      formData.append('imageFile', carData.imageFile);
    }

    try {
      await api.post('/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/cars'); // Redirect to car list after successful submission
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        List a Car
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          required
          label="Make"
          name="make"
          value={carData.make}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Model"
          name="model"
          value={carData.model}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Year"
          name="year"
          value={carData.year}
          onChange={handleChange}
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          required
          label="Mileage"
          name="mileage"
          value={carData.mileage}
          onChange={handleChange}
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          required
          label="Price"
          name="price"
          value={carData.price}
          onChange={handleChange}
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={carData.description}
          onChange={handleChange}
          margin="normal"
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {carData.imageFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {carData.imageFile.name}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CarForm;
