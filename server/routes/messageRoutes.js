import express from 'express';
import {
  submitMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', submitMessage);
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.put('/:id/status', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

export default router;
