import type { NextFunction, Request, Response } from 'express';

import type CustomError from '@/utils/customError';

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack?.split?.('\n'),
  });
};

export { errorHandler };
