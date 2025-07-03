import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";
import { withAuth } from "../../../../../lib/withAuth";
import { encodeObjectId } from "../../../../../lib/idCodec";

/**
 * @description Get all Products created by the authenticated user (excluding deleted)
 * @route GET /api/product/my-items
 * @auth Required
 * @success {object} 200 - Returns an array of Products with encoded IDs
 * @error {object} 500 - Database query failed or server error
 */

export const GET = withAuth(async function (req, user) {
  await connectDB();

  const userId = user?.id;

  try {
    const products = await Product.find({ is_del: false, createdBy: userId })
      .sort({ createdAt: -1 })
      .select("-__v -is_del")
      .populate("category", "name")
      .populate("createdBy", "name")
      .lean();

    if (!products || products.length === 0) {
      return NextResponse.json({ msg: "No Products Found", items: [] }, { status: 200 });
    }

    const updatedProducts = products.map((item) => ({
      ...item,
      id: encodeObjectId(item._id),
      _id: undefined,
    }));

    return NextResponse.json({ items: updatedProducts }, { status: 200 });
  } catch (err) {
    console.error("DB fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch product items" }, { status: 500 });
  }
});
