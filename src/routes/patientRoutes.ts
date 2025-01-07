import { Router } from 'express';

import { patientController } from '@/controllers/patientController';

const patientRoute = Router();

patientRoute.post('/login', patientController.login);
patientRoute.post('/register', patientController.register);
export { patientRoute };
