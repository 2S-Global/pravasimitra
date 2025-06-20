import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    image: {
      type: String,
    },
    gallery: [String],
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    shortDesc: {
      type: String,
    },
    description: {
      type: String,
    },
    is_del: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
