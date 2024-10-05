// src/components/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ roles, children }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the required roles for the route
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If everything is fine, render the children (the protected component)
  return children;
};

export default PrivateRoute;
