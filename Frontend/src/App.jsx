import React, { useEffect, useState } from 'react';
import Signin from './Components/Signin';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import UserProfile from './Components/UserProfile';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import axios from 'axios';

// Configure axios
axios.defaults.withCredentials = true;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile');
        if (response.data.success) {
          setIsAuthenticated(true);
          // If we're on login or signup, redirect to home
          if (window.location.pathname === '/login' || window.location.pathname === '/') {
            navigate('/home', { replace: true });
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        // If we're on a protected route, redirect to login
        if (window.location.pathname === '/home') {
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Public Routes - accessible only when NOT authenticated */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Signin setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Protected Routes - accessible only when authenticated */}
        <Route
          path="/home"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (
              <UserProfile setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Catch all other routes and redirect */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
