/**
 * Dynamic SEO & Canonical Tag Manager for Custom Auto Gates & Fencing
 * Ensures Googlebot & search engines receive correct canonical URLs,
 * unique page titles, localized descriptions, and OpenGraph metadata
 * without duplicate content or canonicalization penalties.
 */

import { BASE_URL, PAGE_SEO_CONFIGS, getRouteSchemaData } from '../../server/seoMetadata.js';

export { BASE_URL, PAGE_SEO_CONFIGS, getRouteSchemaData };

/**
 * Updates page head tags dynamically
 * @param {string} pageKey - Current page identifier ('home', 'about', 'service', 'contact', 'testimonials', 'council-guide', 'suburbs')
 * @param {string} [regionKey] - Suburb region key ('brisbane', 'ipswich', 'logan', 'goldcoast')
 */
export function updateSeoMetadata(pageKey, regionKey = 'brisbane') {
  let lookupKey = pageKey;
  if (pageKey === 'suburbs') {
    lookupKey = `suburbs-${regionKey}`;
  }

  const config = PAGE_SEO_CONFIGS[lookupKey] || PAGE_SEO_CONFIGS.home;
  const cleanPath = config.canonicalPath ? config.canonicalPath.replace(/\/$/, '') : '';
  const canonicalUrl = `${BASE_URL}${cleanPath}`;

  // 1. Update Title
  document.title = config.title;

  // 2. Update or Create Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 3. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', config.description);
  }

  // 4. Update OpenGraph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  // 5. Update Twitter Card Tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', config.title);

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', config.description);

  // 6. Update Geo Placename
  const geoPlace = document.querySelector('meta[name="geo.placename"]');
  if (geoPlace && config.geoPlacename) {
    geoPlace.setAttribute('content', config.geoPlacename);
  }

  // 7. Dynamic Route-Specific JSON-LD Schema
  updateDynamicRouteSchema(lookupKey, canonicalUrl, config);
}

/**
 * Injects or updates dynamic JSON-LD schema for specific landing pages
 */
function updateDynamicRouteSchema(lookupKey, canonicalUrl, config) {
  const schemaId = 'dynamic-route-schema';
  let scriptElem = document.getElementById(schemaId);

  const routeSchema = getRouteSchemaData(lookupKey, canonicalUrl, config);

  if (routeSchema) {
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = schemaId;
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }
    scriptElem.textContent = JSON.stringify(routeSchema, null, 2);
  } else if (scriptElem) {
    scriptElem.remove();
  }
}
