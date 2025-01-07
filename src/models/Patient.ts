import bcrypt from 'bcryptjs';
import type { Document, InferSchemaType } from 'mongoose';
import mongoose from 'mongoose';

// Define the schema for the Patient model
const patientSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  confirmpassword: String,
});

/**
 * Compares the entered password with the hashed password stored in the database.
 *
 * @param {string} enteredPassword - The password entered by the user during login.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 */
patientSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

/**
 * Pre-save middleware to hash the password before saving the patient document.
 *
 * @this {any} - Refers to the current document being saved.
 * @param {Function} next - The next middleware function to call.
 */
patientSchema.pre('save', async function (this, next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
  next();
});

// Define the method type for the Patient schema
export type PatientSchemaMethod = { matchPassword: (enteredPassword: string) => boolean };

// Define the schema type for the Patient model
export type PatientSchema = InferSchemaType<typeof patientSchema> & Document;

// Define the model type for the Patient model
export type PatientDB = mongoose.Model<PatientSchema, {}, PatientSchemaMethod>;

// Create or retrieve the Patient model
const PatientModel = (mongoose.models.patients || mongoose.model('patients', patientSchema)) as PatientDB;

export default PatientModel;
