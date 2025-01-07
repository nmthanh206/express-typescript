import bcrypt from 'bcryptjs';
import type { Document, InferSchemaType } from 'mongoose';
import mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  confirmpassword: String,
});

patientSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

patientSchema.pre('save', async function (this: any, next) {
  this.wasNew = this.isNew; // to access post middleware
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export type PatientSchemaMethod = { matchPassword: (enteredPassword: string) => boolean };

export type PatientSchema = InferSchemaType<typeof patientSchema> & Document;

export type PatientDB = mongoose.Model<PatientSchema, {}, PatientSchemaMethod>;

const PatientModel = (mongoose.models.patients || mongoose.model('patients', patientSchema)) as PatientDB;

export default PatientModel;
