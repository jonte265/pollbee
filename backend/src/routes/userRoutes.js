import express from 'express';
import { createUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Create user
router.post('/', createUser);

// // Update user
// router.put('/', createUser);

// Delete user
router.delete('/', deleteUser);

export default router;
