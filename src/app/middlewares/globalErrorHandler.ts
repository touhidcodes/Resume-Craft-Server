import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { AppError } from '../errors/appErrors';
import handleZodError from '../errors/handleZodError';
import { JsonWebTokenError } from 'jsonwebtoken';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';
  let errorDetails = err;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = { issues: simplifiedError.errorSources };
  } else if (
    err?.name === 'PrismaClientKnownRequestError' &&
    err?.meta?.target
  ) {
    statusCode = httpStatus.BAD_REQUEST;
    message = `${err?.meta?.modelName} ${err?.meta?.target} already exists!`;
    errorDetails = err;
  } else if (err?.name === 'NotFoundError') {
    statusCode = httpStatus.NOT_FOUND;
    message = err.message;
    errorDetails = err;
  } else if (err instanceof JsonWebTokenError) {
    statusCode = httpStatus.UNAUTHORIZED;
    message = err.message;
    errorDetails = err;
  } else if (err.name === 'TokenExpiredError') {
    statusCode = httpStatus.UNAUTHORIZED;
    message = 'Unauthorized Access!';
    errorDetails = err;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: err,
  });
};

export default globalErrorHandler;
