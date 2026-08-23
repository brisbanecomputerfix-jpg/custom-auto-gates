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
          if (req.url === '/api/create-checkout-session' && req.method === 'POST') {
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
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          if (req.url === '/api/create-payment-intent' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const pi = await createPaymentIntent(data);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, clientSecret: pi.client_secret, paymentIntentId: pi.id }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: false
  }
});
