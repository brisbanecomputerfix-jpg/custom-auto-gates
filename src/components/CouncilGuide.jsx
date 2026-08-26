import React, { useState, useMemo, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  HelpCircle, 
  Sliders, 
  ChevronRight, 
  ArrowRight, 
  Download, 
  Phone, 
  ExternalLink, 
  Info, 
  Eye, 
  Sparkles, 
  Building, 
  Home, 
  Waves,
  Scale,
  Compass,
  Check,
  X
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function CouncilGuide({ onOpenQuote, onOpenContact, onNavigateHome }) {
  const [selectedCouncil, setSelectedCouncil] = useState('brisbane');
  const [propertyType, setPropertyType] = useState('residential');
  const [fenceHeight, setFenceHeight] = useState(1.5);
  const [slatGap, setSlatGap] = useState(20);
  const [activeTab, setActiveTab] = useState('height-rules'); // 'height-rules' | 'pool-safety' | 'dividing-fences' | 'calculator'

  // Council Specific Planning Metadata
  const councilData = {
    brisbane: {
      name: 'Brisbane City Council (BCC)',
      planName: 'Brisbane City Plan 2014',
      maxFrontSolid: 1.2,
      maxFrontPermeable: 1.8,
      minPermeability: 50,
      maxSideRear: 2.0,
      cornerSplay: '3m x 3m visual truncation required on corner allotments',
      characterOverlayNotes: 'Traditional Building Character overlay requires vertical slat / picket style harmonizing with pre-1946 character.',
      phone: '(07) 3403 8888',
      portalUrl: 'https://www.brisbane.qld.gov.au/planning-and-building'
    },
    ipswich: {
      name: 'Ipswich City Council (ICC)',
      planName: 'Ipswich Planning Scheme',
      maxFrontSolid: 1.2,
      maxFrontPermeable: 1.8,
      minPermeability: 50,
      maxSideRear: 2.0,
      cornerSplay: '2m x 2m corner truncation for driveway sightlines',
      characterOverlayNotes: 'Character Residential zones in Brassall, Newtown & Woodend require heritage-compatible powdercoat colors.',
      phone: '(07) 3810 6666',
      portalUrl: 'https://www.ipswich.qld.gov.au/business/planning-and-development'
    },
    logan: {
      name: 'Logan City Council',
      planName: 'Logan Planning Scheme 2015',
      maxFrontSolid: 1.2,
      maxFrontPermeable: 1.8,
      minPermeability: 50,
      maxSideRear: 2.0,
      cornerSplay: 'Standard sight triangle clearance for vehicle exit',
      characterOverlayNotes: 'Semi-rural and acreage zones in Greenbank/Jimboomba permit up to 2.1m post heights for animal security.',
      phone: '(07) 3412 3412',
      portalUrl: 'https://www.logan.qld.gov.au/planning-and-building'
    },
    goldcoast: {
      name: 'City of Gold Coast',
      planName: 'City Plan (Gold Coast)',
      maxFrontSolid: 1.2,
      maxFrontPermeable: 1.8,
      minPermeability: 50,
      maxSideRear: 2.0,
      cornerSplay: '2.5m x 2.5m splay on canal frontages & corner blocks',
      characterOverlayNotes: 'Marine waterfront lots have specific waterfront setback rules to preserve neighbour canal sightlines.',
      phone: '1300 465 326',
      portalUrl: 'https://www.goldcoast.qld.gov.au/Planning-building'
    },
    moretonbay: {
      name: 'City of Moreton Bay',
      planName: 'Moreton Bay Regional Council Planning Scheme',
      maxFrontSolid: 1.2,
      maxFrontPermeable: 1.8,
      minPermeability: 50,
      maxSideRear: 2.0,
      cornerSplay: '3m splay truncation on collector roads',
      characterOverlayNotes: 'Coastal marine overlay in Redcliffe requires certified anti-corrosive powdercoat or structural aluminium.',
      phone: '(07) 3205 0555',
      portalUrl: 'https://www.moretonbay.qld.gov.au/Services/Building-Development'
    }
  };

  const currentCouncil = councilData[selectedCouncil];

  // Calculated Compliance State
  const complianceStatus = useMemo(() => {
    if (fenceHeight <= 1.2) {
      return {
        status: 'exempt',
        title: 'Self-Assessable (No Council Approval Needed)',
        desc: 'Fences and automatic gates up to 1.2m on front boundaries are self-assessable across South East Queensland. You can install without lodging development or siting applications.',
        color: '#10b981',
        bg: '#ecfdf5',
        border: '#a7f3d0'
      };
    } else if (fenceHeight <= 1.8) {
      if (slatGap >= 10) {
        return {
          status: 'compliant-permeable',
          title: 'Permitted with Slat Permeability (50%+ Open Airflow)',
          desc: `At ${fenceHeight}m with ${slatGap}mm slat spacing, this gate qualifies under standard council 50% visual transparency criteria. Complies with ${currentCouncil.name} self-assessable codes.`,
          color: '#2563eb',
          bg: '#eff6ff',
          border: '#bfdbfe'
        };
      } else {
        return {
          status: 'warning-solid',
          title: 'May Require Siting Relaxation (0mm Solid Privacy over 1.2m)',
          desc: `Fences between 1.2m and 1.8m with 0mm or minimal gaps are treated as solid acoustic/privacy walls. You may require a standard boundary siting variation or neighbour sign-off from ${currentCouncil.name}.`,
          color: '#d97706',
          bg: '#fefce8',
          border: '#fde047'
        };
      }
    } else {
      return {
        status: 'approval-required',
        title: 'Building Approval Required (Over 1.8m Front Height)',
        desc: `Front boundary gates exceeding 1.8m require a formal Building Assessment Application (Form 15/16) and structural engineering certification. Our Yamanto team provides full engineered RPEQ drawings for this.`,
        color: '#ef4444',
        bg: '#fef2f2',
        border: '#fecaca'
      };
    }
  }, [fenceHeight, slatGap, currentCouncil]);

  // Schema.org FAQ & HowTo structured data
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How high can a front fence or automated gate be in Brisbane without council approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Brisbane City Council, a front boundary fence or automatic gate up to 1.2 metres high is self-assessable and does not require development approval. Fences between 1.2m and 1.8m are permitted without approval provided the section above 1.2m has at least 50% visual transparency (such as spaced aluminium slats). Gates over 1.8m require building approval."
          }
        },
        {
          "@type": "Question",
          "name": "What are the Queensland swimming pool gate safety laws (AS1926.1)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under Queensland Pool Safety Standard AS1926.1-2012, pool barrier gates must open outwards away from the pool, be fitted with a self-closing and self-latching device that functions from any position, have a latch release at least 1500mm above ground level, maintain a 900mm Non-Climbable Zone (NCZ), and have a ground gap of no more than 100mm."
          }
        },
        {
          "@type": "Question",
          "name": "Who pays for a dividing boundary fence in Queensland?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under the Neighbourhood Disputes (Dividing Fences and Trees) Act 2011 (Qld), adjoining neighbours are equally responsible for contributing to a 'sufficient dividing fence'. Before construction, a formal Form 2 (Notice to Contribute) should be served to the neighbour detailing the quote and fence specifications."
          }
        }
      ]
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
          1. HERO HEADER: QUEENSLAND COUNCIL PLANNING & FENCE GUIDE
          ========================================================================= */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #1e293b 100%)',
        color: '#ffffff',
        padding: '5rem 0 4rem 0',
        overflow: 'hidden'
      }}>
        {/* Background ambient glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <button onClick={onNavigateHome} style={{ color: '#94a3b8', cursor: 'pointer' }}>Home</button>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Queensland Council & Pool Safety Guide</span>
          </div>

          <div style={{ maxWidth: '860px', marginBottom: '2.5rem' }}>
            <span className="badge-tag badge-gold" style={{ marginBottom: '1rem' }}>
              <Scale size={14} />
              BCC, ICC, Logan & QLD Pool Safety (AS1926.1)
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}>
              Queensland Council Planning & <br />
              <span className="gradient-text-gold">Fence Height Regulations Guide</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
              color: '#cbd5e1',
              lineHeight: 1.65
            }}>
              Everything South East Queensland homeowners, builders, and developers need to know about front fence limits, visual permeability ratios, corner sight-triangles, and swimming pool barrier compliance.
            </p>
          </div>

          {/* Quick Council Selector Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none'
          }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginRight: '0.5rem', flexShrink: 0 }}>
              Select Council:
            </span>
            {[
              { id: 'brisbane', label: 'Brisbane City Council' },
              { id: 'ipswich', label: 'Ipswich City Council' },
              { id: 'logan', label: 'Logan City Council' },
              { id: 'goldcoast', label: 'City of Gold Coast' },
              { id: 'moretonbay', label: 'City of Moreton Bay' }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCouncil(c.id)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  background: selectedCouncil === c.id ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCouncil === c.id ? '#0f172a' : '#ffffff',
                  border: selectedCouncil === c.id ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. NAVIGATION TABS: HEIGHT RULES / POOL COMPLIANCE / DIVIDING FENCES / CALCULATOR
          ========================================================================= */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '70px', zIndex: 40 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {[
              { id: 'height-rules', label: 'Council Height & Setback Rules', icon: Building },
              { id: 'calculator', label: 'Interactive Compliance Checker', icon: Sliders },
              { id: 'pool-safety', label: 'Pool Safety Gate Laws (AS1926.1)', icon: Waves },
              { id: 'dividing-fences', label: 'Dividing Fences Act & Cost Sharing', icon: Scale }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 0.25rem',
                    borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
                    color: isActive ? '#2563eb' : 'var(--text-muted)',
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '0.9rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT TABS
          ========================================================================= */}
      <main className="section section-light">
        <div className="container">

          {/* TAB 1: COUNCIL HEIGHT & SETBACK RULES */}
          {activeTab === 'height-rules' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Selected Council Overview Banner */}
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge-tag badge-blue" style={{ marginBottom: '0.5rem' }}>
                      <MapPin size={12} /> Local Planning Scheme
                    </span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                      {currentCouncil.name}
                    </h2>
                    <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                      Under {currentCouncil.planName} & Queensland Development Code (QDC MP1.1 / MP1.2)
                    </span>
                  </div>

                  <a
                    href={currentCouncil.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm"
                    style={{ borderRadius: '8px', fontSize: '0.82rem' }}
                  >
                    <span>Council Planning Portal</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* 3-Column Height Thresholds */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  {/* Front Boundary Solid */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Front Boundary (Solid)
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', margin: '0.35rem 0' }}>
                      Max {currentCouncil.maxFrontSolid}m
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      Solid acoustic walls, rendered masonry, or 0mm solid slat gates up to 1.2m require no permit.
                    </p>
                  </div>

                  {/* Front Boundary 50% Permeable */}
                  <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1d4ed8', textTransform: 'uppercase' }}>
                      Front Boundary (Permeable)
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e40af', margin: '0.35rem 0' }}>
                      Up to {currentCouncil.maxFrontPermeable}m
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#1e3a8a', lineHeight: 1.5, margin: 0 }}>
                      Permitted without approval if the section above 1.2m has at least <strong>50% visual transparency</strong> (e.g. spaced slats).
                    </p>
                  </div>

                  {/* Side & Rear Boundary */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Side & Rear Boundaries
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', margin: '0.35rem 0' }}>
                      Up to {currentCouncil.maxSideRear}m
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      Standard dividing side and back boundary fences can be built up to 2.0m without a council building application.
                    </p>
                  </div>
                </div>

                {/* Critical Sight Triangles & Heritage Callouts */}
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '0 10px 10px 0', fontSize: '0.84rem', color: '#78350f' }}>
                    <strong>Driveway & Corner Splay Rule:</strong> {currentCouncil.cornerSplay}. Gate pillars and solid infill panels cannot obstruct driver sightlines of footpaths.
                  </div>
                  <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '0 10px 10px 0', fontSize: '0.84rem', color: '#064e3b' }}>
                    <strong>Heritage & Character Overlays:</strong> {currentCouncil.characterOverlayNotes}
                  </div>
                </div>
              </div>

              {/* What Happens When You Exceed 1.8m? */}
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 3vw, 2rem)'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Need a Gate Taller than 1.8m? How Custom Auto Gates Handles It:
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  If your property requires maximum 2.1m or 2.4m security gates, or your driveway is on a steep cross-fall gradient, you do not need to deal with complicated council paperwork alone.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                      1. RPEQ Engineered Drawings
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      We provide wind-load certified RPEQ structural drawings for post footings and aluminium frames.
                    </p>
                  </div>

                  <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                      2. Form 15 / Form 16 Certification
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      Direct compliance certification signed off for private building certifiers across SEQ.
                    </p>
                  </div>

                  <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                      3. Siting Variation Assistance
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      We assist with boundary relaxation documentation for Brisbane & Ipswich City Councils.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE COMPLIANCE CALCULATOR */}
          {activeTab === 'calculator' && (
            <div style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
                <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                  <Sliders size={13} /> Live Visual Rule Simulator
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>
                  Interactive Gate Compliance Checker
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Adjust the height and slat spacing sliders below to instantly verify if your proposed driveway gate complies with <strong>{currentCouncil.name}</strong> standards.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2rem', alignItems: 'center' }}>
                {/* Sliders Control Panel */}
                <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  {/* Slider 1: Height */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a' }}>
                        Proposed Gate Height:
                      </label>
                      <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2563eb', background: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        {fenceHeight} meters ({Math.round(fenceHeight * 1000)}mm)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.9"
                      max="2.4"
                      step="0.05"
                      value={fenceHeight}
                      onChange={(e) => setFenceHeight(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#2563eb', height: '6px', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                      <span>0.9m (Picket)</span>
                      <span>1.2m (Exempt Limit)</span>
                      <span>1.8m (Permeable Limit)</span>
                      <span>2.4m (High Security)</span>
                    </div>
                  </div>

                  {/* Slider 2: Slat Gap Spacing */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a' }}>
                        Aluminium Slat Gap Spacing:
                      </label>
                      <span style={{ fontSize: '1.1rem', fontWeight: '900', color: slatGap === 0 ? '#d97706' : '#10b981', background: slatGap === 0 ? '#fefce8' : '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        {slatGap === 0 ? '0mm (100% Solid Privacy)' : `${slatGap}mm (${Math.round((slatGap / (65 + slatGap)) * 100)}% Airflow)`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={slatGap}
                      onChange={(e) => setSlatGap(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: '#10b981', height: '6px', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                      <span>0mm (Full Privacy)</span>
                      <span>9mm (Council Slat)</span>
                      <span>20mm (50%+ Open)</span>
                      <span>50mm (Open Louver)</span>
                    </div>
                  </div>
                </div>

                {/* Live Real-time Compliance Result Card */}
                <div style={{
                  background: complianceStatus.bg,
                  border: `2px solid ${complianceStatus.border}`,
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                      {complianceStatus.status === 'exempt' ? (
                        <CheckCircle2 size={24} style={{ color: complianceStatus.color }} />
                      ) : complianceStatus.status === 'compliant-permeable' ? (
                        <CheckCircle2 size={24} style={{ color: complianceStatus.color }} />
                      ) : complianceStatus.status === 'warning-solid' ? (
                        <AlertTriangle size={24} style={{ color: complianceStatus.color }} />
                      ) : (
                        <AlertTriangle size={24} style={{ color: complianceStatus.color }} />
                      )}
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: complianceStatus.color, margin: 0 }}>
                        {complianceStatus.title}
                      </h3>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {complianceStatus.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                      Target: {currentCouncil.name}
                    </span>
                    <button
                      onClick={onOpenQuote}
                      className="btn btn-gold btn-sm"
                      style={{ borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800' }}
                    >
                      <span>Get Custom Quote for this Spec</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: POOL SAFETY LAWS (AS1926.1) */}
          {activeTab === 'pool-safety' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)'
              }}>
                <span className="badge-tag" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: '0.75rem' }}>
                  <Waves size={13} /> Queensland Pool Safety Standard AS1926.1-2012
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#ffffff', marginBottom: '0.75rem' }}>
                  Automated Driveway & Pedestrian Pool Barrier Laws
                </h2>
                <p style={{ fontSize: '0.94rem', color: '#e0f2fe', lineHeight: 1.6, maxWidth: '800px', margin: 0 }}>
                  In Queensland, if an automated gate or fence forms any part of a designated swimming pool safety barrier enclosure, it MUST strictly comply with state pool safety legislation to pass certification.
                </p>
              </div>

              {/* Pool Safety Checklist Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      1
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Minimum 1200mm Height
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    The top of the gate/fence barrier must be at least 1.2m above finished ground level outside the pool area at all points.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      2
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Opens Outwards Only
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Pool pedestrian gates MUST open outwards (away from the swimming pool enclosure) so children cannot push them inward to gain access.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      3
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Self-Closing & Self-Latching
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Must automatically close and latch from ANY position, including resting gently against the striker pin. Automated gates must have timed auto-close enabled.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      4
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      1500mm Latch Release Height
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    The manual latch release knob must be positioned at least 1.5m above ground level (or shielded inside the gate).
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      5
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Max 100mm Ground Gap
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    The gap between the bottom of the fence/gate and the finished ground level cannot exceed 100mm.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      6
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      900mm Non-Climbable Zone (NCZ)
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    No horizontal rails, steps, taps, or climbable objects allowed within a 900mm arc radius on the outside of the barrier.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIVIDING FENCES ACT 2011 */}
          {activeTab === 'dividing-fences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 3vw, 2rem)'
              }}>
                <span className="badge-tag badge-gold" style={{ marginBottom: '0.75rem' }}>
                  <Scale size={13} /> Queensland Legislation
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Neighbourhood Disputes (Dividing Fences and Trees) Act 2011
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Replacing or installing a shared boundary fence with your neighbour in Queensland follows a clear legal framework. Here is how cost-sharing and notices work:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                      The "Sufficient Dividing Fence" Rule
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      Adjoining owners are legally required to contribute 50% towards a "sufficient" standard fence (e.g. 1.8m timber paling or Colorbond). If one neighbour requests premium architectural aluminium slats, they pay the difference unless agreed otherwise.
                    </p>
                  </div>

                  <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                      Serving a Form 2 (Notice to Contribute)
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      You must give your neighbour a written <strong>Form 2 Notice</strong> with at least one written quote before beginning any demolition or construction work. The neighbour has 30 days to respond.
                    </p>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: '800', color: '#166534', fontSize: '0.92rem' }}>
                      Need an itemized quote for your neighbour or body corporate?
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#15803d' }}>
                      We provide official split-quote documentation ready for Form 2 attachments.
                    </div>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="btn btn-dark btn-sm"
                    style={{ borderRadius: '8px', fontSize: '0.82rem' }}
                  >
                    Request Form 2 Quote
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              4. BOTTOM CALLOUT: FREE ADVICE & WORKSHOP CONTACT
              ===================================================================== */}
          <div style={{
            marginTop: '3rem',
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
                <Shield size={13} />
                QBCC Licence #15579753 • 20+ Years in Yamanto
              </span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', color: '#ffffff', marginBottom: '0.75rem' }}>
                Unsure About Your Council Boundary Limits?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Book a free on-site laser measure. Our experienced technicians inspect your boundary pegs, calculate slope gradient clearances, and ensure 100% council compliance before fabrication.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenContact}
                className="btn btn-gold btn-lg"
                style={{ borderRadius: '12px' }}
              >
                <Sparkles size={18} /> Book Free On-Site Measure
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
      </main>
    </div>
  );
}
