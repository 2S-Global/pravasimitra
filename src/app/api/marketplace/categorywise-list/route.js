import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import MarketCategory from "../../../../../models/Room";
import { decodeObjectId, encodeObjectId } from "../../../../../lib/idCodec";
import MarketProduct from "../../../../../models/MarketProduct";

/**
 * @description Get all MarketProduct items for a given category ID (only those not marked as deleted)
 * @route GET /api/e-marketplace/item-list
 * @queryparam {string} id - Encoded category ID
 * @success {object} 200 - Returns an array of MarketProduct items with encoded IDs
 * @error {object} 400 - Missing or invalid category ID
 * @error {object} 500 - Database query failed or server error
 */



export const GET = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("id");

  if (!category) {
    return NextResponse.json(
      { error: "Missing propertyType ID in query" },
      { status: 400 }
    );
  }

  let query = { isDel: false };

  try {
    const categoryId = decodeObjectId(category);
    console.log(categoryId);

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
    return NextResponse.json(
      { error: "Invalid propertyType ID" },
      { status: 400 }
    );
  }

  try {
    const items = await MarketProduct.find(query)
      .select("-__v -isDel")
      .populate("category", "name")
      .lean();

    if (!items.length) {
      return NextResponse.json(
        { msg: "No items available", itemList: [] },
        { status: 200 }
      );
    }

    const updatedItems = items.map((item) => ({
      ...item,
      id: encodeObjectId(item._id),
      _id: undefined,
    }));

    return NextResponse.json({ itemList: updatedItems }, { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
};
