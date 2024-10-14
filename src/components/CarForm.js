// src/components/CarForm.js

import React, { useState } from 'react';
import api from '../services/api'; // API service for making HTTP requests
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from '@mui/material'; // Material-UI components for styling

const CarForm = () => {
  // State to hold form data
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    transmission: '',
    fuelType: '',
    color: '',
    condition: '',
    imageFiles: [], // Holds the selected image files (array)
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handles changes in text fields
  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles changes in the file input
  const handleFileChange = (e) => {
    setCarData({
      ...carData,
      imageFiles: Array.from(e.target.files), // Convert FileList to Array
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Validate required fields
    if (
      !carData.make ||
      !carData.model ||
      !carData.year ||
      !carData.price ||
      !carData.imageFiles ||
      carData.imageFiles.length === 0
    ) {
      alert('Please fill in all required fields and upload at least one image.');
      return; // Stops form submission if validation fails
    }

    // Create a new FormData object to hold the form data
    const formData = new FormData();

    // Destructure to separate imageFiles from the rest of the car data
    const { imageFiles, ...carDataCopy } = carData;

    // Convert carDataCopy (excluding imageFiles) to a JSON string
    const carJson = JSON.stringify(carDataCopy);

    // Append the 'car' part as a JSON string
    formData.append('car', carJson);

    // Append each image file to the FormData object
    imageFiles.forEach((file) => {
      formData.append('images', file); // 'images' should match the backend parameter name
    });

    try {
      // Send a POST request to the '/cars' endpoint with the form data
      await api.post('/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specifies the content type for multipart data
        },
      });

      // Navigate to the '/cars' page upon successful submission
      navigate('/cars');
    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error adding car:', error);

      // Alert the user about the error
      alert('An error occurred while adding the car. Please try again.');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Form Title */}
      <Typography variant="h4" gutterBottom>
        List a Car
      </Typography>

      {/* Car Listing Form */}
      <Box
        component="form"
        onSubmit={handleSubmit} // Binds the handleSubmit function to form submission
        noValidate // Disables default HTML5 validation
        sx={{ mt: 2 }} // Adds top margin
      >
        {/* Make Field */}
        <TextField
          fullWidth
          required
          label="Make"
          name="make"
          value={carData.make}
          onChange={handleChange}
          margin="normal"
        />

        {/* Model Field */}
        <TextField
          fullWidth
          required
          label="Model"
          name="model"
          value={carData.model}
          onChange={handleChange}
          margin="normal"
        />

        {/* Year Field */}
        <TextField
          fullWidth
          required
          label="Year"
          name="year"
          value={carData.year}
          onChange={handleChange}
          margin="normal"
          type="number"
          inputProps={{
            min: 1886,
            max: new Date().getFullYear() + 1,
          }}
        />

        {/* Mileage Field */}
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

        {/* Price Field */}
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

        {/* Transmission Field */}
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

        {/* Fuel Type Field */}
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

        {/* Color Field */}
        <TextField
          fullWidth
          label="Color"
          name="color"
          value={carData.color}
          onChange={handleChange}
          margin="normal"
        />

        {/* Condition Field */}
        <TextField
          fullWidth
          label="Condition"
          name="condition"
          value={carData.condition}
          onChange={handleChange}
          margin="normal"
        />

        {/* Description Field */}
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

        {/* Button Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
          }}
        >
          {/* Image Upload Button */}
          <Button
            variant="contained"
            component="label"
          >
            Upload Images
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: '150px',
              height: '50px',
              ml: 2,
            }}
          >
            Submit
          </Button>
        </Box>

        {/* Display Selected File Names */}
        {carData.imageFiles && carData.imageFiles.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Selected files:</Typography>
            <ul>
              {carData.imageFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CarForm;
