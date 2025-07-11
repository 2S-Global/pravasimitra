import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Product from "../../../../../models/Product";
import { decodeObjectId, encodeObjectId } from "../../../../../lib/idCodec";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";
import ProductCategory from "../../../../../models/ProductCategory";

/**
 * @description Get all products for a given category ID
 * @route GET /api/product/item-list
 * @queryparam {string} id - Encoded category ID (required)
 * @success {object} 200 - Products fetched successfully
 * @error {object} 400 - Missing or invalid category ID
 * @error {object} 500 - Failed to fetch products from the database
 */

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const categoryEncoded = searchParams.get("id");

  if (!categoryEncoded) {
    return addCorsHeaders(
      NextResponse.json(
        { error: "Missing category ID in query" },
        { status: 400 }
      )
    );
  }

  let query = { is_del: false };

  try {
    const categoryId = decodeObjectId(categoryEncoded);

    if (
      !categoryId ||
      typeof categoryId !== "object" ||
      !categoryId._bsontype
    ) {
      throw new Error("Invalid ObjectId");
    }

    query.category = categoryId;
  } catch (err) {
    console.error("ID decoding failed:", err.message);
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid category ID" }, { status: 400 })
    );
  }

  try {
    const products = await Product.find(query)
      .select("-__v -is_del")
      .populate("category", "name")
      .lean();

    if (!products.length) {
      return addCorsHeaders(
        NextResponse.json(
          { msg: "No products available", productList: [] },
          { status: 200 }
        )
      );
    }

    const baseImageUrl = `${process.env.IMAGE_URL}/product-items`;

    const updatedProducts = products.map((product) => ({
      ...product,
      id: encodeObjectId(product._id),
      _id: undefined,
      image: product.image ? `${baseImageUrl}/${product.image}` : null,
      gallery: Array.isArray(product.gallery)
        ? product.gallery.map((img) => `${baseImageUrl}/${img}`)
        : [],
    }));

    return addCorsHeaders(
      NextResponse.json({ productList: updatedProducts }, { status: 200 })
    );
  } catch (err) {
    console.error("Fetch failed:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    );
  }
};
