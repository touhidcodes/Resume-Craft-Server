/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "../errors/appErrors";
import handleZodError from "../errors/handleZodError";

const gobbleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let statusCode = 500;
  let message = err.message || "something went wrong !!";
  let errorDetails = err;

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorDetails = err;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.message;
    errorDetails = { issues: simplifiedError?.errorSources };
  } else if (
    err?.name === "PrismaClientKnownRequestError" &&
    err?.meta.target
  ) {
    statusCode = httpStatus.BAD_REQUEST;
    message =
      err?.meta.modelName + " " + err?.meta.target + " is already exist !!";
    errorDetails = err;
  } else if (err?.name === "NotFoundError") {
    statusCode = httpStatus.NOT_FOUND;
    message = err?.message;
    errorDetails = err;
  } else if (err instanceof JsonWebTokenError) {
    statusCode = httpStatus.UNAUTHORIZED;
    message = err?.message;
    errorDetails = err;
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorDetails,
  });
};
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    massage: "API Not Fount !!",
    errorDetails: {
      path: req.originalUrl,
      massage: "Your Url Is Not Fount !!",
    },
  });
};
export const gobbleErrorHandler = {
  gobbleError,
  notFound,
};
