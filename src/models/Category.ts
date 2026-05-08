import mongoose, { Schema, models, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Category = models.Category || model("Category", CategorySchema);
