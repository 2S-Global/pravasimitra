import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id");

    if (!id) {
      return addCorsHeaders(NextResponse.json({ error: "Product ID is required" }, { status: 400 }));
    }

    const product = await Product.findById(id)
      .populate("category", "name")
      .lean();

    if (!product) {
      return addCorsHeaders(NextResponse.json({ error: "Product not found" }, { status: 404 }));
    }

    return addCorsHeaders(NextResponse.json({ product }, { status: 200 }));

  } catch (error) {
    console.error("Error fetching product details:", error);
    return addCorsHeaders(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}
