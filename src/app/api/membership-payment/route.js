import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import MembershipTransaction from "../../../../models/MembershipTransaction";
import { addCorsHeaders, optionsResponse } from "../../../../lib/cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req) {
  await connectDB();

  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return addCorsHeaders(
        NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return addCorsHeaders(
        NextResponse.json({ error: "Invalid sessionId" }, { status: 400 })
      );
    }

    const newTransaction = new MembershipTransaction({
      stripeSessionId: session.id,
      paymentIntentId: session.payment_intent,
      customerEmail: session.customer_details?.email || "",
      amountTotal: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
      rawSession: session,
    });

    await newTransaction.save();

    return addCorsHeaders(
      NextResponse.json(newTransaction, { status: 201 })
    );
  } catch (err) {
    console.error("MembershipTransaction save error:", err);
    return addCorsHeaders(
      NextResponse.json({ error: err.message }, { status: 500 })
    );
  }
}
