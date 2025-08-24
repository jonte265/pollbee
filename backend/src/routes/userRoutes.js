import express from 'express';
import { createUser, deleteUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Create user
router.post('/', createUser);

// // Update user
// router.put('/', createUser);

// Delete user
router.delete('/', authenticateToken, deleteUser);

export default router;
