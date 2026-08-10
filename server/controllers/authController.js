import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

const generateToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Check if the admin secret provided matches the one in env
    if (adminSecret !== ENV.ADMIN_SECRET) {
      return res.status(401).json({ message: 'Not authorized to register as admin' });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        profilePhoto: admin.profilePhoto,
        notificationPreferences: admin.notificationPreferences,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        profilePhoto: admin.profilePhoto,
        notificationPreferences: admin.notificationPreferences,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        profilePhoto: admin.profilePhoto,
        notificationPreferences: admin.notificationPreferences,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      admin.name = req.body.name || admin.name;
      admin.email = req.body.email || admin.email;

      // Handle profile photo upload
      if (req.files && req.files.profilePhoto) {
        admin.profilePhoto = req.files.profilePhoto[0].location; // AWS S3 URL
      }

      // Handle password update with current password verification
      if (req.body.newPassword) {
        if (!req.body.currentPassword) {
          return res.status(400).json({ message: 'Current password is required to set a new password' });
        }
        const isMatch = await admin.matchPassword(req.body.currentPassword);
        if (!isMatch) {
          return res.status(401).json({ message: 'Current password is incorrect' });
        }
        admin.password = req.body.newPassword;
      }

      if (req.body.notificationPreferences) {
        // Parse it if it's sent as a string (from FormData)
        let prefs = req.body.notificationPreferences;
        if (typeof prefs === 'string') {
          try {
            prefs = JSON.parse(prefs);
          } catch (e) {
            console.error('Failed to parse notificationPreferences', e);
          }
        }
        if (typeof prefs === 'object') {
          admin.notificationPreferences = {
            ...admin.notificationPreferences,
            ...prefs
          };
        }
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        profilePhoto: updatedAdmin.profilePhoto,
        notificationPreferences: updatedAdmin.notificationPreferences,
        token: jwt.sign({ id: updatedAdmin._id }, ENV.JWT_SECRET, { expiresIn: '30d' }),
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
