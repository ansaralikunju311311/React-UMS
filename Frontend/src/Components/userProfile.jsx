import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure axios
axios.defaults.withCredentials = true;

const UserProfile = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/profile');
                
                if (response.data.success) {
                    setUserData(response.data.user);
                    setError(null);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.response?.data?.message || 'An error occurred');
                setIsAuthenticated(false);
                navigate('/login', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, setIsAuthenticated]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/logout');
            
            if (response.data.success) {
                // Clear any local storage data
                localStorage.clear();
                // Update authentication state
                setIsAuthenticated(false);
                // Navigate to login
                navigate('/login', { replace: true });
            } else {
                throw new Error(response.data.message || 'Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            setError(error.response?.data?.message || 'Failed to logout');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/login', { replace: true })}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h2>
                        {userData && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Username</p>
                                    <p className="text-lg font-medium text-gray-900">{userData.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-lg font-medium text-gray-900">{userData.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
