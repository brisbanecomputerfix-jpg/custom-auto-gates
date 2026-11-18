// ==============================================================================
// Google Analytics 4 (GA4), Google Ads & Enhanced Conversions Integration
// Configured for Custom Auto Gates & Fencing:
// Google Ads ID: AW-991707394
// GA4 Measurement ID: G-X3D8100CMF
// Primary Conversion Action: AW-991707394/KfedCPiLs7odEIKC8dgD
// ==============================================================================

const GOOGLE_ADS_ID = 'AW-991707394';
const GA_MEASUREMENT_ID = 'G-X3D8100CMF';
const GOOGLE_ADS_CONVERSION_LABEL = 'AW-991707394/KfedCPiLs7odEIKC8dgD';
const GOOGLE_ADS_PHONE_CONVERSION_LABEL = 'AW-991707394/TvEuCPuLs7odEIKC8dgD';

/**
 * Format Australian phone numbers to standard E.164 (+61) format for Enhanced Conversions
 * e.g. "0412 345 678" -> "+61412345678", "(07) 3102 1801" -> "+61731021801"
 */
export function formatE164Phone(rawPhone) {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('61')) {
    return '+' + digits;
  }
  if (digits.startsWith('0')) {
    return '+61' + digits.substring(1);
  }
  if (digits.length === 9) {
    return '+61' + digits;
  }
  return '+' + digits;
}

/**
 * Page views on route changes for React Single Page Application (SPA)
 */
export function trackPageView() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_location: window.location.href
    });
  }
}

/**
 * Track form leads after /api/contact or /api/quote returns OK
 * Enhanced conversions with email & phone in +61 format
 *
 * @param {string} email - Customer email
 * @param {string} phone - Customer phone number
 * @param {'contact' | 'quote' | 'site_visit' | string} formName - Form identifier
 */
export function trackFormLead(email, phone, formName = 'contact') {
  if (typeof window !== 'undefined' && window.gtag) {
    const formattedPhone = formatE164Phone(phone);
    const userData = {};
    if (email) userData.email = String(email).trim().toLowerCase();
    if (formattedPhone) userData.phone_number = formattedPhone;

    if (Object.keys(userData).length > 0) {
      window.gtag('set', 'user_data', userData);
    }
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_CONVERSION_LABEL });
    window.gtag('event', 'generate_lead', { form_name: formName });
  }
}

/**
 * Backwards compatibility helper for lead submissions
 */
export function trackLeadSubmission(leadData = {}) {
  const email = leadData.email || '';
  const phone = leadData.phone || '';
  const formName = leadData.form_name || 'contact';
  trackFormLead(email, phone, formName);
}

/**
 * Backwards compatibility helper for quote requests
 */
export function trackQuoteRequest(quoteData = {}) {
  const email = quoteData.email || '';
  const phone = quoteData.phone || '';
  trackFormLead(email, phone, 'quote');
}

/**
 * Track service & repair bookings / payments
 */
export function trackServiceBooking(bookingData = {}) {
  const email = bookingData.email || '';
  const phone = bookingData.phone || '';
  trackFormLead(email, phone, 'service_booking');

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: bookingData.receiptNumber || `cag-${Date.now()}`,
      value: Number(bookingData.amount) || 198.0,
      currency: 'AUD'
    });
  }
}

/**
 * Track Phone Call Clicks (tel: links)
 */
export function trackPhoneClick() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_PHONE_CONVERSION_LABEL });
    window.gtag('event', 'phone_click');
  }
}

/**
 * Attach global listener for tel: clicks
 */
function attachGlobalClickListeners() {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a && window.gtag) {
      window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_PHONE_CONVERSION_LABEL });
      window.gtag('event', 'phone_click');
    }
  });
}

if (typeof window !== 'undefined') {
  attachGlobalClickListeners();
}
