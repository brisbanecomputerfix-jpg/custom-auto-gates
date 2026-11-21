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
 * Filters out admin & junk parameters to keep GA4 reporting accurate
 */
export function trackPageView() {
  if (typeof window !== 'undefined' && window.gtag) {
    const path = (window.location.pathname || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();

    // Filter out junk paths, wp-admin, and session ID parameters
    if (path.includes('/wp-admin') || 
        path.includes('gsessionid') || 
        search.includes('gsessionid') || 
        hash.includes('gsessionid')) {
      return;
    }

    const cleanLocation = window.location.origin 
      ? (window.location.origin + window.location.pathname)
      : (window.location.href ? window.location.href.split('?')[0].split('#')[0] : '');

    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_location: cleanLocation
    });
  }
}

/**
 * Track form leads directly after successful /api/contact or /api/quote submission
 * Forces immediate loading of gtag.js if not yet loaded
 * Sends Enhanced Conversions user data (email & E.164 phone)
 * Awaits conversion dispatch before resolving
 *
 * @param {string} email - Customer email
 * @param {string} phone - Customer phone number
 * @param {'contact' | 'quote' | 'fast_quote' | 'site_visit' | string} formName - Form identifier
 */
export async function trackFormLead(email, phone, formName = 'contact') {
  if (typeof window === 'undefined') return;

  // 1. Force immediate tag script load if not already loaded
  try {
    if (typeof window.loadGtagScript === 'function') {
      window.loadGtagScript();
    } else if (!window._gtagLoaded) {
      window._gtagLoaded = true;
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
      document.head.appendChild(s);
    }
  } catch (e) {
    console.warn('gtag loader error:', e);
  }

  // 2. Ensure dataLayer and gtag exist
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function() { window.dataLayer.push(arguments); };
  }

  // 3. Set Enhanced Conversion user data (email and normalized +61 phone)
  const formattedPhone = formatE164Phone(phone);
  const userData = {};
  if (email) userData.email = String(email).trim().toLowerCase();
  if (formattedPhone) userData.phone_number = formattedPhone;

  if (Object.keys(userData).length > 0) {
    window.gtag('set', 'user_data', userData);
  }

  // 4. Fire Google Ads conversion (AW-991707394 / KfedCPiLs7odEIKC8dgD) and GA4 lead event with callback guarantee
  return new Promise((resolve) => {
    let resolved = false;
    const finish = () => {
      if (!resolved) {
        resolved = true;
        resolve(true);
      }
    };

    // Safety timeout ensures user is never blocked longer than 600ms even on slow connections
    const timer = setTimeout(finish, 600);

    try {
      window.gtag('event', 'conversion', { 
        send_to: GOOGLE_ADS_CONVERSION_LABEL,
        value: 1.0,
        currency: 'AUD',
        event_callback: () => {
          clearTimeout(timer);
          finish();
        }
      });

      window.gtag('event', 'generate_lead', { 
        form_name: formName,
        value: 1.0,
        currency: 'AUD'
      });
    } catch (err) {
      console.warn('Conversion dispatch error:', err);
      clearTimeout(timer);
      finish();
    }
  });
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
export async function trackServiceBooking(bookingData = {}) {
  const email = bookingData.email || '';
  const phone = bookingData.phone || '';
  await trackFormLead(email, phone, 'service_booking');

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
