/**
 * SEO Metadata & Structured Data Generator for Custom Auto Gates & Fencing
 * Self-contained in server/ to guarantee availability in production Docker containers.
 */
import { RESIDENTIAL_SUBURBS_DATA } from '../src/data/residentialSuburbsData.js';

export const BASE_URL = 'https://customautogates.com.au';

export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Automatic & Electric Gates Brisbane | Custom Driveway Gates',
    description: "Buy factory direct & save $1,200+! Custom automatic electric driveway, sliding & swing gates in Yamanto. 10-Yr warranty | QBCC #15579753. Free quote: (07) 3102 1801.",
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
    description: 'Fast electric gate repairs across Brisbane, Ipswich & Logan. Specialist motor replacements (Centurion, Nice, BFT) & emergency service | QBCC #15579753: (07) 3102 1801.',
    canonicalPath: '/service',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  contact: {
    title: 'Contact Electric Gate Installers Brisbane & Ipswich | Free Measure',
    description: 'Book a free on-site measure with licensed electric gate installers in Brisbane & Ipswich. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
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
  'suburbs-brisbane': {
    title: 'Automatic Gates Brisbane | Licensed Electric Gate Installers Near Me',
    description: 'Looking for electric gate installers near you in Brisbane? Buy factory direct & save $1,200+ | QBCC #15579753 licensed installers. Free on-site measure: (07) 3102 1801.',
    canonicalPath: '/gates-brisbane',
    geoPlacename: 'Brisbane, Queensland, AU'
  },
  'suburbs-ipswich': {
    title: 'Automatic Gates Ipswich | Factory Direct Electric Driveway Gates',
    description: "Buy factory direct from our Yamanto workshop & save $1,200+! Custom sliding, swing & solar gates for Ipswich & Springfield | QBCC #15579753. Call (07) 3102 1801.",
    canonicalPath: '/gates-ipswich',
    geoPlacename: 'Yamanto, Ipswich, Springfield, Queensland, AU'
  },
  'suburbs-logan': {
    title: 'Automatic Gates Logan | Commercial & Residential Gate Installers Near Me',
    description: 'Commercial cantilever security gates & residential sliding gates across Logan & Redlands. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/gates-logan',
    geoPlacename: 'Logan City, Redland Bay, Queensland, AU'
  },
  'suburbs-goldcoast': {
    title: 'Custom Automatic Gates Gold Coast | Marine Grade Aluminium Automation',
    description: '100% corrosion-resistant marine grade aluminium automatic gates for Gold Coast & Hinterland. Buy factory direct & save $1,200+ | QBCC #15579753: (07) 3102 1801.',
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
    description: 'Custom automatic sliding gates Brisbane from $3,850. Heavy-duty track & cantilever systems. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/automatic-sliding-gates',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'swing-gates': {
    title: 'Automatic Swing Gates Brisbane | Custom Double Swing & Bi-Fold Electric Gates',
    description: 'Custom double swing & bi-fold automatic gates Brisbane. Buy factory direct & save $1,200+ | QBCC #15579753 | 10-Yr structural warranty. Free measure: (07) 3102 1801.',
    canonicalPath: '/swing-gates',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'solar-gates': {
    title: 'Solar Automatic Gates Brisbane | 100% Off-Grid Electric Acreage Gates',
    description: '100% off-grid solar automatic gates for Brisbane & Ipswich acreage. Zero trenching fees. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/solar-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'driveway-gates': {
    title: 'Driveway Gates Brisbane | Custom Automatic & Electric Gates [10-Yr Warranty]',
    description: 'Buy factory direct & save $1,200+ on custom electric driveway gates. Sliding, swing & solar gates | QBCC #15579753 | 10-Yr warranty. Free measure: (07) 3102 1801.',
    canonicalPath: '/driveway-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  'commercial-gates': {
    title: 'Commercial Gates Brisbane & Ipswich | Security Cantilever Gates',
    description: 'Heavy-duty commercial automatic cantilever gates, boom gates & access control. Buy factory direct & save $1,200+ | QBCC #15579753. Free quote: (07) 3102 1801.',
    canonicalPath: '/commercial-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'pricing-guide': {
    title: 'Automatic Gate Costs & Pricing Guide Brisbane [2026 Prices]',
    description: '2026 automatic gate price guide for Brisbane & SEQ ($3,800–$12,500+). Buy factory direct & save $1,200+ on sliding & swing gates. Call (07) 3102 1801.',
    canonicalPath: '/pricing-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'quote-confirmation': {
    title: 'Quote Request Received | Custom Auto Gates & Fencing Brisbane',
    description: 'Thank you for requesting a quote. Our Yamanto workshop team will contact you shortly to confirm your project specifications and free measure.',
    canonicalPath: '/quote-confirmation',
    geoPlacename: 'Yamanto, Brisbane, Ipswich, Queensland'
  },
  'fencing': {
    title: 'Architectural Fencing Brisbane | Aluminium Slat & Boundary Fences',
    description: 'Custom architectural aluminium fencing in Brisbane & SEQ. Horizontal slat fences, vertical battens, pool-safe fencing & pedestrian gates. Free quote: (07) 3102 1801.',
    canonicalPath: '/fencing',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  'suburb-res-carindale': {
    title: 'Gates and Fencing Carindale | Custom Automatic Gates & Slat Fencing',
    description: 'Custom residential gates and aluminium fencing in Carindale. Sliding gates, double swing gates, slat fencing & pool gates. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-carindale',
    geoPlacename: 'Carindale, Brisbane, Queensland, AU'
  },
  'suburb-res-camp-hill': {
    title: 'Gates and Fencing Camp Hill | Custom Automatic Gates & Character Fencing',
    description: 'Custom residential gates and architectural fencing in Camp Hill. Hamptons gates, vertical blade fencing, sliding gates & character fencing. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-camp-hill',
    geoPlacename: 'Camp Hill, Brisbane, Queensland, AU'
  },
  'suburb-res-rochedale': {
    title: 'Gates and Fencing Rochedale | Luxury Automatic Gates & Boundary Fences',
    description: 'Custom residential gates and architectural fencing in Rochedale. Modern sliding gates, estate boundary fences & pool gates. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-rochedale',
    geoPlacename: 'Rochedale, Brisbane, Queensland, AU'
  },
  'suburb-res-wishart': {
    title: 'Gates and Fencing Wishart | Family Home Automatic Gates & Fences',
    description: 'Custom residential gates and aluminium fencing in Wishart. Electric sliding gates, front fences & pet security fencing. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-wishart',
    geoPlacename: 'Wishart, Brisbane, Queensland, AU'
  },
  'suburb-res-mansfield': {
    title: 'Gates and Fencing Mansfield | Residential Driveway Gates & Slat Fences',
    description: 'Custom residential gates and aluminium fencing in Mansfield. Automatic driveway gates, slat fences & school catchment security. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-mansfield',
    geoPlacename: 'Mansfield, Brisbane, Queensland, AU'
  },
  'suburb-res-capalaba': {
    title: 'Gates and Fencing Capalaba | Residential & Acreage Automatic Gates',
    description: 'Custom residential gates and aluminium fencing in Capalaba. Electric sliding gates, acreage swing gates & slat fences. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-capalaba',
    geoPlacename: 'Capalaba, Redlands, Queensland, AU'
  },
  'suburb-res-gumdale': {
    title: 'Gates and Fencing Gumdale | Acreage Automatic Gates & Solar Systems',
    description: 'Custom acreage gates and aluminium fencing in Gumdale. Solar automatic gates, horse fencing & grand estate entrances. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-gumdale',
    geoPlacename: 'Gumdale, Brisbane, Queensland, AU'
  },
  'suburb-res-wavell-heights': {
    title: 'Gates and Fencing Wavell Heights | Sloping Driveway Gates & Modern Fencing',
    description: 'Custom residential gates and aluminium fencing in Wavell Heights. Sloping driveway sliding gates, slat fences & hill specialists. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-wavell-heights',
    geoPlacename: 'Wavell Heights, Brisbane, Queensland, AU'
  },
  'suburb-res-pullenvale': {
    title: 'Gates and Fencing Pullenvale | Luxury Acreage Automatic Gates & Fences',
    description: 'Custom luxury acreage gates and fencing in Pullenvale. Solar automatic gates, grand double swing gates & acreage fencing. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-pullenvale',
    geoPlacename: 'Pullenvale, Brisbane, Queensland, AU'
  }
};

/**
 * Returns structured JSON-LD Schema objects for specific landing pages.
 * Supports Service, Product, AggregateRating, Offer, Merchant Listings & FAQPage schemas.
 */
export function getRouteSchemaData(lookupKey, canonicalUrl, config) {
  // Common seller reference for all offers
  const sellerInfo = {
    "@type": "HomeAndConstructionBusiness",
    "name": "Custom Auto Gates & Fencing",
    "url": "https://customautogates.com.au/",
    "telephone": "+61731021801",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shed 2, 43-45 Belar Street",
      "addressLocality": "Yamanto",
      "addressRegion": "QLD",
      "postalCode": "4305",
      "addressCountry": "AU"
    }
  };

  // Google Merchant Listings compliant return & shipping policies
  const merchantReturnPolicy = {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "AU",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30,
    "returnMethod": "https://schema.org/ReturnInStore",
    "returnFees": "https://schema.org/FreeReturn"
  };

  const offerShippingDetails = {
    "@type": "OfferShippingDetails",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": "0.00",
      "currency": "AUD"
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "AU",
      "addressRegion": ["QLD"]
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 5,
        "maxValue": 10,
        "unitCode": "d"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 3,
        "unitCode": "d"
      }
    }
  };

  if (lookupKey.startsWith('suburbs-')) {
    const isBrisbane = lookupKey === 'suburbs-brisbane';
    const isIpswich = lookupKey === 'suburbs-ipswich';
    const isLogan = lookupKey === 'suburbs-logan';

    const regionName = isBrisbane ? 'Brisbane'
      : isIpswich ? 'Ipswich & Greater Springfield'
      : isLogan ? 'Logan City & Redlands'
      : 'Gold Coast';

    const geoPosition = isBrisbane ? { latitude: -27.4698, longitude: 153.0251 }
      : isIpswich ? { latitude: -27.6534, longitude: 152.7482 }
      : isLogan ? { latitude: -27.6393, longitude: 153.1094 }
      : { latitude: -28.0167, longitude: 153.4000 };

    const suburbsList = isBrisbane ? [
      "Ascot", "Hamilton", "New Farm", "Paddington", "Bulimba", "Hawthorne", 
      "Camp Hill", "Carindale", "Indooroopilly", "Kenmore", "Pullenvale", "Brookfield", "Aspley", "Sunnybank"
    ] : isIpswich ? [
      "Yamanto", "Ipswich Central", "Brookwater", "Springfield Lakes", "Augustine Heights", "Ripley", "Brassall", "Karalee"
    ] : isLogan ? [
      "Springwood", "Berrinba", "Greenbank", "Crestmead", "Cleveland", "Redland Bay", "Loganholme"
    ] : [
      "Surfers Paradise", "Southport", "Hope Island", "Sanctuary Cove", "Coomera", "Robina"
    ];

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
      "@id": `${canonicalUrl}#localbusiness`,
      "name": `Custom Automatic Gates ${regionName}`,
      "legalName": "Custom Auto Gates Pty Ltd",
      "url": canonicalUrl,
      "telephone": "+61731021801",
      "priceRange": "$$$",
      "currenciesAccepted": "AUD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, Stripe, EFTPOS",
      "license": "https://www.onlineservices.qbcc.qld.gov.au/ (QBCC License #15579753)",
      "geo": {
        "@type": "GeoCoordinates",
        ...geoPosition
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shed 2, 43-45 Belar Street",
        "addressLocality": "Yamanto",
        "addressRegion": "QLD",
        "postalCode": "4305",
        "addressCountry": "AU"
      },
      "areaServed": suburbsList.map(s => ({ "@type": "City", "name": s })),
      "description": config.description,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Automatic Gate Installation & Repairs ${regionName}`,
        "itemListElement": [
          {
            "@type": "Offer",
            "name": `Custom Automatic Sliding Gate Installation ${regionName}`,
            "price": "3850.00",
            "priceCurrency": "AUD"
          },
          {
            "@type": "Offer",
            "name": `Electric Double Swing Gate Installation ${regionName}`,
            "price": "4500.00",
            "priceCurrency": "AUD"
          },
          {
            "@type": "Offer",
            "name": `Off-Grid Solar Powered Gate Package ${regionName}`,
            "price": "4650.00",
            "priceCurrency": "AUD"
          },
          {
            "@type": "Offer",
            "name": `Emergency Gate Motor Repair & Diagnostics Call-Out`,
            "price": "250.00",
            "priceCurrency": "AUD"
          }
        ]
      }
    };

    let faqEntities = [];
    if (isBrisbane) {
      faqEntities = [
        {
          "@type": "Question",
          "name": "Who are the top licensed electric gate installers in Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Custom Auto Gates & Fencing is QBCC licensed (#15579753) with over 20 years experience fabricating and installing automatic electric sliding and swing gates across all Brisbane Northside, Southside, and Western suburbs. Workshop direct in Yamanto: (07) 3102 1801."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide free on-site measures and quotes across Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our technicians provide free on-site consultations, laser driveway slope measurements, and custom design options throughout Brisbane including New Farm, Ascot, Paddington, Indooroopilly, and Bulimba."
          }
        },
        {
          "@type": "Question",
          "name": "What council regulations apply to front driveway gates in Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under the Brisbane City Plan 2014, front boundary fences and automated gates can generally be built up to 1.2m solid, or up to 1.8m when maintaining at least 50% open slat permeability."
          }
        }
      ];
    } else if (isIpswich) {
      faqEntities = [
        {
          "@type": "Question",
          "name": "Where is your automatic gate factory located in Ipswich?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our direct fabrication workshop is located at Shed 2, 43-45 Belar Street, Yamanto QLD 4305. Property owners in Ipswich, Springfield, Brookwater, and Ripley can buy factory direct to eliminate middleman markups and save $1,200+."
          }
        },
        {
          "@type": "Question",
          "name": "Can you automate gates on steep acreage driveways in Ipswich?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialize in terrain-challenging acreage properties in Karalee, Pine Mountain, and Ripley, installing high-torque Centurion smart motors and 100% off-grid solar automatic gates with dual battery backups."
          }
        }
      ];
    } else if (isLogan) {
      faqEntities = [
        {
          "@type": "Question",
          "name": "Do you install commercial security cantilever gates in Logan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we engineer and install heavy-duty trackless cantilever sliding gates, commercial boom gates, and 4G smartphone access control for industrial estates and commercial properties across Logan, Berrinba, and Crestmead."
          }
        }
      ];
    }

    if (faqEntities.length > 0) {
      return [
        localBusinessSchema,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": faqEntities
        }
      ];
    }

    return localBusinessSchema;
  }

  if (lookupKey === 'service') {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonicalUrl}#repair-service`,
        "name": "Electric & Automatic Gate Repairs Brisbane",
        "serviceType": "Emergency Gate Motor Repair and Maintenance",
        "provider": sellerInfo,
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
  }

  if (
    lookupKey === 'driveway-gates' || 
    lookupKey === 'automatic-sliding-gates' || 
    lookupKey === 'swing-gates' || 
    lookupKey === 'solar-gates' ||
    lookupKey === 'commercial-gates' ||
    lookupKey === 'fencing'
  ) {
    const productName = lookupKey === 'driveway-gates' ? 'Custom Automatic Driveway Gates Brisbane'
      : lookupKey === 'automatic-sliding-gates' ? 'Custom Automatic Sliding Driveway Gates'
      : lookupKey === 'swing-gates' ? 'Custom Automatic Double Swing Entrance Gates'
      : lookupKey === 'solar-gates' ? 'Off-Grid Solar Powered Automatic Driveway Gates'
      : lookupKey === 'fencing' ? 'Custom Architectural Aluminium Fencing Brisbane'
      : 'Heavy Duty Commercial & Industrial Cantilever Security Gates';

    const startingPrice = lookupKey === 'driveway-gates' ? '3800.00'
      : lookupKey === 'automatic-sliding-gates' ? '3850.00'
      : lookupKey === 'swing-gates' ? '4500.00'
      : lookupKey === 'solar-gates' ? '4650.00'
      : lookupKey === 'fencing' ? '220.00'
      : '6500.00';

    const productSku = lookupKey === 'driveway-gates' ? 'CAG-DRIVEWAY-01'
      : lookupKey === 'automatic-sliding-gates' ? 'CAG-SLIDING-01'
      : lookupKey === 'swing-gates' ? 'CAG-SWING-01'
      : lookupKey === 'solar-gates' ? 'CAG-SOLAR-01'
      : lookupKey === 'fencing' ? 'CAG-FENCE-01'
      : 'CAG-COMM-01';

    const productImages = lookupKey === 'driveway-gates' ? [
        "https://customautogates.com.au/images/custom-automated-sliding-gate-brisbane.jpg",
        "https://customautogates.com.au/images/Sliding-Gates.jpg"
      ] : lookupKey === 'automatic-sliding-gates' ? [
        "https://customautogates.com.au/images/Sliding-Gates.jpg",
        "https://customautogates.com.au/images/hero-monument-sliding.webp"
      ] : lookupKey === 'swing-gates' ? [
        "https://customautogates.com.au/images/Swinging-Gates.jpg"
      ] : lookupKey === 'solar-gates' ? [
        "https://customautogates.com.au/images/solar-gate-installation-1.jpg"
      ] : lookupKey === 'fencing' ? [
        "https://customautogates.com.au/images/aluminum-fencing.jpg"
      ] : [
        "https://customautogates.com.au/images/Sliding-Gates.jpg"
      ];

    // Merchant Listings & Google Free Listings Compliant Product Schema
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      "name": productName,
      "description": config.description,
      "image": productImages,
      "sku": productSku,
      "mpn": productSku,
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
        "seller": sellerInfo,
        "hasMerchantReturnPolicy": merchantReturnPolicy,
        "shippingDetails": offerShippingDetails
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
    } else if (lookupKey === 'fencing') {
      faqEntities = [
        {
          "@type": "Question",
          "name": "How does aluminium slat fencing compare to timber or Colorbond in Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Marine-grade structural aluminium never rots, warps, or rusts, withstands gale winds with ease, and requires zero painting or termite maintenance compared to timber or Colorbond steel."
          }
        },
        {
          "@type": "Question",
          "name": "Does your front slat fencing comply with Brisbane City Council rules?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Brisbane City Council allows front boundary fencing up to 1.8 metres high when maintaining at least 50% open visual transparency. Our slats and gap options are 100% BCC compliant."
          }
        },
        {
          "@type": "Question",
          "name": "Can front boundary fencing match our automatic driveway gate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Because we fabricate both gates and fencing in our Yamanto workshop, we guarantee exact matching slat dimensions, gap spacing, and genuine Dulux powdercoating colour codes."
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

  // Dedicated Residential Suburb Landing Pages (Carindale, Camp Hill, Rochedale, Wishart, Mansfield, Capalaba, Gumdale, Wavell Heights, Pullenvale)
  if (lookupKey.startsWith('suburb-res-')) {
    const subKey = lookupKey.replace('suburb-res-', '');
    const subData = RESIDENTIAL_SUBURBS_DATA[subKey];
    if (subData) {
      // 1. Clean LocalBusiness Schema without self-serving aggregateRating (Compliant with Google Search Console review policies)
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
        "@id": `${canonicalUrl}#localbusiness`,
        "name": `Custom Auto Gates & Fencing ${subData.suburbName}`,
        "legalName": "Custom Auto Gates Pty Ltd",
        "url": canonicalUrl,
        "telephone": "+61731021801",
        "priceRange": "$$$",
        "currenciesAccepted": "AUD",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, Stripe, EFTPOS",
        "license": "https://www.onlineservices.qbcc.qld.gov.au/ (QBCC License #15579753)",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shed 2, 43-45 Belar Street",
          "addressLocality": "Yamanto",
          "addressRegion": "QLD",
          "postalCode": "4305",
          "addressCountry": "AU"
        },
        "areaServed": {
          "@type": "City",
          "name": subData.suburbName
        },
        "description": config.description
      };

      // 2. Product Schema eligible for rich review snippets under Google Search Console guidelines
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        "name": `Residential Automatic Gate & Aluminium Fencing Installation ${subData.suburbName}`,
        "description": config.description,
        "brand": {
          "@type": "Brand",
          "name": "Custom Auto Gates & Fencing"
        },
        "category": "Residential Automatic Gates & Fencing",
        "image": `https://customautogates.com.au${subData.heroImage}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "184"
        },
        "offers": {
          "@type": "Offer",
          "price": "3850.00",
          "priceCurrency": "AUD",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": canonicalUrl,
          "seller": sellerInfo,
          "hasMerchantReturnPolicy": merchantReturnPolicy,
          "shippingDetails": offerShippingDetails
        }
      };

      const faqEntities = (subData.faqs || []).map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }));

      const schemas = [localBusinessSchema, productSchema];
      if (faqEntities.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": faqEntities
        });
      }
      return schemas;
    }
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
        "publisher": sellerInfo
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
