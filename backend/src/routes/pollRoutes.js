import express from 'express';
import {
  createPoll,
  sharePoll,
  votePoll,
  editPoll,
  deletePoll,
} from '../controllers/pollController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

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

// Need poll for my polls on profile

export default router;
