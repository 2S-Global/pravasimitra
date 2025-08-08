// app/api/create-checkout-session/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { addCorsHeaders, optionsResponse } from '../../../../lib/cors'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Handle CORS preflight request
export async function OPTIONS() {
  return optionsResponse();
}

// Handle POST request to create Stripe Checkout Session
export async function POST(req) {
  try {
    const { cartItems } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return addCorsHeaders(
        NextResponse.json({ error: 'Cart is empty.' }, { status: 400 })
      );
    }

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'gbp', // Pound Sterling
        product_data: {
          name: item.product?.title || item.title,
        },
        unit_amount: Math.round((item.product?.price || item.price) * 100), // amount in pence
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    });

    return addCorsHeaders(
      NextResponse.json({ url: session.url }, { status: 200 })
    );

  } catch (error) {
    console.error('Stripe session error:', error);
    return addCorsHeaders(
      NextResponse.json({ error: error.message }, { status: 500 })
    );
  }
}
