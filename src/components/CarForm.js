// src/components/CarForm.js

import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from '@mui/material';

const CarForm = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    transmission: '',
    fuelType: '',
    imageFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCarData({
      ...carData,
      imageFile: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!carData.make || !carData.model || !carData.year || !carData.price) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    for (const key in carData) {
      formData.append(key, carData[key]);
    }

    try {
      await api.post('/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/cars');
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
        {/* Make and Model */}
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
        {/* Year and Mileage */}
        <TextField
          fullWidth
          required
          label="Year"
          name="year"
          value={carData.year}
          onChange={handleChange}
          margin="normal"
          type="number"
          inputProps={{ min: 1886, max: new Date().getFullYear() + 1 }}
        />
        <TextField
          fullWidth
          required
          label="Mileage (km)"
          name="mileage"
          value={carData.mileage}
          onChange={handleChange}
          margin="normal"
          type="number"
          inputProps={{ min: 0 }}
        />
        {/* Price */}
        <TextField
          fullWidth
          required
          label="Price ($)"
          name="price"
          value={carData.price}
          onChange={handleChange}
          margin="normal"
          type="number"
          inputProps={{ min: 0 }}
        />
        {/* Transmission */}
        <TextField
          fullWidth
          select
          label="Transmission"
          name="transmission"
          value={carData.transmission}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
          <MenuItem value="Automatic">Automatic</MenuItem>
          <MenuItem value="Semi-Automatic">Semi-Automatic</MenuItem>
        </TextField>
        {/* Fuel Type */}
        <TextField
          fullWidth
          select
          label="Fuel Type"
          name="fuelType"
          value={carData.fuelType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </TextField>
        {/* Description */}
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
        {/* Image Upload */}
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {carData.imageFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {carData.imageFile.name}
          </Typography>
        )}
        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CarForm;
