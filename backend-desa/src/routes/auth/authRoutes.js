// backend/src/routes/auth/authRoutes.js
import express from 'express';
import * as loginController from '../../controllers/auth/loginController.js';
import * as registerController from '../../controllers/auth/registerController.js';
import * as profileController from '../../controllers/auth/profileController.js';
import authMiddleware from '../../controllers/middleware/authMiddleware.js';

const router = express.Router();

// --------------------------------------------------
// 🔐 AUTHENTICATION ROUTES
// --------------------------------------------------

// Register user baru
router.post('/register', registerController.register);

// Login user
router.post('/login', loginController.login);

// Get user profile (protected)
router.get('/profile', authMiddleware.protect, profileController.getProfile);

// Update user profile (protected)
router.put('/profile', authMiddleware.protect, profileController.updateProfile);

export default router;