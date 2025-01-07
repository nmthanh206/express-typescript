import type { NextFunction, Request, Response } from 'express';

export type Controller = Record<string, (req: Request, res: Response, next: NextFunction) => any>;
