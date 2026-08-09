import express from 'express';
import {
  submitVisitRequest,
  getVisitRequests,
  getVisitRequest,
  updateVisitStatus,
  deleteVisitRequest
} from '../controllers/visitController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', submitVisitRequest);
router.get('/', protect, getVisitRequests);
router.get('/:id', protect, getVisitRequest);
router.put('/:id/status', protect, updateVisitStatus);
router.delete('/:id', protect, deleteVisitRequest);

export default router;
