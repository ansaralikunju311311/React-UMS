import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure axios
axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log('Verifying authentication...');
        const response = await axios.get('http://localhost:3000/api/profile');
        console.log('Profile response:', response.data.success);
        if (response.data.success) {
          console.log('Authentication successful');
          setIsAuthenticated(true);
          // Update user data in case it changed
         const data = localStorage.setItem('user', JSON.stringify(response.data.user));
          setUserData(data);
        } else {
          console.log('Authentication failed:', response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear any stale data
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  console.log('isAuthenticated:', userData);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;