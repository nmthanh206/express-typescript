import type { NextFunction, Request, Response } from 'express';

import type CustomError from '@/utils/customError';

/**
 * Middleware to handle errors in the application.
 *
 * @param {CustomError} err - The error object containing error details.
 * @param {Request} _req - The request object (not used).
 * @param {Response} res - The response object used to send the error response.
 * @param {NextFunction} _next - The next middleware function (not used).
 * @returns {void}
 */
const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  // Determine the status code from the error or default to 500
  const statusCode = err?.statusCode || 500;

  // Send the error response
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack?.split?.('\n'),
  });
};

export { errorHandler };
