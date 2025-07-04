import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MarketProduct",
    required: true
  },
  quantity: Number,
  price: Number
}, { _id: true });

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",

  },
  items: [orderItemSchema]
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
