import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, updateAdminProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/signup', registerAdmin);
router.post('/login', loginAdmin);
router.route('/profile')
  .get(protect, getAdminProfile)
  .put(protect, uploadMiddleware('admins').fields([{ name: 'profilePhoto', maxCount: 1 }]), updateAdminProfile);

export default router;
