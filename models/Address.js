import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
  },
  { _id: false }
);

const shippingSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    pinCode: String,
    address: String,
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    billing: billingSchema,
    shipping: shippingSchema,
  },
  { timestamps: true }
);

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
