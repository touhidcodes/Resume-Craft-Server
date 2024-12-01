import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';

const app: Application = express();
export const prisma = new PrismaClient();

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:5173', ''],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running... !');
});

app.get('/api', (req: Request, res: Response) => {
  res.send({
    massage: 'Welcome to Resume Craft',
  });
});

app.use('/api', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
});

export default app;
