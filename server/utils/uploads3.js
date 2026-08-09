import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ENV } from '../config/env.js';

const s3Config = new S3Client({
  region: ENV.AWS_REGION,
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file buffer directly to S3.
 * 
 * @param {Buffer} fileBuffer - The file buffer to upload.
 * @param {string} originalName - The original file name.
 * @param {string} mimeType - The file's MIME type (e.g., 'image/jpeg').
 * @param {string} folderName - The folder to place it in (default: 'general').
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */
export const uploadFileToS3 = async (fileBuffer, originalName, mimeType, folderName = 'general') => {
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeFileName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${folderName}/${uniqueSuffix}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: ENV.AWS_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await s3Config.send(command);

    // Construct the public URL (Note: Make sure the S3 bucket is public or objects are readable)
    const publicUrl = `https://${ENV.AWS_BUCKET_NAME}.s3.${ENV.AWS_REGION}.amazonaws.com/${key}`;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
};
