import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import {connectDB} from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { withAuth } from "../../../../../lib/withAuth";
import RoomCategory from "../../../../../models/RoomCategory";
import User from "../../../../../models/User";

export const GET =withAuth (async function (req,user) {
  await connectDB();
    const userId = user?.id;
  try {
    const items = await RoomItem.find({ isDel: false,createdBy:userId })
      .sort({ createdAt: -1 })
      .select("-__v -isDel")
      .populate("propertyType","name")
      .populate("createdBy","name")
      .lean();

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("DB fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch rent items" }, { status: 500 });
  }
})
