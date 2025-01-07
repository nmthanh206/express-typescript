/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

import type { PatientDB, PatientSchema } from '@/models/Patient';

/**
 * Extends the Express Request interface to include a user property.
 * This allows the request object to carry user information, specifically
 * the patient data, throughout the application.
 */
declare global {
  namespace Express {
    interface Request {
      /**
       * The user property contains the patient information associated with the request.
       * This is typically populated by authentication middleware.
       *
       * @type {PatientSchema}
       */
      user?: PatientSchema;
    }
  }
}
