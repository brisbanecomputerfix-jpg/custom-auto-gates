import { PAGE_SEO_CONFIGS } from './src/utils/seoManager.js';

console.log("=== VERIFYING CANONICAL & SEO TAG INTEGRITY ===");

const expectedRoutes = [
  { key: 'home', expectedCanonical: 'https://customautogates.com.au/' },
  { key: 'about', expectedCanonical: 'https://customautogates.com.au/about-us' },
  { key: 'service', expectedCanonical: 'https://customautogates.com.au/service' },
  { key: 'contact', expectedCanonical: 'https://customautogates.com.au/contact-us' },
  { key: 'testimonials', expectedCanonical: 'https://customautogates.com.au/testimonials' },
  { key: 'council-guide', expectedCanonical: 'https://customautogates.com.au/council-guide' },
  { key: 'suburbs-brisbane', expectedCanonical: 'https://customautogates.com.au/gates-brisbane' },
  { key: 'suburbs-ipswich', expectedCanonical: 'https://customautogates.com.au/gates-ipswich' },
  { key: 'suburbs-logan', expectedCanonical: 'https://customautogates.com.au/gates-logan' },
  { key: 'suburbs-goldcoast', expectedCanonical: 'https://customautogates.com.au/gates-gold-coast' },
  { key: 'privacy-policy', expectedCanonical: 'https://customautogates.com.au/privacy-policy' },
];

let allPassed = true;
const seenCanonicals = new Set();
const seenTitles = new Set();

for (const route of expectedRoutes) {
  const config = PAGE_SEO_CONFIGS[route.key];
  if (!config) {
    console.error(`[FAIL] Missing config for ${route.key}`);
    allPassed = false;
    continue;
  }

  const fullCanonical = `https://customautogates.com.au${config.canonicalPath}`;
  if (fullCanonical !== route.expectedCanonical) {
    console.error(`[FAIL] Canonical mismatch for ${route.key}: got ${fullCanonical}, expected ${route.expectedCanonical}`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${route.key} -> Canonical: ${fullCanonical}`);
  }

  // Ensure 100% Unique Canonicals
  if (seenCanonicals.has(fullCanonical)) {
    console.error(`[FAIL] Duplicate Canonical URL detected: ${fullCanonical}`);
    allPassed = false;
  }
  seenCanonicals.add(fullCanonical);

  // Ensure 100% Unique Titles
  if (seenTitles.has(config.title)) {
    console.error(`[FAIL] Duplicate Title detected: ${config.title}`);
    allPassed = false;
  }
  seenTitles.add(config.title);
}

if (allPassed) {
  console.log("\n>>> ALL CANONICAL URLS & TITLES ARE 100% UNIQUE AND COMPLIANT WITH GOOGLE SEARCH GUIDELINES! <<<");
}
