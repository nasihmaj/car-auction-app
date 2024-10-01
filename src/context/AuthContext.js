import React, { createContext, useState, useEffect } from 'react';
import jwtDecode  from 'jwt-decode'; // Updated import
// Or if you downgraded to version 3.1.2
// import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Declare user and setUser

  const setUserFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userData = {
      email: decodedToken.sub,
      role: decodedToken.role,
    };
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserFromToken(token);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUserFromToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
