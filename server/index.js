import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createCheckoutSession, createPaymentIntent, retrieveSessionDetails } from './stripeHandler.js';
import { 
  sendLeadNotification, 
  getAllLeads, 
  getLeadById, 
  getLeadBySessionId, 
  savePendingLead, 
  formatLeadForGravityForms 
} from './emailHandler.js';
import { generateQuotePdf, generateBookingReceiptPdf } from './pdfGenerator.js';
import { getRouteSchemaData } from '../src/utils/seoManager.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;

// Enable trust proxy for correct protocol, host & IP detection behind Traefik/Coolify
app.set('trust proxy', true);

// 0. Enforce HTTPS & Canonical Domain (301 Redirect www to non-www and http to https)
app.use((req, res, next) => {
  const hostHeader = (req.headers['x-forwarded-host'] || req.headers.host || '').toLowerCase();
  const hostname = hostHeader.split(':')[0];
  const protoHeader = (req.headers['x-forwarded-proto'] || req.protocol || 'http').toLowerCase();
  const isHttp = protoHeader === 'http';

  // 1. Primary Production Domain (customautogates.com.au)
  if (hostname === 'www.customautogates.com.au' || hostname === 'customautogates.com.au') {
    if (hostname === 'www.customautogates.com.au' || isHttp) {
      return res.redirect(301, `https://customautogates.com.au${req.originalUrl}`);
    }
  }

  // 2. Secondary Staging Domain (gates.4pxl.com)
  if (hostname === 'www.gates.4pxl.com' || hostname === 'gates.4pxl.com') {
    if (hostname === 'www.gates.4pxl.com' || isHttp) {
      return res.redirect(301, `https://gates.4pxl.com${req.originalUrl}`);
    }
  }

  next();
});

// Ensure public/uploads directory exists
const uploadsDir = path.resolve(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration for photo/video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${safeBase}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB max per file
    files: 10
  }
});

// 1. Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// 1b. Spam URL & Hack Parameter Interceptor (Returns HTTP 410 Gone to purge Google index)
app.use((req, res, next) => {
  const urlPath = req.path.toLowerCase();
  const queryKeys = Object.keys(req.query || {});
  
  // Check for scrap ecommerce collections or wp-content artifacts
  if (urlPath.startsWith('/collections') || urlPath.startsWith('/collections/')) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(410).send('Gone - Scraped collection URL does not exist.');
  }

  // Check for spam parameter injections (?h=, ?y=, ?l=, ?k=)
  const hasSpamQuery = queryKeys.some(key => /^[hylk]$/i.test(key) || /^h\d+/i.test(key));
  if (hasSpamQuery) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(410).send('Gone - Invalid spam query parameters.');
  }

  next();
});

// 1c. 301 Permanent Redirects for Legacy WordPress URLs (Preserve Search Authority & Link Equity)
const LEGACY_301_REDIRECTS = {
  // Driveway Gates & General Gates (Direct to dedicated /driveway-gates landing page)
  '/gates': '/driveway-gates',
  '/gates/': '/driveway-gates',
  '/gates/driveway-gates': '/driveway-gates',
  '/gates/driveway-gates/': '/driveway-gates',
  '/gates/automatic-gates': '/driveway-gates',
  '/gates/automatic-gates/': '/driveway-gates',

  // Sliding Gates (Direct to dedicated sliding gates landing page)
  '/gates/sliding-gates': '/sliding-gates',
  '/gates/sliding-gates/': '/sliding-gates',
  '/automatic-sliding-gates-2': '/automatic-sliding-gates',
  '/automatic-sliding-gates-2/': '/automatic-sliding-gates',
  '/gates/automatic-sliding-gates-brisbane': '/automatic-sliding-gates',
  '/gates/automatic-sliding-gates-brisbane/': '/automatic-sliding-gates',
  '/automated-gates-brisbane': '/gates-brisbane',
  '/automated-gates-brisbane/': '/gates-brisbane',
  '/gates/slide-swing-bi-fold-telescopic': '/automatic-sliding-gates',
  '/slide-swing-bi-fold-telescopic': '/automatic-sliding-gates',
  '/slide-swing-bi-fold-telescopic/': '/automatic-sliding-gates',

  // Solar Automatic Gates (Direct to dedicated /solar-gates landing page)
  '/gate-automation/solar-automatic-gates': '/solar-gates',
  '/gate-automation/solar-automatic-gates/': '/solar-gates',
  '/solar-automatic-gates': '/solar-gates',
  '/solar-automatic-gates/': '/solar-gates',

  // Swing Gates (Direct to dedicated /swing-gates landing page)
  '/gates/swing-gates': '/swing-gates',
  '/gates/swing-gates/': '/swing-gates',
  '/automatic-swing-gates': '/swing-gates',
  '/automatic-swing-gates/': '/swing-gates',

  // Pricing & Cost Guides (Direct to dedicated /pricing-guide landing page)
  '/gate-cost-guide': '/pricing-guide',
  '/gate-cost-guide/': '/pricing-guide',
  '/automatic-gates-brisbane-price': '/pricing-guide',
  '/automatic-gates-brisbane-price/': '/pricing-guide',

  // Gallery & Balustrade Redirects
  '/lp/balustrade': '/gates/gallery-gates',
  '/lp/balustrade/': '/gates/gallery-gates',
  '/gallery-gates': '/#gallery',
  '/gallery-gates/': '/#gallery',
  '/gallery': '/#gallery',
  '/gallery/': '/#gallery',

  // Commercial & Boom Gates (Direct to dedicated /commercial-gates landing page)
  '/gates/security-commercial-electric-gates': '/commercial-gates',
  '/gates/security-commercial-electric-gates/': '/commercial-gates',
  '/gates/secuirty-commercial-electric-gates': '/commercial-gates',
  '/gates/secuirty-commercial-electric-gates/': '/commercial-gates',
  '/gate-automation/automatic-boom-gates': '/commercial-gates',
  '/gate-automation/automatic-boom-gates/': '/commercial-gates',
  '/gate-automation-boom-gates-road-barriers': '/commercial-gates',
  '/gate-automation-boom-gates-road-barriers/': '/commercial-gates',
  '/boom-gates': '/commercial-gates',
  '/boom-gates/': '/commercial-gates',
  '/commercial-boom-gates': '/commercial-gates',
  '/commercial-boom-gates/': '/commercial-gates',
  '/commercial-security-gates': '/commercial-gates',
  '/commercial-security-gates/': '/commercial-gates',
  '/security-fencing': '/#fencing',
  '/security-fencing/': '/#fencing',

  // Gate Repairs & Service Silos
  '/gate-repairs': '/service',
  '/gate-repairs/': '/service',
  '/gate-repairs-brisbane': '/service',
  '/gate-repairs-brisbane/': '/service',
  '/electric-gate-repairs': '/service',
  '/electric-gate-repairs/': '/service',
  '/automatic-gate-repairs': '/service',
  '/automatic-gate-repairs/': '/service',

  // Motors & Automation
  '/gate-automation/automation-accessories': '/#motor-showcase',
  '/gate-automation/automation-accessories/': '/#motor-showcase',
  '/automation-accessories/motors': '/#motor-showcase',
  '/automation-accessories/motors/': '/#motor-showcase',
  '/automation-accessories': '/#motor-showcase',
  '/automation-accessories/': '/#motor-showcase',
  '/gate-automation': '/#motor-showcase',
  '/gate-automation/': '/#motor-showcase',
  '/gate-automation/nice-sliding-gate-automation': '/#motor-showcase',
  '/gate-automation/nice-sliding-gate-automation/': '/#motor-showcase',
  '/gate-automation/nice-swing-gate-automation': '/#motor-showcase',
  '/gate-automation/nice-swing-gate-automation/': '/#motor-showcase',

  // Fencing
  '/gallery-and-design/fencing': '/#fencing',
  '/gallery-and-design/fencing/': '/#fencing',
  '/fencing': '/#fencing',
  '/fencing/': '/#fencing',
  '/fencing/colorbond-fencing': '/#fencing',
  '/fencing/colorbond-fencing/': '/#fencing',
  '/fencing/aluminium-fencing': '/#fencing',
  '/fencing/aluminium-fencing/': '/#fencing',
  '/fencing/timber-fencing': '/#fencing',
  '/fencing/timber-fencing/': '/#fencing',
  '/balustrade': '/#fencing',
  '/balustrade/': '/#fencing',

  // Legacy Bookings / Contact
  '/book-an-appointment': '/contact-us',
  '/book-an-appointment/': '/contact-us',
  '/terms-conditions': '/privacy-policy',
  '/terms-conditions/': '/privacy-policy'
};

app.use((req, res, next) => {
  const cleanPath = req.path.toLowerCase();
  const normalizedPath = cleanPath.replace(/\/$/, '') || '/';
  
  const targetRedirect = LEGACY_301_REDIRECTS[req.path] || 
                         LEGACY_301_REDIRECTS[cleanPath] ||
                         LEGACY_301_REDIRECTS[normalizedPath];

  if (targetRedirect) {
    // Preserve query parameters if present (critical for Google Ads UTM/gclid tracking)
    const queryIndex = req.originalUrl.indexOf('?');
    let finalTarget = targetRedirect;
    if (queryIndex !== -1) {
      const qs = req.originalUrl.slice(queryIndex);
      if (finalTarget.includes('#')) {
        const [base, hash] = finalTarget.split('#');
        finalTarget = `${base}${qs}#${hash}`;
      } else {
        finalTarget = `${finalTarget}${qs}`;
      }
    }

    // Prevent infinite self-redirect loops: Never redirect if already on target URL
    if (
      finalTarget !== req.originalUrl &&
      targetRedirect !== req.path && 
      targetRedirect !== normalizedPath &&
      targetRedirect !== `${normalizedPath}/`
    ) {
      return res.redirect(301, finalTarget);
    }
  }

  // Trailing slash normalization: 301 redirect paths like /driveway-gates/ -> /driveway-gates
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const strippedPath = req.path.slice(0, -1);
    const queryIndex = req.originalUrl.indexOf('?');
    const qs = queryIndex !== -1 ? req.originalUrl.slice(queryIndex) : '';
    return res.redirect(301, strippedPath + qs);
  }

  next();
});



// 2. CORS Configuration (Permits localhost and production domain)
app.use(cors({
  origin: (origin, callback) => {
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
      callback(null, true); // Permissive fallback for staging domains & Zapier webhooks
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'x-api-key']
}));

// Body parser with strict size limit to prevent payload flooding (DoS)
app.use(express.json({ limit: '2mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.2',
    service: 'Custom Auto Gates Full-Stack API',
    business: 'Custom Auto Gates Pty Ltd',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    zapierConfigured: !!process.env.ZAPIER_WEBHOOK_URL,
    environment: process.env.NODE_ENV || 'production',
  });
});

// Photo / Video File Upload Endpoint
app.post('/api/upload', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files provided for upload.' });
    }

    const hostHeader = req.get('host') || 'customautogates.com.au';
    const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const baseUrl = process.env.SITE_URL || `${protocol}://${hostHeader}`;

    const files = req.files.map(f => ({
      filename: f.filename,
      originalName: f.originalname,
      size: f.size,
      mimetype: f.mimetype,
      path: f.path,
      url: `/uploads/${f.filename}`,
      fullUrl: `${baseUrl}/uploads/${f.filename}`
    }));

    res.json({
      success: true,
      files
    });
  } catch (error) {
    console.error('File Upload Error:', error.message);
    res.status(500).json({ error: 'File upload processing failed.' });
  }
});

// Contact & Measure Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      suburb,
      serviceType,
      preferredTime,
      notes,
      dimensions,
      estimatedPrice,
      source,
      files,
      paymentDetails
    } = req.body;

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
      notes: notes ? String(notes).trim().substring(0, 2000) : '',
      dimensions: dimensions ? String(dimensions).trim().substring(0, 80) : '',
      estimatedPrice: estimatedPrice ? String(estimatedPrice).trim().substring(0, 50) : '',
      source: source || 'Contact Modal',
      files: Array.isArray(files) ? files : [],
      paymentDetails: paymentDetails || null,
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
      notes,
      files
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
      files: Array.isArray(files) ? files : [],
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

// Endpoint: Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { 
      amount, 
      title, 
      description, 
      customerEmail, 
      customerName, 
      customerPhone, 
      metadata, 
      bookingData, 
      successUrl, 
      cancelUrl 
    } = req.body;
    
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

    // Persist pending booking details safely in leads.json (WITHOUT prematurely dispatching emails)
    const bData = bookingData || {};
    const fullAddress = (bData.address ? `${bData.address}, ${bData.suburb || ''} ${bData.postcode || ''}`.trim() : (metadata?.address ? `${metadata.address}, ${metadata.suburb || ''} ${metadata.postcode || ''}`.trim() : '')).trim();

    savePendingLead({
      sessionId: session.id,
      name: customerName || bData.fullName || bData.name || '',
      phone: customerPhone || bData.phone || '',
      email: customerEmail || bData.email || '',
      address: fullAddress,
      suburb: bData.suburb || metadata?.suburb || '',
      serviceType: title || `Service Booking: ${bData.serviceRequirement || 'Routine Service'}`,
      gateType: bData.gateType || metadata?.gateType || 'sliding',
      motorBrand: bData.motorBrand || metadata?.motorBrand || 'Smart Gate Automation',
      isOriginalPurchaser: bData.isOriginalPurchaser || metadata?.isOriginalPurchaser || 'yes',
      preferredDate: bData.preferredDate || metadata?.preferredDate || 'ASAP',
      notes: bData.notes || (bData.issueDescription 
        ? `Original Purchaser: ${bData.isOriginalPurchaser || 'yes'}. Gate Type: ${bData.gateType || 'sliding'}. Motor: ${bData.motorBrand || 'Smart Gate Automation'}. Issues: ${bData.issueDescription}. Preferred Date: ${bData.preferredDate || 'ASAP'}` 
        : (metadata?.issueDescription ? `Gate Type: ${metadata.gateType || 'sliding'}. Motor: ${metadata.motorBrand || 'Smart Gate Automation'}. Issues: ${metadata.issueDescription}.` : '')),
      files: bData.files || [],
      source: 'Service & Warranty Booking Form',
      amount: parsedAmount
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

// Endpoint: Create Stripe PaymentIntent (In-page embedded Stripe Elements flow)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, description, customerEmail, metadata } = req.body;
    
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

// Endpoint: Verify Stripe Payment & Dispatch Full Notification with Payment Details & PDF Attachment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required.' });
    }

    // Deduplication check: if notification has already been dispatched for this session, do not send duplicates
    const existingLead = getLeadBySessionId(sessionId);
    if (existingLead && existingLead.paymentStatus === 'Paid' && existingLead.notificationSent) {
      return res.json({
        success: true,
        alreadyProcessed: true,
        message: 'Payment already verified and notification previously dispatched.',
        paymentDetails: existingLead.paymentDetails
      });
    }

    let session = null;
    let paymentDetails = null;

    try {
      session = await retrieveSessionDetails(sessionId);
    } catch (stripeErr) {
      console.warn('Stripe session retrieval warning (mocking if dev test):', stripeErr.message);
    }

    if (session) {
      const pm = session.payment_intent?.payment_method;
      const amountDollars = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
      const itemsDescription = session.line_items?.data?.map(i => i.description).filter(Boolean).join(', ');

      paymentDetails = {
        sessionId: session.id,
        status: session.payment_status === 'paid' ? 'Paid' : (session.payment_status || 'Paid'),
        amount: `$${amountDollars} AUD`,
        method: pm?.type === 'card' ? 'Card' : (pm?.type || 'Card'),
        brand: pm?.card?.brand || 'Visa / Mastercard',
        last4: pm?.card?.last4 || '',
        email: session.customer_details?.email || session.customer_email || existingLead?.email || '',
        stripeRef: session.payment_intent?.id || session.id,
        items: itemsDescription || existingLead?.serviceType || 'Technician Dispatch & Diagnostics Call-Out'
      };

      const finalName = existingLead?.name || session.customer_details?.name || session.metadata?.customerName || 'Stripe Customer';
      const finalPhone = existingLead?.phone || session.customer_details?.phone || session.metadata?.customerPhone || '';
      const finalEmail = existingLead?.email || session.customer_details?.email || session.customer_email || '';
      const finalAddress = existingLead?.address || session.metadata?.address || session.customer_details?.address?.line1 || '';
      const finalSuburb = existingLead?.suburb || session.metadata?.suburb || session.customer_details?.address?.city || '';
      const finalServiceType = existingLead?.serviceType || `Paid Booking: ${itemsDescription || 'Service & Repair Call-Out'}`;
      
      // Preserve the customer's full problem description and notes
      const finalNotes = existingLead?.notes || (session.metadata?.issueDescription 
        ? `Gate Type: ${session.metadata.gateType || ''}. Motor: ${session.metadata.motorBrand || ''}. Issues: ${session.metadata.issueDescription}` 
        : `Stripe Payment Confirmed: ${paymentDetails.amount}`);

      const finalFiles = existingLead?.files || [];

      // Generate official PDF Service Booking Confirmation & Tax Invoice Receipt
      let pdfBuffer = null;
      try {
        pdfBuffer = await generateBookingReceiptPdf({
          name: finalName,
          phone: finalPhone,
          email: finalEmail,
          address: finalAddress,
          suburb: finalSuburb,
          serviceType: finalServiceType,
          gateType: existingLead?.gateType || session.metadata?.gateType,
          motorBrand: existingLead?.motorBrand || session.metadata?.motorBrand,
          notes: finalNotes,
          paymentDetails,
          date: new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' })
        });
      } catch (pdfErr) {
        console.error('Error generating booking receipt PDF:', pdfErr.message);
      }

      // Dispatch single consolidated notification with verified payment details, full customer notes, and PDF attachment
      await sendLeadNotification({
        id: existingLead?.id,
        sessionId: session.id,
        name: finalName,
        phone: finalPhone,
        email: finalEmail,
        address: finalAddress,
        suburb: finalSuburb,
        serviceType: finalServiceType,
        notes: finalNotes,
        source: 'Stripe Online Payment Gateway',
        files: finalFiles,
        paymentDetails,
        pdfBuffer,
        pdfFilename: 'service-booking-confirmation.pdf',
        paymentStatus: 'Paid',
        notificationSent: true
      });
    }

    res.json({
      success: true,
      paymentDetails
    });
  } catch (error) {
    console.error('Verify Payment Error:', error.message);
    res.status(500).json({ error: 'Failed to verify payment.' });
  }
});

// API Key Verification Middleware for REST API endpoints
const verifyApiKey = (req, res, next) => {
  const configuredKey = process.env.API_KEY || process.env.GF_API_KEY || 'cag_live_api_key_2026';
  const apiKey = req.headers['x-api-key'] || 
                 req.query.api_key || 
                 (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));

  // Allow basic auth or API key
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Basic ')) {
    return next();
  }

  if (!apiKey || apiKey !== configuredKey) {
    return res.status(401).json({
      code: 'cant_view_entries',
      message: 'Sorry, you are not allowed to view entries. Provide a valid X-API-Key or Bearer token.',
      data: { status: 401 }
    });
  }

  next();
};

// Gravity Forms REST API v2 Compatible Endpoints for Zapier & Ascora
const handleGetEntries = (req, res) => {
  try {
    const leads = getAllLeads();
    const formatted = leads.map((lead, idx) => formatLeadForGravityForms(lead, idx + 1));
    res.json({
      total_count: formatted.length,
      entries: formatted
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries.' });
  }
};

const handleGetSingleEntry = (req, res) => {
  try {
    const lead = getLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ code: 'not_found', message: 'Entry not found' });
    }
    res.json(formatLeadForGravityForms(lead));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entry.' });
  }
};

// Endpoints matching both standard /api/v2/entries and WordPress /wp-json/gf/v2/entries
app.get('/api/v2/entries', verifyApiKey, handleGetEntries);
app.get('/wp-json/gf/v2/entries', verifyApiKey, handleGetEntries);
app.get('/api/leads', verifyApiKey, handleGetEntries);

app.get('/api/v2/entries/:id', verifyApiKey, handleGetSingleEntry);
app.get('/wp-json/gf/v2/entries/:id', verifyApiKey, handleGetSingleEntry);
app.get('/api/leads/:id', verifyApiKey, handleGetSingleEntry);

// Serve static assets in production if dist exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Page SEO Metadata Dictionary for Server-Side Pre-rendering
// Strictly enforces canonical tags with no www and no trailing slash
const PAGE_METADATA = {
  '/': {
    title: 'Automatic & Electric Gates Brisbane | Custom Driveway Gates',
    description: "South East Queensland's top-rated automatic & electric driveway gates. Factory direct sliding, swing & solar gates in Yamanto. 10-Yr warranty: (07) 3102 1801.",
    canonical: 'https://customautogates.com.au',
    key: 'home'
  },
  '/about-us': {
    title: 'About Our Team & Yamanto Gate Workshop | Custom Auto Gates QLD',
    description: 'Learn about Custom Auto Gates & Fencing. Over 20 years fabricating Australian-made automatic gates, TIG-welded aluminium, and QBCC licensed (#15579753) automation in Yamanto, QLD.',
    canonical: 'https://customautogates.com.au/about-us',
    key: 'about'
  },
  '/about': {
    title: 'About Our Team & Yamanto Gate Workshop | Custom Auto Gates QLD',
    description: 'Learn about Custom Auto Gates & Fencing. Over 20 years fabricating Australian-made automatic gates, TIG-welded aluminium, and QBCC licensed (#15579753) automation in Yamanto, QLD.',
    canonical: 'https://customautogates.com.au/about-us',
    key: 'about'
  },
  '/service': {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/service',
    key: 'service'
  },
  '/repairs': {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/service',
    key: 'service'
  },
  '/gate-repairs': {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/service',
    key: 'service'
  },
  '/gate-repairs-brisbane': {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/service',
    key: 'service'
  },
  '/electric-gate-repairs': {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/service',
    key: 'service'
  },
  '/automatic-gate-repairs': {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/service',
    key: 'service'
  },
  '/contact-us': {
    title: 'Contact Electric Gate Installers Brisbane & Ipswich | Free Measure',
    description: 'Book a free on-site measure with licensed electric gate installers in Brisbane & Ipswich. Factory direct workshop in Yamanto. Call (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/contact-us',
    key: 'contact'
  },
  '/contact': {
    title: 'Contact Electric Gate Installers Brisbane & Ipswich | Free Measure',
    description: 'Book a free on-site measure with licensed electric gate installers in Brisbane & Ipswich. Factory direct workshop in Yamanto. Call (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/contact-us',
    key: 'contact'
  },
  '/driveway-gates': {
    title: 'Driveway Gates Brisbane | Custom Automatic & Electric Gates [10-Yr Warranty]',
    description: 'Custom electric & automatic driveway gates Brisbane. Factory direct sliding & swing gates, Centurion smart motors & 10-yr warranty. Free quote: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/driveway-gates',
    key: 'driveway-gates'
  },
  '/automatic-sliding-gates': {
    title: 'Automatic Sliding Gates Brisbane | Factory Direct [From $3,850]',
    description: 'Custom automatic sliding gates Brisbane. Heavy-duty track & cantilever systems, high-speed Centurion motors & 10-yr warranty. 180+ 5★ reviews. Call (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/automatic-sliding-gates',
    key: 'automatic-sliding-gates'
  },
  '/sliding-gates': {
    title: 'Automatic Sliding Gates Brisbane | Factory Direct [From $3,850]',
    description: 'Custom automatic sliding gates Brisbane. Heavy-duty track & cantilever systems, high-speed Centurion motors & 10-yr warranty. 180+ 5★ reviews. Call (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/automatic-sliding-gates',
    key: 'automatic-sliding-gates'
  },
  '/swing-gates': {
    title: 'Automatic Swing Gates Brisbane | Custom Double Swing & Bi-Fold Electric Gates',
    description: 'Automatic swing gates Brisbane & Gold Coast. Single leaf, double swing & bi-fold folding gates. 10-Year Factory Structural Warranty. Free on-site measure: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/swing-gates',
    key: 'swing-gates'
  },
  '/automatic-swing-gates': {
    title: 'Automatic Swing Gates Brisbane | Custom Double Swing & Bi-Fold Electric Gates',
    description: 'Automatic swing gates Brisbane & Gold Coast. Single leaf, double swing & bi-fold folding gates. 10-Year Factory Structural Warranty. Free on-site measure: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/swing-gates',
    key: 'swing-gates'
  },
  '/solar-gates': {
    title: 'Solar Automatic Gates Brisbane | 100% Off-Grid Electric Acreage Gates',
    description: '100% off-grid solar automatic gates for Brisbane & Ipswich acreage properties. Heavy-duty 24V kits with 5-7 day battery backup. Free quote: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/solar-gates',
    key: 'solar-gates'
  },
  '/solar-automatic-gates': {
    title: 'Solar Automatic Gates Brisbane | 100% Off-Grid Electric Acreage Gates',
    description: '100% off-grid solar automatic gates for Brisbane & Ipswich acreage properties. Heavy-duty 24V kits with 5-7 day battery backup. Free quote: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/solar-gates',
    key: 'solar-gates'
  },
  '/pricing-guide': {
    title: 'Automatic Gate Costs & Pricing Guide Brisbane [2026 Prices]',
    description: 'Complete 2026 automatic gate price guide for Brisbane & SEQ. Transparent costs for sliding, swing, solar gates & motors ($3,800–$12,500+). Call (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/pricing-guide',
    key: 'pricing-guide'
  },
  '/pricing': {
    title: 'Automatic Gate Costs & Pricing Guide Brisbane [2026 Prices]',
    description: 'Complete 2026 automatic gate price guide for Brisbane & SEQ. Transparent costs for sliding, swing, solar gates & motors ($3,800–$12,500+). Call (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/pricing-guide',
    key: 'pricing-guide'
  },
  '/commercial-gates': {
    title: 'Commercial Gates Brisbane & Ipswich | Security Cantilever Gates',
    description: 'Heavy-duty commercial automatic gates Brisbane & Ipswich. Industrial cantilever gates, high-cycle boom gates & strata access. QBCC licensed: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/commercial-gates',
    key: 'commercial-gates'
  },
  '/commercial-security-gates': {
    title: 'Commercial Gates Brisbane & Ipswich | Security Cantilever Gates',
    description: 'Heavy-duty commercial automatic gates Brisbane & Ipswich. Industrial cantilever gates, high-cycle boom gates & strata access. QBCC licensed: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/commercial-gates',
    key: 'commercial-gates'
  },
  '/gates-brisbane': {
    title: 'Automatic Gates Brisbane | Licensed Electric Gate Installers Near Me',
    description: 'Looking for electric gate installers near you in Brisbane? QBCC licensed (#15579753) automatic sliding & swing gates. Free on-site quotes: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/gates-brisbane',
    key: 'suburbs-brisbane'
  },
  '/automatic-gates-brisbane': {
    title: 'Automatic Gates Brisbane | Licensed Electric Gate Installers Near Me',
    description: 'Looking for electric gate installers near you in Brisbane? QBCC licensed (#15579753) automatic sliding & swing gates. Free on-site quotes: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/gates-brisbane',
    key: 'suburbs-brisbane'
  },
  '/gates-ipswich': {
    title: 'Automatic Gates Ipswich | Factory Direct Electric Driveway Gates',
    description: "Ipswich's local automatic gate manufacturer at Shed 2, Belar St, Yamanto. Custom sliding, swing & solar gates with zero middleman markup. Call (07) 3102 1801.",
    canonical: 'https://customautogates.com.au/gates-ipswich',
    key: 'suburbs-ipswich'
  },
  '/automatic-gates-ipswich': {
    title: 'Automatic Gates Ipswich | Factory Direct Electric Driveway Gates',
    description: "Ipswich's local automatic gate manufacturer at Shed 2, Belar St, Yamanto. Custom sliding, swing & solar gates with zero middleman markup. Call (07) 3102 1801.",
    canonical: 'https://customautogates.com.au/gates-ipswich',
    key: 'suburbs-ipswich'
  },
  '/gates-logan': {
    title: 'Automatic Gates & Security Fencing Logan & Redland Bay QLD',
    description: 'Custom commercial security cantilever gates, residential sliding gates, and off-grid solar acreage gates across Logan, Berrinba, Springwood, Greenbank, and Cleveland.',
    canonical: 'https://customautogates.com.au/gates-logan',
    key: 'suburbs-logan'
  },
  '/automatic-gates-logan': {
    title: 'Automatic Gates & Security Fencing Logan & Redland Bay QLD',
    description: 'Custom commercial security cantilever gates, residential sliding gates, and off-grid solar acreage gates across Logan, Berrinba, Springwood, Greenbank, and Cleveland.',
    canonical: 'https://customautogates.com.au/gates-logan',
    key: 'suburbs-logan'
  },
  '/gates-gold-coast': {
    title: 'Custom Automatic Gates Gold Coast | Marine Grade Aluminium Automation',
    description: '100% corrosion-resistant marine grade aluminium automatic gates for Gold Coast, Hope Island, Sanctuary Cove, Coomera, Southport, and Hinterland properties.',
    canonical: 'https://customautogates.com.au/gates-gold-coast',
    key: 'suburbs-goldcoast'
  },
  '/automatic-gates-gold-coast': {
    title: 'Custom Automatic Gates Gold Coast | Marine Grade Aluminium Automation',
    description: '100% corrosion-resistant marine grade aluminium automatic gates for Gold Coast, Hope Island, Sanctuary Cove, Coomera, Southport, and Hinterland properties.',
    canonical: 'https://customautogates.com.au/gates-gold-coast',
    key: 'suburbs-goldcoast'
  },
  '/council-guide': {
    title: 'Queensland Council Fence & Pool Safety Gate Guide (AS1926.1)',
    description: 'Official guide to Brisbane City Council (BCC), Ipswich City Council (ICC), and Gold Coast fence height rules, 50% slat permeability, and AS1926.1 pool gate laws.',
    canonical: 'https://customautogates.com.au/council-guide',
    key: 'council-guide'
  },
  '/planning-rules': {
    title: 'Queensland Council Fence & Pool Safety Gate Guide (AS1926.1)',
    description: 'Official guide to Brisbane City Council (BCC), Ipswich City Council (ICC), and Gold Coast fence height rules, 50% slat permeability, and AS1926.1 pool gate laws.',
    canonical: 'https://customautogates.com.au/council-guide',
    key: 'council-guide'
  },
  '/testimonials': {
    title: 'Customer Reviews & Gate Projects (4.9★) | Custom Auto Gates QLD',
    description: 'Read 180+ verified 5-star customer reviews and detailed engineering case studies from homeowners across Brisbane, Ipswich, Logan, and Gold Coast.',
    canonical: 'https://customautogates.com.au/testimonials',
    key: 'testimonials'
  },
  '/reviews': {
    title: 'Customer Reviews & Gate Projects (4.9★) | Custom Auto Gates QLD',
    description: 'Read 180+ verified 5-star customer reviews and detailed engineering case studies from homeowners across Brisbane, Ipswich, Logan, and Gold Coast.',
    canonical: 'https://customautogates.com.au/testimonials',
    key: 'testimonials'
  },
  '/trade': {
    title: 'Trade & Builders Gate Portal | Wholesale Gate Fabrication SEQ',
    description: 'Wholesale custom automated gates and aluminium slat fencing for South East Queensland builders, fencing contractors, and developers. Fast 7–10 day lead times, CAD specs, 30-day accounts.',
    canonical: 'https://customautogates.com.au/trade',
    key: 'trade'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Custom Auto Gates & Fencing Brisbane & Ipswich',
    description: 'Official Privacy Policy for Custom Auto Gates Pty Ltd. Learn how we collect, protect, and manage your personal and property data in strict compliance with the Australian Privacy Principles (Privacy Act 1988).',
    canonical: 'https://customautogates.com.au/privacy-policy',
    key: 'privacy-policy'
  },
  '/privacy': {
    title: 'Privacy Policy | Custom Auto Gates & Fencing Brisbane & Ipswich',
    description: 'Official Privacy Policy for Custom Auto Gates Pty Ltd. Learn how we collect, protect, and manage your personal and property data in strict compliance with the Australian Privacy Principles (Privacy Act 1988).',
    canonical: 'https://customautogates.com.au/privacy-policy',
    key: 'privacy-policy'
  },
  '/gates/gallery-gates': {
    title: 'Automatic & Electric Gates Brisbane | Custom Driveway Gates',
    description: "South East Queensland's top-rated automatic & electric driveway gates. Factory direct sliding, swing & solar gates in Yamanto. 10-Yr warranty: (07) 3102 1801.",
    canonical: 'https://customautogates.com.au',
    key: 'home'
  },
  '/service-areas': {
    title: 'Automatic Gates Brisbane | Licensed Electric Gate Installers Near Me',
    description: 'Looking for electric gate installers near you in Brisbane? QBCC licensed (#15579753) automatic sliding & swing gates. Free on-site quotes: (07) 3102 1801.',
    canonical: 'https://customautogates.com.au/gates-brisbane',
    key: 'suburbs-brisbane'
  }
};

// Branded 404 HTML Page Generator
const render404Page = () => `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 - Page Not Found | Custom Auto Gates Brisbane</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0b1120;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 32px 16px;
      text-align: center;
    }
    .header {
      width: 100%;
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 40px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #fff;
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
    }
    .brand span { color: #d4a359; }
    .phone-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9999px;
      background: rgba(212, 163, 89, 0.12);
      border: 1px solid rgba(212, 163, 89, 0.3);
      color: #d4a359;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.2s;
    }
    .phone-pill:hover {
      background: #d4a359;
      color: #0b1120;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .code {
      font-size: clamp(5rem, 15vw, 8rem);
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(135deg, #d4a359 0%, #fef08a 50%, #d4a359 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }
    h1 {
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    p {
      color: #94a3b8;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 36px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-bottom: 40px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 22px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-primary {
      background: #d4a359;
      color: #0b1120;
      box-shadow: 0 4px 14px rgba(212, 163, 89, 0.25);
    }
    .btn-primary:hover {
      background: #e5b56d;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #e2e8f0;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .callout {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(212, 163, 89, 0.2);
      border-radius: 14px;
      padding: 20px;
      max-width: 480px;
      margin: 0 auto;
    }
    .callout-title {
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 6px;
      font-size: 0.95rem;
    }
    .callout-sub {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 14px;
    }
    .footer {
      width: 100%;
      max-width: 800px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
      color: #64748b;
      font-size: 0.85rem;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="header">
    <a href="/" class="brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
      CUSTOM AUTO <span>GATES</span>
    </a>
    <a href="tel:0731021801" class="phone-pill">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      (07) 3102 1801
    </a>
  </div>

  <div class="container">
    <span class="badge">HTTP 404 &bull; Not Found</span>
    <div class="code">404</div>
    <h1>Page Not Found</h1>
    <p>Sorry, the page you are looking for doesn't exist, has been moved, or the link may be outdated.</p>

    <div class="actions">
      <a href="/" class="btn btn-primary">Return to Homepage</a>
      <a href="/driveway-gates" class="btn btn-secondary">Automatic Gates</a>
      <a href="/sliding-gates" class="btn btn-secondary">Sliding Gates</a>
      <a href="/service" class="btn btn-secondary">Gate Repairs</a>
      <a href="/pricing-guide" class="btn btn-secondary">Pricing Guide</a>
      <a href="/contact-us" class="btn btn-secondary">Contact Us</a>
    </div>

    <div class="callout">
      <div class="callout-title">Need Immediate Assistance?</div>
      <div class="callout-sub">Speak with our Yamanto workshop team for instant help with gates, parts & repairs:</div>
      <a href="tel:0731021801" class="btn btn-primary" style="width: 100%;">(07) 3102 1801</a>
    </div>
  </div>

  <div class="footer">
    &copy; ${new Date().getFullYear()} Custom Auto Gates &amp; Fencing Pty Ltd &bull; Shed 2, 43-45 Belar St, Yamanto QLD 4305 &bull; QBCC #15579753
  </div>
</body>
</html>`;

let cachedIndexHtml = null;
const getIndexHtml = () => {
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) return null;
  if (!cachedIndexHtml || process.env.NODE_ENV !== 'production') {
    cachedIndexHtml = fs.readFileSync(indexPath, 'utf-8');
  }
  return cachedIndexHtml;
};

// SPA Route & 404 Handler
app.use((req, res) => {
  // Return plain 404 for missing static assets to prevent sending full HTML
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|map|json|txt|xml)$/i)) {
    return res.status(404).send('Asset not found');
  }

  const cleanPath = req.path.toLowerCase();
  const normalizedPath = cleanPath.replace(/\/$/, '') || '/';

  const meta = PAGE_METADATA[normalizedPath];

  if (meta) {
    let html = getIndexHtml();
    if (html) {
      // Inject route-specific canonical tag with no www and no trailing slash
      html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${meta.canonical}" />`);
      // Inject route-specific OpenGraph URL
      html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${meta.canonical}" />`);
      // Inject route-specific Title & Description
      html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`);
      html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${meta.description}" />`);
      html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`);

      // Inject server-rendered JSON-LD schema for rich search results (Product, AggregateRating, Offers, FAQPage)
      if (meta.key) {
        try {
          const routeSchema = getRouteSchemaData(meta.key, meta.canonical, meta);
          if (routeSchema) {
            html = html.replace('</head>', `<script type="application/ld+json" id="dynamic-route-schema">\n${JSON.stringify(routeSchema, null, 2)}\n</script>\n</head>`);
          }
        } catch (e) {
          console.error('Error generating server-rendered schema:', e.message);
        }
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }
    return res.sendFile(path.join(distPath, 'index.html'));
  }

  // Route does NOT exist: Return proper HTTP 404 status and branded 404 page
  res.status(404);
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(render404Page());
});

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain && process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, HOST, () => {
    console.log(`⚡ Custom Auto Gates Server running on http://${HOST}:${PORT}`);
  });

  server.on('error', (err) => {
    console.error(`Server error on port ${PORT}:`, err.message);
  });
}

export default app;
