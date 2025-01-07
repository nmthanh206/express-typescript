import type { RequestHandler } from 'express';

export type Controller = Record<string, RequestHandler>;
