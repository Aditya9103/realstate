import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to MongoDB");
  // The collection might be visitrequests
  const visits = await mongoose.connection.db.collection('visitrequests').find().sort({createdAt: -1}).limit(5).toArray();
  console.log(JSON.stringify(visits, null, 2));
  process.exit(0);
});
