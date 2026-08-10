import mongoose from 'mongoose';
import { ENV } from './server/config/env.js';
import Admin from './server/models/Admin.js';

mongoose.connect(ENV.MONGO_URI).then(async () => {
  const admins = await Admin.find({});
  console.log('All admins:', JSON.stringify(admins, null, 2));
  
  const adminsToNotify = await Admin.find({ 'notificationPreferences.emailMessages': true });
  console.log('Admins with emailMessages=true:', JSON.stringify(adminsToNotify, null, 2));

  // Let's also check if $or helps
  const adminsToNotify2 = await Admin.find({
    $or: [
      { 'notificationPreferences.emailMessages': true },
      { notificationPreferences: { $exists: false } }
    ]
  });
  console.log('Admins with emailMessages=true or not set:', JSON.stringify(adminsToNotify2, null, 2));
  
  process.exit();
});
