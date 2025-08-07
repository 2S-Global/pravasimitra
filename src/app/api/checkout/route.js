import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Address from "../../../../models/Address";
import { withAuth } from "../../../../lib/withAuth";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";
import Cart from "../../../../models/Cart";
import Order from "../../../../models/Order";
import Counter from "../../../../models/Counter";


export async function OPTIONS() {
  return optionsResponse();
}


export const POST = withAuth(async (req, user) => {
  await connectDB();

  let data;
  try {
    data = await req.json();
  } catch (err) {
    return addCorsHeaders(
      NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    );
  }

  const { billing, shipping, paymentMethod } = data;

  if (!billing || !shipping || !paymentMethod) {
    return addCorsHeaders(
      NextResponse.json(
        { error: "Billing, shipping, or payment method missing" },
        { status: 400 }
      )
    );
  }


  
  try {
    const newAddress = new Address({
      userId: user.id,
      billing,
      shipping,
    });
    const savedAddress = await newAddress.save();

    const cart = await Cart.findOne({ userId: user.id });
    if (!cart || !cart.items || cart.items.length === 0) {
      return addCorsHeaders(
        NextResponse.json({ error: "Cart is empty" }, { status: 400 })
      );
    }

    let status = "pending";
    if (paymentMethod.toLowerCase() === "cash") {
      status = "pending";
    }


    let counter = await Counter.findOneAndUpdate(
  { name: "order" },
  { $inc: { value: 1 } },
  { new: true, upsert: true } // Create if doesn't exist
);
    const formattedOrderId = `pravasi-${String(counter.value).padStart(4, "0")}`;

    const newOrder = new Order({
      userId: user.id,
      orderId: formattedOrderId,
      addressId: savedAddress._id,
      paymentMethod,
      status,
      items: cart.items,
    });
    const savedOrder = await newOrder.save();

    // if (paymentMethod.toLowerCase() === "cash") {
      await Cart.deleteOne({ userId: user.id });
    //}

    return addCorsHeaders(
      NextResponse.json(
        {
          message: "Order created successfully",
          id: savedOrder._id,
     orderId: savedOrder.orderId,
          addressId: savedAddress._id,
          order: savedOrder,
        },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Error saving address or order:", err);
    return addCorsHeaders(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
});
