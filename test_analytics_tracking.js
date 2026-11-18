// Test suite for Google Analytics 4 & Google Ads Conversion Tracking
console.log('=== VERIFYING GOOGLE ADS & GA4 TRACKING INTEGRATION ===');

// Setup mock window & DOM
const mockDataLayer = [];
const mockGtagCalls = [];
let clickHandler = null;

global.window = {
  location: { href: 'https://customautogates.com.au/driveway-gates', pathname: '/driveway-gates' },
  dataLayer: mockDataLayer,
  gtag: function() {
    mockGtagCalls.push(Array.from(arguments));
  },
  addEventListener: () => {}
};

global.document = {
  addEventListener: (event, handler) => {
    if (event === 'click') clickHandler = handler;
  }
};

async function runTests() {
  const { formatE164Phone, trackPageView, trackFormLead } = await import('./src/utils/analytics.js');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // Test 1: Phone Formatting to +61 E.164
  assert(formatE164Phone('0412 345 678') === '+61412345678', 'Mobile formatted to +61412345678');
  assert(formatE164Phone('(07) 3102 1801') === '+61731021801', 'Landline formatted to +61731021801');
  assert(formatE164Phone('+61 412 345 678') === '+61412345678', 'Existing +61 formatted cleanly');
  assert(formatE164Phone('412345678') === '+61412345678', '9-digit without leading 0 formatted to +61412345678');

  // Test 2: Page Views on Route Changes
  mockGtagCalls.length = 0;
  trackPageView();
  const pageViewCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'page_view');
  assert(!!pageViewCall, 'gtag page_view event called');
  assert(pageViewCall[2].page_path === '/driveway-gates', 'page_path matches location.pathname');
  assert(pageViewCall[2].page_location === 'https://customautogates.com.au/driveway-gates', 'page_location matches location.href');

  // Test 3: Form Leads (Site Visit)
  mockGtagCalls.length = 0;
  trackFormLead('client@example.com', '0412 345 678', 'site_visit');
  
  const setUserDataCall = mockGtagCalls.find(call => call[0] === 'set' && call[1] === 'user_data');
  assert(!!setUserDataCall, "gtag('set', 'user_data') was called");
  assert(setUserDataCall[2].email === 'client@example.com', 'Enhanced conversion email is lowercase and trimmed');
  assert(setUserDataCall[2].phone_number === '+61412345678', 'Enhanced conversion phone is in +61 format');

  const conversionCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'conversion');
  assert(!!conversionCall, "gtag('event', 'conversion') was called");
  assert(conversionCall[2].send_to === 'AW-991707394/KfedCPiLs7odEIKC8dgD', 'send_to matches exact conversion label AW-991707394/KfedCPiLs7odEIKC8dgD');

  const generateLeadCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'generate_lead');
  assert(!!generateLeadCall, "gtag('event', 'generate_lead') was called");
  assert(generateLeadCall[2].form_name === 'site_visit', "form_name is 'site_visit'");

  // Test 4: Form Leads (Quote)
  mockGtagCalls.length = 0;
  trackFormLead('quote@example.com', '(07) 3102 1801', 'quote');
  const quoteLeadCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'generate_lead');
  assert(quoteLeadCall[2].form_name === 'quote', "form_name is 'quote'");

  // Test 5: Form Leads (Contact)
  mockGtagCalls.length = 0;
  trackFormLead('contact@example.com', '0400 000 000', 'contact');
  const contactLeadCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'generate_lead');
  assert(contactLeadCall[2].form_name === 'contact', "form_name is 'contact'");

  // Test 6: Form Leads (Trade Wholesale Form)
  mockGtagCalls.length = 0;
  trackFormLead('builder@apexbuild.com.au', '0499 888 777', 'trade');
  const tradeLeadCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'generate_lead');
  assert(tradeLeadCall[2].form_name === 'trade', "form_name is 'trade'");
  const tradeConvCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'conversion');
  assert(tradeConvCall[2].send_to === 'AW-991707394/KfedCPiLs7odEIKC8dgD', 'Trade conversion sent to AW-991707394/KfedCPiLs7odEIKC8dgD');

  // Test 7: Phone Click Global Listener
  mockGtagCalls.length = 0;
  assert(typeof clickHandler === 'function', 'Document click listener was registered');
  const mockAnchor = {
    getAttribute: (attr) => (attr === 'href' ? 'tel:(07) 3102 1801' : null)
  };
  const mockClickEvent = {
    target: {
      closest: (sel) => (sel === 'a[href^="tel:"]' ? mockAnchor : null)
    }
  };
  clickHandler(mockClickEvent);
  
  const phoneConversionCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'conversion');
  assert(!!phoneConversionCall, 'Phone click fired conversion event');
  assert(phoneConversionCall[2].send_to === 'AW-991707394/TvEuCPuLs7odEIKC8dgD', 'Phone conversion send_to is AW-991707394/TvEuCPuLs7odEIKC8dgD');

  const phoneClickCall = mockGtagCalls.find(call => call[0] === 'event' && call[1] === 'phone_click');
  assert(!!phoneClickCall, "Phone click fired 'phone_click' event");

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
