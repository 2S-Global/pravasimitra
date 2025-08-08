// app/api/transaction/route.js

import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Transaction from '../../../../models/Transaction'; // your mongoose model
import { addCorsHeaders, optionsResponse } from '../../../../lib/cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req) {
  await connectDB();

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return addCorsHeaders(NextResponse.json({ error: 'Missing sessionId' }, { status: 400 }));
    }

    // Retrieve the Stripe session details
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return addCorsHeaders(NextResponse.json({ error: 'Invalid session ID' }, { status: 400 }));
    }

    // Save transaction details to DB
    const newTransaction = new Transaction({
      stripeSessionId: session.id,
      paymentIntentId: session.payment_intent,
      customerEmail: session.customer_details?.email || '',
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      rawSession: session, // optional, store full session object if needed
    });

    await newTransaction.save();

    return addCorsHeaders(NextResponse.json(newTransaction, { status: 201 }));
  } catch (error) {
    console.error('Transaction save error:', error);
    return addCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}
