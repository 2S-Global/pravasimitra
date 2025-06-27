import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectDB } from "../../../../../lib/db";


import MarketCategory from "../../../../../models/MarketCategory";
import User from "../../../../../models/User";
import { encodeObjectId } from "../../../../../lib/idCodec";

/**
 * @description Get all MarketCategory items that are not marked as deleted
 * @route GET /api/marketplace/category-list
 * @success {object} 200 - Returns an array of category objects with encoded IDs
 * @error {object} 500 - Database query failed or server error
 */

export const GET = async (req) => {
  await connectDB();

  try {
    const categoryList = await MarketCategory.find({ isDel: false }).lean();
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
