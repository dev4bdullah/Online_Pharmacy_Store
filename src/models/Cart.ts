import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true }
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
  totalPrice: { type: Number, default: 0 },
  totalItems: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);