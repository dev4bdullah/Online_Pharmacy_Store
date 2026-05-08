import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  password: { type: String, required: true }, 
  isVerified: { type: Boolean, default: false },  
}, { timestamps: true });

export default models.User || model("User", UserSchema);
