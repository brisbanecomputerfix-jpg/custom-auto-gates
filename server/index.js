import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCheckoutSession, createPaymentIntent } from './stripeHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Custom Auto Gates Stripe API',
    business: 'Custom Auto Gates Pty Ltd',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
  });
});

// Endpoint: Create Stripe Checkout Session (Redirect flow with Apple/Google Pay, Link, Card)
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, title, description, customerEmail, customerName, customerPhone, metadata, successUrl, cancelUrl } = req.body;
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid or missing amount' });
    }

    const session = await createCheckoutSession({
      amount,
      title,
      description,
      customerEmail,
      customerName,
      customerPhone,
      metadata,
      successUrl,
      cancelUrl,
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error);
    res.status(500).json({ error: error.message || 'Failed to create Stripe Checkout session' });
  }
});

// Endpoint: Create Stripe PaymentIntent (In-page embedded Stripe Elements flow)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, description, customerEmail, metadata } = req.body;
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid or missing amount' });
    }

    const paymentIntent = await createPaymentIntent({
      amount,
      description,
      customerEmail,
      metadata,
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe PaymentIntent Error:', error);
    res.status(500).json({ error: error.message || 'Failed to create PaymentIntent' });
  }
});

// Serve static assets in production if dist exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`⚡ Custom Auto Gates Server running on http://localhost:${PORT}`);
  });
}

export default app;
