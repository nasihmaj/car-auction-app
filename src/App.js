// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import PrivateRoute from './components/PrivateRoute';
import CarDetails from './components/CarDetails';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Footer from './components/Footer'; // Import the Footer component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cars/new"
            element={
              <PrivateRoute roles={['CONSUMER']}>
                <CarForm />
              </PrivateRoute>
            }
          />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
        <Footer /> {/* Add the Footer component */}
      </Router>
    </AuthProvider>
  );
}

export default App;
