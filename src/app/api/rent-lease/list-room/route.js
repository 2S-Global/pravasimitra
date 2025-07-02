import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import {connectDB} from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { withAuth } from "../../../../../lib/withAuth";
import RoomCategory from "../../../../../models/RoomCategory";
import User from "../../../../../models/User";
import { encodeObjectId } from "../../../../../lib/idCodec";


/**
 * @description Get all RoomItems created by the authenticated user (excluding deleted)
 * @route GET /api/rent-lease/my-items
 * @success {object} 200 - Returns an array of RoomItems with encoded IDs
 * @error {object} 500 - Database query failed or server error
 */

export const GET = withAuth (async function (req,user) {
  await connectDB();
    const userId = user?.id;
  try {
    const items = await RoomItem.find({ isDel: false,createdBy:userId })
      .sort({ createdAt: -1 })
      .select("-__v -isDel")
      .populate("propertyType","name")
      .populate("createdBy","name")
      .lean();

      if(!items || items.length===0){
          return NextResponse.json({ msg: "No Items Found", items: [] }, { status: 200 });
      }

      const updatedItems=items.map(item=>({
        ...item,
        id:encodeObjectId(item._id),
        _id: undefined
      }))

    return NextResponse.json({ items: updatedItems }, { status: 200 });
  } catch (err) {
    console.error("DB fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch rent items" }, { status: 500 });
  }
})
