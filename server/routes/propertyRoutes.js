import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(protect, uploadMiddleware('properties').fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(protect, uploadMiddleware('properties').fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), updateProperty)
  .delete(protect, deleteProperty);

export default router;
