import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
if (ENV.CLIENT_URL && !allowedOrigins.includes(ENV.CLIENT_URL)) {
  allowedOrigins.push(ENV.CLIENT_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Routes
import propertyRoutes from './routes/propertyRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
app.use('/api/admin', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/visits', visitRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: ENV.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
});
