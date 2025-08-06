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

export const GET = withAuth(async (req, user ) => {
  await connectDB();

  try {
    // Get all products listed by the seller
    const sellerProducts = await MarketProduct.find(
      { sellerId: user._id },
      "_id"
    );
    const sellerProductIds = sellerProducts.map((p) => p._id);

    // Find orders that include any of these products
    const orders = await Order.find({
      "items.productId": { $in: sellerProductIds },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.productId",
        model: MarketProduct,
      })
      .populate({
        path: "addressId",
        model: Address,
      })
      .lean();

    return addCorsHeaders(
      NextResponse.json({ success: true, data: orders }, { status: 200 })
    );
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    return addCorsHeaders(
      NextResponse.json(
        { success: false, message: "Failed to fetch seller orders" },
        { status: 500 }
      )
    );
  }
});
