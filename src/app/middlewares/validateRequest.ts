import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      await Schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
