import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  
  meta?: {
    limit: number;
    page: number;
    total: number;
  };
  data: T | null | undefined;
};

export const sendRes = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    // eslint-disable-next-line no-undefined
    meta: data.meta || null || undefined,
    data: data?.data || null,
  });
};
