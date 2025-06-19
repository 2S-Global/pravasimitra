import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  city: String,
  state: String,
  image: String,     // Main image (first image of the gallery)
  gallery: [String], // Array of image URLs
  description: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);