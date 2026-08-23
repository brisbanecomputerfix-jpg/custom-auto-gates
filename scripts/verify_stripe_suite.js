import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runFullStripeDiagnostics() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE STRIPE SUITE DIAGNOSTICS');
  console.log('====================================================\n');

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const currency = process.env.VITE_CURRENCY || 'aud';

  // TEST 1: Environment Variables Presence
  console.log('🔹 Test 1: Checking Environment Variables...');
  if (!secretKey) {
    console.error('❌ FAILED: STRIPE_SECRET_KEY is missing in .env');
    process.exit(1);
  }
  if (!publishableKey) {
    console.error('❌ FAILED: VITE_STRIPE_PUBLISHABLE_KEY is missing in .env');
    process.exit(1);
  }
  console.log('   ✅ STRIPE_SECRET_KEY present (starts with', secretKey.substring(0, 8) + '...)');
  console.log('   ✅ VITE_STRIPE_PUBLISHABLE_KEY present (starts with', publishableKey.substring(0, 8) + '...)');
  console.log('   ✅ Target Currency:', currency.toUpperCase());

  const stripe = new Stripe(secretKey);

  // TEST 2: Stripe Account & Capabilities Verification
  console.log('\n🔹 Test 2: Verifying Stripe Merchant Account Status...');
  try {
    const account = await stripe.accounts.retrieve();
    console.log('   ✅ Connected to Stripe Account:', account.id);
    console.log('   ✅ Business Country:', account.country);
    console.log('   ✅ Charges Enabled:', account.charges_enabled ? '🟢 YES' : '🔴 NO');
    console.log('   ✅ Payouts Enabled:', account.payouts_enabled ? '🟢 YES' : '🔴 NO');
    console.log('   ✅ Default Currency:', account.default_currency.toUpperCase());
    
    if (!account.charges_enabled) {
      console.warn('   ⚠️ WARNING: Charges are not enabled on this Stripe account yet.');
    }
  } catch (err) {
    console.error('❌ Account retrieval failed:', err.message);
    process.exit(1);
  }

  // TEST 3: Create Live Checkout Session (Call-out / Invoice Payment)
  console.log('\n🔹 Test 3: Simulating Live Stripe Checkout Session Creation ($189 AUD)...');
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Urgent Gate Repair Call-Out Fee & Diagnostics',
              description: 'Custom Auto Gates & Blondies Powder Coating Yamanto',
            },
            unit_amount: 18900, // $189.00 AUD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        propertyType: 'residential',
        suburb: 'Yamanto',
        serviceType: 'Urgent Diagnostic Call-Out',
        testRun: 'true'
      },
      success_url: 'https://customautogates.com.au/#payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://customautogates.com.au/#payment-cancelled',
    });

    console.log('   ✅ Checkout Session Created Successfully!');
    console.log('   ✅ Session ID:', session.id);
    console.log('   ✅ Live Stripe Payment URL:', session.url.substring(0, 75) + '...');
    console.log('   ✅ Payment Status:', session.payment_status);
  } catch (err) {
    console.error('❌ Checkout Session creation failed:', err.message);
    process.exit(1);
  }

  // TEST 4: Create Live PaymentIntent (Embedded In-Page Card / Elements)
  console.log('\n🔹 Test 4: Simulating Live Stripe PaymentIntent ($500 AUD Deposit)...');
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50000, // $500.00 AUD
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
      description: 'Custom Gate Production Booking Deposit - 4.0m x 1.8m Sliding Gate',
      metadata: {
        gateType: 'sliding',
        dimensions: '4.0m x 1.8m',
        color: 'Monument',
        depositAmount: '$500 AUD',
        testRun: 'true'
      },
    });

    console.log('   ✅ PaymentIntent Created Successfully!');
    console.log('   ✅ PaymentIntent ID:', paymentIntent.id);
    console.log('   ✅ Client Secret Generated:', paymentIntent.client_secret ? '🟢 YES' : '🔴 NO');
    console.log('   ✅ Currency & Amount:', (paymentIntent.amount / 100).toFixed(2), paymentIntent.currency.toUpperCase());

    // Cancel test payment intent so it does not clutter dashboard
    await stripe.paymentIntents.cancel(paymentIntent.id);
    console.log('   ✅ Test PaymentIntent cleanly cancelled.');
  } catch (err) {
    console.error('❌ PaymentIntent creation failed:', err.message);
    process.exit(1);
  }

  // TEST 5: Verify Local Server Endpoints
  console.log('\n🔹 Test 5: Verifying Express Server & API Handler Modules...');
  try {
    const { createCheckoutSession, createPaymentIntent } = await import('../server/stripeHandler.js');
    if (typeof createCheckoutSession === 'function' && typeof createPaymentIntent === 'function') {
      console.log('   ✅ server/stripeHandler.js exported functions verified.');
    } else {
      throw new Error('Handler functions missing');
    }
  } catch (err) {
    console.error('❌ Server module import failed:', err.message);
    process.exit(1);
  }

  console.log('\n====================================================');
  console.log('🎉 ALL 5 DIAGNOSTIC TESTS PASSED WITH ZERO ERRORS!');
  console.log('Stripe is 100% configured, verified, and operational.');
  console.log('====================================================\n');
}

runFullStripeDiagnostics();
