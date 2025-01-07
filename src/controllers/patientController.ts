import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { accessTokenKey } from '@/constant';
import PatientModel from '@/models/Patient';
import type { Controller } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';
import CustomError from '@/utils/customError';
import { objectEntries } from '@/utils/typescriptEnhance';
// eslint-disable-next-line @typescript-eslint/naming-convention
const _patientController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await PatientModel.findOne({ email });
    if (!user) {
      throw new CustomError('No patient found', StatusCodes.BAD_REQUEST);
    }

    if (!user.matchPassword(password)) {
      throw new CustomError('Password is incorrect', StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
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
} satisfies Controller;

const patientController = objectEntries(_patientController).reduce(
  (pre, [key, method]) => {
    pre[key] = asyncHandler(method);
    return pre;
  },
  {} as Record<keyof typeof _patientController, any>,
);

export { patientController };
