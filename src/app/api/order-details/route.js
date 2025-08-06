import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { withAuth } from "../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";
import Order from "../../../../models/Order";
import Address from "../../../../models/Address";
import User from "../../../../models/User";
import MarketProduct from "../../../../models/MarketProduct";
import { encodeObjectId } from "../../../../lib/idCodec";

export async function OPTIONS() {
  return optionsResponse();
}

export const GET = withAuth(async (req, user) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

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
      .populate("items.product");

    if (!order) {
      return addCorsHeaders(
        NextResponse.json({ error: "Order not found" }, { status: 404 })
      );
    }

    // Allow only buyer to access this order
    if (order.userId.toString() !== user.id) {
      return addCorsHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      );
    }

    // Fetch buyer info
    const buyer = await User.findById(order.userId).lean();
    const buyerSince = buyer?.createdAt
      ? buyer.createdAt.toISOString().split("T")[0]
      : null;

    // Get product details
    const productIds = [
      ...new Set(order.items.map((item) => item.productId?.toString())),
    ];
    const products = await MarketProduct.find({
      _id: { $in: productIds },
    }).lean();
    const productMap = Object.fromEntries(
      products.map((p) => [p._id.toString(), p])
    );

    // Response
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
        const rawId = item.productId?.toString();
        const product = productMap[rawId];

        return {
          _id: encodeObjectId(item._id),
          productId: encodeObjectId(item.productId),
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
