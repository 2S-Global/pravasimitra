import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/Order";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user) => {
  await connectDB();

  const userId = user?.id; 

  try {
    // Find orders where the logged-in user is a seller in any item
    const orders = await Order.find({ "items.sellerId": userId })
      .populate("items.productId")
      .populate("userId"); // Populating buyer details

    const sellerOrders = [];

    for (const order of orders) {
      const relevantItems = order.items.filter(
        (item) => item.sellerId?.toString() === userId.toString()
      );

      if (relevantItems.length === 0) continue;

      const orderSummary = {
        orderId: order._id,
        createdAt: order.createdAt,
        buyer: {
          name: order.userId?.name || "",
          image: order.userId?.image || "",
        },
        items: [],
        orderTotal: 0,
      };

      for (const item of relevantItems) {
        const product = item.productId;

        orderSummary.items.push({
          _id: item._id,
          productId: product?._id,
          title: product?.title || "",
          price: item.price,
          quantity: item.quantity,
          images: product?.images || [],
        });

        orderSummary.orderTotal += item.price * item.quantity;
      }

      sellerOrders.push(orderSummary);
    }

    return addCorsHeaders(
      NextResponse.json({ orders: sellerOrders }, { status: 200 })
    );
  } catch (error) {
    console.error("Error fetching seller order details:", error);
    return addCorsHeaders(
      NextResponse.json(
        { error: "Error fetching seller order details" },
        { status: 500 }
      )
    );
  }
});
