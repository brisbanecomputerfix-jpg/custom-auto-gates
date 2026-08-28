import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== VERIFYING WEBSITE REVISIONS & ASSET UPDATES ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Check Image Existence
const imagePath = path.join(rootDir, 'public', 'images', 'aluminum-fencing.jpg');
assert(fs.existsSync(imagePath), 'aluminum-fencing.jpg exists in public/images/');
if (fs.existsSync(imagePath)) {
  const stats = fs.statSync(imagePath);
  assert(stats.size > 10000, `aluminum-fencing.jpg file size is valid (${stats.size} bytes)`);
}

// 2. Check Navbar Hours
const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf8');
assert(navbarContent.includes('Mon-Fri: 9:00 AM – 4:00 PM'), 'Navbar.jsx header bar displays Mon-Fri: 9:00 AM – 4:00 PM');
assert(!navbarContent.includes('7:00 AM - 5:00 PM'), 'Navbar.jsx does NOT contain old 7:00 AM - 5:00 PM');

// 3. Check ContactUs Hours
const contactPath = path.join(rootDir, 'src', 'components', 'ContactUs.jsx');
const contactContent = fs.readFileSync(contactPath, 'utf8');
assert(contactContent.includes('9:00 AM – 4:00 PM'), 'ContactUs.jsx displays 9:00 AM – 4:00 PM');
assert(!contactContent.includes('7:00 AM – 5:00 PM'), 'ContactUs.jsx does NOT contain old 7:00 AM – 5:00 PM');

// 4. Check QuickPayModal Call-Out Fees & Dynamic Total
const quickPayPath = path.join(rootDir, 'src', 'components', 'QuickPayModal.jsx');
const quickPayContent = fs.readFileSync(quickPayPath, 'utf8');
assert(quickPayContent.includes('residential-callout'), 'QuickPayModal.jsx defines residential-callout');
assert(quickPayContent.includes('Residential Call-Out Fee ($250.00)'), 'QuickPayModal.jsx defines Residential Call-Out Fee ($250.00)');
assert(quickPayContent.includes('commercial-callout'), 'QuickPayModal.jsx defines commercial-callout');
assert(quickPayContent.includes('Commercial Call-Out Fee ($350.00)'), 'QuickPayModal.jsx defines Commercial Call-Out Fee ($350.00)');
assert(quickPayContent.includes('unitPrice: 250'), 'Residential unit price is $250.00');
assert(quickPayContent.includes('unitPrice: 350'), 'Commercial unit price is $350.00');
assert(quickPayContent.includes('Call-Out Quantity'), 'QuickPayModal.jsx has a Call-Out Quantity field');
assert(quickPayContent.includes('currentPurpose.unitPrice * formData.quantity') || quickPayContent.includes('currentPurpose.unitPrice * (Number(formData.quantity)'), 'QuickPayModal calculates unitPrice * quantity dynamically');
assert(quickPayContent.includes('Proceed to Stripe Checkout (${finalAmount.toFixed(2)} AUD)'), 'Stripe button dynamically updates to finalAmount AUD');
assert(!quickPayContent.includes('($189)'), 'QuickPayModal.jsx does NOT contain old $189 call-out fee');

// 5. Check CoreSolutionsSection Image & Alt Text
const solutionsPath = path.join(rootDir, 'src', 'components', 'CoreSolutionsSection.jsx');
const solutionsContent = fs.readFileSync(solutionsPath, 'utf8');
assert(solutionsContent.includes("image: '/images/aluminum-fencing.jpg'"), "CoreSolutionsSection.jsx references '/images/aluminum-fencing.jpg'");
assert(solutionsContent.includes('alt={item.alt || item.title}'), 'CoreSolutionsSection.jsx renders item.alt');

// 6. Check ProjectGallery & siteData.js
const siteDataPath = path.join(rootDir, 'src', 'data', 'siteData.js');
const siteDataContent = fs.readFileSync(siteDataPath, 'utf8');
assert(siteDataContent.includes('White Vertical Blade Aluminium Fencing & Gate'), 'siteData.js includes White Vertical Blade Aluminium Fencing in GALLERY_ITEMS');
assert(siteDataContent.includes('"category": "fencing"'), 'New project is classified under fencing category');
assert(siteDataContent.includes('hours: "Monday – Friday: 9:00 AM – 4:00 PM"'), 'siteData.js COMPANY_INFO.hours is Monday – Friday: 9:00 AM – 4:00 PM');

// 7. Check GateVisualizerQuote GST Inclusion & Pricing
const quotePath = path.join(rootDir, 'src', 'components', 'GateVisualizerQuote.jsx');
const quoteContent = fs.readFileSync(quotePath, 'utf8');
assert(quoteContent.includes('All Prices Include GST'), 'GateVisualizerQuote.jsx explicitly confirms All Prices Include GST');

console.log(`\n=== RESULTS: ${passCount} PASSED, ${failCount} FAILED ===\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('>>> ALL VERIFICATION TESTS PASSED SUCCESSFULLY! <<<');
}
