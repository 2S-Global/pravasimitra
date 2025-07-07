import mongoose from "mongoose";

const RentItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    images: {
      type: [String],
    },
    icon: {
      type: String,
    },
    propertyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
    },
    roomSize: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDel: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.RoomItem ||
  mongoose.model("RoomItem", RentItemSchema);
