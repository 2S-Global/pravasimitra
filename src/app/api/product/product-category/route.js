import { connectDB } from "../../../../../lib/db";
import ProductCategory from "../../../../../models/ProductCategory";
import { NextResponse } from "next/server";

// GET all product categories (not soft-deleted)
export async function GET() {
  try {
    await connectDB();

    const categories = await ProductCategory.find({ is_del: false })
      .sort({ createdAt: -1 })
      .lean();

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { msg: "No product categories found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { msg: "Product categories fetched successfully", categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch product categories",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Create a new product category
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    body.is_del = false;

    const newCategory = await ProductCategory.create(body);

    return NextResponse.json(
      {
        msg: "Product category created successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create product category",
        details: error.message,
      },
      { status: 500 }
    );
  }
}