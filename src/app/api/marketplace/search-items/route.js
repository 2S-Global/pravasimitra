import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MarketProduct from "../../../../../models/MarketProduct";
import MarketCategory from "../../../../../models/MarketCategory";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";
import { encodeObjectId, decodeObjectId } from "../../../../../lib/idCodec";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const categoryEncoded = searchParams.get("categoryId");
  const keyword = searchParams.get("keyword");

  let query = {
    isDel: false,
  };

  // Category filter
  if (categoryEncoded) {
    try {
      const categoryId = decodeObjectId(categoryEncoded);
      query.category = categoryId;
    } catch (err) {
      return addCorsHeaders(
        NextResponse.json({ error: "Invalid category ID" }, { status: 400 })
      );
    }
  }

  // Keyword filter
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  try {
    const products = await MarketProduct.find(query)
      .select("-__v -isDel")
      .populate("category", "name")
      .lean();

    const baseImageUrl = `${
      process.env.IMAGE_URL || "http://localhost:3000/assets/images"
    }/e-marketplace`;

    const updatedProducts = products.map((product) => ({
      ...product,
      id: encodeObjectId(product._id),
      images: product.images
        ? product.images.map((img) => `${baseImageUrl}/${img}`)
        : [],
      _id: undefined,
    }));

    return addCorsHeaders(
      NextResponse.json({ products: updatedProducts }, { status: 200 })
    );
  } catch (err) {
    console.error("Error fetching products:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    );
  }
};
