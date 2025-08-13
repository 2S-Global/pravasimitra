import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";
import LocationSetting from "../../../../../models/LocationSetting";
import ProductCategory from "../../../../../models/ProductCategory";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";
import { encodeObjectId, decodeObjectId } from "../../../../../lib/idCodec";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("keyword");
  const userId = user?.id;

  if (!searchTerm) {
    return addCorsHeaders(
      NextResponse.json({ error: "Missing search term" }, { status: 400 })
    );
  }

  try {
    // Get user's location
    const location = await LocationSetting.findOne({ userId })
      .select("currentCity currentCountry")
      .lean();

    if (!location || !location.currentCity || !location.currentCountry) {
      return addCorsHeaders(
        NextResponse.json({ error: "User location not set" }, { status: 400 })
      );
    }

    // Build query with location + exclude own posts
    let query = {
      is_del: false,
      createdBy: { $ne: userId },
      city: location.currentCity,
      country: location.currentCountry,
      title: { $regex: searchTerm, $options: "i" } // case-insensitive search
    };

    const products = await Product.find(query)
      .select("-__v -is_del")
      .populate("category", "name")
      .populate("city", "name")
      .populate("country", "name")
      .lean();

    if (!products.length) {
      return addCorsHeaders(
        NextResponse.json(
          { msg: "No products found", productList: [] },
          { status: 200 }
        )
      );
    }

    const updatedProducts = products.map((product) => ({
      ...product,
      id: encodeObjectId(product._id),
      _id: undefined,
      image: product.image || null,
      gallery: Array.isArray(product.gallery) ? product.gallery : [],
    }));

    return addCorsHeaders(
      NextResponse.json(
        {
          msg: "Search results loaded successfully",
          productList: updatedProducts,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Search failed:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to search products" }, { status: 500 })
    );
  }
});
