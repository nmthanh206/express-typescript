import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { accessTokenKey } from '@/constant';
import PatientModel from '@/models/Patient';
import { asyncHandler } from '@/utils/asyncHandler';
import CustomError from '@/utils/customError';

export type PayloadJWT = {
  email: string;
} & JwtPayload;
/**
 * Middleware to protect routes by verifying JWT tokens.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @throws {Error} If the token is missing or invalid.
 *
 * @example
 * // Usage in an Express route
 * import { protect } from '@/middleware/authMiddleware';
 *
 * app.get('/protected-route', protect, (req, res) => {
 *   res.status(200).json({ message: 'You have access to this protected route!', user: req.user });
 * });
 */
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Retrieve token from cookies or authorization header
  const token = req.cookies[accessTokenKey] || req.headers.authorization?.split?.(' ').at(1);

  // Check if token is provided
  if (!token) {
    throw new CustomError('You are not logged in! Please log in to get access.', StatusCodes.UNAUTHORIZED);
  }

  // Verify the token and decode it
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as PayloadJWT;

  // Find the user associated with the token
  const currentUser = await PatientModel.findById(decoded.sub);
  if (!currentUser) {
    throw new CustomError('The user belonging to this token does no longer exist.', StatusCodes.UNAUTHORIZED);
  }

  // Attach the current user to the request object
  req.user = currentUser;

  // Proceed to the next middleware
  next();
});

/**
 * Middleware to restrict access to certain roles.
 *
 * @param {...string} roles - The roles that are allowed to access the route.
 * @returns {Function} Middleware function to check user roles.
 *
 * @example
 * // Usage in an Express route
 * import { restrictTo } from '@/middleware/authMiddleware';
 *
 * app.delete('/admin-route', protect, restrictTo('admin'), (req, res) => {
 *   res.status(200).json({ message: 'You have access to this admin route!' });
 * });
 */
const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user?.role as string)) {
      throw new CustomError('You do not have permission to perform this action', StatusCodes.FORBIDDEN);
    }

    // Proceed to the next middleware
    next();
  };
};

export { protect, restrictTo };
