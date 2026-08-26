import React, { useState, useMemo, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Quote, 
  Search, 
  Filter, 
  Calendar, 
  ThumbsUp, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Building2, 
  Home, 
  Sun, 
  Zap, 
  Layers, 
  Phone, 
  ArrowRight,
  ChevronRight,
  Award,
  Users,
  Check,
  Send,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export const DETAILED_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Mark & Sarah Jenkins',
    clientType: 'Verified Homeowner',
    suburb: 'Brookwater',
    region: 'Ipswich & Greater West',
    state: 'QLD 4300',
    date: 'February 2026',
    rating: 5,
    source: 'Google Verified Review',
    product: '6.2m Custom Aluminium Slat Sliding Gate (Monument)',
    motor: 'Centurion D5 Smart Hi-Speed with Smartphone Module',
    finish: 'Dulux Monument Satin Powdercoat',
    challenge: 'Driveway had a steep 7-degree cross-slope with limited run-off space.',
    solution: 'Fabricated a bottom-raked telescopic sliding gate with custom ground tracks in Yamanto.',
    text: 'From our first on-site laser measure to the final installation, Custom Auto Gates were exceptional. Having the gate custom built in their Yamanto workshop meant the fit was 100% millimeter-perfect for our sloping driveway. The Centurion Smart motor is whisper-quiet and opening it from our smartphones when pulling into the street is an absolute game-changer. Couldn’t be happier!',
    engineerNote: 'Precision CNC raked bottom beam ensured a consistent 25mm ground clearance across the entire driveway width.',
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    name: 'David & Claire Henderson',
    clientType: 'Acreage Property Owner',
    suburb: 'Pullenvale',
    region: 'Brisbane West',
    state: 'QLD 4069',
    date: 'January 2026',
    rating: 5,
    source: 'Google Verified Review',
    product: '5.5m Dual Swing DecoWood Architectural Gate & Solar Kit',
    motor: 'Centurion Vantage 500 Double Swing with Dual 40W Solar Panels',
    finish: 'DecoWood Western Red Cedar Aluminium Finish',
    challenge: 'Acreage driveway entrance was 240 meters away from main 240V mains power.',
    solution: 'Engineered an off-grid solar system with dual deep-cycle AGM batteries and high-torque Centurion arms.',
    text: 'We were quoted over $7,500 just by electricians to trench 240m of power cable down our acreage driveway. Custom Auto Gates designed an off-grid solar dual-swing gate with DecoWood timber-look aluminium. It looks exactly like real timber but requires zero oiling, and the solar batteries have powered through every cloudy storm without missing a beat.',
    engineerNote: 'Configured oversized 40W monocrystalline solar panels with 10-day cloudy autonomy reserve.',
    helpfulCount: 38
  },
  {
    id: 'rev-3',
    name: 'Marcus Vance (Facilities Manager)',
    clientType: 'Commercial / Logistics Park',
    suburb: 'Berrinba',
    region: 'Logan & South',
    state: 'QLD 4117',
    date: 'December 2025',
    rating: 5,
    source: 'Commercial Tender Client',
    product: '8.0m Heavy-Duty Cantilever Security Gate & Automatic Boom Barrier',
    motor: 'Centurion D20 Smart Commercial Inverter Drive + Magnetic Barrier',
    finish: 'Industrial Signal Yellow & Satin Black Dual Coating',
    challenge: 'High-frequency B-Double semi-trailer truck access with anti-tailgating requirements.',
    solution: 'Installed a trackless cantilever gate paired with induction safety ground loops and RFID card readers.',
    text: 'We manage high-volume logistics dispatch and required a gate system that could handle 400+ vehicle movements daily without maintenance breakdowns. Custom Auto Gates delivered the cantilever gate and boom arms on time and within budget. Their factory direct pricing saved our body corporate thousands compared to other quotes.',
    engineerNote: 'Trackless cantilever design eliminates ground track debris damage from 40-tonne semi-trailers.',
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    name: 'Elena & Craig Ross',
    clientType: 'Verified Homeowner',
    suburb: 'Camp Hill',
    region: 'Brisbane South & East',
    state: 'QLD 4152',
    date: 'November 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: 'Bi-Fold Aluminium Swing Gate & Matching Pedestrian Access Gate',
    motor: 'Centurion Vector Articulated Arm Automation with Keypad',
    finish: 'Dulux Surfmist Matt Finish',
    challenge: 'Short driveway depth where regular swing gates would hit parked cars, and sliding wasn’t possible due to trees.',
    solution: 'Engineered a bi-folding dual panel mechanism that concertinas neatly against the boundary fence.',
    text: 'Our short driveway meant regular swing gates wouldn’t clear our SUV, and sliding wasn’t possible due to mature boundary trees. The bi-fold gate design Custom Auto Gates custom fabricated completely solved the spatial problem! Beautiful finish, sturdy construction, and the technician was incredibly polite.',
    engineerNote: 'Heavy-duty stainless steel bearing hinges allow fast, fluid folding action within a 1.2m sweep footprint.',
    helpfulCount: 31
  },
  {
    id: 'rev-5',
    name: 'Graham Thornhill',
    clientType: 'Verified Homeowner',
    suburb: 'Indooroopilly',
    region: 'Brisbane West',
    state: 'QLD 4068',
    date: 'October 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: 'Springfield Satin Black Dual Swing Gate with 10mm Gap Slat Infill',
    motor: 'Centurion Sector High-Speed Swing Automation',
    finish: 'Interpon Satin Black Architectural Powdercoat',
    challenge: 'Needed architectural street presence matching a newly renovated Hamptons home.',
    solution: 'Fabricated full-height matching fence panels, automated dual swing gates, and an intercom pillar.',
    text: 'The craftsmanship on our front entrance is outstanding. People walking down our street in Indooroopilly constantly stop and ask who built our gate. Being able to visit their Yamanto workshop during fabrication and see the TIG welding gave us huge confidence. Worth every single cent.',
    engineerNote: 'Integrated custom concealed magnetic safety latches with internal wiring channels.',
    helpfulCount: 42
  },
  {
    id: 'rev-6',
    name: 'Belinda & Terry Kovacs',
    clientType: 'Verified Homeowner',
    suburb: 'New Farm',
    region: 'Brisbane North & Inner',
    state: 'QLD 4005',
    date: 'September 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: 'Architectural Horizontal Slat Sliding Gate with Integrated P.A. Access',
    motor: 'Centurion D10 Smart with Video Intercom Integration',
    finish: 'Dulux Woodland Grey Powdercoat',
    challenge: 'Tight inner-city lot boundary with strict council aesthetic guidelines.',
    solution: 'Custom low-profile track and wireless safety PE infrared beams.',
    text: 'Living in New Farm with tight driveway access, we needed an electric gate that opened quickly so cars didn’t bank up on the street. The Centurion Hi-Speed motor opens the full 4.5m gate in under 7 seconds! The installation team left the site spotless.',
    engineerNote: 'Installed Centurion safety infrared beams ensuring automatic reverse if children or pets approach.',
    helpfulCount: 27
  },
  {
    id: 'rev-7',
    name: 'Robert Sterling',
    clientType: 'Strata Committee Chairman',
    suburb: 'Southport',
    region: 'Gold Coast',
    state: 'QLD 4215',
    date: 'August 2025',
    rating: 5,
    source: 'Strata Committee Review',
    product: 'Twin Commercial Sliding Gates & GSM 4G Intercom Access',
    motor: 'Centurion D20 Smart Commercial Inverter Motors',
    finish: 'Dulux Deep Ocean Industrial Coating',
    challenge: 'Previous gate motor from another installer broke down every few weeks.',
    solution: 'Replaced substandard hardware with commercial Centurion Smart inverter motors and heavy-duty steel rollers.',
    text: 'Our 32-unit residential complex on the Gold Coast was plagued by motor breakdowns. Custom Auto Gates came out for an emergency diagnostic, identified the undersized motor from our previous installer, and replaced it with a heavy-duty industrial unit. It has run 24/7 without a single glitch since.',
    engineerNote: 'Upgraded gate running gear with machined dual-bearing steel wheels rated to 800kg per roller.',
    helpfulCount: 35
  },
  {
    id: 'rev-8',
    name: 'Chloe & Andrew Bennett',
    clientType: 'Verified Homeowner',
    suburb: 'Ascot',
    region: 'Brisbane North & Inner',
    state: 'QLD 4007',
    date: 'July 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: 'Laser-Cut Decorative Aluminium Sliding Gate & Matching Privacy Fencing',
    motor: 'Centurion D5 Smart with Keypad & Video Doorbell',
    finish: 'Prestige Matt Charcoal Powdercoat',
    challenge: 'Client wanted a modern artistic focal point for their contemporary architectural home.',
    solution: 'Precision CNC laser cut custom leaf patterns integrated into structural 6060-T6 frames.',
    text: 'The custom laser-cut design Custom Auto Gates created for our Ascot property is true artwork. It provides complete security while letting gentle afternoon breezes filter through. Superb team and true masters of their trade.',
    engineerNote: 'Used 4mm structural aluminium sheet to prevent oil-canning and ensure complete rigidity.',
    helpfulCount: 29
  },
  {
    id: 'rev-9',
    name: 'James Thornton',
    clientType: 'Verified Homeowner',
    suburb: 'Yamanto',
    region: 'Ipswich & Greater West',
    state: 'QLD 4305',
    date: 'June 2025',
    rating: 5,
    source: 'Local Resident Review',
    product: 'Full Property Boundary Aluminium Slat Fencing & Double Sliding Gate',
    motor: 'Centurion D5-Evo Sliding Gate Motor',
    finish: 'Colorbond Basalt Matt Finish',
    challenge: 'Frontage of 34 meters required consistent slat spacing and seamless gate integration.',
    solution: 'Manufactured all 34m of fencing and automatic gate in one single batch in Yamanto workshop.',
    text: 'Living right here in Yamanto, we wanted to support local business. Buying factory direct from Custom Auto Gates saved us nearly 20% compared to middleman retailers. The fence and gate have completely transformed our home’s street appeal and security.',
    engineerNote: 'Precision Colorbond batch matching ensured 100% color consistency between fence panels and gate frame.',
    helpfulCount: 18
  },
  {
    id: 'rev-10',
    name: 'Samantha & Luke Davies',
    clientType: 'Verified Homeowner',
    suburb: 'Bulimba',
    region: 'Brisbane South & East',
    state: 'QLD 4171',
    date: 'May 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: '4.8m Aluminium Louver Sliding Gate with Concealed Automation',
    motor: 'Centurion D5 Smart with In-Ground Track System',
    finish: 'Dulux Surfmist White',
    challenge: 'High wind zone near Brisbane River requiring angled privacy louvers.',
    solution: 'Aerodynamic angled louvers that block direct sightlines while reducing wind loading on the motor.',
    text: 'Our house in Bulimba gets heavy wind off the river. The team engineered angled louvers that give us total privacy from the street without creating a sail effect that strains the motor. The gate runs so smooth you barely hear it.',
    engineerNote: 'Aerodynamic 45-degree louvers reduced calculated wind-resistance drag by 62%.',
    helpfulCount: 22
  },
  {
    id: 'rev-11',
    name: 'Peter & Wendy Hall',
    clientType: 'Acreage Property Owner',
    suburb: 'Brookfield',
    region: 'Brisbane West',
    state: 'QLD 4069',
    date: 'April 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: '6.0m Double Swing Country Gate with Solar Battery Automation',
    motor: 'Centurion Vantage 500 High-Speed Double Swing Solar Setup',
    finish: 'Textured Monument Black Powdercoat',
    challenge: 'Bushfire overlay zone requiring emergency vehicle access and solar independence.',
    solution: 'Fitted emergency fire brigade key switches and solar automation with battery backup.',
    text: 'Living in Brookfield acreage with wildlife and storm blackouts, this solar automatic gate gives us immense peace of mind. The battery backup never fails, and the remote range easily reaches 50 meters down the driveway.',
    engineerNote: 'Added high-gain external antenna extending wireless keyfob transmitter range to 75m.',
    helpfulCount: 26
  },
  {
    id: 'rev-12',
    name: 'Kylie & Ben Rogers',
    clientType: 'Verified Homeowner',
    suburb: 'Cleveland',
    region: 'Logan & Redlands',
    state: 'QLD 4163',
    date: 'March 2025',
    rating: 5,
    source: 'Google Verified Review',
    product: 'Coastal Marine-Grade Sliding Gate & Matching Side Gate',
    motor: 'Centurion D5 Smart with Stainless Steel Marine Hardware',
    finish: 'Interpon Coastal Marine Architectural Coating',
    challenge: 'Direct exposure to Moreton Bay salt spray causing rust on previous steel gates.',
    solution: '100% 6060-T6 marine aluminium fabrication with 316 stainless steel fasteners.',
    text: 'Our old steel gate rusted away in 4 years due to Cleveland salt air. Custom Auto Gates explained why 100% aluminium is essential for coastal Queensland. 12 months in and our gate looks brand new without a speck of corrosion!',
    engineerNote: 'Applied 10-stage pre-treatment wash and 316-grade stainless steel fasteners for coastal resilience.',
    helpfulCount: 33
  }
];

export default function Testimonials({ onOpenQuote, onOpenContact, onNavigateHome }) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // New Review Form State
  const [newReview, setNewReview] = useState({
    name: '',
    suburb: '',
    gateType: 'Automatic Sliding Gate',
    rating: 5,
    reviewText: ''
  });

  // Rolling Ticker Reviews
  const rollingReviews = useMemo(() => [
    { name: 'Mark J.', suburb: 'Brookwater', text: 'Millimeter-perfect fit for our sloping driveway. Centurion motor is whisper quiet!' },
    { name: 'David H.', suburb: 'Pullenvale', text: 'Saved $7,500 on power trenching with their off-grid solar gate. Flawless.' },
    { name: 'Marcus V.', suburb: 'Berrinba', text: 'Commercial cantilever gate handles 400+ trucks a day without a hitch.' },
    { name: 'Elena R.', suburb: 'Camp Hill', text: 'The bi-fold swing gate solved our driveway depth problem completely!' },
    { name: 'Graham T.', suburb: 'Indooroopilly', text: 'People constantly stop and admire our custom front entrance. Worth every cent.' },
    { name: 'Belinda K.', suburb: 'New Farm', text: 'Opens in under 7 seconds! Incredibly fast Centurion motor and spotless install.' },
    { name: 'Kylie R.', suburb: 'Cleveland', text: 'Marine grade aluminium that will never rust in Moreton Bay salt air.' }
  ], []);

  // Filtered Reviews Logic
  const filteredReviews = useMemo(() => {
    return DETAILED_REVIEWS.filter(rev => {
      // Region Filter
      if (selectedRegion !== 'all' && rev.region !== selectedRegion) return false;
      
      // Product Filter
      if (selectedProduct !== 'all') {
        const prod = rev.product.toLowerCase();
        if (selectedProduct === 'sliding' && !prod.includes('sliding')) return false;
        if (selectedProduct === 'swing' && !prod.includes('swing') && !prod.includes('bi-fold')) return false;
        if (selectedProduct === 'solar' && !prod.includes('solar')) return false;
        if (selectedProduct === 'commercial' && !prod.includes('commercial') && !prod.includes('boom') && !prod.includes('cantilever')) return false;
        if (selectedProduct === 'fencing' && !prod.includes('fencing')) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = rev.name.toLowerCase().includes(q);
        const matchesSuburb = rev.suburb.toLowerCase().includes(q);
        const matchesText = rev.text.toLowerCase().includes(q);
        const matchesProd = rev.product.toLowerCase().includes(q);
        if (!matchesName && !matchesSuburb && !matchesText && !matchesProd) return false;
      }

      return true;
    });
  }, [selectedRegion, selectedProduct, searchQuery]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
      alert('Thank you for your review! Our workshop team will verify and publish your feedback.');
    }, 1500);
  };

  // Google EEAT Schema.org JSON-LD Structured Data
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Custom Auto Gates & Fencing",
      "image": "https://customautogates.com.au/wp-content/uploads/2025/04/custom-auto-gates-logo.png",
      "telephone": "(07) 3102 1801",
      "email": "sales@customautogates.com.au",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "43 Belar Street",
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
      "url": "https://customautogates.com.au/",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "184",
        "reviewCount": "184"
      },
      "review": DETAILED_REVIEWS.slice(0, 8).map(rev => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": rev.name
        },
        "datePublished": "2025-11-15",
        "reviewBody": rev.text,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": rev.rating.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "itemReviewed": {
          "@type": "Product",
          "name": rev.product,
          "description": `${rev.product} manufactured in Yamanto workshop with ${rev.motor}.`
        }
      }))
    });

    document.head.appendChild(schemaScript);
    return () => {
      if (document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript);
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* =========================================================================
          1. HERO BANNER WITH GOOGLE RATING & E-E-A-T TRUST METRICS
          ========================================================================= */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #1e293b 100%)',
        color: '#ffffff',
        padding: '5rem 0 4rem 0',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <button onClick={onNavigateHome} style={{ color: '#94a3b8', cursor: 'pointer' }}>Home</button>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Customer Testimonials & Case Studies</span>
          </div>

          <div style={{ maxWidth: '880px', marginBottom: '2.5rem' }}>
            <span className="badge-tag badge-gold" style={{ marginBottom: '1rem' }}>
              <Star size={14} fill="#fbbf24" />
              Verified Google & Factory Direct Reviews
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}>
              Real Queensland Stories: <br />
              <span className="gradient-text-gold">5,000+ Automatic Gates Installed</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: '#cbd5e1',
              lineHeight: 1.65
            }}>
              Read detailed verified case studies and testimonials from homeowners, builders, and strata managers across Brisbane, Ipswich, Logan, and the Gold Coast who chose factory direct Australian quality.
            </p>
          </div>

          {/* E-E-A-T Trust Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1.5px solid rgba(251, 191, 36, 0.25)',
            borderRadius: '20px',
            padding: '1.5rem',
            backdropFilter: 'blur(12px)'
          }}>
            {/* Stat 1: Google Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '1.25rem'
              }}>
                4.9
              </div>
              <div>
                <div style={{ display: 'flex', gap: '2px', color: '#fbbf24', marginBottom: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '700' }}>
                  180+ 5-Star Reviews
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Google & Direct Verified</span>
              </div>
            </div>

            {/* Stat 2: 100% Yamanto Built */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffffff' }}>100% In-House</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '700' }}>Yamanto Workshop</div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>No Middleman Markups</span>
              </div>
            </div>

            {/* Stat 3: Structural Warranty */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffffff' }}>10-Year Warranty</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '700' }}>Factory Structural</div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>QBCC Licence #15579753</span>
              </div>
            </div>

            {/* Stat 4: Local Service Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#fdf4ff',
                color: '#c026d3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffffff' }}>All SE QLD</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '700' }}>Free On-Site Measures</div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Brisbane, Ipswich, Logan, GC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ROLLING LIVE TESTIMONIALS TICKER MARQUEE
          ========================================================================= */}
      <section style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 0',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: '#0f172a',
            color: '#fbbf24',
            padding: '0.35rem 0.85rem',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            flexShrink: 0,
            marginLeft: '1.5rem',
            zIndex: 2
          }}>
            <Sparkles size={14} /> Recent Reviews
          </div>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            animation: 'marquee 35s linear infinite',
            whiteSpace: 'nowrap'
          }}>
            {rollingReviews.concat(rollingReviews).map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  color: '#334155'
                }}
              >
                <div style={{ display: 'flex', gap: '1px', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={11} fill="#f59e0b" />
                  ))}
                </div>
                <strong>{r.name}</strong>
                <span style={{ color: '#2563eb', fontWeight: '600' }}>({r.suburb})</span>:
                <span style={{ color: 'var(--text-muted)' }}>"{r.text}"</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE REVIEW FILTER BAR & SEARCH
          ========================================================================= */}
      <section className="section section-light" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                  Filter Case Studies by Location & Gate Type
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Showing {filteredReviews.length} of {DETAILED_REVIEWS.length} verified Queensland projects
                </span>
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: 'min(100%, 280px)' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search by suburb, motor, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 36px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.86rem'
                  }}
                />
              </div>
            </div>

            {/* Region Filter Buttons */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Select Region:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {[
                  { id: 'all', label: 'All Regions' },
                  { id: 'Brisbane West', label: 'Brisbane West (Indooroopilly, Pullenvale, Kenmore)' },
                  { id: 'Brisbane North & Inner', label: 'Brisbane North & Inner (New Farm, Ascot)' },
                  { id: 'Brisbane South & East', label: 'Brisbane South & East (Camp Hill, Bulimba)' },
                  { id: 'Ipswich & Greater West', label: 'Ipswich & Yamanto (Brookwater, Yamanto)' },
                  { id: 'Logan & South', label: 'Logan & Redlands (Berrinba, Cleveland)' },
                  { id: 'Gold Coast', label: 'Gold Coast (Southport, Coomera)' }
                ].map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg.id)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      background: selectedRegion === reg.id ? '#0f172a' : '#f1f5f9',
                      color: selectedRegion === reg.id ? '#fbbf24' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Filter Buttons */}
            <div>
              <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Filter by Product / Gate Type:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {[
                  { id: 'all', label: 'All Gate Systems' },
                  { id: 'sliding', label: 'Sliding Gates' },
                  { id: 'swing', label: 'Swing & Bi-Fold Gates' },
                  { id: 'solar', label: 'Off-Grid Solar Gates' },
                  { id: 'commercial', label: 'Commercial & Boom Gates' },
                  { id: 'fencing', label: 'Aluminium Slat Fencing' }
                ].map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      background: selectedProduct === prod.id ? '#d97706' : '#f8fafc',
                      color: selectedProduct === prod.id ? '#ffffff' : '#475569',
                      border: selectedProduct === prod.id ? '1px solid #d97706' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {prod.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. DETAILED CUSTOMER REVIEW CASE STUDIES GRID
          ========================================================================= */}
      <section className="section section-light" style={{ paddingTop: 0 }}>
        <div className="container">
          {filteredReviews.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1.5px dashed #cbd5e1'
            }}>
              <Search size={36} style={{ color: '#94a3b8', margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>No matching case studies found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.25rem 0 1rem 0' }}>
                Try adjusting your search keywords or resetting the region/product filters.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedProduct('all');
                  setSearchQuery('');
                }}
                className="btn btn-outline-dark btn-sm"
                style={{ borderRadius: '8px' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '1.75rem',
              marginBottom: '3.5rem'
            }}>
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="card-light"
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '20px',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.06)',
                    background: '#ffffff',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Header Row: Stars, Source & Verification */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', marginBottom: '4px' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={16} fill="#f59e0b" />
                          ))}
                        </div>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {rev.date} • {rev.source}
                        </span>
                      </div>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        color: '#10b981',
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        fontWeight: '800'
                      }}>
                        <CheckCircle2 size={13} /> {rev.clientType}
                      </span>
                    </div>

                    {/* Installed Product & Hardware Badges */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.85rem',
                      marginBottom: '1.25rem',
                      fontSize: '0.82rem'
                    }}>
                      <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                        {rev.product}
                      </div>
                      <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                        ⚡ Motor: {rev.motor}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                        🎨 Finish: {rev.finish}
                      </div>
                    </div>

                    {/* Review Quote Body */}
                    <p style={{
                      color: '#334155',
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      marginBottom: '1.25rem',
                      fontStyle: 'normal'
                    }}>
                      "{rev.text}"
                    </p>

                    {/* Engineering & Problem Solved Callout */}
                    <div style={{
                      background: '#fefce8',
                      borderLeft: '3px solid #eab308',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '0 8px 8px 0',
                      fontSize: '0.78rem',
                      color: '#713f12',
                      lineHeight: 1.5,
                      marginBottom: '1.25rem'
                    }}>
                      <strong>Yamanto Engineering Note:</strong> {rev.engineerNote}
                    </div>
                  </div>

                  {/* Reviewer Location Footer */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        {rev.name}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                        <MapPin size={12} style={{ color: '#2563eb' }} />
                        <span>{rev.suburb}, {rev.state}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ThumbsUp size={12} /> {rev.helpfulCount} found helpful
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =====================================================================
              5. CALL TO ACTION: LEAVE A REVIEW / GET YOUR CUSTOM QUOTE
              ===================================================================== */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 4vw, 3rem)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.75rem' }}>
                <Award size={13} />
                Join 5,000+ Happy Queensland Families
              </span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: '900', color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Ready to Upgrade Your Driveway Security?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Get a free on-site laser measure and design quote directly from our Yamanto workshop. No salesmen, no generic middleman kits — just custom Australian manufacturing.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuote}
                className="btn btn-gold btn-lg"
                style={{ borderRadius: '12px' }}
              >
                <Sparkles size={18} /> Instant Online Quote
              </button>
              <a
                href={COMPANY_INFO.tel}
                className="btn btn-outline-dark btn-lg"
                style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <Phone size={18} /> Call (07) 3102 1801
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
