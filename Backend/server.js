import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/userRoutes.js';

const app = express();
dotenv.config();

// Configure CORS with credentials
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true // Allow credentials
}));

app.use(express.json());
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// API routes
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
