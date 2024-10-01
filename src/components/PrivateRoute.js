import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Updated
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // User does not have the required role
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
