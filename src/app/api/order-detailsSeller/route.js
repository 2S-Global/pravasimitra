import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/Order";
import { withAuth } from "../../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user, context) => {
  await connectDB();
  
  const userId = user?.id;
  const orderId = context.params?.id;

  if (!orderId) {
    return addCorsHeaders(
      NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    );
  }

  try {
    const order = await Order.findById(orderId)
      .populate("items.productId")
      .populate("items.sellerId")
      .populate("userId")
      .populate("addressId");

    if (!order) {
      return addCorsHeaders(
        NextResponse.json({ error: "Order not found" }, { status: 404 })
      );
    }

    const relevantItems = order.items.filter(
      (item) => item.sellerId?._id?.toString() === userId.toString()
    );

    if (relevantItems.length === 0) {
      return addCorsHeaders(
        NextResponse.json({ error: "Unauthorized access" }, { status: 403 })
      );
    }

    const address = order.addressId;

    const orderSummary = {
      orderId: order._id,
      createdAt: order.createdAt,
      paymentMethod: order.paymentMethod || "",
      status: order.status || "",
      buyer: {
        name: order.userId?.name || "",
        image: order.userId?.image || "",
      },
      address: address
        ? {
            _id: address._id,
            billing: address.billing || {},
            shipping: address.shipping || {},
          }
        : null,
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

    return addCorsHeaders(
      NextResponse.json({ order: orderSummary }, { status: 200 })
    );
  } catch (error) {
    console.error("Error fetching order detail:", error);
    return addCorsHeaders(
      NextResponse.json(
        { error: "Failed to fetch order detail" },
        { status: 500 }
      )
    );
  }
});
