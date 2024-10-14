// src/components/Profile.js

import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Grid,
} from '@mui/material';
import api from '../services/api';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    avatarFile: null,
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      avatarFile: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append('name', profileData.name);
    if (profileData.avatarFile) {
      formData.append('avatarFile', profileData.avatarFile);
    }

    try {
      const response = await api.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Update the user context with new data
      setUser(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Grid container spacing={4}>
        {/* Avatar and Info */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt={user.name}
            src={user.avatarUrl || '/static/images/avatar/1.jpg'}
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Grid>
        {/* Edit Form */}
        <Grid item xs={12} md={8}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profileData.email}
              margin="normal"
              disabled // Email is usually not editable
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Avatar
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {profileData.avatarFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {profileData.avatarFile.name}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Update Profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
