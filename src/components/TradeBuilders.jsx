import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Download, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Factory, 
  Ruler, 
  Calculator, 
  Sparkles, 
  Layers, 
  HardHat, 
  Send, 
  ChevronRight, 
  FileCode, 
  FileCheck, 
  FileSpreadsheet, 
  Zap, 
  HelpCircle,
  Truck,
  Percent,
  Check,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function TradeBuilders({ onOpenQuote, onOpenContact, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('lead-times'); // 'lead-times' | 'spec-sheets' | 'pricing-tiers'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState(null);

  const [tradeForm, setTradeForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    abn: '',
    tradeType: 'residential-builder',
    annualVolume: '1-5',
    projectAddress: '',
    projectDueDate: '',
    comments: '',
  });

  const LEAD_TIMES = [
    {
      category: 'Standard Slat Sliding Gates',
      standardTime: '7 – 10 Business Days',
      fastTrackTime: '5 Business Days',
      idealFor: 'Custom Homes, Townhouses, Volume Builds',
      specs: 'TIG-welded 6060-T5 aluminium, 65x16mm / 90x16mm slats, Smart automation ready',
      status: 'In Stock & Pre-Cut'
    },
    {
      category: 'Architectural Swing & Bi-Fold Gates',
      standardTime: '10 – 14 Business Days',
      fastTrackTime: '7 Business Days',
      idealFor: 'Sloping Driveways, Luxury Residences, Commercial Entry',
      specs: 'Heavy duty internal ball bearing hinges, concealed drop bolts, Vantage 400/500 arms',
      status: 'Normal Production'
    },
    {
      category: 'Commercial Boom & Cantilever Gates (8m+)',
      standardTime: '14 – 21 Business Days',
      fastTrackTime: '10 Business Days',
      idealFor: 'Warehouses, Industrial Estates, Logistics Yards, Strata',
      specs: '100x100mm heavy box section, internal enclosed roller track carriage, 100% duty cycle',
      status: 'Fast-Track Available'
    },
    {
      category: 'Powder Coating Only (Blondies Yamanto)',
      standardTime: '3 – 5 Business Days',
      fastTrackTime: '48 Hours',
      idealFor: 'Fabricators, Fence Erectors, Aluminium Windows',
      specs: 'Dulux Duralloy & Interpon D1000 architectural grade warranty finishes with chemical pre-treatment',
      status: 'Daily Oven Cycles'
    },
    {
      category: 'Aluminium Slat Infill Fencing & Panels',
      standardTime: '5 – 7 Business Days',
      fastTrackTime: '3 Business Days',
      idealFor: 'Front Boundary Walls, Meter Box Enclosures, Pool Boundaries',
      specs: 'Pre-assembled or flat-pack knocked down panels with snap-fit channels & brackets',
      status: 'High Stock'
    }
  ];

  const SPEC_SHEETS = [
    {
      id: 'sliding-gate-cad',
      title: 'Architectural Sliding Gate & Track Footing Detail',
      desc: 'Concrete footing slab specifications, drainage fall gradients, conduit entry points, and post clearance engineering details (PDF/DWG format).',
      fileSize: '2.4 MB PDF',
      icon: FileCode,
      category: 'Engineering & Footings',
      filename: 'CAG-Architectural-Sliding-Gate-Footing-Spec.pdf'
    },
    {
      id: 'gate-wiring-conduits',
      title: 'Gate Automation Pre-Wire & Electrical Schedule',
      desc: '240V mains isolating switch placement, 12V safety sensor conduit paths, solar panel orientation, and keyfob receiver wiring diagrams.',
      fileSize: '1.8 MB PDF',
      icon: Zap,
      category: 'Electrical & Automation',
      filename: 'CAG-Gate-Automation-Prewire-Schedule.pdf'
    },
    {
      id: 'pool-safety-as1926',
      title: 'AS1926.1 Swimming Pool Barrier & Gate Compliance Certificate',
      desc: 'Self-closing latch geometry, 900mm non-climbable zone (NCZ), hydraulic gate damper specs, and Form 15 structural design certificate.',
      fileSize: '3.1 MB PDF',
      icon: ShieldCheck,
      category: 'Compliance & Safety',
      filename: 'CAG-AS1926-Pool-Gate-Compliance-Schedule.pdf'
    },
    {
      id: 'powder-coating-warranty',
      title: 'Blondies Powder Coating Dulux Color Matrix & Warranty Guide',
      desc: 'Full Colorbond architectural color matching chart, salt-spray marine environment warranties, and maintenance cleaning protocols.',
      fileSize: '1.5 MB PDF',
      icon: FileSpreadsheet,
      category: 'Finishes & Durability',
      filename: 'CAG-Blondies-Powder-Coat-Color-Warranty-Spec.pdf'
    }
  ];

  const handleDownload = (doc) => {
    setDownloadingDoc(doc.id);

    // Create a rich formatted architectural specification text document for instant download
    const content = `================================================================================
CUSTOM AUTO GATES PTY LTD & BLONDIES POWDER COATING
Shed 2, 43-45 Belar Street, Yamanto QLD 4305 | (07) 3102 1801
QBCC Licence: #15579753 | ABN: 84 624 391 108
================================================================================

DOCUMENT: ${doc.title.toUpperCase()}
CATEGORY: ${doc.category}
ISSUED FOR: Trade, Builders, Architects & Specifiers
DATE GENERATED: ${new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' })}

1.0 SCOPE & MATERIAL SPECIFICATIONS
--------------------------------------------------------------------------------
- Material Standard: Marine Grade 6060-T5 Structural Extruded Aluminium.
- Welding Protocol: Certified AS/NZS ISO 9606.2 TIG/MIG argon shielded welded construction.
- Tensile Yield Strength: Minimum 160 MPa.
- Finish: Dulux Duralloy / Interpon D1000 Commercial Electrostatic Powder Coating (AS3715 Compliant).
- Standard Lead Time: 7 to 10 business days from approved CAD drawings.

2.0 AUTOMATION & HARDWARE INTEGRATION
--------------------------------------------------------------------------------
- Motor System: Standard, Smart, Solar or Commercial Inverter Actuators.
- Controller: Intelligent Bluetooth / GSM smartphone cloud control with battery backup (AS/NZS 60335.2.103 compliant).
- Safety Sensors: Monitored Wireless Infra-Red Beams (Photon Smart / i5) meeting EN 12453 safety standards.
- Track Profile: Heavy-duty galvanized steel or stainless-steel inverted-Y track with M10 expansion anchors @ 450mm c/c.

3.0 COMPLIANCE & WARRANTY SCHEDULE
--------------------------------------------------------------------------------
- 10-Year In-House Structural Integrity Factory Warranty on all aluminium welds and frame fabrications.
- 3-Year On-Site Manufacturer Replacement Warranty on automation motors and control boards.
- 7-Year Powder Coating Adhesion Warranty against peeling, flaking, or chalking under normal atmospheric conditions.

FOR DETAILED CAD/DWG INTEGRATION OR PROJECT PRICING:
Direct Trade Estimating: trade@customautogates.com.au
Workshop Office: (07) 3102 1801
Yamanto Workshop: Shed 2, 43-45 Belar Street, Yamanto QLD 4305
================================================================================`;

    setTimeout(() => {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.filename.replace('.pdf', '-Spec-Summary.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadingDoc(null);
    }, 600);
  };

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', color: 'var(--text-main)' }}>
      {/* 1. Trade & Builders Hero Header */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090e1a 0%, #111a2e 100%)',
        color: '#ffffff',
        padding: 'clamp(3.5rem, 6vw, 5.5rem) 0 clamp(2.5rem, 4vw, 3.5rem) 0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-light)'
      }}>
        {/* Background Grid Pattern Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '820px' }}>
            {/* Top Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span style={{
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                borderRadius: '9999px',
                padding: '0.25rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <HardHat size={14} /> Commercial & Trade Portal
              </span>
              <span style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
                border: '1px solid rgba(147, 197, 253, 0.4)',
                borderRadius: '9999px',
                padding: '0.25rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <Factory size={14} /> In-House Fabrication & Powder Coating
              </span>
              <span style={{
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#6ee7b7',
                border: '1px solid rgba(110, 231, 183, 0.4)',
                borderRadius: '9999px',
                padding: '0.25rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <ShieldCheck size={14} /> QBCC #15579753
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              marginBottom: '1rem'
            }}>
              Direct Wholesale Gate Fabrication for <br />
              <span className="gradient-text-gold">Builders, Developers & Contractors</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#cbd5e1',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '720px'
            }}>
              Eliminate middlemen delays and sub-contractor markups. We engineer, TIG weld, powder coat (Blondies Powder Coating), and automate custom sliding, swing, and cantilever gates in our Yamanto facility with guaranteed handover lead times.
            </p>

            {/* Quick Action CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <a 
                href="#trade-quote-form" 
                className="btn btn-gold btn-lg btn-pulse" 
                style={{ fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('trade-quote-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Percent size={18} /> Request Trade Pricing & Account
              </a>

              <a 
                href="#spec-sheets"
                className="btn btn-outline-dark btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(8px)' }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('spec-sheets');
                  document.getElementById('trade-tabs-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Download size={18} /> Download CAD & Spec Sheets
              </a>

              <a 
                href="tel:0731021801" 
                className="btn-outline-dark" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffff',
                  fontWeight: '800',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  textDecoration: 'none'
                }}
              >
                <Phone size={17} style={{ color: 'var(--accent-gold)' }} />
                <span>Trade Desk: (07) 3102 1801</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Builder Value Proposition Badges */}
      <section style={{ backgroundColor: 'var(--bg-card)', padding: '2.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: Clock,
                color: '#f59e0b',
                title: 'Guaranteed Lead Times',
                desc: 'Strict 7–10 day turnaround on standard custom sliding gates to keep your project on handover schedule.'
              },
              {
                icon: Factory,
                color: '#3b82f6',
                title: 'In-House Blondies Coating',
                desc: 'No outsourcing to third-party coaters. We handle sandblasting, chemical pre-treatment, and architectural powder coating in-house.'
              },
              {
                icon: ShieldCheck,
                color: '#10b981',
                title: 'QBCC & AS Compliance',
                desc: 'Full compliance with AS1926.1 Pool Safety, AS/NZS 60335 gate automation, and QBCC licensed structural welding.'
              },
              {
                icon: Percent,
                color: '#a855f7',
                title: 'Volume Wholesale Rates',
                desc: 'Tiered wholesale multipliers, 30-day trade accounts, and site delivery across Greater Brisbane, Ipswich, and Gold Coast.'
              }
            ].map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <div key={i} style={{
                  padding: '1.25rem',
                  borderRadius: '16px',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: `${feature.color}15`,
                    color: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `1px solid ${feature.color}35`
                  }}>
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Trade Portal Interactive Tabs Section */}
      <section id="trade-tabs-section" style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 0', backgroundColor: 'var(--bg-body)' }}>
        <div className="container">
          {/* Section Heading & Live Workshop Capacity Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                Trade Specification Hub
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: '900', color: 'var(--text-heading)', margin: 0 }}>
                Fabrication Capacity & Technical Schedules
              </h2>
            </div>

            {/* Live Capacity Indicator */}
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '12px',
              padding: '0.65rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <div>
                <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Yamanto Workshop Status
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                  Normal High-Speed Schedule (7–10 Days)
                </div>
              </div>
            </div>
          </div>

          {/* Tab Selection Bar */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '2px solid var(--border-light)',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem'
          }}>
            {[
              { id: 'lead-times', label: 'Lead Times & Capacity', icon: Clock },
              { id: 'spec-sheets', label: 'CAD & Spec Sheets (Download)', icon: FileCode },
              { id: 'pricing-tiers', label: 'Trade Discount Tiers', icon: Percent },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.85rem 1.4rem',
                    background: isActive ? 'var(--accent-gold)' : 'transparent',
                    color: isActive ? '#0f172a' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: '10px 10px 0 0',
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <TabIcon size={17} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: LEAD TIMES & CAPACITY TABLE */}
          {activeTab === 'lead-times' && (
            <div className="animate-fadeIn">
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1.5px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '2rem'
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-card-muted)', borderBottom: '1.5px solid var(--border-light)' }}>
                        <th style={{ padding: '1rem 1.25rem', color: 'var(--text-heading)', fontWeight: '800' }}>Product Category</th>
                        <th style={{ padding: '1rem 1.25rem', color: '#f59e0b', fontWeight: '800' }}>Standard Trade Lead Time</th>
                        <th style={{ padding: '1rem 1.25rem', color: '#10b981', fontWeight: '800' }}>Fast-Track Priority</th>
                        <th style={{ padding: '1rem 1.25rem', color: 'var(--text-heading)', fontWeight: '800' }}>Ideal For</th>
                        <th style={{ padding: '1rem 1.25rem', color: 'var(--text-heading)', fontWeight: '800' }}>Current Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LEAD_TIMES.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '1.15rem 1.25rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                            {item.category}
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '400', marginTop: '0.2rem' }}>
                              {item.specs}
                            </div>
                          </td>
                          <td style={{ padding: '1.15rem 1.25rem', fontWeight: '800', color: '#f59e0b' }}>
                            {item.standardTime}
                          </td>
                          <td style={{ padding: '1.15rem 1.25rem', fontWeight: '800', color: '#10b981' }}>
                            ⚡ {item.fastTrackTime}
                          </td>
                          <td style={{ padding: '1.15rem 1.25rem', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                            {item.idealFor}
                          </td>
                          <td style={{ padding: '1.15rem 1.25rem' }}>
                            <span style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(16, 185, 129, 0.15)',
                              color: '#34d399',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              fontSize: '0.76rem',
                              fontWeight: '700'
                            }}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fast-Track Emergency Production Notice */}
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Sparkles size={24} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontWeight: '800', color: '#fbbf24', fontSize: '0.98rem' }}>
                      Need an Emergency Handover Gate in 5 Business Days?
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      We offer VIP Builder Fast-Track slots for handover deadlines and council compliance inspections.
                    </p>
                  </div>
                </div>
                <a 
                  href="tel:0731021801" 
                  className="btn btn-gold btn-sm"
                  style={{ fontWeight: '800', whiteSpace: 'nowrap' }}
                >
                  Call Fast-Track Hotline
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: DOWNLOADABLE SPEC SHEETS & CAD DETAILS */}
          {activeTab === 'spec-sheets' && (
            <div className="animate-fadeIn">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {SPEC_SHEETS.map((doc) => {
                  const DocIcon = doc.icon;
                  const isDownloading = downloadingDoc === doc.id;
                  return (
                    <div 
                      key={doc.id}
                      style={{
                        background: 'var(--bg-card)',
                        border: '1.5px solid var(--border-light)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'transform 0.2s ease, border-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <span style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            backgroundColor: 'var(--bg-card-muted)',
                            color: 'var(--accent-gold)',
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                          }}>
                            {doc.category}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.fileSize}</span>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <DocIcon size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                          {doc.title}
                        </h3>

                        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                          {doc.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDownload(doc)}
                        disabled={isDownloading}
                        className="btn btn-outline-dark"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          fontWeight: '700',
                          fontSize: '0.88rem',
                          backgroundColor: 'var(--bg-card-subtle)'
                        }}
                      >
                        <Download size={16} />
                        {isDownloading ? 'Generating Spec Pack...' : 'Download Technical Spec Sheet'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Custom CAD / Architect Specifier Support */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(17, 26, 46, 0.6) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '16px',
                padding: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.25rem'
              }}>
                <div style={{ maxWidth: '680px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.35rem' }}>
                    Need Custom 3D CAD or DWG Drawing Files for Your Plans?
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0 }}>
                    Our in-house design draftsmen provide direct .DWG, .DXF, and .PDF dimensioned elevation drawings tailored to your client's architectural gate opening.
                  </p>
                </div>
                <a 
                  href="mailto:trade@customautogates.com.au?subject=CAD%20Drawing%20Request%20for%20Project"
                  className="btn btn-blue btn-md"
                  style={{ fontWeight: '800' }}
                >
                  <Mail size={16} /> Email Plan for Free CAD Spec
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: TRADE PRICING TIERS & 30-DAY ACCOUNTS */}
          {activeTab === 'pricing-tiers' && (
            <div className="animate-fadeIn">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Tier 1 */}
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-light)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <span className="badge-tag badge-blue" style={{ marginBottom: '0.5rem' }}>Tier 1 Builder</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                    Custom Home Builders
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                    For residential builders constructing 1 to 5 homes per year.
                  </p>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
                    15% OFF <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Wholesale Margin</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Free On-Site Laser Measure & Site Assessment</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Direct Site Delivery Across SEQ (Brisbane / Ipswich)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> 10-Year Factory Warranty Pass-Through</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> 7–10 Day Standard Fabrication</li>
                  </ul>
                  <a href="#trade-quote-form" className="btn btn-outline-dark" style={{ width: '100%', textAlign: 'center' }}>
                    Apply for Tier 1 Account
                  </a>
                </div>

                {/* Tier 2 (Featured) */}
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '2px solid var(--accent-gold)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-xl)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0f172a',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Most Popular
                  </div>
                  <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>Tier 2 Volume</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                    Commercial & Multi-Dwelling
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                    For developers, townhouse builders, and multi-lot projects.
                  </p>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
                    25% OFF <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Volume Matrix</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Dedicated Factory Project Estimator</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> 30-Day End-of-Month Trade Credit Account</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Fast-Track 5-Day Priority Production Slot</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Pre-wired Track & Post Footing Packs</li>
                  </ul>
                  <a href="#trade-quote-form" className="btn btn-gold" style={{ width: '100%', textAlign: 'center', fontWeight: '800' }}>
                    Apply for 30-Day Account
                  </a>
                </div>

                {/* Tier 3 */}
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-light)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <span className="badge-tag badge-green" style={{ marginBottom: '0.5rem' }}>Tier 3 Trade</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                    Fencing Subcontractors
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                    For fencing contractors needing frames, panels & powder coating.
                  </p>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
                    Direct Wholesale <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Cut & Coat</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Bare Aluminum Frame Welding & Supply</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Blondies Powder Coating Sub-Service (3 Days)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Gate Automation Hardware at Trade Pricing</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} style={{ color: '#10b981' }} /> Yamanto Factory Pickup Dock Available</li>
                  </ul>
                  <a href="#trade-quote-form" className="btn btn-outline-dark" style={{ width: '100%', textAlign: 'center' }}>
                    Register Trade Subcontractor
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. High-Converting Trade Quote & 30-Day Account Application Form */}
      <section id="trade-quote-form" style={{
        padding: 'clamp(3.5rem, 6vw, 5rem) 0',
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-body)',
            borderRadius: '24px',
            border: '1.5px solid var(--border-subtle)',
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                Instant Project Quote
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: '900', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>
                Request Trade Pricing & Project Schedule
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '560px', margin: '0 auto' }}>
                Upload your plans or enter project dimensions. Our senior trade estimator will return an itemized wholesale bill of quantities within 4 business hours.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                backgroundColor: 'var(--badge-green-bg)',
                border: '1px solid var(--badge-green-border)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-emerald)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--badge-green-text)', marginBottom: '0.5rem' }}>
                  Trade Request Dispatched to Yamanto Estimating!
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                  Thank you <strong>{tradeForm.contactName || tradeForm.companyName}</strong>. Your project inquiry has been prioritized in our commercial estimating queue. A senior fabricator will review your specifications and contact you shortly.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={COMPANY_INFO.tel} className="btn btn-gold btn-md" style={{ fontWeight: '800' }}>
                    <Phone size={17} /> Direct Estimator Hotline: (07) 3102 1801
                  </a>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="btn btn-outline-dark btn-md"
                  >
                    Submit Another Project
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Row 1: Company & Contact */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Company / Trading Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Constructions QLD"
                      value={tradeForm.companyName}
                      onChange={(e) => setTradeForm({ ...tradeForm, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Contact Name & Role *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dave Miller (Site Supervisor)"
                      value={tradeForm.contactName}
                      onChange={(e) => setTradeForm({ ...tradeForm, contactName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dave@apexconstructions.com.au"
                      value={tradeForm.email}
                      onChange={(e) => setTradeForm({ ...tradeForm, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Mobile / Direct Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      value={tradeForm.phone}
                      onChange={(e) => setTradeForm({ ...tradeForm, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: ABN & Trade Category */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      ABN / ACN (For Trade Account Verification)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12 345 678 901"
                      value={tradeForm.abn}
                      onChange={(e) => setTradeForm({ ...tradeForm, abn: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Trade Category *
                    </label>
                    <select
                      value={tradeForm.tradeType}
                      onChange={(e) => setTradeForm({ ...tradeForm, tradeType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="residential-builder">Residential Custom Builder</option>
                      <option value="commercial-builder">Commercial Builder / Developer</option>
                      <option value="fencing-contractor">Fencing & Gate Contractor</option>
                      <option value="architect-specifier">Architect / Landscape Designer</option>
                      <option value="strata-body-corp">Strata / Body Corporate Manager</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Site Suburb & Handover Due Date */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Site Location / Suburb *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Newstead, Springfield, Hope Island"
                      value={tradeForm.projectAddress}
                      onChange={(e) => setTradeForm({ ...tradeForm, projectAddress: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                      Required On-Site Date / Handover Deadline
                    </label>
                    <input
                      type="date"
                      value={tradeForm.projectDueDate}
                      onChange={(e) => setTradeForm({ ...tradeForm, projectDueDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-heading)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Scope & Gate Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                    Project Specifications, Dimensions or Gate Style (Sliding / Swing / Slat Fencing)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter gate widths, motor preferences (Standard / Smart / Solar / Commercial), Colorbond color (Monument / Surfmist), or driveway slope notes..."
                    value={tradeForm.comments}
                    onChange={(e) => setTradeForm({ ...tradeForm, comments: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text-heading)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="btn btn-gold btn-lg btn-pulse"
                  style={{
                    width: '100%',
                    padding: '1.1rem',
                    fontWeight: '900',
                    fontSize: '1.05rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <Send size={19} /> Submit for Wholesale Trade Quote & 30-Day Account Review
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} style={{ color: '#10b981' }} />
                  <span>Strict confidentiality • Direct factory pricing • Fast 4-hour quote turnaround</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. Direct Outreach & Contact Footer Banner */}
      <section style={{
        padding: '3rem 0',
        background: 'linear-gradient(135deg, #090e1a 0%, #0d1527 100%)',
        borderTop: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ffffff', margin: '0 0 0.25rem 0' }}>
                Visiting Yamanto Workshop or Dropping Off Custom Samples?
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                Shed 2, 43-45 Belar Street, Yamanto QLD 4305 • Monday to Friday: 9:00 AM – 4:00 PM
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a 
                href="mailto:trade@customautogates.com.au" 
                className="btn btn-outline-dark btn-md"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <Mail size={16} style={{ color: '#60a5fa' }} /> trade@customautogates.com.au
              </a>
              <a 
                href={COMPANY_INFO.tel} 
                className="btn btn-gold btn-md"
                style={{ fontWeight: '800' }}
              >
                <Phone size={16} /> (07) 3102 1801
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
