import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";

import RoomCategory from "../../../../../models/RoomCategory";
import User from "../../../../../models/User";
import { encodeObjectId } from "../../../../../lib/idCodec";

export const GET = async (req) => {
  await connectDB();

  try {
    const categoryList = await RoomCategory.find({ isDel: false }).lean();
    const categories = categoryList.map((cat) => ({
      id: encodeObjectId(cat._id),
      name: cat.name,
    }));

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { msg: "No Items Found", categories: [] },
        { status: 200 }
      );
    }
    return NextResponse.json({ categories: categories }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};
