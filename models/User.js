import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    password: { type: String, select: false },
    email: { type: String },
    mobile: { type: String },
    isDel: { type: Number, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
