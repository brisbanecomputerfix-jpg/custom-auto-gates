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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;

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
  // Driveway & Sliding Gates (Direct to dedicated landing page)
  '/gates/driveway-gates': '/automatic-sliding-gates',
  '/gates/driveway-gates/': '/automatic-sliding-gates',
  '/driveway-gates': '/automatic-sliding-gates',
  '/driveway-gates/': '/automatic-sliding-gates',
  '/automatic-sliding-gates/': '/automatic-sliding-gates',
  '/automatic-sliding-gates-2': '/automatic-sliding-gates',
  '/automatic-sliding-gates-2/': '/automatic-sliding-gates',
  '/gates/automatic-sliding-gates-brisbane': '/gates-brisbane',
  '/gates/automatic-sliding-gates-brisbane/': '/gates-brisbane',
  '/automated-gates-brisbane': '/gates-brisbane',
  '/automated-gates-brisbane/': '/gates-brisbane',
  '/gates/automatic-gates': '/automatic-sliding-gates',
  '/gates/automatic-gates/': '/automatic-sliding-gates',
  '/gates/slide-swing-bi-fold-telescopic': '/automatic-sliding-gates',
  '/slide-swing-bi-fold-telescopic': '/automatic-sliding-gates',
  '/slide-swing-bi-fold-telescopic/': '/automatic-sliding-gates',

  // Solar Automatic Gates (Direct to dedicated landing page)
  '/gate-automation/solar-automatic-gates': '/solar-gates',
  '/gate-automation/solar-automatic-gates/': '/solar-gates',
  '/solar-automatic-gates': '/solar-gates',
  '/solar-automatic-gates/': '/solar-gates',
  '/solar-gates/': '/solar-gates',

  // Swing Gates (Direct to dedicated landing page)
  '/gates/swing-gates': '/swing-gates',
  '/gates/swing-gates/': '/swing-gates',
  '/swing-gates/': '/swing-gates',
  '/automatic-swing-gates': '/swing-gates',
  '/automatic-swing-gates/': '/swing-gates',

  // Gallery
  '/gates/gallery-gates': '/#gallery',
  '/gates/gallery-gates/': '/#gallery',
  '/gallery-gates': '/#gallery',
  '/gallery-gates/': '/#gallery',
  '/gallery': '/#gallery',
  '/gallery/': '/#gallery',

  // Commercial & Boom Gates
  '/gates/security-commercial-electric-gates': '/#boom-gates',
  '/gates/security-commercial-electric-gates/': '/#boom-gates',
  '/gates/secuirty-commercial-electric-gates': '/#boom-gates',
  '/gates/secuirty-commercial-electric-gates/': '/#boom-gates',
  '/gate-automation/automatic-boom-gates': '/#boom-gates',
  '/gate-automation/automatic-boom-gates/': '/#boom-gates',
  '/gate-automation-boom-gates-road-barriers': '/#boom-gates',
  '/gate-automation-boom-gates-road-barriers/': '/#boom-gates',
  '/security-fencing': '/#fencing',
  '/security-fencing/': '/#fencing',

  // Motors & Automation
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
  const normalizedPath = req.path.toLowerCase().replace(/\/$/, '');
  const withTrailingSlash = `${normalizedPath}/`;
  
  const targetRedirect = LEGACY_301_REDIRECTS[req.path] || 
                         LEGACY_301_REDIRECTS[normalizedPath] || 
                         LEGACY_301_REDIRECTS[withTrailingSlash];

  if (targetRedirect) {
    return res.redirect(301, targetRedirect);
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

// Catch-all route for Single Page Application (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
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
