import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await Product.findById(id)
      .populate("category", "name")
      .lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });

  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
