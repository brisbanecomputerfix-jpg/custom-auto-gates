import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { createCheckoutSession, createPaymentIntent } from './server/stripeHandler.js';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'stripe-api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const path = req.url ? req.url.split('?')[0] : '';

          if (path === '/api/health' && req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'ok',
              service: 'Custom Auto Gates Dev Server',
              stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
            }));
            return;
          }

          if (path === '/api/create-checkout-session' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const origin = req.headers.origin || 'http://localhost:3000';
                const session = await createCheckoutSession({
                  ...data,
                  successUrl: `${origin}/#payment-success?session_id={CHECKOUT_SESSION_ID}`,
                  cancelUrl: `${origin}/#payment-cancelled`,
                });
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, sessionId: session.id, url: session.url }));
              } catch (err) {
                console.error('Stripe Dev Checkout Error:', err.message);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }

          if (path === '/api/create-payment-intent' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const pi = await createPaymentIntent(data);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, clientSecret: pi.client_secret, paymentIntentId: pi.id }));
              } catch (err) {
                console.error('Stripe Dev PaymentIntent Error:', err.message);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 800
  },

  server: {
    port: 3000,
    open: false
  }
});

