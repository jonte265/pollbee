import express from 'express';
import {
  createPoll,
  sharePoll,
  votePoll,
  editPoll,
  deletePoll,
} from '../controllers/pollController.js';

const router = express.Router();

// Create poll
router.post('/', createPoll);

// Edit poll
router.put('/', editPoll);

// Delete poll
router.delete('/', deletePoll);

// Get sharable poll
router.get('/:shareId', sharePoll);

// Vote poll
router.post('/vote', votePoll);

export default router;
