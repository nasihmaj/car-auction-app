// src/components/Register.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CONSUMER',
    phone: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(userData);
      login(data.token);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error);
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={userData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            variant="outlined"
            value={userData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select name="role" value={userData.role} onChange={handleChange} label="Role">
              <MenuItem value="CONSUMER">Consumer</MenuItem>
              <MenuItem value="DEALER">Dealer</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
