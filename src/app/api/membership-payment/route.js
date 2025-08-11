import Stripe from "stripe";
import { NextResponse } from "next/server";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req) {
  try {
    const { cartItems, successUrl, cancelUrl } = await req.json();

    if (!cartItems || !successUrl || !cancelUrl) {
      return addCorsHeaders(
        NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "gbp", // <-- Changed to GBP
          product_data: { name: item.title },
          unit_amount: Math.round(item.price * 100), // Price in pence
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return addCorsHeaders(
      NextResponse.json(
        { id: session.id, url: session.url },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("Stripe session error:", err);
    return addCorsHeaders(
      NextResponse.json({ error: err.message }, { status: 500 })
    );
  }
}