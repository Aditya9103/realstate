import mongoose from 'mongoose';
import { ENV } from './config/env.js';
import { submitMessage } from './controllers/messageController.js';
import Message from './models/Message.js';

mongoose.connect(ENV.MONGO_URI).then(async () => {
  const req = {
    body: {
      name: "Test User",
      email: "testuser@example.com",
      phone: "1234567890",
      subject: "Test Message",
      message: "This is a test message to see if admin email is sent."
    }
  };
  
  const res = {
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      console.log('Response:', this.statusCode, data);
    }
  };
  
  try {
    await submitMessage(req, res);
  } catch (err) {
    console.error("Error in submitMessage:", err);
  }
  
  // Clean up
  await Message.deleteOne({ email: "testuser@example.com" });
  process.exit();
});
