import mongoose from "mongoose";

const MarketProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MarketCategory",
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    ingredients: {
      type: [String],
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

export default mongoose.models.MarketProduct ||
  mongoose.model("MarketProduct", MarketProductSchema);
