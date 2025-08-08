// app/api/create-checkout-session/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cartItems } = await req.json();

    // Convert cart items into Stripe line_items
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'gbp', // Pound
        product_data: {
          name: item.product?.title || item.title,
        },
        unit_amount: Math.round((item.product?.price || item.price) * 100), // Stripe wants amount in pence
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

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error('Stripe session error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
