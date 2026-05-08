import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
    name: String,
    image: String
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  paymentMethod: { type: String, enum: ['cod', 'card', 'paypal'], required: true },
  paymentStatus: { type: String, default: 'pending' },
  orderStatus: { type: String, default: 'processing' }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);