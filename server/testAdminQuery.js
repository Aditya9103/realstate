import mongoose from 'mongoose';
import { ENV } from './config/env.js';
import Admin from './models/Admin.js';

mongoose.connect(ENV.MONGO_URI).then(async () => {
  const admins = await Admin.find({});
  console.log('All admins:', JSON.stringify(admins, null, 2));
  process.exit();
});
