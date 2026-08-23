import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripeInstance = null;

if (stripeSecretKey) {
  stripeInstance = new Stripe(stripeSecretKey);
}

export function getStripe() {
  if (!stripeInstance && process.env.STRIPE_SECRET_KEY) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}

/**
 * Creates a Stripe Checkout Session
 */
export async function createCheckoutSession({
  amount, // in dollars (e.g. 189)
  title, // e.g. "Residential Call-Out Fee & Diagnostics"
  description, // e.g. "Upfront technician dispatch for 14 Palm Ave, Brisbane"
  customerEmail,
  customerName,
  customerPhone,
  metadata = {},
  successUrl,
  cancelUrl,
}) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error('Stripe API Key is not configured in .env');
  }

  const unitAmountInCents = Math.round(Number(amount) * 100);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'link'],
    billing_address_collection: 'auto',
    phone_number_collection: {
      enabled: true,
    },
    customer_email: customerEmail || undefined,
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: title || 'Custom Auto Gates Service Payment',
            description: description || 'Custom Auto Gates & Blondies Powder Coating Yamanto',
            images: ['https://customautogates.com.au/images/logo.png'],
          },
          unit_amount: unitAmountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      business: 'Custom Auto Gates Pty Ltd',
      workshop: 'Shed 2, 43-45 Belar Street, Yamanto QLD 4305',
      customerName: customerName || '',
      customerPhone: customerPhone || '',
      ...metadata,
    },
    success_url: successUrl || 'https://customautogates.com.au/#payment-success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: cancelUrl || 'https://customautogates.com.au/#payment-cancelled',
  });

  return session;
}

/**
 * Creates a Payment Intent for embedded Stripe Elements
 */
export async function createPaymentIntent({
  amount, // in dollars (e.g. 189)
  description,
  customerEmail,
  metadata = {},
}) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error('Stripe API Key is not configured in .env');
  }

  const unitAmountInCents = Math.round(Number(amount) * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: unitAmountInCents,
    currency: 'aud',
    automatic_payment_methods: {
      enabled: true,
    },
    description: description || 'Custom Auto Gates & Fencing Service',
    receipt_email: customerEmail || undefined,
    metadata: {
      business: 'Custom Auto Gates Pty Ltd',
      ...metadata,
    },
  });

  return paymentIntent;
}
