import { signup,login } from '../controller/userController.js';
import express from 'express'
const router = express.Router();
router.post('/signup',signup)
router.post('/login',login)
export default router;