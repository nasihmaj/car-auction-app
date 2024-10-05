import React, { useState } from 'react';
import api from '../services/api'; // Import your Axios instance
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Input } from '@mui/material';

const CarForm = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
  });
  
  const [image, setImage] = useState(null); // State to hold the uploaded image file
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change for car data fields
  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the first file from the file input
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Append the car object as a JSON string
    formData.append('car', JSON.stringify(carData));

    // Add the image file to the form data if it exists
    if (image) {
      formData.append('image', image);
    }

    try {
      // Send the formData via Axios to the backend
      await api.post('/cars/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirect to the car listing page after successful submission
      navigate('/cars');
    } catch (error) {
      console.error('Error creating car:', error);
      setError('Failed to create car. Please check your input and try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        List Your Car
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        {/* Car Make */}
        <TextField
          label="Make"
          name="make"
          value={carData.make}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
        {/* Car Model */}
        <TextField
          label="Model"
          name="model"
          value={carData.model}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
        {/* Car Year */}
        <TextField
          label="Year"
          name="year"
          type="number"
          value={carData.year}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
        {/* Car Mileage */}
        <TextField
          label="Mileage"
          name="mileage"
          type="number"
          value={carData.mileage}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
        {/* Car Price */}
        <TextField
          label="Price"
          name="price"
          type="number"
          value={carData.price}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        
        {/* Car Description */}
        <TextField
          label="Description"
          name="description"
          value={carData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        
        {/* File Input for Image Upload */}
        <Input
          type="file"
          onChange={handleImageChange}
          inputProps={{ accept: 'image/*' }} // Restrict file input to image files only
          fullWidth
          required
          margin="normal"
        />
        
        {/* Submit Button */}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CarForm;
