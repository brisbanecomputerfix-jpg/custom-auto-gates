/**
 * Dynamic SEO & Canonical Tag Manager for Custom Auto Gates & Fencing
 * Ensures Googlebot & search engines receive correct canonical URLs,
 * unique page titles, localized descriptions, and OpenGraph metadata
 * without duplicate content or canonicalization penalties.
 */

const BASE_URL = 'https://customautogates.com.au';

export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Automatic & Electric Gates Brisbane | Custom Driveway Gates',
    description: "Custom Auto Gates & Fencing — South East Queensland's leading manufacturer of custom automatic electric driveway gates, sliding gates, swing gates & solar gates. Buy factory direct in Yamanto: (07) 3102 1801.",
    canonicalPath: '/',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  about: {
    title: 'About Our Team & Yamanto Gate Workshop | Custom Auto Gates QLD',
    description: 'Learn about Custom Auto Gates & Fencing. Over 20 years fabricating Australian-made automatic gates, TIG-welded aluminium, and QBCC licensed (#15579753) automation in Yamanto, QLD.',
    canonicalPath: '/about-us',
    geoPlacename: 'Yamanto, Ipswich, Queensland'
  },
  service: {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor & Opener Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonicalPath: '/service',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  contact: {
    title: 'Contact Us & Showroom Workshop | Custom Auto Gates Yamanto Brisbane',
    description: 'Contact Custom Auto Gates & Fencing at Shed 2, 43-45 Belar St, Yamanto QLD 4305. Book a free on-site design consult or call (07) 3102 1801 for factory direct advice.',
    canonicalPath: '/contact-us',
    geoPlacename: 'Shed 2, 43-45 Belar St, Yamanto, QLD 4305'
  },
  testimonials: {
    title: 'Customer Reviews & Gate Projects (4.9★) | Custom Auto Gates QLD',
    description: 'Read 180+ verified 5-star customer reviews and detailed engineering case studies from homeowners across Brisbane, Ipswich, Logan, and Gold Coast.',
    canonicalPath: '/testimonials',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'council-guide': {
    title: 'Queensland Council Fence & Pool Safety Gate Guide (AS1926.1)',
    description: 'Official guide to Brisbane City Council (BCC), Ipswich City Council (ICC), and Gold Coast fence height rules, 50% slat permeability, and AS1926.1 pool gate laws.',
    canonicalPath: '/council-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  trade: {
    title: 'Trade & Builders Gate Portal | Wholesale Gate Fabrication SEQ',
    description: 'Wholesale custom automated gates and aluminium slat fencing for South East Queensland builders, fencing contractors, and developers. Fast 7–10 day lead times, CAD specs, 30-day accounts.',
    canonicalPath: '/trade',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'suburbs-brisbane': {
    title: 'Custom Automatic Gates Brisbane | Factory Direct Sliding & Swing Gates',
    description: 'Custom designed and fabricated automatic gates across Brisbane Northside, Southside, and Western suburbs. Free on-site visits in Ascot, New Farm, Indooroopilly, and Pullenvale.',
    canonicalPath: '/gates-brisbane',
    geoPlacename: 'Brisbane, Queensland, AU'
  },
  'suburbs-ipswich': {
    title: 'Automatic Gates Ipswich & Yamanto | Factory Direct from Belar St Workshop',
    description: 'Buy factory direct from our Yamanto workshop facility! Eliminating middleman markups for Ipswich, Springfield Lakes, Brookwater, Brassall, and Karalee property owners.',
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
    title: 'Custom Automatic Gates Gold Coast | Marine Grade Aluminium Automation',
    description: '100% corrosion-resistant marine grade aluminium automatic gates for Gold Coast, Hope Island, Sanctuary Cove, Coomera, Southport, and Hinterland properties.',
    canonicalPath: '/gates-gold-coast',
    geoPlacename: 'Gold Coast, Coomera, Southport, Queensland, AU'
  },
  'privacy-policy': {
    title: 'Privacy Policy | Custom Auto Gates & Fencing Brisbane & Ipswich',
    description: 'Official Privacy Policy for Custom Auto Gates Pty Ltd. Learn how we collect, protect, and manage your personal and property data in strict compliance with the Australian Privacy Principles (Privacy Act 1988).',
    canonicalPath: '/privacy-policy',
    geoPlacename: 'Yamanto, Brisbane, Ipswich, Queensland'
  },
  'automatic-sliding-gates': {
    title: 'Automatic Sliding Gates Brisbane | Factory Direct Sliding Driveway Gates',
    description: 'Custom automatic sliding gates Brisbane. Premium aluminium ground track & cantilever trackless systems. High-speed smart motors with 10-year structural warranty. Free on-site visit: (07) 3102 1801.',
    canonicalPath: '/automatic-sliding-gates',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'swing-gates': {
    title: 'Automatic Swing Gates Brisbane | Custom Double Swing & Bi-Fold Electric Gates',
    description: 'Automatic swing gates Brisbane & Gold Coast. Single leaf, double swing & bi-fold folding gates. 10-Year Factory Structural Warranty. Free on-site measure: (07) 3102 1801.',
    canonicalPath: '/swing-gates',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'solar-gates': {
    title: 'Solar Automatic Gates Brisbane | 100% Off-Grid Acreage Kits QLD',
    description: 'Off-grid solar automatic gates Brisbane & Ipswich. Heavy-duty 24V solar kits with 5-7 days storm battery backup. Zero mains power trenching costs. Free quote: (07) 3102 1801.',
    canonicalPath: '/solar-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'driveway-gates': {
    title: 'Automatic Driveway Gates Brisbane | Custom Electric Driveway Gates',
    description: 'Custom automatic driveway gates Brisbane. Custom aluminium electric sliding & swing driveway gates. Centurion & Nice smart motors, 10-year warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/driveway-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  'commercial-gates': {
    title: 'Commercial Gates Brisbane & Ipswich | Industrial Security Cantilever Gates',
    description: 'Commercial automatic gates Brisbane, Ipswich & Logan. Heavy-duty cantilever sliding gates, high-cycle boom gates & strata access control. QBCC licensed: (07) 3102 1801.',
    canonicalPath: '/commercial-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'pricing-guide': {
    title: 'Automatic Gate Costs & Pricing Guide Brisbane [2026] | Custom Auto Gates',
    description: 'Detailed automatic gate costs in Brisbane & SEQ. See price ranges for sliding, swing, solar gates & motors ($3,800–$12,500+). Buy factory direct in Yamanto: (07) 3102 1801.',
    canonicalPath: '/pricing-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
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
    routeSchema = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonicalUrl}#repair-service`,
        "name": "Electric & Automatic Gate Repairs Brisbane",
        "serviceType": "Emergency Gate Motor Repair and Maintenance",
        "provider": {
          "@type": "HomeAndConstructionBusiness",
          "name": "Custom Auto Gates & Fencing",
          "url": "https://customautogates.com.au/",
          "telephone": "+61731021801",
          "priceRange": "$$"
        },
        "areaServed": ["Brisbane", "Ipswich", "Logan", "Gold Coast"],
        "description": config.description,
        "url": canonicalUrl,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gate Repair & Diagnostics Call-Out Schedule",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Residential Gate Repair Call-Out",
              "description": "Technician travel + 30 minutes on-site diagnostics across Greater Brisbane, Ipswich & Logan",
              "price": "250.00",
              "priceCurrency": "AUD"
            },
            {
              "@type": "Offer",
              "name": "Commercial Gate Repair Call-Out",
              "description": "Commercial cantilever, boom gate & strata automation diagnostic call-out",
              "price": "350.00",
              "priceCurrency": "AUD"
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is my electric gate not opening or responding to remote controls?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most common causes are blocked or misaligned infrared safety beam photocells, blown 12V/24V fuses, insect nesting on the control board, flat remote keyfob batteries, or power surges tripped at the mains isolator switch."
            }
          },
          {
            "@type": "Question",
            "name": "How much does an automatic gate repair call-out cost in Brisbane?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard residential automatic gate repair call-outs are $250.00 AUD (including GST), which covers technician travel across Greater Brisbane, Ipswich, and Logan plus the first 30 minutes of on-site diagnostic testing."
            }
          },
          {
            "@type": "Question",
            "name": "What automatic gate motor brands do you repair and service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We repair and replace all leading gate automation brands including Centurion (D5/D10/D20 Smart), Nice (Robus, Run, Toona), BFT, FAAC, CAME, ATA, Merlin, and Roger Technology."
            }
          },
          {
            "@type": "Question",
            "name": "Can you replace an old broken gate motor with a smartphone-controlled motor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We frequently replace failing legacy motors with ultra-fast smart motors featuring iOS and Android smartphone app control, wireless keypad access, and Apple CarPlay integration."
            }
          }
        ]
      }
    ];
  } else if (
    lookupKey === 'driveway-gates' || 
    lookupKey === 'automatic-sliding-gates' || 
    lookupKey === 'swing-gates' || 
    lookupKey === 'solar-gates' ||
    lookupKey === 'commercial-gates'
  ) {
    const productName = lookupKey === 'driveway-gates' ? 'Custom Automatic Driveway Gates Brisbane'
      : lookupKey === 'automatic-sliding-gates' ? 'Custom Automatic Sliding Driveway Gates'
      : lookupKey === 'swing-gates' ? 'Custom Automatic Double Swing Entrance Gates'
      : lookupKey === 'solar-gates' ? 'Off-Grid Solar Powered Automatic Driveway Gates'
      : 'Heavy Duty Commercial & Industrial Cantilever Security Gates';

    const startingPrice = lookupKey === 'driveway-gates' ? '3800.00'
      : lookupKey === 'automatic-sliding-gates' ? '3850.00'
      : lookupKey === 'swing-gates' ? '4500.00'
      : lookupKey === 'solar-gates' ? '4650.00'
      : '6500.00';

    routeSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      "name": productName,
      "description": config.description,
      "brand": {
        "@type": "Brand",
        "name": "Custom Auto Gates"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "184",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "AUD",
        "price": startingPrice,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "HomeAndConstructionBusiness",
          "name": "Custom Auto Gates & Fencing",
          "url": "https://customautogates.com.au/",
          "telephone": "+61731021801"
        }
      }
    };
  } else if (lookupKey === 'pricing-guide') {
    routeSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#pricing-guide`,
      "name": config.title,
      "description": config.description,
      "url": canonicalUrl,
      "publisher": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Custom Auto Gates & Fencing",
        "url": "https://customautogates.com.au/",
        "telephone": "+61731021801"
      }
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

