import express from 'express';
import { profilePolls } from '../controllers/profileController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Login user
router.get('/', authenticateToken, profilePolls);

export default router;
