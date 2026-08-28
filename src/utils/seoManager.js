/**
 * Dynamic SEO & Canonical Tag Manager for Custom Auto Gates & Fencing
 * Ensures Googlebot & search engines receive correct canonical URLs,
 * unique page titles, localized descriptions, and OpenGraph metadata
 * without duplicate content or canonicalization penalties.
 */

const BASE_URL = 'https://customautogates.com.au';

export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Custom Auto Gates & Fencing | Buy Factory Direct Brisbane & Ipswich QLD',
    description: "Custom Auto Gates & Fencing — South East Queensland's premier manufacturer of custom automatic sliding gates, swing gates, solar gates, and aluminium slat fencing. Buy factory direct from our Yamanto workshop. Call (07) 3102 1801.",
    canonicalPath: '/',
    geoPlacename: 'Yamanto, Brisbane, Ipswich, Queensland'
  },
  about: {
    title: 'About Our Team & Yamanto Workshop | Custom Auto Gates & Fencing',
    description: 'Learn about Custom Auto Gates & Fencing. Over 20 years fabricating Australian-made automatic gates, TIG-welded aluminium, and QBCC licensed (#15579753) automation in Yamanto.',
    canonicalPath: '/about-us',
    geoPlacename: 'Yamanto, Ipswich, Queensland'
  },
  service: {
    title: 'Gate Service, Repairs & Warranty | Custom Auto Gates Brisbane & Ipswich',
    description: 'Professional gate motor repairs, scheduled maintenance, and warranty support across South East Queensland. Centurion, BFT, Centsys, and FAAC specialists. Transparent pricing.',
    canonicalPath: '/service',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  contact: {
    title: 'Contact Us & Factory Showroom | Custom Auto Gates Yamanto QLD',
    description: 'Contact Custom Auto Gates & Fencing at 43 Belar St, Yamanto QLD 4305. Book a free on-site laser measure or call (07) 3102 1801 for factory direct advice.',
    canonicalPath: '/contact-us',
    geoPlacename: '43 Belar St, Yamanto, QLD 4305'
  },
  testimonials: {
    title: 'Customer Reviews & Case Studies (4.9★) | Custom Auto Gates QLD',
    description: 'Read 180+ verified 5-star customer reviews and detailed engineering case studies from homeowners across Brisbane, Ipswich, Logan, and Gold Coast.',
    canonicalPath: '/testimonials',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'council-guide': {
    title: 'Queensland Council Planning & Pool Safety Gate Guide (AS1926.1)',
    description: 'Official guide to Brisbane City Council (BCC), Ipswich City Council (ICC), and Gold Coast fence height rules, 50% slat permeability, and AS1926.1 pool gate laws.',
    canonicalPath: '/council-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  trade: {
    title: 'Trade & Builders Portal | Wholesale Gate Fabrication & Lead Times SEQ',
    description: 'Wholesale custom automated gates and aluminium slat fencing for South East Queensland builders, fencing contractors, and developers. Fast 7–10 day lead times, CAD specs, 30-day accounts.',
    canonicalPath: '/trade',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'suburbs-brisbane': {
    title: 'Custom Automatic Gates Brisbane | Factory Direct Sliding & Swing Gates',
    description: 'Custom designed and fabricated automatic gates across Brisbane Northside, Southside, and Western suburbs. Free on-site laser measures in Ascot, New Farm, Indooroopilly, and Pullenvale.',
    canonicalPath: '/gates-brisbane',
    geoPlacename: 'Brisbane, Queensland, AU'
  },
  'suburbs-ipswich': {
    title: 'Automatic Gates Ipswich & Yamanto | Factory Direct from 43 Belar St',
    description: 'Buy direct from our Yamanto workshop facility! Eliminating middleman markups for Ipswich, Springfield Lakes, Brookwater, Brassall, and Karalee property owners.',
    canonicalPath: '/gates-ipswich',
    geoPlacename: 'Yamanto, Ipswich, Springfield, Queensland, AU'
  },
  'suburbs-logan': {
    title: 'Automatic Gates & Security Fencing Logan & Redland Bay QLD',
    description: 'Custom commercial security cantilever gates, residential sliding gates, and off-grid solar acreage gates across Logan, Berrinba, Springwood, Greenbank, and Cleveland.',
    canonicalPath: '/gates-logan',
    geoPlacename: 'Logan City, Redland Bay, Queensland, AU'
  },
  'suburbs-goldcoast': {
    title: 'Custom Automatic Gates Gold Coast | Coastal Marine Grade Aluminium',
    description: '100% corrosion-resistant marine grade aluminium automatic gates for Gold Coast, Hope Island, Sanctuary Cove, Coomera, Southport, and Hinterland properties.',
    canonicalPath: '/gates-gold-coast',
    geoPlacename: 'Gold Coast, Coomera, Southport, Queensland, AU'
  },
  'privacy-policy': {
    title: 'Privacy Policy | Custom Auto Gates & Fencing Brisbane & Ipswich',
    description: 'Official Privacy Policy for Custom Auto Gates Pty Ltd. Learn how we collect, protect, and manage your personal and property data in strict compliance with the Australian Privacy Principles (Privacy Act 1988).',
    canonicalPath: '/privacy-policy',
    geoPlacename: 'Yamanto, Brisbane, Ipswich, Queensland'
  }
};

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
  const canonicalUrl = `${BASE_URL}${config.canonicalPath}`;

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

  let routeSchema = null;

  if (lookupKey.startsWith('suburbs-')) {
    const regionName = lookupKey === 'suburbs-brisbane' ? 'Brisbane'
      : lookupKey === 'suburbs-ipswich' ? 'Ipswich & Greater Springfield'
      : lookupKey === 'suburbs-logan' ? 'Logan City & Redlands'
      : 'Gold Coast';

    routeSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      "name": `Custom Automatic Gates ${regionName}`,
      "serviceType": "Automatic Gate Design, Fabrication & Installation",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Custom Auto Gates & Fencing",
        "url": "https://customautogates.com.au/",
        "telephone": "+61731021801",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shed 2, 43-45 Belar Street",
          "addressLocality": "Yamanto",
          "addressRegion": "QLD",
          "postalCode": "4305",
          "addressCountry": "AU"
        }
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": regionName
      },
      "description": config.description,
      "url": canonicalUrl
    };
  } else if (lookupKey === 'service') {
    routeSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl}#repair-service`,
      "name": "Gate Motor Repairs & Scheduled Servicing South East Queensland",
      "serviceType": "Emergency Gate Motor Repair and Maintenance",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Custom Auto Gates & Fencing",
        "url": "https://customautogates.com.au/",
        "telephone": "+61731021801"
      },
      "areaServed": ["Brisbane", "Ipswich", "Logan", "Gold Coast"],
      "description": config.description,
      "url": canonicalUrl
    };
  }

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

