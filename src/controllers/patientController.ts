import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { accessTokenKey } from '@/constant';
import type { PayloadJWT } from '@/middleware/authMiddleware';
import PatientModel from '@/models/Patient';
import { createController } from '@/utils/createController';
import CustomError from '@/utils/customError';
const patientController = createController({
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await PatientModel.findOne({ email });
    if (!user) {
      throw new CustomError('No patient found', StatusCodes.BAD_REQUEST);
    }

    if (!user.matchPassword(password)) {
      throw new CustomError('Password is incorrect', StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({ email: user.email, sub: user.id } as PayloadJWT, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRED,
    });
    res.cookie(accessTokenKey, token);
    res.json({ accessToken: token });
  },
  register: async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;

    // Password confirmation
    if (password !== req.body.confirmpassword) {
      throw new CustomError('Passwords do not match', StatusCodes.UNAUTHORIZED);
    }

    const newPatient = await PatientModel.create({ firstname, lastname, email, phone, password });
    res.json(newPatient);
  },
});

export { patientController };
