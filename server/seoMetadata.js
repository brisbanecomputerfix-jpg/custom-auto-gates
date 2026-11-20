/**
 * SEO Metadata & Structured Data Generator for Custom Auto Gates & Fencing
 * Self-contained in server/ to guarantee availability in production Docker containers.
 */

export const BASE_URL = 'https://customautogates.com.au';

export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Automatic & Electric Gates Brisbane | Custom Driveway Gates',
    description: "South East Queensland's top-rated automatic & electric driveway gates. Factory direct sliding, swing & solar gates in Yamanto. 10-Yr warranty: (07) 3102 1801.",
    canonicalPath: '',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  about: {
    title: 'About Our Team & Yamanto Gate Workshop | Custom Auto Gates QLD',
    description: 'Learn about Custom Auto Gates & Fencing. Over 20 years fabricating Australian-made automatic gates, TIG-welded aluminium, and QBCC licensed (#15579753) automation in Yamanto, QLD.',
    canonicalPath: '/about-us',
    geoPlacename: 'Yamanto, Ipswich, Queensland'
  },
  service: {
    title: 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service',
    description: 'Fast electric & automatic gate repairs Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT), remote reprogramming & track repairs. Book online: (07) 3102 1801.',
    canonicalPath: '/service',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  contact: {
    title: 'Contact Electric Gate Installers Brisbane & Ipswich | Free Measure',
    description: 'Book a free on-site measure with licensed electric gate installers in Brisbane & Ipswich. Factory direct workshop in Yamanto. Call (07) 3102 1801.',
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
    title: 'Automatic Gates Brisbane | Licensed Electric Gate Installers Near Me',
    description: 'Looking for electric gate installers near you in Brisbane? QBCC licensed (#15579753) automatic sliding & swing gates. Free on-site quotes: (07) 3102 1801.',
    canonicalPath: '/gates-brisbane',
    geoPlacename: 'Brisbane, Queensland, AU'
  },
  'suburbs-ipswich': {
    title: 'Automatic Gates Ipswich | Factory Direct Electric Driveway Gates',
    description: "Ipswich's local automatic gate manufacturer at Shed 2, Belar St, Yamanto. Custom sliding, swing & solar gates with zero middleman markup. Call (07) 3102 1801.",
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
    title: 'Automatic Sliding Gates Brisbane | Factory Direct [From $3,850]',
    description: 'Custom automatic sliding gates Brisbane. Heavy-duty track & cantilever systems, high-speed Centurion motors & 10-yr warranty. 180+ 5★ reviews. Call (07) 3102 1801.',
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
    title: 'Solar Automatic Gates Brisbane | 100% Off-Grid Electric Acreage Gates',
    description: '100% off-grid solar automatic gates for Brisbane & Ipswich acreage properties. Heavy-duty 24V kits with 5-7 day battery backup. Free quote: (07) 3102 1801.',
    canonicalPath: '/solar-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'driveway-gates': {
    title: 'Driveway Gates Brisbane | Custom Automatic & Electric Gates [10-Yr Warranty]',
    description: 'Custom electric & automatic driveway gates Brisbane. Factory direct sliding & swing gates, Centurion smart motors & 10-yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/driveway-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  'commercial-gates': {
    title: 'Commercial Gates Brisbane & Ipswich | Security Cantilever Gates',
    description: 'Heavy-duty commercial automatic gates Brisbane & Ipswich. Industrial cantilever gates, high-cycle boom gates & strata access. QBCC licensed: (07) 3102 1801.',
    canonicalPath: '/commercial-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'pricing-guide': {
    title: 'Automatic Gate Costs & Pricing Guide Brisbane [2026 Prices]',
    description: 'Complete 2026 automatic gate price guide for Brisbane & SEQ. Transparent costs for sliding, swing, solar gates & motors ($3,800–$12,500+). Call (07) 3102 1801.',
    canonicalPath: '/pricing-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  }
};

/**
 * Returns structured JSON-LD Schema objects for specific landing pages.
 * Supports Service, Product, AggregateRating, Offer, and FAQPage schemas.
 */
export function getRouteSchemaData(lookupKey, canonicalUrl, config) {
  if (lookupKey.startsWith('suburbs-')) {
    const regionName = lookupKey === 'suburbs-brisbane' ? 'Brisbane'
      : lookupKey === 'suburbs-ipswich' ? 'Ipswich & Greater Springfield'
      : lookupKey === 'suburbs-logan' ? 'Logan City & Redlands'
      : 'Gold Coast';

    return {
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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "184",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": config.description,
      "url": canonicalUrl
    };
  }

  if (lookupKey === 'service') {
    return [
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "184",
          "bestRating": "5",
          "worstRating": "1"
        },
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
  }

  if (
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

    const productSchema = {
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

    let faqEntities = [];
    if (lookupKey === 'driveway-gates') {
      faqEntities = [
        {
          "@type": "Question",
          "name": "How much do automatic driveway gates cost in Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Custom automatic driveway gates in Brisbane generally range from $3,800 for a single sliding aluminium gate to $12,500+ for large architectural double swing or telescopic systems with integrated smart access controls."
          }
        },
        {
          "@type": "Question",
          "name": "What type of driveway gate is best for sloping driveways?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For driveways with a sideways cross-fall slope, a custom-raked sliding gate or trackless cantilever gate is best. For driveways sloping steeply upward toward the house, an outward-opening swing gate, bi-fold folding gate, or telescopic sliding gate is recommended."
          }
        },
        {
          "@type": "Question",
          "name": "Are your automatic driveway gates covered by warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All custom gates fabricated at our Yamanto workshop include a 10-Year Factory Structural Warranty, plus up to 3 years manufacturer warranty on Centurion and Nice smart gate automation motors."
          }
        }
      ];
    } else if (lookupKey === 'automatic-sliding-gates') {
      faqEntities = [
        {
          "@type": "Question",
          "name": "What is the difference between a tracked and a cantilever sliding gate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A tracked sliding gate rolls on steel wheels along an inground track anchored into a concrete footing. A cantilever sliding gate hangs suspended above the driveway without any ground track, making it ideal for sloping, gravel, or high-debris driveways."
          }
        },
        {
          "@type": "Question",
          "name": "How much opening room is required for an automatic sliding gate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A sliding gate requires runback space along your fence line equal to the driveway opening width plus an extra 400mm–800mm for the motor overhang and counterbalance tail."
          }
        },
        {
          "@type": "Question",
          "name": "Will my electric sliding gate work during a power outage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our Centurion D5/D10 Smart sliding gate motors feature dual 12V battery backup systems providing 50–100 cycles during mains power blackouts, plus keyed manual release."
          }
        }
      ];
    } else if (lookupKey === 'solar-gates') {
      faqEntities = [
        {
          "@type": "Question",
          "name": "How reliable are solar automatic gates during rainy Queensland weather?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our solar automatic gate packages use oversized monocrystalline panels and heavy-duty 24V deep-cycle batteries engineered for 5–7 days of continuous operation in overcast or stormy conditions."
          }
        },
        {
          "@type": "Question",
          "name": "How much money does a solar gate save on installation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Installing a solar automatic gate typically saves homeowners between $2,000 and $6,000+ by completely eliminating the need for licensed electrical trenching, conduit runs, and mains power connections over long driveways."
          }
        }
      ];
    } else if (lookupKey === 'commercial-gates') {
      faqEntities = [
        {
          "@type": "Question",
          "name": "What safety sensors are installed on commercial security gates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We equip commercial gates with dual commercial-grade safety photocells, optical safety edges, flashing warning beacons, audible motion sirens, and ground induction vehicle loops compliant with AS/NZS safety standards."
          }
        },
        {
          "@type": "Question",
          "name": "What access control systems do you support for commercial gates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We integrate 4G GSM cell intercoms, IP video intercoms, RFID keyfobs/cards, digital access keypads, UHF long-range vehicle readers, and 24/7 automated timer schedules."
          }
        }
      ];
    }

    if (faqEntities.length > 0) {
      return [
        productSchema,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": faqEntities
        }
      ];
    }

    return productSchema;
  }

  if (lookupKey === 'pricing-guide') {
    return [
      {
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
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does an automatic gate cost in Brisbane in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 2026, automatic sliding gates in Brisbane typically start from $3,850 installed, automatic swing gates from $4,500 installed, and off-grid solar packages from $4,650 installed, depending on size, design, and site prep."
            }
          },
          {
            "@type": "Question",
            "name": "Why is buying factory direct cheaper than using a fencing contractor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Buying factory direct from our Yamanto workshop eliminates retail middleman markups, saving homeowners an average of $1,200 to $2,500 per project while providing direct access to the fabricators."
            }
          }
        ]
      }
    ];
  }

  return null;
}
