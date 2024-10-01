import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const CarForm = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  // ... rest of your component code
};

export default CarForm;
