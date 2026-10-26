import express from 'express';
import { registerUser, loginUser, googleAuth, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);

export default router;
