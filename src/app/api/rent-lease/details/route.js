import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { withAuth } from "../../../../../lib/withAuth";
import RoomCategory from "../../../../../models/RoomCategory";
import User from "../../../../../models/User";
import { decodeObjectId,encodeObjectId } from "../../../../../lib/idCodec";

export const GET = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const encodedId = searchParams.get("id");

  if (!encodedId) {
    return NextResponse.json(
      { error: "Missing RoomItem ID in query" },
      { status: 400 }
    );
  }

  try {
    const decodedId = decodeObjectId(encodedId); // 👈 decode the RoomItem MongoDB _id

    const item = await RoomItem.findOne({ _id: decodedId, isDel: false })
      .select("-__v -isDel")
      .populate("propertyType", "name")
      .lean();

    if (!item) {
      return NextResponse.json({ msg: "Item not found" }, { status: 404 });
    }

    const updatedItem = {
      ...item,
      id: encodeObjectId(item._id), // 👈 encode it back for frontend
    };
    delete updatedItem._id;

    return NextResponse.json({ item: updatedItem }, { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Invalid or malformed RoomItem ID" },
      { status: 400 }
    );
  }
};