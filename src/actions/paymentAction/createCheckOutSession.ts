'use server';

import { redirect } from 'next/navigation';

import { isLoggedIn } from '@/lib/actionsUtils';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession() {
  // authentication check
  const session = await isLoggedIn();

  // create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user?.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });
  // redirect user
  redirect(checkoutSession.url);
}
