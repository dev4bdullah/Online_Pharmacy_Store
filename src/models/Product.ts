import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  viewCount: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (value: string[]) {
        return value.length > 0;
      },
      message: "At least one image is required.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  await this.model("Product").deleteMany({ category: this._id });
  next();
});

// ✅ Force recompile in dev
// export const Product = model("Product", ProductSchema);
// export default mongoose.models.Cart || mongoose.model('Product', ProductSchema);
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
