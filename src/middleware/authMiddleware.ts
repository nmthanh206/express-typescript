import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { accessTokenKey } from '@/constant';
import PatientModel from '@/models/Patient';
import { asyncHandler } from '@/utils/asyncHandler';

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[accessTokenKey] || req.headers.authorization?.split?.(' ').at(1);

  if (!token) {
    res.status(401);
    throw new Error('You are not logged in! Please log in to get access.');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

  const currentUser = await PatientModel.findById(decoded.id);
  if (!currentUser) {
    res.status(401);
    return next(new Error('The user belonging to this token does no longer exist.'));
  }

  req.user = currentUser;

  next();
});

const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // roles ['admin', 'lead-guide','user']. role='user'
    if (roles.includes(req.user?.role as string)) {
      res.status(403);
      return next(new Error('You do not have permission to perform this action'));
    }

    next();
  };
};
export { protect, restrictTo };
