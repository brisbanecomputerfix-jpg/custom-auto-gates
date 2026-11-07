import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Phone, 
  ArrowRight, 
  Building2, 
  Zap, 
  Sun, 
  Sliders, 
  ChevronDown, 
  ChevronUp,
  Award,
  Layers,
  Star
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function PricingGuide({ onOpenQuote, onOpenContact, onNavigateHome }) {
  const [openFaq, setOpenFaq] = useState(0);

  // Injects dynamic FAQPage schema for Google Featured Snippets & rich results
  useEffect(() => {
    const faqSchemaId = 'pricing-faq-schema';
    let scriptElem = document.getElementById(faqSchemaId);
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = faqSchemaId;
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://customautogates.com.au/pricing-guide#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to install an automatic sliding gate in Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Brisbane and South East Queensland, installing a custom automatic sliding gate typically costs between $3,800 and $7,500 for standard residential driveways (4m to 5m wide), including fabrication, Dulux powdercoating, ground track installation, and a high-speed smart motor with battery backup. Premium telescopic sliding gates or architectural batten designs generally range from $6,800 to $12,500. Buying factory direct from our Yamanto workshop eliminates middleman reseller markups, saving homeowners between $1,200 and $2,500."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best gate design for wide driveways?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For wide driveways exceeding 5 to 6 metres, the best gate designs are telescopic automatic sliding gates or cantilever (trackless) sliding gates. Telescopic gates use 2 or 3 overlapping leaves that slide simultaneously, requiring only half the slide-back clearance of a single leaf gate. For rural acreage driveways wider than 6 metres, a heavy-duty dual swing gate powered by 24V linear ram actuators provides maximum opening width without requiring a ground track."
          }
        },
        {
          "@type": "Question",
          "name": "How much does an automatic double swing gate cost in Brisbane?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Automatic double swing gates in Brisbane generally cost between $4,500 and $9,200 installed. The cost depends on the driveway opening width, gate leaf weight, post footing engineering, and actuator motors selected (linear worm-drive rams, articulated arms, or concealed underground motors)."
          }
        },
        {
          "@type": "Question",
          "name": "Is solar power cheaper than running mains power to an electric gate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, especially on acreage or long driveways. Trenching 240V mains power over 30 metres typically costs $3,500 to $8,000 in electrician and excavation fees. An off-grid solar automatic gate kit costs only $900 to $1,800 extra on the gate installation and requires zero trenching, providing 100% storm blackout immunity."
          }
        },
        {
          "@type": "Question",
          "name": "Why is buying factory direct cheaper than using a fencing contractor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fencing contractors and middleman installers buy pre-made gate kits or outsource welding to third-party metal shops, adding a 25% to 40% markup. Buying factory direct from Custom Auto Gates in Yamanto eliminates the middleman, giving you direct access to the fabricators, better structural aluminium, and lower wholesale pricing."
          }
        }
      ]
    };

    scriptElem.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      const el = document.getElementById(faqSchemaId);
      if (el) el.remove();
    };
  }, []);

  const pricingTiers = [
    {
      category: 'Automatic Sliding Gates',
      span: '3.5m – 5.5m',
      typicalCost: '$3,800 – $7,500',
      popularMotor: 'Centurion D5 Smart / Nice Robus',
      includes: 'TIG-welded aluminium frame, Dulux powdercoat, galvanised ground track, 2x remotes, battery backup & safety beams',
      badge: 'Most Popular Driveway Gate'
    },
    {
      category: 'Telescopic Space-Saver Sliding',
      span: '4.0m – 8.0m',
      typicalCost: '$6,800 – $12,500',
      popularMotor: 'Centurion D10 Smart / High-Cycle Synchro',
      includes: '2 or 3 overlapping leaves, synchronised cable drive, half slide-back footprint, premium powdercoating',
      badge: 'Best for Short Setbacks'
    },
    {
      category: 'Double Automated Swing Gates',
      span: '3.5m – 6.0m',
      typicalCost: '$4,500 – $9,200',
      popularMotor: 'Centurion Vantage 400 / 500 Rams',
      includes: 'Twin aluminium gate leaves, heavy-duty ball-bearing pivot hinges, dual linear actuators, magnetic center lock',
      badge: 'Grand Architectural Entrance'
    },
    {
      category: 'Off-Grid Solar Powered Gates',
      span: '4.0m – 7.0m',
      typicalCost: '$4,650 – $9,800',
      popularMotor: 'Low-Standby 12V/24V DC Smart System',
      includes: 'Monocrystalline solar collector, dual deep-cycle AGM battery enclosure, 5–7 days cloudy weather reserve, zero trenching',
      badge: 'Best for Acreage & Rural'
    },
    {
      category: 'Cantilever (Trackless) Sliding',
      span: '4.0m – 10.0m',
      typicalCost: '$7,200 – $14,000',
      popularMotor: 'Centurion D10 / D20 Commercial',
      includes: 'Zero ground track, internal enclosed carriage wheels, suspended counterbalance tail, ideal for steep or rough terrain',
      badge: 'Best for Sloping & Gravel'
    },
    {
      category: 'Aluminium Slat Fencing & Privacy',
      span: 'Per Lineal Metre',
      typicalCost: '$220 – $380 /m',
      popularMotor: 'N/A (Pedestrian Gate Option: $850+)',
      includes: '65mm or 90mm horizontal slats, concealed channel fixings, Dulux powdercoating or timber-look DecoWood',
      badge: 'Matching Boundary Fencing'
    }
  ];

  const costFactors = [
    {
      title: 'Driveway Gradient & Crossfall',
      description: 'Sloping driveways require custom "raked" gate fabrication, bottom rail angle cutting, or trackless cantilever engineering to ensure smooth automated travel without scraping.'
    },
    {
      title: 'Power Availability: Mains vs. Solar',
      description: 'If your gate is over 25 metres from a 240V mains power source, electrical conduit trenching can cost thousands. Our off-grid solar kits completely eliminate trenching expenses.'
    },
    {
      title: 'Infill Design & Wind Permeability',
      description: 'Solid sheet gates in windy bayside areas require heavy-duty commercial motors and deep-set posts. Slat infills with 50% open spacing reduce wind loading and comply with council laws.'
    },
    {
      title: 'Smart Intercoms & Safety Hardware',
      description: 'Upgrading to 4G cellular video intercoms, wireless keypads, induction ground loops for auto-exit, and dual infrared safety beams adds $450 to $1,800 to total project cost.'
    }
  ];

  const faqs = [
    {
      q: 'How much does it cost to install an automatic sliding gate in Brisbane?',
      a: 'In Brisbane and South East Queensland, installing a custom automatic sliding gate typically costs between $3,800 and $7,500 for standard residential driveways (4m to 5m wide), including fabrication, Dulux powdercoating, ground track installation, and a high-speed smart motor with battery backup. Premium telescopic sliding gates or architectural batten designs generally range from $6,800 to $12,500. Buying factory direct from our Yamanto workshop eliminates middleman reseller markups, saving homeowners between $1,200 and $2,500.'
    },
    {
      q: 'What is the best gate design for wide driveways?',
      a: 'For wide driveways exceeding 5 to 6 metres, the best gate designs are telescopic automatic sliding gates or cantilever (trackless) sliding gates. Telescopic gates use 2 or 3 overlapping leaves that slide simultaneously, requiring only half the slide-back clearance of a single leaf gate. For rural acreage driveways wider than 6 metres, a heavy-duty dual swing gate powered by 24V linear ram actuators provides maximum opening width without requiring a ground track.'
    },
    {
      q: 'How much does an automatic double swing gate cost in Brisbane?',
      a: 'Automatic double swing gates in Brisbane generally cost between $4,500 and $9,200 installed. The cost depends on the driveway opening width, gate leaf weight, post footing engineering, and actuator motors selected (linear worm-drive rams, articulated arms, or concealed underground motors).'
    },
    {
      q: 'Is solar power cheaper than running mains power to an electric gate?',
      a: 'Yes, especially on acreage or long driveways. Trenching 240V mains power over 30 metres typically costs $3,500 to $8,000 in electrician and excavation fees. An off-grid solar automatic gate kit costs only $900 to $1,800 extra on the gate installation and requires zero trenching, providing 100% storm blackout immunity.'
    },
    {
      q: 'How can I get an accurate price for my driveway gate?',
      a: 'You can use our Live Gate Visualizer & Price Estimator on this website for an instant 5-step estimate, or call our team at (07) 3102 1801 to schedule a 100% free on-site laser measure consultation with no obligation.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', color: 'var(--text-main)' }}>
      {/* 1. HERO HEADER */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #1e293b 100%)',
        color: '#ffffff',
        padding: '5rem 0 4rem 0',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 163, 89, 0.2) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
            <span>/</span>
            <span>Buyer Guides</span>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Pricing Guide</span>
          </div>

          <span className="badge-tag badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} /> 2026 South East Queensland Cost Breakdown
          </span>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: '900',
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '1.2rem',
            fontFamily: 'Outfit, sans-serif',
            maxWidth: '920px'
          }}>
            Automatic Gate Costs &amp; Pricing Guide Brisbane [2026]
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
            lineHeight: 1.6,
            color: '#cbd5e1',
            marginBottom: '2rem',
            maxWidth: '850px'
          }}>
            Transparent, factory-direct pricing estimates for custom automated sliding, swing, telescopic, and solar driveway gates across Brisbane, Ipswich, Logan, and the Gold Coast. Eliminate middleman reseller markups by buying direct from our Yamanto manufacturing workshop.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenQuote}
              className="btn btn-gold btn-lg btn-pulse"
              style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Calculator size={18} />
              <span>Use Live Gate Estimator</span>
            </button>
            <a
              href={COMPANY_INFO.tel}
              className="btn btn-outline-light btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Phone size={18} />
              <span>Call (07) 3102 1801</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: '1.75rem', marginTop: '2.5rem', flexWrap: 'wrap', fontSize: '0.88rem', color: '#94a3b8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={16} style={{ color: '#60a5fa' }} />
              <span>Yamanto Factory Direct Pricing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} style={{ color: '#10b981' }} />
              <span>10-Year Structural Warranty</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={16} style={{ color: '#f59e0b' }} />
              <span>4.9★ Over 184 Verified Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SNIPPET TARGETING ANSWER BOXES */}
      <section className="section" style={{ padding: '3.5rem 0 2rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '1.75rem',
            marginBottom: '3.5rem'
          }}>
            {/* Snippet Box 1: Automatic Sliding Gate Cost */}
            <div style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--accent-gold)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 10px 30px -10px rgba(212, 163, 89, 0.25)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '24px',
                background: 'var(--accent-gold)',
                color: '#0f172a',
                fontSize: '0.72rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.2rem 0.75rem',
                borderRadius: '20px'
              }}>
                Instant Answer Summary
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>
                How much does it cost to install an automatic sliding gate in Brisbane?
              </h2>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
                In Brisbane and South East Queensland, installing a custom automatic sliding gate typically costs between <strong>$3,800 and $7,500</strong> for standard residential driveways (4m to 5m wide), including fabrication, Dulux powdercoating, ground track installation, and a high-speed smart motor with battery backup. Premium telescopic sliding gates or architectural batten designs generally range from <strong>$6,800 to $12,500</strong>, while buying factory direct from a Yamanto fabricator saves between <strong>$1,200 and $2,500</strong> by eliminating middleman reseller markups.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '700' }}>
                <CheckCircle2 size={16} />
                <span>Includes 10-Year Structural Warranty &amp; Dual Infrared Safety Beams</span>
              </div>
            </div>

            {/* Snippet Box 2: Wide Driveway Designs */}
            <div style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--accent-blue)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.25)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '24px',
                background: 'var(--accent-blue)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.2rem 0.75rem',
                borderRadius: '20px'
              }}>
                Engineering Recommendation
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>
                What is the best gate design for wide driveways?
              </h2>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
                The best gate design for wide driveways (over 5 to 6 metres) is a <strong>telescopic automatic sliding gate</strong> or a <strong>cantilever trackless sliding gate</strong>. Telescopic gates use 2 or 3 synchronised overlapping leaves that require only half the slide-back storage space, preventing boundary fence obstruction. For sloping or rural driveways wider than 6 metres, a <strong>heavy-duty dual swing gate</strong> with commercial 24V linear ram motors provides maximum opening width without requiring a ground track.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: '700' }}>
                <CheckCircle2 size={16} />
                <span>Custom CAD Engineered for Zero Sagging on Spans up to 12 Metres</span>
              </div>
            </div>
          </div>

          {/* 3. TRANSPARENT PRICING MATRIX TABLE */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                <DollarSign size={14} /> Real Industry Benchmarks
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: '900', color: 'var(--text-heading)', fontFamily: 'Outfit, sans-serif' }}>
                Automatic Gate Price Matrix (Factory Direct SEQ)
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                Estimated turn-key prices including custom in-house fabrication, architectural powdercoating, professional ground installation, and high-speed smart automation hardware.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-heading)' }}>Gate Style</th>
                      <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-heading)' }}>Driveway Span</th>
                      <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Turn-Key Installed Price</th>
                      <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-heading)' }}>Hardware Included</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingTiers.map((tier, idx) => (
                      <tr 
                        key={idx}
                        style={{ 
                          borderBottom: idx === pricingTiers.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: '800', color: 'var(--text-heading)', fontSize: '1.05rem', marginBottom: '0.3rem' }}>
                            {tier.category}
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.55rem', borderRadius: '12px', background: 'rgba(212, 163, 89, 0.15)', color: 'var(--accent-gold)' }}>
                            {tier.badge}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-main)', verticalAlign: 'top' }}>
                          {tier.span}
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '900', color: 'var(--accent-gold)', fontSize: '1.2rem', verticalAlign: 'top' }}>
                          {tier.typicalCost}
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, verticalAlign: 'top' }}>
                          <strong style={{ color: 'var(--text-heading)', display: 'block', marginBottom: '0.2rem' }}>
                            Motor: {tier.popularMotor}
                          </strong>
                          {tier.includes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4. KEY COST FACTORS */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
              <span className="badge-tag badge-blue" style={{ marginBottom: '0.5rem' }}>
                <Sliders size={14} /> Price Influences
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '900', color: 'var(--text-heading)' }}>
                What Factors Affect Your Driveway Gate Installation Cost?
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {costFactors.map((factor, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue)',
                    marginBottom: '1rem',
                    fontWeight: '800'
                  }}>
                    {i + 1}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.6rem', color: 'var(--text-heading)' }}>
                    {factor.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. PRICING & BUYER FAQS (ACCORDION) */}
          <div style={{ maxWidth: '850px', margin: '0 auto 4rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                <HelpCircle size={14} /> Frequently Asked Questions
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '900', color: 'var(--text-heading)' }}>
                Gate Cost &amp; Installation FAQ
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: 'var(--text-heading)',
                        fontWeight: '800',
                        fontSize: '1.05rem'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} /> : <ChevronDown size={20} style={{ color: '#94a3b8', flexShrink: 0 }} />}
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. CALL TO ACTION BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, #090e1a 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
            border: '2px solid rgba(212, 163, 89, 0.3)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: '900', marginBottom: '1rem', color: '#ffffff' }}>
              Ready for an Exact, Fixed-Price Quote?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              Configure your gate in 60 seconds with our online gate estimator, or schedule a 100% free on-site laser measure and design consultation anywhere in South East Queensland.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuote}
                className="btn btn-gold btn-lg btn-pulse"
                style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <Calculator size={18} />
                <span>Instant 5-Step Gate Estimator</span>
              </button>
              <button
                onClick={onOpenContact}
                className="btn btn-outline-light btn-lg"
                style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <span>Book Free On-Site Measure</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

