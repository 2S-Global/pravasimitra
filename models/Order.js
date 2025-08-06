import mongoose from "mongoose";
import { Sue_Ellen_Francisco } from "next/font/google";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MarketProduct",
      required: true,
    },
    quantity: Number,
    price: Number,

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    paymentMethod: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "paid", "cancelled"],
      default: "pending",

    },
    items: [orderItemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
