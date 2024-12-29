import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Not authorized, please login' 
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user
            const user = await User.findById(decoded.userId).select('-password');
            if (!user) {
                return res.status(401).json({ 
                    success: false,
                    message: 'User not found' 
                });
            }

            // Add user to request
            req.user = user;
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            
            // Clear invalid cookie
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0),
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax'
            });

            return res.status(401).json({ 
                success: false,
                message: 'Not authorized, token failed' 
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Server error during authentication' 
        });
    }
};