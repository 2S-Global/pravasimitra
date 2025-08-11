import mongoose from "mongoose";

const MembershipTransactionSchema = new mongoose.Schema(
  {
    stripeSessionId: { type: String, required: true, unique: true },
    paymentIntentId: { type: String, required: true },
    customerEmail: { type: String },
    amountTotal: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    rawSession: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.models.MembershipTransaction ||
  mongoose.model("MembershipTransaction", MembershipTransactionSchema);
