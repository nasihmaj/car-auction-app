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
    imageFile: null, // Holds the selected image file
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  /**
   * Handles changes in text fields.
   * Updates the corresponding field in the state based on the input's name attribute.
   * @param {Object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles changes in the file input.
   * Updates the imageFile field in the state with the selected file.
   * @param {Object} e - The event object from the file input.
   */
  const handleFileChange = (e) => {
    setCarData({
      ...carData,
      imageFile: e.target.files[0],
    });
  };

  /**
   * Handles form submission.
   * Validates required fields and constructs FormData to send to the backend.
   * If validation passes, sends a POST request to create a new car listing.
   * @param {Object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Validate required fields: make, model, year, price, and imageFile
    if (
      !carData.make ||
      !carData.model ||
      !carData.year ||
      !carData.price ||
      !carData.imageFile
    ) {
      alert('Please fill in all required fields and upload an image.');
      return; // Stops form submission if validation fails
    }

    // Create a new FormData object to hold the form data
    const formData = new FormData();

    // Destructure to separate imageFile from the rest of the car data
    const { imageFile, ...carDataCopy } = carData;

    // Convert carDataCopy (excluding imageFile) to a JSON string
    const carJson = JSON.stringify(carDataCopy);

    // Append the 'car' part as a JSON string
    formData.append('car', carJson);

    // Append the 'image' part with the selected image file
    formData.append('image', imageFile);

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
          fullWidth // Makes the input take the full width of its container
          required // Marks the field as required
          label="Make" // Label for the input
          name="make" // Name attribute used in handleChange
          value={carData.make} // Binds the input value to the state
          onChange={handleChange} // Binds the handleChange function to input changes
          margin="normal" // Adds normal margin
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
          type="number" // Specifies the input type as number
          inputProps={{
            min: 1886, // The year the first car was invented
            max: new Date().getFullYear() + 1, // Allows next year's models
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
          inputProps={{ min: 0 }} // Mileage cannot be negative
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
          inputProps={{ min: 0 }} // Price cannot be negative
        />

        {/* Transmission Field */}
        <TextField
          fullWidth
          select // Makes the TextField a select dropdown
          label="Transmission"
          name="transmission"
          value={carData.transmission}
          onChange={handleChange}
          margin="normal"
        >
          {/* Dropdown Options */}
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
          {/* Dropdown Options */}
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </TextField>

        {/* Description Field */}
        <TextField
          fullWidth
          multiline // Allows multiple lines of text
          rows={4} // Sets the number of visible text lines
          label="Description"
          name="description"
          value={carData.description}
          onChange={handleChange}
          margin="normal"
        />

        {/* Image Upload Field */}
        <Button
          variant="contained" // Sets the button variant
          component="label" // Allows the button to act as a label for the hidden input
          sx={{ mt: 2 }} // Adds top margin
        >
          Upload Image
          <input
            type="file" // Specifies the input type as file
            hidden // Hides the default file input
            onChange={handleFileChange} // Binds the handleFileChange function to input changes
            accept="image/*" // Restricts file selection to images only
          />
        </Button>

        {/* Display Selected File Name */}
        {carData.imageFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {carData.imageFile.name}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit" // Specifies the button type as submit
          variant="contained"
          color="primary" // Sets the button color
          sx={{ mt: 3 }} // Adds top margin
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CarForm;
