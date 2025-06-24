import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import RoomItem from "../../../../../models/Room";
import { withAuth } from "../../../../../lib/withAuth";
import { decodeObjectId } from "../../../../../lib/idCodec";

export const PATCH = withAuth(async (req, user) => {
  await connectDB();

  let data;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ msg: "Invalid JSON" }, { status: 500 });
  }

  const { id } = data;

  if (!id) {
    return NextResponse.json({ msg: "Missing Id" }, { status: 400 });
  }

  let decodeId;
  try {
    decodeId = decodeObjectId(id);
  } catch (err) {
    return NextResponse.json({ msg: "Invalid encoded ID" }, { status: 400 });
  }

  const deleted = await RoomItem.findByIdAndUpdate(
    { _id: decodeId, createdBy: user.id },
    { $set: { isDel: true } },
    { new: true }
  );

  return deleted
    ? NextResponse.json(
        { msg: "Item deleted Successfully", item: deleted },
        { status: 200 }
      )
    : NextResponse.json(
        { msg: "Item not found or unauthorized" },
        { status: 404 }
      );
});
