import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Cart from "../../../../../models/Cart";
import { withAuth } from "../../../../../lib/withAuth";
import { decodeObjectId } from "../../../../../lib/idCodec";
import { addCorsHeaders, optionsResponse } from "../../../../../lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export const DELETE = withAuth(async (req, user) => {
  await connectDB();

  if (!user?.id) {
    return addCorsHeaders(
      NextResponse.json({ error: "Authentication required" }, { status: 401 })
    );
  }

  let data;
  try {
    data = await req.json();
  } catch (err) {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    );
  }

  const { productId } = data;
//   const decodedProductId = decodeObjectId(productId);

  if (!productId) {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    );
  }

  try {
    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      return addCorsHeaders(
        NextResponse.json({ error: "Cart not found" }, { status: 404 })
      );
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return addCorsHeaders(
        NextResponse.json({ error: "Item not found in cart" }, { status: 404 })
      );
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);
    await cart.save();

    // Populate updated product and category info
    await cart.populate({
      path: "items.productId",
      populate: { path: "category" }
    });

    // Format cart items
    const formattedItems = cart.items.map(item => {
      const subtotal = item.quantity * item.price;
      return {
        productId: item.productId._id,
        product: {
        title: item.productId.title,
        images: item.productId.images.map(
          (img) => `${process.env.IMAGE_URL}/e-marketplace/${img}`
        ),
        price: item.productId.price,
        description: item.productId.description,
        category: item.productId.category,
      },
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal,
        // category: item.productId.category,
      };
    });

    const cartTotal = formattedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const totalQuantity = formattedItems.reduce((sum, item) => sum + item.quantity, 0);

    return addCorsHeaders(
      NextResponse.json({
        message: "Item removed from cart",
        cart: {
          userId: cart.userId,
          items: formattedItems,
          cartTotal,
          totalQuantity,
        }
      }, { status: 200 })
    );
  } catch (err) {
    console.error("Cart deletion error:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
});
