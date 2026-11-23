/**
 * SEO Metadata & Structured Data Generator for Custom Auto Gates & Fencing
 * Self-contained in server/ to guarantee availability in production Docker containers.
 */
import { RESIDENTIAL_SUBURBS_DATA } from './residentialSuburbsData.js';

export const BASE_URL = 'https://customautogates.com.au';

export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Automatic & Electric Gates Brisbane | Custom Driveway Gates',
    description: "Buy factory direct & save $1,200+! Custom automatic electric driveway, sliding & swing gates. 10-Yr warranty | QBCC #15579753. Free quote: (07) 3102 1801.",
    canonicalPath: '',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  about: {
    title: 'About Custom Auto Gates | Yamanto Workshop & Team',
    description: 'Custom Auto Gates & Fencing: 20+ years fabricating Australian-made automatic gates, TIG aluminium & QBCC (#15579753) automation in Yamanto. Call (07) 3102 1801.',
    canonicalPath: '/about-us',
    geoPlacename: 'Yamanto, Ipswich, Queensland'
  },
  service: {
    title: 'Automatic Gate Repairs Brisbane | Motor Service & Fix',
    description: 'Fast electric gate repairs in Brisbane, Ipswich & Logan. Centurion, Nice & BFT motor replacements & emergency fix | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/service',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  contact: {
    title: 'Contact Custom Auto Gates Brisbane | Free On-Site Measure',
    description: 'Book a free on-site measure with electric gate installers in Brisbane & Ipswich. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/contact-us',
    geoPlacename: 'Shed 2, 43-45 Belar St, Yamanto, QLD 4305'
  },
  testimonials: {
    title: 'Customer Reviews & Gate Projects (4.9/5) | Custom Auto Gates',
    description: 'Read 180+ verified 5-star customer reviews and detailed engineering case studies from homeowners across Brisbane, Ipswich, Logan, and Gold Coast.',
    canonicalPath: '/testimonials',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'council-guide': {
    title: 'QLD Council Fence & Pool Gate Guide | Custom Auto Gates',
    description: 'Official guide to Brisbane (BCC), Ipswich (ICC) & Gold Coast fence height rules, 50% slat permeability & AS1926.1 pool gate laws. Call (07) 3102 1801.',
    canonicalPath: '/council-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'suburbs-brisbane': {
    title: 'Automatic Gates Brisbane | Licensed Electric Gate Builders',
    description: 'Electric gate installers near you in Brisbane. Buy factory direct & save $1,200+ | QBCC #15579753 licensed installers. Free on-site measure: (07) 3102 1801.',
    canonicalPath: '/gates-brisbane',
    geoPlacename: 'Brisbane, Queensland, AU'
  },
  'suburbs-ipswich': {
    title: 'Automatic Gates Ipswich | Factory Direct Electric Gates',
    description: "Buy factory direct in Yamanto & save $1,200+! Custom sliding, swing & solar gates for Ipswich & Springfield | QBCC #15579753. Call (07) 3102 1801.",
    canonicalPath: '/gates-ipswich',
    geoPlacename: 'Yamanto, Ipswich, Springfield, Queensland, AU'
  },
  'suburbs-logan': {
    title: 'Automatic Gates Logan | Commercial & Residential Gates',
    description: 'Cantilever security gates & residential sliding gates across Logan & Redlands. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/gates-logan',
    geoPlacename: 'Logan City, Redland Bay, Queensland, AU'
  },
  'suburbs-goldcoast': {
    title: 'Automatic Gates Gold Coast | Custom Marine Grade Gates',
    description: '100% corrosion-resistant marine grade aluminium automatic gates for Gold Coast & Hinterland. Buy factory direct & save $1,200+ | QBCC #15579753: (07) 3102 1801.',
    canonicalPath: '/gates-gold-coast',
    geoPlacename: 'Gold Coast, Coomera, Southport, Queensland, AU'
  },
  'privacy-policy': {
    title: 'Privacy Policy | Custom Auto Gates & Fencing QLD',
    description: 'Official Privacy Policy for Custom Auto Gates Pty Ltd. How we manage and protect personal data under the Australian Privacy Principles (Privacy Act 1988).',
    canonicalPath: '/privacy-policy',
    geoPlacename: 'Yamanto, Brisbane, Ipswich, Queensland'
  },
  'automatic-sliding-gates': {
    title: 'Automatic Sliding Gates Brisbane | Factory Direct Gates',
    description: 'Automatic sliding gates Brisbane from $3,850. Heavy-duty track & cantilever systems. Buy factory direct & save $1,200+ | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/automatic-sliding-gates',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'swing-gates': {
    title: 'Automatic Swing Gates Brisbane | Custom Double Swing Gates',
    description: 'Double swing & bi-fold automatic gates Brisbane. Buy factory direct & save $1,200+ | QBCC #15579753 | 10-Yr warranty. Free measure: (07) 3102 1801.',
    canonicalPath: '/swing-gates',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'solar-gates': {
    title: 'Solar Automatic Gates Brisbane | Off-Grid Electric Gates',
    description: '100% off-grid solar automatic gates for Brisbane & Ipswich acreage. Zero trenching fees. Factory direct savings | QBCC #15579753. Call (07) 3102 1801.',
    canonicalPath: '/solar-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'driveway-gates': {
    title: 'Driveway Gates Brisbane | Custom Automatic Electric Gates',
    description: 'Save $1,200+ factory direct on custom electric driveway gates. Sliding, swing & solar gates | QBCC #15579753 | 10-Yr warranty. Free measure: (07) 3102 1801.',
    canonicalPath: '/driveway-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  'commercial-gates': {
    title: 'Commercial Gates Brisbane & Ipswich | Cantilever Gates',
    description: 'Heavy-duty commercial automatic cantilever gates, boom gates & access control. Buy factory direct & save $1,200+ | QBCC #15579753. Free quote: (07) 3102 1801.',
    canonicalPath: '/commercial-gates',
    geoPlacename: 'Brisbane, Ipswich, Logan, Queensland'
  },
  'pricing-guide': {
    title: 'Automatic Gate Costs & Pricing Guide Brisbane | Custom Auto Gates',
    description: '2026 automatic gate price guide for Brisbane & SEQ ($3,800–$12,500+). Buy factory direct & save $1,200+ on sliding & swing gates. Call (07) 3102 1801.',
    canonicalPath: '/pricing-guide',
    geoPlacename: 'Brisbane, Ipswich, Gold Coast, Queensland'
  },
  'quote-confirmation': {
    title: 'Quote Request Received | Custom Auto Gates & Fencing',
    description: 'Thank you for requesting a quote. Our Yamanto workshop team will contact you shortly to confirm your project specifications and free measure.',
    canonicalPath: '/quote-confirmation',
    geoPlacename: 'Yamanto, Brisbane, Ipswich, Queensland'
  },
  'fencing': {
    title: 'Architectural Fencing Brisbane | Aluminium Slat Fences',
    description: 'Architectural aluminium fencing Brisbane & SEQ. Slat fences, vertical battens, pool fencing & pedestrian gates. Free measure & quote: (07) 3102 1801.',
    canonicalPath: '/fencing',
    geoPlacename: 'Brisbane, Ipswich, Logan, Gold Coast, Queensland'
  },
  'suburb-res-carindale': {
    title: 'Gates & Fencing Carindale | Custom Automatic Gates',
    description: 'Residential automatic gates & aluminium fencing in Carindale. Sliding & swing gates, slat fences. 10-Yr warranty. Free on-site quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-carindale',
    geoPlacename: 'Carindale, Brisbane, Queensland, AU'
  },
  'suburb-res-camp-hill': {
    title: 'Gates & Fencing Camp Hill | Custom Automatic Gates',
    description: 'Residential gates & architectural fencing in Camp Hill. Hamptons gates, vertical blades & sliding gates. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-camp-hill',
    geoPlacename: 'Camp Hill, Brisbane, Queensland, AU'
  },
  'suburb-res-rochedale': {
    title: 'Gates & Fencing Rochedale | Custom Automatic Gates',
    description: 'Residential gates & architectural fencing in Rochedale. Modern sliding gates, boundary fences & pool gates. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-rochedale',
    geoPlacename: 'Rochedale, Brisbane, Queensland, AU'
  },
  'suburb-res-wishart': {
    title: 'Gates & Fencing Wishart | Custom Automatic Gates',
    description: 'Residential gates & aluminium fencing in Wishart. Electric sliding gates, front fences & pet security. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-wishart',
    geoPlacename: 'Wishart, Brisbane, Queensland, AU'
  },
  'suburb-res-mansfield': {
    title: 'Gates & Fencing Mansfield | Custom Automatic Gates',
    description: 'Residential gates & aluminium fencing in Mansfield. Automatic driveway gates, slat fences & security. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-mansfield',
    geoPlacename: 'Mansfield, Brisbane, Queensland, AU'
  },
  'suburb-res-capalaba': {
    title: 'Gates & Fencing Capalaba | Custom Automatic Gates',
    description: 'Residential gates & aluminium fencing in Capalaba. Electric sliding gates, acreage swing gates & slat fences. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-capalaba',
    geoPlacename: 'Capalaba, Redlands, Queensland, AU'
  },
  'suburb-res-gumdale': {
    title: 'Gates & Fencing Gumdale | Custom Solar Acreage Gates',
    description: 'Acreage gates & aluminium fencing in Gumdale. Solar automatic gates, horse fencing & estate entrances. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-gumdale',
    geoPlacename: 'Gumdale, Brisbane, Queensland, AU'
  },
  'suburb-res-wavell-heights': {
    title: 'Gates & Fencing Wavell Heights | Automatic Gates',
    description: 'Residential gates & aluminium fencing in Wavell Heights. Sloping driveway sliding gates & slat fences. 10-Yr warranty. Free quote: (07) 3102 1801.',
    canonicalPath: '/gates-fencing-wavell-heights',
    geoPlacename: 'Wavell Heights, Brisbane, Queensland, AU'
  },
  'suburb-res-pullenvale': {
    title: 'Gates & Fencing Pullenvale | Custom Solar Gates',
    description: 'Luxury acreage gates & fencing in Pullenvale. Solar automatic gates, grand double swing gates & fences. 10-Yr warranty. Free quote: (07) 3102 1801.',
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
      "image": `${BASE_URL}/images/Sliding-Gates.jpg`,
      "telephone": "+61731021801",
      "priceRange": "$$$",
      "currenciesAccepted": "AUD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, Stripe, EFTPOS",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "QBCC Licence #15579753",
        "credentialCategory": "Trade Contractor Licence",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Queensland Building and Construction Commission",
          "url": "https://www.qbcc.qld.gov.au/"
        }
      },
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
        "image": `https://customautogates.com.au${subData.heroImage}`,
        "telephone": "+61731021801",
        "priceRange": "$$$",
        "currenciesAccepted": "AUD",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, Stripe, EFTPOS",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "name": "QBCC Licence #15579753",
          "credentialCategory": "Trade Contractor Licence",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Queensland Building and Construction Commission",
            "url": "https://www.qbcc.qld.gov.au/"
          }
        },
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

/**
 * Master Unified JSON-LD Schema Generator
 * Assembles a single, compliant, Google Rich Results & Ahrefs AI Search verified @graph schema.
 * Contains standalone Organization, LocalBusiness, WebSite, and page-specific entities.
 */
export function generateUnifiedSchema(lookupKey, canonicalUrl, config) {
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Custom Auto Gates & Fencing",
    "legalName": "Custom Auto Gates Pty Ltd",
    "url": `${BASE_URL}/`,
    "logo": {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      "url": `${BASE_URL}/images/CAG-and-Blondies-xero-logo.jpg`,
      "caption": "Custom Auto Gates & Fencing"
    },
    "telephone": "+61731021801",
    "email": "office@customautogates.com.au",
    "taxID": "ABN 88 642 795 819",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61593825539148",
      "https://www.instagram.com/customautogates/",
      "https://au.linkedin.com/company/customautogates"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+61-7-3102-1801",
        "contactType": "customer service",
        "areaServed": "AU",
        "availableLanguage": "English"
      }
    ]
  };

  const localBusinessSchema = {
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${BASE_URL}/#business`,
    "name": "Custom Auto Gates & Fencing",
    "legalName": "Custom Auto Gates Pty Ltd",
    "parentOrganization": { "@id": `${BASE_URL}/#organization` },
    "url": `${BASE_URL}/`,
    "logo": `${BASE_URL}/images/CAG-and-Blondies-xero-logo.jpg`,
    "image": `${BASE_URL}/images/Sliding-Gates.jpg`,
    "telephone": "+61731021801",
    "email": "office@customautogates.com.au",
    "priceRange": "$$$",
    "currenciesAccepted": "AUD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, Stripe, EFTPOS",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "QBCC Licence #15579753",
      "credentialCategory": "Trade Contractor Licence",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Queensland Building and Construction Commission",
        "url": "https://www.qbcc.qld.gov.au/"
      }
    },
    "hasMap": "https://maps.google.com/?cid=1264879283749281729",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shed 2, 43-45 Belar Street",
      "addressLocality": "Yamanto",
      "addressRegion": "QLD",
      "postalCode": "4305",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.6534,
      "longitude": 152.7482
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Brisbane" },
      { "@type": "City", "name": "Ipswich" },
      { "@type": "City", "name": "Logan City" },
      { "@type": "City", "name": "Gold Coast" }
    ]
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": `${BASE_URL}/`,
    "name": "Custom Auto Gates & Fencing",
    "publisher": { "@id": `${BASE_URL}/#organization` }
  };

  const routeData = getRouteSchemaData(lookupKey, canonicalUrl, config);
  const routeEntities = [];
  
  if (routeData) {
    const rawEntities = Array.isArray(routeData) ? routeData : [routeData];
    for (const ent of rawEntities) {
      if (!ent) continue;
      const cleanEnt = { ...ent };
      delete cleanEnt['@context'];
      routeEntities.push(cleanEnt);
    }
  }

  // Home route default services & FAQs
  if (lookupKey === 'home') {
    routeEntities.push({
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why should I buy factory direct from Custom Auto Gates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When you buy factory direct from our Yamanto workshop, you eliminate middleman reseller markups, saving $1,200 to $2,500 while getting a 10-year structural warranty directly from the fabricators."
          }
        },
        {
          "@type": "Question",
          "name": "What areas in South East Queensland do you service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We fabricate and install automatic sliding, swing, and solar gates across all Brisbane suburbs, Ipswich, Greater Springfield, Logan, and Gold Coast."
          }
        },
        {
          "@type": "Question",
          "name": "Will an automatic gate work on a sloping driveway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We specialize in challenging terrain. For driveways with sideways slopes, we design custom raked sliding gates or cantilever (trackless) systems. For steep upward driveways, we offer outward-opening swing gates, bi-fold folding gates, or telescopic sliding panels."
          }
        }
      ]
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      ...routeEntities
    ]
  };
}
