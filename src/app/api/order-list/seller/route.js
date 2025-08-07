import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/Order";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";
import { encodeObjectId } from "../../../../../lib/idCodec";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user) => {
  await connectDB();

  const userId = user?.id;

  try {
    // Fetch orders where the logged-in user is a seller in any item
    const orders = await Order.find({ "items.sellerId": userId }).populate("items.productId");

    const sellerItems = [];

    for (const order of orders) {
      for (const item of order.items) {
        if (item.sellerId?.toString() === userId.toString()) {
          const product = item.productId;

          sellerItems.push({
            _id: (item._id),
            orderId: (order._id),
            productId: (product?._id),
            title: product?.title || "",
            price: item.price,
            quantity: item.quantity,
            images: product?.images || [],
          });
        }
      }
    }

    // Group by orderId and calculate total per order
    const groupedOrders = {};

    for (const item of sellerItems) {
      const orderId = item.orderId;

      if (!groupedOrders[orderId]) {
        groupedOrders[orderId] = {
          orderId,
          items: [],
          orderTotal: 0,
        };
      }

      groupedOrders[orderId].items.push(item);
      groupedOrders[orderId].orderTotal += item.price * item.quantity;
    }

    const groupedItems = Object.values(groupedOrders); // convert object → array

    return addCorsHeaders(
      NextResponse.json({ orders: groupedItems }, { status: 200 })
    );
  } catch (error) {
    console.error("Error fetching seller order items:", error);
    return addCorsHeaders(
      NextResponse.json(
        { error: "Error fetching seller order items" },
        { status: 500 }
      )
    );
  }
});
