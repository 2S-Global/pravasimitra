import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { withAuth } from "../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";
import Order from "../../../../models/Order";
import User from "../../../../models/User";
import { encodeObjectId } from "../../../../lib/idCodec";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("id");

  if (!orderId) {
    return NextResponse.json(
      { success: false, message: "Order ID is required" },
      { status: 400 }
    );
  }

  try {
    const order = await Order.findById(orderId)
      .populate("userId")
      .populate("addressId")
      .populate("items.productId");

    if (!order) {
      return addCorsHeaders(
        NextResponse.json({ error: "Order not found" }, { status: 404 })
      );
    }

    const buyer = await User.findById(order.userId).lean();
    const buyerSince = buyer?.createdAt
      ? buyer.createdAt.toISOString().split("T")[0]
      : null;

    const responseOrder = {
      _id: encodeObjectId(order._id),
      orderId: order.orderId,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      buyer: buyer
        ? {
            _id: encodeObjectId(buyer._id),
            name: buyer.name,
            email: buyer.email,
            phone: buyer.phone,
            buyerSince,
          }
        : null,
      address: order.addressId
        ? {
            _id: encodeObjectId(order.addressId._id),
            billing: order.addressId.billing,
            shipping: order.addressId.shipping,
          }
        : null,
      items: order.items.map((item) => {
        const product = item.productId;

        return {
          _id: encodeObjectId(item._id),
          productId: encodeObjectId(product?._id),
          quantity: item.quantity,
          price: item.price,
          productDetails: product
            ? {
                _id: encodeObjectId(product._id),
                title: product.title,
                price: product.price,
                images: product.images,
                description: product.description,
              }
            : null,
        };
      }),
    };

    const calculatedTotal = order.items.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

responseOrder.calculatedTotal = calculatedTotal;


    return addCorsHeaders(
      NextResponse.json({ orderDetails: responseOrder }, { status: 200 })
    );
  } catch (error) {
    console.error("Error fetching order details:", error);
    return addCorsHeaders(
      NextResponse.json(
        { error: "Error fetching order details" },
        { status: 500 }
      )
    );
  }
});
