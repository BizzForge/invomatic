// AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Use state to manage user authentication status

  const login = (userData) => {
    // Implement your login logic here (e.g., API request)
    setUser(userData); // Example: set user data after successful login
  };

  const logout = () => {
    // Implement your logout logic here
    setUser(null); // Example: clear user data after logout
  };

  const isAuthenticated = () => !!user; // Example: check if user is authenticated

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
