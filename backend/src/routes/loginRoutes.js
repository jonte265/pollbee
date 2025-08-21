import express from 'express';
import { loginUser } from '../controllers/loginController.js';

const router = express.Router();

// Login user
router.post('/', loginUser);

export default router;
