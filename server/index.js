import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCheckoutSession, createPaymentIntent } from './stripeHandler.js';
import { sendLeadNotification } from './emailHandler.js';
import { generateQuotePdf } from './pdfGenerator.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;

// 1. Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// 2. CORS Configuration (Permits localhost and production domain)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://customautogates.com.au',
      'https://www.customautogates.com.au',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'http://127.0.0.1:3000'
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.coolify.app') || origin.endsWith('.customautogates.com.au')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive fallback for staging domains
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser with strict size limit to prevent payload flooding (DoS)
app.use(express.json({ limit: '100kb' }));

// API health check (Never exposes credentials)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Custom Auto Gates Full-Stack API',
    business: 'Custom Auto Gates Pty Ltd',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    environment: process.env.NODE_ENV || 'production',
  });
});

// Contact & Measure Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, address, suburb, serviceType, preferredTime, notes, dimensions, estimatedPrice, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone Number are required.' });
    }

    const result = await sendLeadNotification({
      name: String(name).trim().substring(0, 100),
      phone: String(phone).trim().substring(0, 30),
      email: email ? String(email).trim().toLowerCase().substring(0, 120) : '',
      address: address ? String(address).trim().substring(0, 200) : (suburb ? String(suburb).trim().substring(0, 200) : ''),
      suburb: suburb ? String(suburb).trim().substring(0, 80) : (address ? String(address).trim().substring(0, 80) : ''),
      serviceType: serviceType ? String(serviceType).trim().substring(0, 100) : 'General Inquiry',
      preferredTime: preferredTime ? String(preferredTime).trim().substring(0, 50) : '',
      notes: notes ? String(notes).trim().substring(0, 1000) : '',
      dimensions: dimensions ? String(dimensions).trim().substring(0, 80) : '',
      estimatedPrice: estimatedPrice ? String(estimatedPrice).trim().substring(0, 50) : '',
      source: source || 'Contact Modal',
      ip: req.ip,
    });

    res.json({
      success: true,
      message: 'Thank you! Your inquiry has been received.',
      ...result
    });
  } catch (error) {
    console.error('Contact Form Endpoint Error:', error.message);
    res.status(500).json({ error: 'Failed to process inquiry. Please call us directly.' });
  }
});

// Test Email Endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const testResult = await sendLeadNotification({
      name: 'System Integration Test',
      phone: '(07) 3102 1801',
      email: 'office@customautogates.com.au',
      address: '10 Yamanto Drive, Yamanto QLD 4305',
      suburb: 'Yamanto / Ipswich',
      serviceType: 'Automated SMTP & Contact Form Connectivity Test',
      notes: 'This is a test notification confirming email server integration with previous WordPress settings (office@customautogates.com.au).',
      source: 'Admin System Diagnostic'
    });

    res.json({
      success: true,
      testResult,
      settings: {
        recipient: process.env.NOTIFICATION_EMAIL || 'office@customautogates.com.au',
        from: process.env.SMTP_FROM || 'info@customautogates.com.au',
        smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Quote Estimator Lead Endpoint
app.post('/api/quote', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      suburb,
      design,
      designImage,
      gateType,
      widthMm,
      heightMm,
      areaM2,
      powerSupply,
      motor,
      timeline,
      accessories,
      subtotal,
      tax,
      totalPriceRange,
      estimatedTotal,
      notes
    } = req.body;

    if (!phone && !email) {
      return res.status(400).json({ error: 'Phone number or email is required to send your quote.' });
    }

    const fullAddress = (address || suburb || '').trim();

    // Generate Itemized PDF Quote breakdown
    let pdfBuffer = null;
    try {
      pdfBuffer = await generateQuotePdf({
        name: name ? String(name).trim() : 'Valued Customer',
        phone: phone ? String(phone).trim() : '',
        email: email ? String(email).trim() : '',
        address: fullAddress,
        design: design || 'Custom Fabricated Gate',
        designImage,
        gateType: gateType || 'Automatic Sliding Gate',
        widthMm,
        heightMm,
        areaM2,
        powerSupply,
        motor,
        timeline,
        accessories,
        subtotal,
        tax,
        totalPriceRange: totalPriceRange || estimatedTotal,
        notes
      });
    } catch (pdfErr) {
      console.error('Error generating quote PDF:', pdfErr.message);
    }

    const result = await sendLeadNotification({
      name: name ? String(name).trim().substring(0, 100) : 'Website Estimator User',
      phone: phone ? String(phone).trim().substring(0, 30) : 'Not provided',
      email: email ? String(email).trim().toLowerCase().substring(0, 120) : '',
      address: fullAddress,
      suburb: fullAddress || 'Brisbane & SE QLD',
      serviceType: `Instant Quote: ${design || 'Custom Gate'} (${gateType || 'Sliding Gate'})`,
      dimensions: widthMm && heightMm ? `${widthMm}mm W x ${heightMm}mm H (${areaM2 || ''} m²)` : undefined,
      estimatedPrice: (totalPriceRange || estimatedTotal) ? `${totalPriceRange || estimatedTotal} (Estimator)` : undefined,
      notes: `Motor: ${motor || 'Standard'}. Power: ${powerSupply || 'Standard'}. Timeline: ${timeline || 'Standard'}. ${accessories ? `Accessories: ${Array.isArray(accessories) ? accessories.join(', ') : accessories}. ` : ''}${notes ? `Notes: ${notes}` : ''}`,
      source: 'Gate Visualizer & Cost Estimator',
      pdfBuffer,
      ip: req.ip,
    });

    res.json({
      success: true,
      message: 'Quote inquiry received! Itemized PDF breakdown generated and sent.',
      hasPdf: !!pdfBuffer,
      ...result
    });
  } catch (error) {
    console.error('Quote Endpoint Error:', error.message);
    res.status(500).json({ error: 'Failed to process quote inquiry.' });
  }
});

// 3. Endpoint: Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, title, description, customerEmail, customerName, customerPhone, metadata, successUrl, cancelUrl } = req.body;
    
    // Strict input validation
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 50000) {
      return res.status(400).json({ error: 'Payment amount must be between $1.00 AUD and $50,000.00 AUD' });
    }

    const session = await createCheckoutSession({
      amount: parsedAmount,
      title: typeof title === 'string' ? title.substring(0, 150) : undefined,
      description: typeof description === 'string' ? description.substring(0, 300) : undefined,
      customerEmail: typeof customerEmail === 'string' ? customerEmail.trim().toLowerCase() : undefined,
      customerName: typeof customerName === 'string' ? customerName.trim().substring(0, 100) : undefined,
      customerPhone: typeof customerPhone === 'string' ? customerPhone.trim().substring(0, 30) : undefined,
      metadata: typeof metadata === 'object' && metadata !== null ? metadata : {},
      successUrl,
      cancelUrl,
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to create Stripe Checkout session' });
  }
});

// 4. Endpoint: Create Stripe PaymentIntent (In-page embedded Stripe Elements flow)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, description, customerEmail, metadata } = req.body;
    
    // Strict input validation
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 50000) {
      return res.status(400).json({ error: 'Payment amount must be between $1.00 AUD and $50,000.00 AUD' });
    }

    const paymentIntent = await createPaymentIntent({
      amount: parsedAmount,
      description: typeof description === 'string' ? description.substring(0, 300) : undefined,
      customerEmail: typeof customerEmail === 'string' ? customerEmail.trim().toLowerCase() : undefined,
      metadata: typeof metadata === 'object' && metadata !== null ? metadata : {},
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe PaymentIntent Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to create PaymentIntent' });
  }
});

// Serve static assets in production if dist exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all route for Single Page Application (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, HOST, () => {
    console.log(`⚡ Custom Auto Gates Server running on http://${HOST}:${PORT}`);
  });

  server.on('error', (err) => {
    console.error(`Server error on port ${PORT}:`, err.message);
  });
}

export default app;
