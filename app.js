import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

import { connectDatabase } from './config/database.js';
import { PORT } from './config/siteEnv.js';
import globalErrorHandler from './controllers/errorController.js';
import router from './routes/index.js';
import AppError from './utils/appError.js';

// uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  process.exit(1);
});

const app = express();

// middleware
const options = [
  cors({
    origin: '*',
  }),
  logger('tiny'),
  helmet(),
  express.json({ limit: '30mb' }),
];
app.use(options);

// routes
app.use('/health-check', (req, res) =>
  res.json({
    status: 'success',
    message: 'Server is running!',
  })
);
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on this server!`, 404));
});

// error handler
app.use(globalErrorHandler);

// server connect
connectDatabase().then(() => {
  console.log('DB Connected!');
  app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  app.close(() => process.exit(1));
});
