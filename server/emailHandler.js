import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFilePath = path.join(__dirname, 'leads.json');

// Helper to append lead to local leads.json backup
export function saveLeadLocally(leadData) {
  try {
    let leads = [];
    if (fs.existsSync(leadsFilePath)) {
      const raw = fs.readFileSync(leadsFilePath, 'utf8');
      leads = JSON.parse(raw || '[]');
    }
    leads.unshift({
      id: `lead-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      ...leadData
    });
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write lead to local backup:', err.message);
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
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false // Helps avoid self-signed cert issues on custom mail servers
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
    source = 'Website Contact Form'
  } = lead;

  // 1. Always save lead locally first
  saveLeadLocally(lead);

  const transporter = getTransporter();
  const notificationRecipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'office@customautogates.com.au';
  const fromAddress = process.env.SMTP_FROM || 'info@customautogates.com.au';

  if (!transporter) {
    console.warn('⚠️ SMTP credentials not yet configured in .env. Lead saved locally to server/leads.json.');
    return {
      success: true,
      savedLocally: true,
      emailSent: false,
      message: 'Lead received and recorded safely. (SMTP pending configuration)'
    };
  }

  // 2. Business Notification Email
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <div style="background-color: #1a202c; padding: 18px 24px; border-radius: 6px 6px 0 0; text-align: center;">
        <h2 style="color: #d4a359; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">
          ⚡ New Gate Lead Received
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

  // Send admin alert
  await transporter.sendMail({
    from: `"Custom Auto Gates Website" <${fromAddress}>`,
    to: notificationRecipient,
    replyTo: email || fromAddress,
    subject: `🚨 New Gate Lead: ${name} (${suburb || 'Brisbane'}) - ${serviceType || 'Quote Request'}`,
    html: adminHtml,
  });

  // 3. Optional Customer Confirmation Email (if valid email provided)
  if (email && email.includes('@')) {
    try {
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <div style="background-color: #1a202c; padding: 20px 24px; border-radius: 6px 6px 0 0; text-align: center;">
            <h2 style="color: #d4a359; margin: 0; font-size: 22px; font-weight: bold;">
              Custom Auto Gates & Fencing
            </h2>
            <p style="color: #e2e8f0; margin: 6px 0 0 0; font-size: 14px;">Yamanto Factory Direct Fabrications</p>
          </div>

          <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e2e8f0; border-top: none;">
            <h3 style="color: #1a202c; margin-top: 0;">Hi ${name || 'there'},</h3>
            <p style="color: #4a5568; line-height: 1.6; font-size: 15px;">
              Thank you for contacting <strong>Custom Auto Gates & Fencing</strong>. We have received your inquiry for <strong>${serviceType || 'custom gate fabrication & installation'}</strong>.
            </p>
            <p style="color: #4a5568; line-height: 1.6; font-size: 15px;">
              Our estimation and measure team is reviewing your project details. A fabrication specialist will contact you shortly on <strong>${phone}</strong> to confirm your free on-site measure and CAD quote.
            </p>

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
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Custom Auto Gates" <${fromAddress}>`,
        to: email,
        subject: `Your Gate Measure & Quote Request Received - Custom Auto Gates`,
        html: customerHtml,
      });
    } catch (custErr) {
      console.warn('Customer confirmation email failed (non-critical):', custErr.message);
    }
  }

  return { success: true, emailSent: true };
}
