import express from 'express';
import { createPoll } from '../controllers/pollController.js';

const router = express.Router();

// Create poll
router.post('/', createPoll);

export default router;
