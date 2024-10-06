// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CarRentalIcon from '@mui/icons-material/CarRental'; // Icon for the app

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get the user and logout from AuthContext
  const navigate = useNavigate(); // For navigation on logout

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Icon and app name */}
        <CarRentalIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
          color="inherit"
          style={{ textDecoration: 'none' }}
        >
          Car Auction App
        </Typography>
        {/* Navigation buttons */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/cars">
              Cars
            </Button>
            <Button color="inherit" component={Link} to="/cars/new">
              List a Car
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
