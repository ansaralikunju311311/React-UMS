import { signup, login, logout, getProfile } from '../controller/userController.js';
import { protect } from '../authMiddleware/auth.js'
import express from 'express'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);

export default router;