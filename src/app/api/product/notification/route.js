import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import BuySellNotification from "../../../../../models/BuySellNotification";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user) => {
  await connectDB();

  const notifications = await BuySellNotification.find({ to: user.id })
    .populate("from", "name email")
    .populate("productId", "title images")
    .sort({ createdAt: -1 })
    .lean();

  return addCorsHeaders(NextResponse.json({ success: true, notifications }));
});

export const POST = withAuth(async (req, user) => {
  await connectDB();

  const { to, productId } = await req.json();

  const notification = new BuySellNotification({
    from: user.id,
    to,
    productId,
  });

  await notification.save();

  return addCorsHeaders(
    NextResponse.json({ success: true, message: "Notification sent." })
  );
});
