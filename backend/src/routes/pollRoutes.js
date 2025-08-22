import express from 'express';
import { createPoll, votePoll } from '../controllers/pollController.js';

const router = express.Router();

// Create poll
router.post('/', createPoll);

// Create poll
router.post('/:shareId', votePoll);

export default router;
