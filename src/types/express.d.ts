/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

import type { PatientDB, PatientSchema } from '@/models/Patient';

declare global {
  namespace Express {
    interface Request {
      user?: PatientSchema;
    }
  }
}
