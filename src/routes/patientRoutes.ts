import { Router } from 'express';

import { patientController } from '@/controllers/patientController';

// Create a new router for patient-related routes
const patientRoute = Router();

patientRoute.post('/login', patientController.login);
patientRoute.post('/register', patientController.register);
export { patientRoute };
