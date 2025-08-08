import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  id: Number,
  name: String,
  status: Number,
  is_del: Number
});

export default mongoose.models.Country || mongoose.model("Country", CountrySchema, "country");
