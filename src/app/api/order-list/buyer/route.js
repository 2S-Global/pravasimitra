import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/Order";
import MarketProduct from "../../../../../models/MarketProduct";
import Address from "../../../../../models/Address";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user) => {
  await connectDB();

  const userId = user?.id;

  if (!userId) {
    return addCorsHeaders(
      NextResponse.json(
        { success: false, message: "Unauthorized: user not found" },
        { status: 401 }
      )
    );
  }

  try {
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        model: MarketProduct,
        select: "title images price", // only necessary fields
      })
      .populate({
        path: "addressId",
        model: Address,
      })
      .lean();

    const ordersWithTotal = orders.map((order, index) => {
      let orderTotal = 0;

      for (const item of order.items) {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        orderTotal += price * quantity;
      }

      // Add custom orderId if not present
      const orderId = order.orderId || `pravasi-${String(index + 1).padStart(4, "0")}`;

      return {
        ...order,
        orderId,
        orderTotal,
      };
    });

    return addCorsHeaders(
      NextResponse.json({ success: true, data: ordersWithTotal }, { status: 200 })
    );
  } catch (error) {
    console.error("Error fetching buyer orders:", error);
    return addCorsHeaders(
      NextResponse.json(
        { success: false, message: "Failed to fetch buyer orders" },
        { status: 500 }
      )
    );
  }
});
