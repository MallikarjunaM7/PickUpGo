import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    const { token, user } = res.data;

    setUser(user);
    setIsAuthenticated(true);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);

      const savedUser = res.data.user;
      const token = res.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(savedUser));

      // Don't auto-login after registration
      setIsAuthenticated(false);
      setUser(savedUser);

      return savedUser;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = async (userData) => {
    const updatedUser = {
      ...user,
      ...userData
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      register,
      logout,
      updateUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add and export this hook
export const useAuth = () => useContext(AuthContext);
