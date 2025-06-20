import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    // Validate productId
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid or missing product ID" }, { status: 400 });
    }

    const product = await Product.findById(productId)
      .populate("category", "name image")
      .select("-__v")
      .lean();

    if (!product || product.is_del) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });

  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
