import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Cart from "../../../../models/Cart";
import { withAuth } from "../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const POST = withAuth(async (req, user) => {
  await connectDB();

  try {
    const cart = await Cart.findOne({ userId: user.id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return addCorsHeaders(
        NextResponse.json(
          {
            summary: {
              price: "0",
              items: "0",
              totalAmount: "0",
            },
          },
          { status: 200 }
        )
      );
    }

    let uniqueItemCount = 0;
    let totalMRP = 0;
    let totalAmount = 0;

    const uniqueProducts = new Set();

    cart.items.forEach((item) => {
      const product = item.productId;
      const quantity = item.quantity || 1;

      // Unique item count by product ID
      if (!uniqueProducts.has(product._id.toString())) {
        uniqueProducts.add(product._id.toString());
        uniqueItemCount += 1;
      }

      totalMRP += (product.mrp || product.price || 0) * quantity;
      totalAmount += (product?.price || 0) * quantity;
    });

    return addCorsHeaders(
      NextResponse.json(
        {
          summary: {
            price: `${totalMRP}`,
            items: `${uniqueItemCount}`,
            totalAmount: `${totalAmount}`,
          },
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Order Summary Error:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    );
  }
});
