import express from 'express';
import { registerUser, loginUser, getUserProfile, protect } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/users/register
router.post('/register', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser);

// @route   GET /api/users/profile
router.get('/profile', protect, getUserProfile);

export default router;