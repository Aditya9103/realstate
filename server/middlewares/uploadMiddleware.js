import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { ENV } from '../config/env.js';

const s3Config = new S3Client({
  region: ENV.AWS_REGION,
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG and WEBP are allowed!'), false);
  }
};

// Create a function that returns a multer middleware configured for a specific folder
export const uploadMiddleware = (folderName = 'general') => {
  return multer({
    storage: multerS3({
      s3: s3Config,
      bucket: ENV.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'); // sanitize filename
        cb(null, `${folderName}/${uniqueSuffix}-${fileName}`);
      },
    }),
    fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB limit
    },
  });
};
