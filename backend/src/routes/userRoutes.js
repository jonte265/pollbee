import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

// Create user
router.post('/', createUser);

export default router;
