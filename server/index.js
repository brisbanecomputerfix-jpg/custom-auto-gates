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
import { getRouteSchemaData, generateUnifiedSchema, PAGE_SEO_CONFIGS } from './seoMetadata.js';
import { renderRouteHtml } from './prerender.js';
import { 
  submitSitemap as bingSubmitSitemap,
  submitUrlBatch as bingSubmitUrlBatch,
  submitIndexNow,
  getQueryStats as bingGetQueryStats,
  getPageStats as bingGetPageStats,
  getCrawlStats as bingGetCrawlStats,
  getSubmissionQuota as bingGetQuota,
  getFeeds as bingGetFeeds,
  CANONICAL_ROUTES
} from './bingWebmaster.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;

// Enable trust proxy for correct protocol, host & IP detection behind Traefik/Coolify
app.set('trust proxy', true);

// Fast-path: Serve robots.txt directly with 200 OK across ALL origins/protocols without 301 redirects
// Fixes Ahrefs & Bing crawler REP audits testing http:// and www. hostnames
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const distRobots = path.resolve(__dirname, '../dist/robots.txt');
  const pubRobots = path.resolve(__dirname, '../public/robots.txt');
  if (fs.existsSync(distRobots)) {
    return res.sendFile(distRobots);
  }
  if (fs.existsSync(pubRobots)) {
    return res.sendFile(pubRobots);
  }
  res.send('User-agent: *\nAllow: /\nSitemap: https://customautogates.com.au/sitemap.xml');
});

// 0. Enforce HTTPS & Canonical Domain (301 Redirect www to non-www, http to https, and subdomains)
app.use((req, res, next) => {
  const hostHeader = (req.headers['x-forwarded-host'] || req.headers.host || '').toLowerCase();
  const hostname = hostHeader.split(':')[0];
  const protoHeader = (req.headers['x-forwarded-proto'] || req.protocol || 'http').toLowerCase();
  const isHttp = protoHeader.split(',')[0].trim() === 'http' || !req.secure;

  // 0a. Subdomain redirect: brisbane.customautogates.com.au -> https://customautogates.com.au/gates-brisbane
  if (hostname === 'brisbane.customautogates.com.au' || hostname.startsWith('brisbane.')) {
    return res.redirect(301, `https://customautogates.com.au/gates-brisbane`);
  }

  // 1. Primary Production Domain (customautogates.com.au)
  if (hostname === 'www.customautogates.com.au' || hostname === 'customautogates.com.au') {
    if (hostname.startsWith('www.') || isHttp) {
      return res.redirect(301, `https://customautogates.com.au${req.originalUrl}`);
    }
  }

  // 2. Secondary Staging Domain (gates.4pxl.com)
  if (hostname === 'www.gates.4pxl.com' || hostname === 'gates.4pxl.com') {
    if (hostname.startsWith('www.') || isHttp) {
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
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

// 1b. Spam URL & Junk Parameter Sanitizer (301 Redirects junk query params to clean canonical URL)
app.use((req, res, next) => {
  const urlPath = req.path.toLowerCase();
  const queryKeys = Object.keys(req.query || {});
  
  // Check for scrap ecommerce collections or wp-content artifacts
  if (urlPath.startsWith('/collections') || urlPath.startsWith('/collections/')) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(410).send('Gone - Scraped collection URL does not exist.');
  }

  // Check for spam parameter injections (?h=, ?y=, ?l=, ?k=, ?gsessionid=)
  const hasSpamQuery = queryKeys.some(key => /^[hylk]$/i.test(key) || /^h\d+/i.test(key) || /gsessionid/i.test(key));
  if (hasSpamQuery) {
    // Strip junk parameters and preserve valid marketing tracking parameters (utm_*, gclid, etc.)
    const cleanParams = new URLSearchParams();
    for (const [k, v] of Object.entries(req.query)) {
      if (!/^[hylk]$/i.test(k) && !/^h\d+/i.test(k) && !/gsessionid/i.test(k)) {
        cleanParams.append(k, v);
      }
    }
    const cleanQs = cleanParams.toString() ? `?${cleanParams.toString()}` : '';
    return res.redirect(301, `${req.path}${cleanQs}`);
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
  '/gates/automatic-gates/sliding-gates': '/sliding-gates',
  '/gates/automatic-gates/sliding-gates/': '/sliding-gates',

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
  '/instant-online-quote': '/#quote',
  '/instant-online-quote/': '/#quote',

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
  '/trade': '/commercial-gates',
  '/trade/': '/commercial-gates',
  '/security-fencing': '/fencing',
  '/security-fencing/': '/fencing',
  '/fencing/aluminium-fencing': '/fencing',
  '/fencing/aluminium-fencing/': '/fencing',
  '/gallery-and-design/fencing': '/fencing',
  '/gallery-and-design/fencing/': '/fencing',

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
  '/gate-automation/automation-accessories': '/service',
  '/gate-automation/automation-accessories/': '/service',
  '/automation-accessories/motors': '/service',
  '/automation-accessories/motors/': '/service',
  '/automation-accessories': '/service',
  '/automation-accessories/': '/service',
  '/gate-automation': '/service',
  '/gate-automation/': '/service',
  '/gate-automation/nice-sliding-gate-automation': '/service',
  '/gate-automation/nice-sliding-gate-automation/': '/service',
  '/gate-automation/nice-swing-gate-automation': '/service',
  '/gate-automation/nice-swing-gate-automation/': '/service',

  // Fencing
  '/fencing/': '/fencing',
  '/fencing/colorbond-fencing': '/fencing',
  '/fencing/colorbond-fencing/': '/fencing',
  '/fencing/timber-fencing': '/fencing',
  '/fencing/timber-fencing/': '/fencing',
  '/balustrade': '/fencing',
  '/balustrade/': '/fencing',

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

// Bing Webmaster Tools & IndexNow API Integration
app.get('/BingSiteAuth.xml', (req, res) => {
  const filePath = path.resolve(__dirname, '../public/BingSiteAuth.xml');
  if (fs.existsSync(filePath)) {
    res.type('application/xml').sendFile(filePath);
  } else {
    res.type('application/xml').send(`<?xml version="1.0"?>\n<users>\n\t<user>7367D14C8A984D1BED188A0994D6A6D2</user>\n\t<user>e03d2af542ca4ff89b26e2d3a81b2d23</user>\n</users>`);
  }
});

app.get('/api/bing/stats', async (req, res) => {
  try {
    const [quota, queries, pages, crawl, feeds] = await Promise.allSettled([
      bingGetQuota(),
      bingGetQueryStats(),
      bingGetPageStats(),
      bingGetCrawlStats(),
      bingGetFeeds()
    ]);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      quota: quota.status === 'fulfilled' ? quota.value : null,
      queries: queries.status === 'fulfilled' ? queries.value.slice(0, 50) : [],
      pages: pages.status === 'fulfilled' ? pages.value.slice(0, 50) : [],
      crawl: crawl.status === 'fulfilled' ? crawl.value : [],
      feeds: feeds.status === 'fulfilled' ? feeds.value : []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/bing/push-sitemap', async (req, res) => {
  try {
    const feedUrl = req.body?.feedUrl || 'https://customautogates.com.au/sitemap.xml';
    const result = await bingSubmitSitemap(feedUrl);
    res.json({ success: true, message: 'Sitemap submitted to Bing Webmaster Tools', result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/bing/submit-urls', async (req, res) => {
  try {
    const urls = req.body?.urls && Array.isArray(req.body.urls) ? req.body.urls : CANONICAL_ROUTES;
    const [bingResult, indexNowResult] = await Promise.allSettled([
      bingSubmitUrlBatch(urls),
      submitIndexNow(urls)
    ]);

    res.json({
      success: true,
      submittedCount: urls.length,
      bing: bingResult.status === 'fulfilled' ? bingResult.value : { error: bingResult.reason?.message },
      indexNow: indexNowResult.status === 'fulfilled' ? indexNowResult.value : { error: indexNowResult.reason?.message }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static assets in production if dist exists (index: false prevents intercepting '/' before SSR pre-rendering)
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath, { index: false }));

// Page SEO Metadata Dictionary for Server-Side Pre-rendering
// Derived directly from PAGE_SEO_CONFIGS to prevent drift between SSR and Client SPA
// Strictly enforces canonical tags with no www and no trailing slash
const PAGE_METADATA = {
  '/': { ...PAGE_SEO_CONFIGS.home, canonical: 'https://customautogates.com.au', key: 'home' },
  '/about-us': { ...PAGE_SEO_CONFIGS.about, canonical: 'https://customautogates.com.au/about-us', key: 'about' },
  '/about': { ...PAGE_SEO_CONFIGS.about, canonical: 'https://customautogates.com.au/about-us', key: 'about' },
  '/service': { ...PAGE_SEO_CONFIGS.service, canonical: 'https://customautogates.com.au/service', key: 'service' },
  '/repairs': { ...PAGE_SEO_CONFIGS.service, canonical: 'https://customautogates.com.au/service', key: 'service' },
  '/gate-repairs': { ...PAGE_SEO_CONFIGS.service, canonical: 'https://customautogates.com.au/service', key: 'service' },
  '/gate-repairs-brisbane': { ...PAGE_SEO_CONFIGS.service, canonical: 'https://customautogates.com.au/service', key: 'service' },
  '/electric-gate-repairs': { ...PAGE_SEO_CONFIGS.service, canonical: 'https://customautogates.com.au/service', key: 'service' },
  '/automatic-gate-repairs': { ...PAGE_SEO_CONFIGS.service, canonical: 'https://customautogates.com.au/service', key: 'service' },
  '/contact-us': { ...PAGE_SEO_CONFIGS.contact, canonical: 'https://customautogates.com.au/contact-us', key: 'contact' },
  '/contact': { ...PAGE_SEO_CONFIGS.contact, canonical: 'https://customautogates.com.au/contact-us', key: 'contact' },
  '/driveway-gates': { ...PAGE_SEO_CONFIGS['driveway-gates'], canonical: 'https://customautogates.com.au/driveway-gates', key: 'driveway-gates' },
  '/automatic-sliding-gates': { ...PAGE_SEO_CONFIGS['automatic-sliding-gates'], canonical: 'https://customautogates.com.au/automatic-sliding-gates', key: 'automatic-sliding-gates' },
  '/sliding-gates': { ...PAGE_SEO_CONFIGS['automatic-sliding-gates'], canonical: 'https://customautogates.com.au/automatic-sliding-gates', key: 'automatic-sliding-gates' },
  '/swing-gates': { ...PAGE_SEO_CONFIGS['swing-gates'], canonical: 'https://customautogates.com.au/swing-gates', key: 'swing-gates' },
  '/automatic-swing-gates': { ...PAGE_SEO_CONFIGS['swing-gates'], canonical: 'https://customautogates.com.au/swing-gates', key: 'swing-gates' },
  '/solar-gates': { ...PAGE_SEO_CONFIGS['solar-gates'], canonical: 'https://customautogates.com.au/solar-gates', key: 'solar-gates' },
  '/solar-automatic-gates': { ...PAGE_SEO_CONFIGS['solar-gates'], canonical: 'https://customautogates.com.au/solar-gates', key: 'solar-gates' },
  '/pricing-guide': { ...PAGE_SEO_CONFIGS['pricing-guide'], canonical: 'https://customautogates.com.au/pricing-guide', key: 'pricing-guide' },
  '/pricing': { ...PAGE_SEO_CONFIGS['pricing-guide'], canonical: 'https://customautogates.com.au/pricing-guide', key: 'pricing-guide' },
  '/commercial-gates': { ...PAGE_SEO_CONFIGS['commercial-gates'], canonical: 'https://customautogates.com.au/commercial-gates', key: 'commercial-gates' },
  '/commercial-security-gates': { ...PAGE_SEO_CONFIGS['commercial-gates'], canonical: 'https://customautogates.com.au/commercial-gates', key: 'commercial-gates' },
  '/gates-brisbane': { ...PAGE_SEO_CONFIGS['suburbs-brisbane'], canonical: 'https://customautogates.com.au/gates-brisbane', key: 'suburbs-brisbane' },
  '/automatic-gates-brisbane': { ...PAGE_SEO_CONFIGS['suburbs-brisbane'], canonical: 'https://customautogates.com.au/gates-brisbane', key: 'suburbs-brisbane' },
  '/service-areas': { ...PAGE_SEO_CONFIGS['suburbs-brisbane'], canonical: 'https://customautogates.com.au/gates-brisbane', key: 'suburbs-brisbane' },
  '/gates-ipswich': { ...PAGE_SEO_CONFIGS['suburbs-ipswich'], canonical: 'https://customautogates.com.au/gates-ipswich', key: 'suburbs-ipswich' },
  '/automatic-gates-ipswich': { ...PAGE_SEO_CONFIGS['suburbs-ipswich'], canonical: 'https://customautogates.com.au/gates-ipswich', key: 'suburbs-ipswich' },
  '/gates-logan': { ...PAGE_SEO_CONFIGS['suburbs-logan'], canonical: 'https://customautogates.com.au/gates-logan', key: 'suburbs-logan' },
  '/automatic-gates-logan': { ...PAGE_SEO_CONFIGS['suburbs-logan'], canonical: 'https://customautogates.com.au/gates-logan', key: 'suburbs-logan' },
  '/gates-gold-coast': { ...PAGE_SEO_CONFIGS['suburbs-goldcoast'], canonical: 'https://customautogates.com.au/gates-gold-coast', key: 'suburbs-goldcoast' },
  '/automatic-gates-gold-coast': { ...PAGE_SEO_CONFIGS['suburbs-goldcoast'], canonical: 'https://customautogates.com.au/gates-gold-coast', key: 'suburbs-goldcoast' },
  '/council-guide': { ...PAGE_SEO_CONFIGS['council-guide'], canonical: 'https://customautogates.com.au/council-guide', key: 'council-guide' },
  '/planning-rules': { ...PAGE_SEO_CONFIGS['council-guide'], canonical: 'https://customautogates.com.au/council-guide', key: 'council-guide' },
  '/testimonials': { ...PAGE_SEO_CONFIGS.testimonials, canonical: 'https://customautogates.com.au/testimonials', key: 'testimonials' },
  '/reviews': { ...PAGE_SEO_CONFIGS.testimonials, canonical: 'https://customautogates.com.au/testimonials', key: 'testimonials' },
  '/privacy-policy': { ...PAGE_SEO_CONFIGS['privacy-policy'], canonical: 'https://customautogates.com.au/privacy-policy', key: 'privacy-policy' },
  '/privacy': { ...PAGE_SEO_CONFIGS['privacy-policy'], canonical: 'https://customautogates.com.au/privacy-policy', key: 'privacy-policy' },
  '/quote-confirmation': { ...PAGE_SEO_CONFIGS['quote-confirmation'], canonical: 'https://customautogates.com.au/quote-confirmation', key: 'quote-confirmation' },
  '/gates/gallery-gates': { ...PAGE_SEO_CONFIGS.home, canonical: 'https://customautogates.com.au', key: 'home' },
  '/fencing': { ...PAGE_SEO_CONFIGS['fencing'], canonical: 'https://customautogates.com.au/fencing', key: 'fencing' },
  '/gates-fencing-carindale': { ...PAGE_SEO_CONFIGS['suburb-res-carindale'], canonical: 'https://customautogates.com.au/gates-fencing-carindale', key: 'suburb-res-carindale' },
  '/gates-fencing-camp-hill': { ...PAGE_SEO_CONFIGS['suburb-res-camp-hill'], canonical: 'https://customautogates.com.au/gates-fencing-camp-hill', key: 'suburb-res-camp-hill' },
  '/gates-fencing-rochedale': { ...PAGE_SEO_CONFIGS['suburb-res-rochedale'], canonical: 'https://customautogates.com.au/gates-fencing-rochedale', key: 'suburb-res-rochedale' },
  '/gates-fencing-wishart': { ...PAGE_SEO_CONFIGS['suburb-res-wishart'], canonical: 'https://customautogates.com.au/gates-fencing-wishart', key: 'suburb-res-wishart' },
  '/gates-fencing-mansfield': { ...PAGE_SEO_CONFIGS['suburb-res-mansfield'], canonical: 'https://customautogates.com.au/gates-fencing-mansfield', key: 'suburb-res-mansfield' },
  '/gates-fencing-capalaba': { ...PAGE_SEO_CONFIGS['suburb-res-capalaba'], canonical: 'https://customautogates.com.au/gates-fencing-capalaba', key: 'suburb-res-capalaba' },
  '/gates-fencing-gumdale': { ...PAGE_SEO_CONFIGS['suburb-res-gumdale'], canonical: 'https://customautogates.com.au/gates-fencing-gumdale', key: 'suburb-res-gumdale' },
  '/gates-fencing-wavell-heights': { ...PAGE_SEO_CONFIGS['suburb-res-wavell-heights'], canonical: 'https://customautogates.com.au/gates-fencing-wavell-heights', key: 'suburb-res-wavell-heights' },
  '/gates-fencing-pullenvale': { ...PAGE_SEO_CONFIGS['suburb-res-pullenvale'], canonical: 'https://customautogates.com.au/gates-fencing-pullenvale', key: 'suburb-res-pullenvale' }
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

      // Inject server-rendered unified JSON-LD schema graph (Organization, LocalBusiness, WebSite, Products/Services, FAQs)
      try {
        const unifiedGraph = generateUnifiedSchema(meta.key || 'home', meta.canonical, meta);
        if (unifiedGraph) {
          const scriptTag = `<script type="application/ld+json" id="master-schema-graph">\n${JSON.stringify(unifiedGraph, null, 2)}\n</script>`;
          if (html.includes('id="master-schema-graph"')) {
            html = html.replace(/<script type="application\/ld\+json" id="master-schema-graph">[\s\S]*?<\/script>/, scriptTag);
          } else if (html.includes('type="application/ld+json"')) {
            html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/, scriptTag);
          } else {
            html = html.replace('</head>', `${scriptTag}\n</head>`);
          }
        }
      } catch (e) {
        console.error('Error generating server-rendered unified schema:', e.message);
      }

      // SERVER-SIDE PRE-RENDERING: Inject full semantic HTML body into <div id="root">
      try {
        const prerenderedBody = renderRouteHtml(normalizedPath);
        if (prerenderedBody) {
          html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`);
        }
      } catch (prerenderErr) {
        console.error('Server pre-rendering error for path ' + normalizedPath + ':', prerenderErr.message);
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
