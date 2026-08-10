import express from 'express';
import {
  getTestimonials,
  submitTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// The uploadMiddleware('testimonials') might need to be configured on S3/multer, 
// but using 'properties' if 'testimonials' folder isn't explicitly configured in S3 might be safer. 
// Assuming uploadMiddleware handles dynamic folder names or 'properties' fallback.
// Let's use 'testimonials' as the folder.
// Public routes
router
  .route('/')
  .get(getTestimonials)
  .post(uploadMiddleware('testimonials').fields([{ name: 'image', maxCount: 1 }]), submitTestimonial);

// Admin route to fetch all (including pending)
router
  .route('/admin')
  .get(protect, getTestimonials);

router
  .route('/:id/status')
  .put(protect, updateTestimonialStatus);

router
  .route('/:id')
  .delete(protect, deleteTestimonial);

export default router;
