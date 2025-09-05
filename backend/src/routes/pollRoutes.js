import express from 'express';
import {
  createPoll,
  sharePoll,
  votePoll,
  editPoll,
  deletePoll,
  pollIdea,
} from '../controllers/pollController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// AI poll idea
router.get('/ai/poll-idea', authenticateToken, pollIdea);

// Create poll
router.post('/', authenticateToken, createPoll);

// Edit poll
router.put('/', authenticateToken, editPoll);

// Delete poll
router.delete('/', authenticateToken, deletePoll);

// Get sharable poll
router.get('/:shareId', sharePoll);

// Vote poll
router.post('/vote', votePoll);

export default router;
