import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  Shield, 
  Star, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Calculator, 
  Sparkles, 
  Wrench, 
  Building2, 
  Home, 
  Sun, 
  Compass, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  Search, 
  ExternalLink,
  Sliders,
  Check,
  Scale,
  Award,
  Truck
} from 'lucide-react';
import { COMPANY_INFO, SUBURBS_COVERED } from '../data/siteData';
import { DETAILED_REVIEWS } from './Testimonials';

export const REGIONAL_DATA = {
  brisbane: {
    id: 'brisbane',
    routeSlug: 'gates-brisbane',
    regionName: 'Greater Brisbane & Inner Suburbs',
    shortTitle: 'Brisbane',
    heroTag: 'Brisbane Premier Gate Manufacturer',
    h1: 'Custom Automatic Gates & Fencing Brisbane',
    subtitle: 'Factory direct custom aluminium sliding gates, dual swing gates, solar gates, and architectural slat fencing. Measured, fabricated, and installed across Brisbane Northside, Southside, and Western suburbs.',
    councilName: 'Brisbane City Council (BCC)',
    councilPlan: 'Brisbane City Plan 2014',
    councilHeight: '1.2m solid front fences / up to 1.8m with 50% open slat permeability',
    councilNotes: 'Traditional Building Character overlays in Paddington, New Farm, and Ascot require architectural slat spacing matching heritage aesthetics.',
    travelTime: '25 – 35 mins from Yamanto workshop via Centenary Highway / Ipswich Mwy',
    suburbs: [
      { name: 'Ascot', postcode: '4007', area: 'North / Inner', desc: 'Custom laser cut sliding gates & prestige Hamptons fence infills.' },
      { name: 'Hamilton', postcode: '4007', area: 'North / Inner', desc: 'Heavy-duty automatic driveway gates with video intercoms.' },
      { name: 'New Farm', postcode: '4005', area: 'Inner City', desc: 'Space-saving telescopic and bi-fold sliding gates for tight driveways.' },
      { name: 'Paddington', postcode: '4064', area: 'Inner West', desc: 'Sloping driveway raked sliding gates matching heritage Queenslanders.' },
      { name: 'Bulimba', postcode: '4171', area: 'East / River', desc: 'Aerodynamic wind-resistant privacy louvers and marine aluminium gates.' },
      { name: 'Hawthorne', postcode: '4171', area: 'East / River', desc: 'Architectural horizontal slat gates in Dulux Monument & Surfmist.' },
      { name: 'Camp Hill', postcode: '4152', area: 'South / East', desc: 'Dual swing automatic gates with concealed underground Centurion motors.' },
      { name: 'Carindale', postcode: '4152', area: 'East', desc: 'Full front boundary Colorbond slat fencing with pedestrian access gate.' },
      { name: 'Indooroopilly', postcode: '4068', area: 'West', desc: 'Double swing aluminium gates with high-speed Centurion automation.' },
      { name: 'Kenmore', postcode: '4069', area: 'West', desc: 'Sloping ground track sliding gates and matching pool safety barriers.' },
      { name: 'Pullenvale', postcode: '4069', area: 'West Acreage', desc: 'Off-grid solar double swing gates for acreage with 50m remote range.' },
      { name: 'Brookfield', postcode: '4069', area: 'West Acreage', desc: 'Heavy-duty rural gateways with solar battery backup and keypad entry.' },
      { name: 'Chapel Hill', postcode: '4069', area: 'West', desc: 'Custom architectural driveway gates with integrated letterbox pillars.' },
      { name: 'The Gap', postcode: '4061', area: 'North West', desc: 'Timber-look DecoWood Western Red Cedar gates with zero maintenance.' },
      { name: 'Chermside', postcode: '4032', area: 'Northside', desc: 'Commercial boom barriers and residential automatic sliding gates.' },
      { name: 'Aspley', postcode: '4034', area: 'Northside', desc: 'Powdercoated aluminium driveway gates with 10-year factory warranty.' },
      { name: 'Sunnybank', postcode: '4109', area: 'Southside', desc: 'High-security automatic sliding gates with 4G smartphone controls.' }
    ],
    popularGateStyles: [
      { name: 'Monument Slat Sliding Gate', motor: 'Centurion D5 Smart Hi-Speed', tag: 'Most Popular in Brisbane Inner Suburbs' },
      { name: 'Acreage Solar Double Swing Gate', motor: 'Centurion Vantage 500 Solar', tag: 'Top Choice in Pullenvale & Brookfield' },
      { name: 'DecoWood Timber-Look Gate', motor: 'Centurion Vantage 500 Swing', tag: 'Popular in Ascot & Paddington Heritage' },
      { name: 'Bi-Fold Space Saving Gate', motor: 'Centurion Vector Articulated', tag: 'Best for Short Driveways in New Farm' }
    ]
  },
  ipswich: {
    id: 'ipswich',
    routeSlug: 'gates-ipswich',
    regionName: 'Ipswich, Yamanto & Greater West',
    shortTitle: 'Ipswich & Yamanto',
    heroTag: 'Factory Direct from 43 Belar St, Yamanto',
    h1: 'Custom Automatic Gates & Fencing Ipswich',
    subtitle: 'Buy direct from the manufacturer! Our state-of-the-art workshop and showroom are located at 43 Belar St, Yamanto. Eliminating middleman markups for Ipswich, Springfield, Brookwater, and Ripley homeowners.',
    councilName: 'Ipswich City Council (ICC)',
    councilPlan: 'Ipswich Planning Scheme',
    councilHeight: '1.2m solid front fences / up to 1.8m with 50% open slat permeability',
    councilNotes: 'Character Residential zones in Brassall, Newtown, and Woodend permit custom powdercoat Colorbond finishes matching heritage structures.',
    travelTime: '5 – 15 mins (Direct local dispatch from our Yamanto workshop facility)',
    suburbs: [
      { name: 'Yamanto', postcode: '4305', area: 'Factory Direct Hub', desc: 'Our home base! Visit our showroom at 43 Belar St for live motor demos.' },
      { name: 'Ipswich Central', postcode: '4305', area: 'Central', desc: 'Custom laser cut sliding gates & architectural privacy screens.' },
      { name: 'Brookwater', postcode: '4300', area: 'Greater Springfield', desc: 'Golf course prestige sliding gates with whisper-quiet Centurion motors.' },
      { name: 'Springfield Lakes', postcode: '4300', area: 'Greater Springfield', desc: 'Contemporary slat fencing and matching electric driveway gates.' },
      { name: 'Augustine Heights', postcode: '4300', area: 'Greater Springfield', desc: 'Modern Colorbond Basalt and Monument sliding automated systems.' },
      { name: 'Ripley', postcode: '4306', area: 'Growth Corridor', desc: 'New build package: front boundary fence, sliding gate, and keypad.' },
      { name: 'Brassall', postcode: '4305', area: 'North Ipswich', desc: 'Custom double swing gates tailored for hillside driveway contours.' },
      { name: 'Karalee', postcode: '4306', area: 'Riverside Acreage', desc: 'Acreage dual swing solar gates with Centurion high-torque arms.' },
      { name: 'Flinders View', postcode: '4305', area: 'South Ipswich', desc: 'Aluminium slat privacy screens and automatic sliding driveway gates.' },
      { name: 'Redbank Plains', postcode: '4301', area: 'East Ipswich', desc: 'Full property boundary security fencing and electric gates.' },
      { name: 'Pine Mountain', postcode: '4306', area: 'North Acreage', desc: 'Solar off-grid swing gates with battery backup and animal containment.' },
      { name: 'Booval', postcode: '4304', area: 'East Ipswich', desc: 'Heavy-duty steel-reinforced aluminium sliding gates.' }
    ],
    popularGateStyles: [
      { name: 'Yamanto Custom Laser Cut Slide Gate', motor: 'Centurion D5 Smart Hi-Speed', tag: 'Built 100% In-House in Yamanto' },
      { name: 'Brookwater Architectural Slat System', motor: 'Centurion D10 Smart 600', tag: 'Top Choice in Springfield & Brookwater' },
      { name: 'Karalee Solar Double Swing Gate', motor: 'Centurion Vantage 500 Double', tag: 'Best for Ipswich Acreage Properties' },
      { name: 'Ripley New Home Complete Pack', motor: 'Centurion D5-Evo Slide', tag: 'Complete Fence & Gate Combo' }
    ]
  },
  logan: {
    id: 'logan',
    routeSlug: 'gates-logan',
    regionName: 'Logan City & Redland Bay',
    shortTitle: 'Logan & Redlands',
    heroTag: 'Logan & Redland Bay Gate Specialists',
    h1: 'Automatic Gates & Security Fencing Logan',
    subtitle: 'Engineered for commercial security parks, residential estates, and acreage properties across Logan, Springwood, Berrinba, Browns Plains, and coastal Redland Bay.',
    councilName: 'Logan City Council & Redland City Council',
    councilPlan: 'Logan Planning Scheme 2015',
    councilHeight: '1.2m front solid / 1.8m permeable (Logan) | Coastal marine specs (Redlands)',
    councilNotes: 'Semi-rural zones in Greenbank and Jimboomba allow higher post clearances for horse and livestock security gateways.',
    travelTime: '25 – 35 mins from Yamanto via Logan Motorway (Direct access)',
    suburbs: [
      { name: 'Berrinba', postcode: '4117', area: 'Commercial Hub', desc: 'Commercial cantilever security gates, boom barriers, and RFID loop readers.' },
      { name: 'Springwood', postcode: '4127', area: 'North Logan', desc: 'Aluminium slat sliding gates with smart WiFi smartphone control.' },
      { name: 'Underwood', postcode: '4119', area: 'North Logan', desc: 'Residential and commercial security fencing and automated gates.' },
      { name: 'Rochedale South', postcode: '4123', area: 'North Logan', desc: 'Modern horizontal slat gates in Colorbond Woodland Grey & Monument.' },
      { name: 'Browns Plains', postcode: '4118', area: 'Central Logan', desc: 'Heavy-duty electric driveway gates and 24/7 motor repair service.' },
      { name: 'Daisy Hill', postcode: '4127', area: 'East Logan', desc: 'Architectural timber-look DecoWood gates matching bushland settings.' },
      { name: 'Greenbank', postcode: '4124', area: 'Acreage South', desc: 'Off-grid solar dual swing gates for large acreage property entrances.' },
      { name: 'Jimboomba', postcode: '4280', area: 'Acreage South', desc: 'Custom wide-span rural gates with wireless keypads and solar kits.' },
      { name: 'Cleveland', postcode: '4163', area: 'Redlands Coastal', desc: '100% corrosion-proof marine grade 6060-T6 aluminium sliding gates.' },
      { name: 'Victoria Point', postcode: '4165', area: 'Redlands Coastal', desc: 'Coastal privacy slat fences and salt-spray resistant automated gates.' },
      { name: 'Redland Bay', postcode: '4165', area: 'Redlands Coastal', desc: 'Marine powdercoated aluminium driveway gates with 10-year warranty.' }
    ],
    popularGateStyles: [
      { name: 'Commercial Cantilever Security Gate', motor: 'Centurion D10 Smart Heavy-Duty', tag: 'Top Choice in Berrinba Logistics Park' },
      { name: 'Greenbank Solar Acreage Swing System', motor: 'Centurion Vantage Double Swing', tag: 'Most Popular in Logan Acreage' },
      { name: 'Cleveland Marine-Grade Slide Gate', motor: 'Centurion D5 Smart Marine Finish', tag: 'Best for Redlands Salt Air Coast' },
      { name: 'Springwood Slat Privacy Sliding Gate', motor: 'Centurion D5-Evo Smart', tag: 'Popular in Suburban Logan' }
    ]
  },
  goldcoast: {
    id: 'goldcoast',
    routeSlug: 'gates-gold-coast',
    regionName: 'City of Gold Coast & Hinterland',
    shortTitle: 'Gold Coast',
    heroTag: 'Coastal Grade Aluminium Automated Gates',
    h1: 'Custom Automatic Gates Gold Coast',
    subtitle: 'Engineered specifically for coastal Queensland conditions. 100% corrosion-resistant 6060-T6 aluminium alloy, marine-grade powdercoating, and high-speed Centurion Smart automation for Gold Coast homes, strata, and canal estates.',
    councilName: 'City of Gold Coast',
    councilPlan: 'City Plan (Gold Coast)',
    councilHeight: '1.2m solid / 1.8m permeable | Specific waterfront canal setback rules',
    councilNotes: 'Canal frontages require specific open sightline setbacks to maintain waterway visibility.',
    travelTime: '45 – 55 mins via Gateway / Pacific Motorway M1',
    suburbs: [
      { name: 'Hope Island', postcode: '4212', area: 'North GC / Canal', desc: 'Prestige gated estate sliding gates with GSM 4G mobile access.' },
      { name: 'Sanctuary Cove', postcode: '4212', area: 'North GC / Canal', desc: 'Custom luxury architectural gates matching resort master planning.' },
      { name: 'Coomera', postcode: '4209', area: 'Growth Corridor', desc: 'Aluminium slat privacy screens and automatic sliding driveway gates.' },
      { name: 'Helensvale', postcode: '4212', area: 'North GC', desc: 'Dual swing automatic gates with high-speed Centurion Smart automation.' },
      { name: 'Southport', postcode: '4215', area: 'Central GC / Strata', desc: 'Commercial multi-unit residential sliding gates with heavy-duty rollers.' },
      { name: 'Surfers Paradise', postcode: '4217', area: 'Central Coastal', desc: 'High-security coastal gates and keyless RFID pedestrian access.' },
      { name: 'Robina', postcode: '4226', area: 'Central GC', desc: 'Contemporary residential electric gates in Dulux Monument & Surfmist.' },
      { name: 'Burleigh Waters', postcode: '4220', area: 'South GC', desc: 'Marine grade slat fencing and whisper-quiet automatic sliding gates.' },
      { name: 'Tamborine Mountain', postcode: '4272', area: 'Hinterland Acreage', desc: 'Off-grid solar double swing gates for mountain properties.' }
    ],
    popularGateStyles: [
      { name: 'Hope Island Canal Slat Gate', motor: 'Centurion D10 Smart 600 Hi-Speed', tag: 'Prestige Coastal Living' },
      { name: 'Southport Commercial Strata Gate', motor: 'Centurion D20 Smart Commercial Inverter', tag: 'Heavy-Duty Multi-Unit Complexes' },
      { name: 'Tamborine Hinterland Solar Gate', motor: 'Centurion Vantage 500 Solar', tag: 'High-Torque Mountain Acreage' },
      { name: 'Coomera Modern Slat Privacy Combo', motor: 'Centurion D5 Smart', tag: 'Modern Residential Estates' }
    ]
  }
};

export default function SuburbLandingPage({ 
  initialRegion = 'brisbane', 
  onOpenQuote, 
  onOpenContact, 
  onNavigateHome,
  onNavigateCouncilGuide
}) {
  const [activeRegionId, setActiveRegionId] = useState(initialRegion);
  const [suburbSearch, setSuburbSearch] = useState('');

  // Sync initialRegion if prop changes
  useEffect(() => {
    if (initialRegion && REGIONAL_DATA[initialRegion]) {
      setActiveRegionId(initialRegion);
    }
  }, [initialRegion]);

  const currentRegion = REGIONAL_DATA[activeRegionId] || REGIONAL_DATA.brisbane;

  // Filtered Suburbs
  const filteredSuburbs = useMemo(() => {
    if (!suburbSearch.trim()) return currentRegion.suburbs;
    const q = suburbSearch.toLowerCase();
    return currentRegion.suburbs.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.postcode.includes(q) || 
      s.desc.toLowerCase().includes(q) ||
      s.area.toLowerCase().includes(q)
    );
  }, [currentRegion, suburbSearch]);

  // Filtered Regional Case Studies
  const regionalReviews = useMemo(() => {
    return DETAILED_REVIEWS.filter(r => {
      if (activeRegionId === 'brisbane') return r.region.includes('Brisbane');
      if (activeRegionId === 'ipswich') return r.region.includes('Ipswich');
      if (activeRegionId === 'logan') return r.region.includes('Logan');
      if (activeRegionId === 'goldcoast') return r.region.includes('Gold Coast');
      return true;
    });
  }, [activeRegionId]);

  // Schema.org LocalBusiness Geo & ServiceArea structured data
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": `Custom Auto Gates & Fencing - ${currentRegion.regionName}`,
      "image": "https://customautogates.com.au/wp-content/uploads/2025/04/custom-auto-gates-logo.png",
      "telephone": "(07) 3102 1801",
      "email": "sales@customautogates.com.au",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "43 Belar Street",
        "addressLocality": "Yamanto",
        "addressRegion": "QLD",
        "postalCode": "4305",
        "addressCountry": "AU"
      },
      "areaServed": currentRegion.suburbs.map(s => ({
        "@type": "AdministrativeArea",
        "name": `${s.name}, QLD ${s.postcode}`
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Automatic Gate Installation & Manufacturing in ${currentRegion.regionName}`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `Automatic Sliding Gates ${currentRegion.shortTitle}`
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `Automatic Swing Gates ${currentRegion.shortTitle}`
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `Solar Powered Acreage Gates ${currentRegion.shortTitle}`
            }
          }
        ]
      }
    });

    document.head.appendChild(schemaScript);
    return () => {
      if (document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript);
      }
    };
  }, [currentRegion]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* =========================================================================
          1. HERO HEADER: REGION-SPECIFIC WITH TRUST BADGES
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
          top: '-20%',
          right: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <button onClick={onNavigateHome} style={{ color: '#94a3b8', cursor: 'pointer' }}>Home</button>
            <span>/</span>
            <span>Service Areas</span>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>{currentRegion.regionName}</span>
          </div>

          {/* Regional Switcher Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'none'
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginRight: '0.4rem', flexShrink: 0 }}>
              Select Region:
            </span>
            {[
              { id: 'brisbane', label: 'Brisbane' },
              { id: 'ipswich', label: 'Ipswich & Yamanto (Factory)' },
              { id: 'logan', label: 'Logan & Redlands' },
              { id: 'goldcoast', label: 'Gold Coast' }
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => {
                  setActiveRegionId(reg.id);
                  setSuburbSearch('');
                  window.location.hash = `gates-${reg.id}`;
                }}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  fontWeight: '800',
                  background: activeRegionId === reg.id ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)',
                  color: activeRegionId === reg.id ? '#0f172a' : '#ffffff',
                  border: activeRegionId === reg.id ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.18s ease'
                }}
              >
                {reg.label}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: '880px', marginBottom: '2.5rem' }}>
            <span className="badge-tag badge-gold" style={{ marginBottom: '1rem' }}>
              <MapPin size={14} />
              {currentRegion.heroTag}
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}>
              {currentRegion.h1}
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
              color: '#cbd5e1',
              lineHeight: 1.65
            }}>
              {currentRegion.subtitle}
            </p>
          </div>

          {/* Regional Quick Highlights */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1.5px solid rgba(251, 191, 36, 0.25)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Truck size={22} style={{ color: '#fbbf24', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ffffff' }}>Workshop Dispatch</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{currentRegion.travelTime}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Shield size={22} style={{ color: '#10b981', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ffffff' }}>10-Year Factory Warranty</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>QBCC Licence #15579753</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={22} style={{ color: '#38bdf8', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ffffff' }}>Free Laser Measure</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>On-site in {currentRegion.shortTitle}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. POPULAR GATE STYLES IN THIS REGION
          ========================================================================= */}
      <section className="section section-light" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-blue">
              <Award size={13} />
              Regional Preferences
            </span>
            <h2 className="section-title">
              Most Popular Automatic Gates in <br />
              <span className="gradient-text-gold">{currentRegion.regionName}</span>
            </h2>
            <p className="section-subtitle">
              Custom designed and TIG welded in our Yamanto workshop to suit local property sizes, slopes, and council aesthetics.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem'
          }}>
            {currentRegion.popularGateStyles.map((style, idx) => (
              <div
                key={idx}
                className="card-light"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1.5px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#ffffff'
                }}
              >
                <div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#2563eb',
                    background: '#eff6ff',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '0.75rem'
                  }}>
                    {style.tag}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.4rem' }}>
                    {style.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    ⚡ Powered by: <strong>{style.motor}</strong>
                  </p>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="btn btn-outline-dark btn-sm"
                  style={{ width: '100%', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700' }}
                >
                  Configure This Gate Style
                </button>
              </div>
            ))}
          </div>

          {/* =====================================================================
              3. REGIONAL COUNCIL RULES SUMMARY CARD
              ===================================================================== */}
          <div style={{
            background: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}>
            <div style={{ maxWidth: '650px' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                <Scale size={13} /> {currentRegion.councilName} Planning Rules
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>
                Front Fence & Gate Height Limits for {currentRegion.shortTitle}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                <strong>Standard Limit:</strong> {currentRegion.councilHeight}.
              </p>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {currentRegion.councilNotes}
              </p>
            </div>

            <button
              onClick={onNavigateCouncilGuide}
              className="btn btn-dark btn-sm"
              style={{ borderRadius: '10px', fontSize: '0.86rem', fontWeight: '700' }}
            >
              <span>View Full QLD Council Guide</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* =====================================================================
              4. COMPREHENSIVE SUBURB DIRECTORY & SEARCH
              ===================================================================== */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                  Suburbs We Service in {currentRegion.regionName}
                </h3>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Free on-site laser measure & quote available in all listed suburbs
                </span>
              </div>

              {/* Suburb Search Input */}
              <div style={{ position: 'relative', minWidth: 'min(100%, 280px)' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder={`Search ${currentRegion.shortTitle} suburbs or postcodes...`}
                  value={suburbSearch}
                  onChange={(e) => setSuburbSearch(e.target.value)}
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

            {/* Suburbs Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
              gap: '1rem'
            }}>
              {filteredSuburbs.map((sub, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.1rem',
                    transition: 'all 0.18s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.98rem' }}>
                      {sub.name}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: '800', background: '#eff6ff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      QLD {sub.postcode}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700', marginBottom: '0.35rem' }}>
                    📍 {sub.area}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                    {sub.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================================
              5. VERIFIED LOCAL REVIEWS FROM THIS REGION
              ===================================================================== */}
          {regionalReviews.length > 0 && (
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge-tag badge-gold">
                  <Star size={13} fill="#d97706" /> Local Customer Stories
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                  Verified Reviews from {currentRegion.shortTitle} Homeowners
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '1.25rem'
              }}>
                {regionalReviews.slice(0, 4).map((rev) => (
                  <div
                    key={rev.id}
                    className="card-light"
                    style={{
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: '1.5px solid #e2e8f0',
                      background: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#f59e0b" />
                          ))}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: '800' }}>
                          ✓ {rev.clientType}
                        </span>
                      </div>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                        {rev.product}
                      </div>
                      <p style={{ color: '#334155', fontSize: '0.84rem', lineHeight: 1.55, fontStyle: 'italic', marginBottom: '1rem' }}>
                        "{rev.text}"
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{rev.name}</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>📍 {rev.suburb}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              6. BOTTOM CALL TO ACTION: BOOK FREE MEASURE IN THIS REGION
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
            gap: '2rem'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.75rem' }}>
                <Clock size={13} /> Fast Response across {currentRegion.shortTitle}
              </span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', color: '#ffffff', marginBottom: '0.75rem' }}>
                Get a Free On-Site Measure in {currentRegion.shortTitle}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Our mobile technicians service {currentRegion.regionName} daily. Book a free consultation and get an exact millimeter-accurate laser measure and factory direct quote.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuote}
                className="btn btn-gold btn-lg"
                style={{ borderRadius: '12px' }}
              >
                <Calculator size={18} /> Instant Online Quote
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
