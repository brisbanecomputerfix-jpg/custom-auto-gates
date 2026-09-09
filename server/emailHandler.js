import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFilePath = path.join(__dirname, 'leads.json');

// Helper to format lead for Gravity Forms REST API v2 & Zapier/Ascora
export function formatLeadForGravityForms(lead, index = 1) {
  const dateCreated = lead.receivedAt ? lead.receivedAt.replace('T', ' ').substring(0, 19) : new Date().toISOString().replace('T', ' ').substring(0, 19);
  const fileUrls = Array.isArray(lead.files) ? lead.files.map(f => f.fullUrl || f.url).join(', ') : '';

  return {
    id: lead.id ? String(lead.id).replace('lead-', '') : String(index),
    form_id: lead.source && lead.source.includes('Service') ? '2' : (lead.source && lead.source.includes('Estimator') ? '3' : '1'),
    post_id: null,
    date_created: dateCreated,
    date_updated: dateCreated,
    is_starred: '0',
    is_read: '0',
    ip: lead.ip || '',
    source_url: 'https://customautogates.com.au',
    user_agent: 'Custom Auto Gates Web',
    currency: 'AUD',
    payment_status: lead.paymentDetails?.status || (lead.paymentStatus || null),
    payment_date: lead.paymentDetails ? dateCreated : null,
    payment_amount: lead.paymentDetails?.amount ? String(lead.paymentDetails.amount).replace(/[^0-9.]/g, '') : null,
    payment_method: lead.paymentDetails?.method || null,
    transaction_id: lead.paymentDetails?.stripeRef || lead.paymentDetails?.sessionId || null,
    is_fulfilled: null,
    created_by: '1',
    transaction_type: lead.paymentDetails ? '1' : null,
    status: 'active',
    // Standard GF numeric field mapping for Zapier / Ascora Gravity Forms trigger
    '1': lead.name || '',
    '2': lead.phone || '',
    '3': lead.email || '',
    '4': lead.address || '',
    '5': lead.suburb || '',
    '6': lead.serviceType || '',
    '7': lead.notes || '',
    '8': fileUrls,
    // Named fields for direct Webhooks by Zapier or custom CRM mapping
    name: lead.name || '',
    phone: lead.phone || '',
    email: lead.email || '',
    address: lead.address || '',
    suburb: lead.suburb || '',
    service_type: lead.serviceType || '',
    preferred_time: lead.preferredTime || '',
    notes: lead.notes || '',
    dimensions: lead.dimensions || '',
    estimated_price: lead.estimatedPrice || '',
    source: lead.source || '',
    files: lead.files || [],
    payment_details: lead.paymentDetails || null
  };
}

// Helper to retrieve all leads from local storage
export function getAllLeads() {
  try {
    if (!fs.existsSync(leadsFilePath)) return [];
    const raw = fs.readFileSync(leadsFilePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to read leads:', err.message);
    return [];
  }
}

// Helper to retrieve single lead by ID
export function getLeadById(id) {
  const leads = getAllLeads();
  const searchId = String(id).startsWith('lead-') ? id : `lead-${id}`;
  return leads.find(l => l.id === searchId || String(l.id).replace('lead-', '') === String(id));
}

// Helper to append or update lead in local leads.json backup
export function saveLeadLocally(leadData) {
  try {
    let leads = getAllLeads();
    const { pdfBuffer, ...cleanLeadData } = leadData;

    if (cleanLeadData.id) {
      const existingIdx = leads.findIndex(l => l.id === cleanLeadData.id);
      if (existingIdx !== -1) {
        leads[existingIdx] = {
          ...leads[existingIdx],
          ...cleanLeadData,
          updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
        return leads[existingIdx];
      }
    }

    // Match existing lead by Stripe session ID if updating payment
    if (cleanLeadData.paymentDetails?.sessionId) {
      const existingBySession = leads.findIndex(l => 
        l.paymentDetails?.sessionId === cleanLeadData.paymentDetails.sessionId ||
        (l.sessionId && l.sessionId === cleanLeadData.paymentDetails.sessionId)
      );
      if (existingBySession !== -1) {
        leads[existingBySession] = {
          ...leads[existingBySession],
          ...cleanLeadData,
          updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
        return leads[existingBySession];
      }
    }

    const newLead = {
      id: cleanLeadData.id || `lead-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      hasPdf: !!pdfBuffer,
      ...cleanLeadData
    };
    leads.unshift(newLead);
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
    return newLead;
  } catch (err) {
    console.error('Failed to write lead to local backup:', err.message);
    return leadData;
  }
}

// Asynchronously dispatch lead to Zapier webhook if configured
export async function dispatchZapierWebhook(lead) {
  const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!zapierUrl) return;

  try {
    const payload = formatLeadForGravityForms(lead);
    await fetch(zapierUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('✅ Lead successfully forwarded to Zapier webhook for Ascora');
  } catch (err) {
    console.warn('⚠️ Zapier webhook dispatch warning (non-blocking):', err.message);
  }
}

// Create SMTP Transporter
export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const isSecure = port === 465;

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: isSecure,
    auth: {
      user: user,
      pass: pass,
    },
    connectionTimeout: 4000,
    greetingTimeout: 4000,
    socketTimeout: 6000,
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Sends a lead email notification to the business and a confirmation to the customer
 */
export async function sendLeadNotification(lead) {
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
    source = 'Website Contact Form',
    files = [],
    paymentDetails = null
  } = lead;

  // 1. Always save lead locally first
  const savedLead = saveLeadLocally(lead);

  // 2. Dispatch to Zapier webhook for Ascora CRM integration
  dispatchZapierWebhook({ ...lead, id: savedLead?.id });

  const transporter = getTransporter();
  const notificationRecipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'office@customautogates.com.au';
  const fromAddress = process.env.SMTP_FROM || 'info@customautogates.com.au';

  // Build Payment Details HTML section if payment exists
  const paymentSectionHtml = paymentDetails ? `
    <div style="margin-top: 20px; border: 1.5px solid #10b981; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #065f46; padding: 10px 16px; color: #ffffff; font-weight: bold; font-size: 14px; display: flex; align-items: center;">
        💳 Verified Stripe Payment Details
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; background-color: #ffffff;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568; width: 38%;">Payment Status:</td>
          <td style="padding: 9px 16px; color: #047857; font-weight: bold;">✅ ${paymentDetails.status || 'Paid'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568;">Payment Amount:</td>
          <td style="padding: 9px 16px; color: #1a202c; font-weight: bold;">${paymentDetails.amount || '$0.00 AUD'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568;">Payment Method:</td>
          <td style="padding: 9px 16px; color: #1a202c;">
            ${paymentDetails.method || 'Card'}${paymentDetails.brand ? ` (${paymentDetails.brand.toUpperCase()})` : ''}
          </td>
        </tr>
        ${paymentDetails.last4 ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568;">Card Number:</td>
          <td style="padding: 9px 16px; color: #1a202c; font-family: monospace;">•••• •••• •••• ${paymentDetails.last4}</td>
        </tr>` : ''}
        ${paymentDetails.email ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568;">Payment Email:</td>
          <td style="padding: 9px 16px; color: #1a202c;"><a href="mailto:${paymentDetails.email}" style="color: #2563eb; text-decoration: none;">${paymentDetails.email}</a></td>
        </tr>` : ''}
        ${paymentDetails.stripeRef || paymentDetails.sessionId ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568;">Stripe Reference:</td>
          <td style="padding: 9px 16px; font-family: monospace; color: #4b5563; font-size: 12px;">${paymentDetails.stripeRef || paymentDetails.sessionId}</td>
        </tr>` : ''}
        ${paymentDetails.items ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 16px; font-weight: bold; color: #4a5568;">Itemized Booking:</td>
          <td style="padding: 9px 16px; color: #334155;">${paymentDetails.items}</td>
        </tr>` : ''}
      </table>
    </div>
  ` : '';

  // Build Uploaded Files HTML section if files exist
  const filesSectionHtml = (Array.isArray(files) && files.length > 0) ? `
    <div style="margin-top: 18px; padding: 14px; background-color: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 8px; font-size: 14px;">
        📎 Uploaded Photos / Videos (${files.length} file${files.length > 1 ? 's' : ''}):
      </strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155;">
        ${files.map(f => {
          const downloadUrl = f.fullUrl || (f.url ? (f.url.startsWith('http') ? f.url : `https://customautogates.com.au${f.url}`) : '#');
          const sizeStr = f.size ? (f.size < 1024 * 1024 ? `${Math.round(f.size / 1024)} KB` : `${(f.size / (1024 * 1024)).toFixed(1)} MB`) : '';
          return `
            <li style="margin-bottom: 6px;">
              <a href="${downloadUrl}" target="_blank" style="color: #2563eb; font-weight: bold; text-decoration: underline;">
                ${f.originalName || f.filename}
              </a>
              ${sizeStr ? `<span style="color: #64748b; font-size: 11px;"> (${sizeStr})</span>` : ''}
            </li>
          `;
        }).join('')}
      </ul>
      <p style="margin: 8px 0 0 0; font-size: 11px; color: #64748b;">
        Note: Files under 10MB are also directly attached to this email.
      </p>
    </div>
  ` : '';

  if (!transporter) {
    console.warn('⚠️ SMTP credentials not yet configured in .env. Lead saved locally to server/leads.json.');
    return {
      success: true,
      savedLocally: true,
      emailSent: false,
      message: 'Lead received and recorded safely. (SMTP pending configuration)'
    };
  }

  // 3. Business Notification Email HTML
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <div style="background-color: #1a202c; padding: 18px 24px; border-radius: 6px 6px 0 0; text-align: center;">
        <h2 style="color: #d4a359; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
          ${paymentDetails ? '💳 Paid Gate Booking / Service Lead' : '⚡ New Gate Lead Received'}
        </h2>
        <p style="color: #ffffff; margin: 4px 0 0 0; font-size: 13px;">Source: ${source}</p>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e2e8f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; width: 35%; color: #4a5568;">Customer Name:</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1a202c;">${name || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Phone Number:</td>
            <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #c98a2c; font-weight: bold; text-decoration: none;">${phone || 'Not provided'}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Email Address:</td>
            <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2b6cb0; text-decoration: none;">${email || 'Not provided'}</a></td>
          </tr>
          ${address ? `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Street Address:</td>
            <td style="padding: 10px 0; font-weight: 600;">${address}</td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Suburb / Location:</td>
            <td style="padding: 10px 0; font-weight: 600;">${suburb || 'Brisbane / QLD'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Service / Gate Type:</td>
            <td style="padding: 10px 0; color: #2d3748; font-weight: 600;">${serviceType || 'General Inquiry'}</td>
          </tr>
          ${preferredTime ? `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Preferred Time:</td>
            <td style="padding: 10px 0;">${preferredTime}</td>
          </tr>` : ''}
          ${dimensions ? `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Estimated Dimensions:</td>
            <td style="padding: 10px 0;">${dimensions}</td>
          </tr>` : ''}
          ${estimatedPrice ? `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Calculator Estimate:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #276749;">${estimatedPrice}</td>
          </tr>` : ''}
        </table>

        ${paymentSectionHtml}

        ${filesSectionHtml}

        ${notes ? `
        <div style="margin-top: 18px; padding: 14px; background-color: #f7fafc; border-left: 4px solid #d4a359; border-radius: 4px;">
          <strong style="color: #4a5568; display: block; margin-bottom: 6px;">Customer Notes / Project Details:</strong>
          <p style="margin: 0; color: #2d3748; white-space: pre-wrap; font-size: 14px;">${notes}</p>
        </div>` : ''}

        <div style="margin-top: 24px; text-align: center;">
          <a href="tel:${phone}" style="display: inline-block; background-color: #d4a359; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">
            📞 Call Customer Now (${phone})
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach PDF and uploaded files (under 10MB)
  const attachments = [];
  if (lead.pdfBuffer) {
    attachments.push({
      filename: 'instant-gate-quotes.pdf',
      content: lead.pdfBuffer,
      contentType: 'application/pdf'
    });
  }

  if (Array.isArray(files)) {
    for (const f of files) {
      if (f.path && fs.existsSync(f.path) && (!f.size || f.size < 10 * 1024 * 1024)) {
        attachments.push({
          filename: f.originalName || f.filename,
          path: f.path,
          contentType: f.mimetype
        });
      }
    }
  }

  // Send admin alert
  const subjectPrefix = paymentDetails ? '💳 PAID BOOKING' : '🚨 New Gate Lead';
  let emailSent = false;
  try {
    await transporter.sendMail({
      from: `"Custom Auto Gates Website" <${fromAddress}>`,
      to: notificationRecipient,
      replyTo: email || fromAddress,
      subject: `${subjectPrefix}: ${name || 'Customer'} (${address || suburb || 'Brisbane'}) - ${serviceType || 'Quote Request'}`,
      html: adminHtml,
      attachments: attachments.length > 0 ? attachments : undefined
    });
    emailSent = true;
  } catch (mailErr) {
    console.warn('Admin lead notification email delivery failed:', mailErr.message);
  }

  // 4. Customer Confirmation Email (if valid email provided)
  if (email && email.includes('@')) {
    try {
      const isInstantQuote = !!lead.pdfBuffer || (serviceType && serviceType.includes('Instant Quote'));
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <div style="background-color: #1a202c; padding: 20px 24px; border-radius: 6px 6px 0 0; text-align: center;">
            <h2 style="color: #d4a359; margin: 0; font-size: 22px; font-weight: bold;">
              Custom Auto Gates & Fencing
            </h2>
            <p style="color: #e2e8f0; margin: 6px 0 0 0; font-size: 14px;">Yamanto Factory Direct Fabrications</p>
          </div>

          <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e2e8f0; border-top: none;">
            <h3 style="color: #1a202c; margin-top: 0;">Hello ${name || 'there'},</h3>
            <p style="color: #4a5568; line-height: 1.6; font-size: 15px;">
              Thank you for contacting <strong>Custom Auto Gates & Fencing</strong>. ${isInstantQuote 
                ? 'Attached to this email is a PDF containing the itemized breakdown of your selected gate materials and instant estimate.' 
                : (paymentDetails 
                  ? `Your service payment of <strong>${paymentDetails.amount}</strong> has been successfully confirmed. A certified technician is scheduled for dispatch.` 
                  : `We have received your inquiry for <strong>${serviceType || 'custom gate fabrication & installation'}</strong>.`)}
            </p>
            ${address ? `
            <p style="color: #4a5568; line-height: 1.6; font-size: 15px;">
              <strong>Site Address:</strong> ${address}
            </p>` : ''}
            <p style="color: #4a5568; line-height: 1.6; font-size: 15px;">
              Our estimation and measure team is reviewing your specification. A fabrication specialist will contact you shortly on <strong>${phone}</strong> to confirm your free on-site visit.
            </p>

            ${paymentDetails ? `
            <div style="background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 6px; padding: 14px 16px; margin: 18px 0; color: #065f46; font-size: 14px;">
              ✅ <strong>Payment Confirmed:</strong> ${paymentDetails.amount} received via ${paymentDetails.method || 'Card'}${paymentDetails.last4 ? ` (ending in ${paymentDetails.last4})` : ''}. Stripe Ref: <code>${paymentDetails.stripeRef || paymentDetails.sessionId}</code>.
            </div>` : ''}

            ${isInstantQuote ? `
            <div style="background-color: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 6px; padding: 14px 16px; margin: 18px 0; color: #1e40af; font-size: 14px;">
              📄 <strong>PDF Attachment Included:</strong> Please check the attached document <code>instant-gate-quotes.pdf</code> for your complete itemized materials specification and pricing estimate.
            </div>` : ''}

            <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px; text-transform: uppercase;">Why Buy Factory Direct from Us?</h4>
              <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 14px; line-height: 1.6;">
                <li>100% Australian Made in our Yamanto, QLD workshop</li>
                <li>Commercial-grade Centurion Smart gate motors & automation</li>
                <li>Dulux powdercoating and DecoWood timber finishes</li>
                <li>10-Year structural fabrication warranty</li>
              </ul>
            </div>

            <p style="color: #718096; font-size: 13px; line-height: 1.5; margin-top: 24px;">
              Need urgent assistance? Call our Yamanto office directly on <a href="tel:0731021801" style="color: #d4a359; font-weight: bold;">(07) 3102 1801</a>.
            </p>
            <p style="color: #718096; font-size: 13px; line-height: 1.5; margin-top: 16px;">
              Sincerely,<br>
              <strong>Estimation Team</strong><br>
              Custom Auto Gates Pty Ltd<br>
              Shed 2, 43-45 Belar Street, Yamanto QLD 4305<br>
              (07) 3102 1801
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Custom Auto Gates" <${fromAddress}>`,
        to: email,
        subject: isInstantQuote 
          ? `Your Quote Request & Material Breakdown - Custom Auto Gates`
          : (paymentDetails 
            ? `Payment Receipt & Service Confirmation - Custom Auto Gates` 
            : `Your Gate Measure & Quote Request Received - Custom Auto Gates`),
        html: customerHtml,
        attachments: attachments.length > 0 ? attachments : undefined
      });
    } catch (custErr) {
      console.warn('Customer confirmation email failed (non-critical):', custErr.message);
    }
  }

  return { success: true, emailSent };
}
