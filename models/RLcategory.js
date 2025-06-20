import mongoose from "mongoose";

const RLcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    is_del: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.RLcategory ||
  mongoose.model("RLcategory", RLcategorySchema);
