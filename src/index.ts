import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorMiddleware';
import { patientRoute } from './routes/patientRoutes';
import CustomError from './utils/customError';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL as string).then(() => console.log('\x1b[32mDB connection successful!\x1b[0m'));

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for specified origins and methods
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

// Middleware to parse cookies
app.use(cookieParser());

// Logging middleware for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * @route GET /api
 * @returns {Object} 200 - A message indicating the server is running
 */
app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

// Use patient routes for API endpoints
app.use('/api', patientRoute);

/**
 * Middleware to handle undefined routes
 * @param {Object} req - The request object
 * @param {Object} _res - The response object
 * @param {Function} next - The next middleware function
 */
app.all('*', (req, _res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandler);

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Start the server and log the URL
app.listen(PORT, () => {
  const host = 'localhost';
  const protocol = 'http';
  const fullUrl = `${protocol}://${host}:${PORT}/api`;

  console.log(`\x1b[32mServer is running on ${fullUrl}\x1b[0m`); // Green text
});
