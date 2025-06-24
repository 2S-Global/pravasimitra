import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { decodeObjectId } from "../../../../../lib/idCodec";

export const GET = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const propertyTypeEncoded = searchParams.get("id");

  if (!propertyTypeEncoded) {
    return NextResponse.json(
      { error: "Missing propertyType ID in query" },
      { status: 400 }
    );
  }

  let query = { isDel: false };

  try {
    const categoryId = decodeObjectId(propertyTypeEncoded);


    if (!categoryId || typeof categoryId !== "object" || !categoryId._bsontype) {
      throw new Error("Invalid ObjectId");
    }

    query.propertyType = categoryId;
  } catch (err) {
    console.error("ID decoding failed:", err.message);
    return NextResponse.json(
      { error: "Invalid propertyType ID" },
      { status: 400 }
    );
  }

  try {
    const items = await RoomItem.find(query)
      .select("-__v -isDel")
      .populate("propertyType", "name")
      .lean();

    if (!items.length) {
      return NextResponse.json(
        { msg: "No items available", itemList: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ itemList: items }, { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
};
