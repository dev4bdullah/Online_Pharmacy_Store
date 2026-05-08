import mongoose, { Schema, models, model } from "mongoose";

const EmployerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Employer = models.Employer || model("Employer", EmployerSchema);
