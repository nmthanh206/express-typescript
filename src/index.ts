import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorMiddleware';
import { patientRoute } from './routes/patientRoutes';
import CustomError from './utils/customError';

dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGODB_URL as string).then(() => console.log('\x1bDB connection successful!\x1b[0m'));

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

app.use('/api', patientRoute);

app.all('*', (req, _res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  const host = 'localhost';
  const protocol = 'http';
  const fullUrl = `${protocol}://${host}:${PORT}/api`;

  console.log(`\x1b[32mServer is running on ${fullUrl}\x1b[0m`); // Green text
});
