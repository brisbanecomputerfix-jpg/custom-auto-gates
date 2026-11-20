import React from 'react';
import { 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Zap, 
  Sun, 
  Phone, 
  Sparkles, 
  Layers, 
  Clock,
  HelpCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function MinimalPricingSection({ onOpenEstimator, onNavigatePricing, onOpenContact }) {
  const PRICING_TIERS = [
    {
      id: 'sliding-gates',
      category: 'Automatic Sliding Gates',
      badge: 'Most Popular Driveway Gate',
      badgeClass: 'badge-gold',
      startingPrice: '$3,850',
      typicalRange: '$3,850 – $7,500 installed',
      span: '3.5m – 5.5m Standard Driveways',
      desc: 'Space-saving sliding gate engineered with heavy-wall aluminium slats or tubes and heavy-duty ground track.',
      motor: 'Centurion D5 Smart / High-Speed Rack & Pinion',
      inclusions: [
        'TIG-welded 6060-T5 architectural aluminium frame',
        'Certified Dulux® powdercoating (Blondies certified)',
        'Centurion D5 Smart motor + 2x remote transmitters',
        'Galvanised ground track & dual safety photo-eyes',
        'Battery backup for storm & blackout immunity'
      ],
      popularFor: 'Steep or sloping driveways & compact front yards'
    },
    {
      id: 'swing-gates',
      category: 'Automatic Swing Gates',
      badge: 'Grand Architectural Entrance',
      badgeClass: 'badge-blue',
      startingPrice: '$4,500',
      typicalRange: '$4,500 – $9,200 installed',
      span: '3.5m – 6.0m Double Openings',
      desc: 'Classic grand entrance appeal available in single swing, double swing, or bi-fold configurations.',
      motor: 'Centurion Vantage 400 / 24V Linear Actuators',
      inclusions: [
        'Twin heavy-duty architectural aluminium gate leaves',
        'Commercial greasable ball-bearing pivot hinges',
        'Dual 24V linear worm-drive actuator motors',
        'Auto-reverse obstruction sensing & magnetic center lock',
        '10-Year structural fabrication warranty'
      ],
      popularFor: 'Wide flat driveways & heritage character homes'
    },
    {
      id: 'solar-gates',
      category: 'Off-Grid Solar Powered Gates',
      badge: 'Acreage & Rural Properties',
      badgeClass: 'badge-green',
      startingPrice: '$4,850',
      typicalRange: '$4,850 – $8,900 installed',
      span: '4.0m – 7.0m Rural Acreage Entrances',
      desc: '100% off-grid solar automatic gate package. Zero electrical trenching required across long driveways.',
      motor: 'Solar D5 Smart / 24V Heavy Duty Solar Actuator',
      inclusions: [
        'High-efficiency monocrystalline solar panel & bracket',
        'Smart MPPT charge controller & dual deep-cycle battery kit',
        'Zero 240V mains trenching needed (saves $3,500+ in cabling)',
        '100% storm & power outage blackout immunity',
        'Extended wireless remote range (up to 150m transmission)'
      ],
      popularFor: 'Acreage, farms, remote entries & long driveways'
    }
  ];

  return (
    <section id="pricing" className="section" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', position: 'relative' }}>
      {/* Anchor for legacy links and hash routing */}
      <div id="gate-visualizer" style={{ position: 'absolute', top: '-85px', left: 0 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '840px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
          <span className="badge-tag badge-gold">
            <DollarSign size={14} />
            Transparent Factory Direct Pricing
          </span>
          <h2 className="section-title">
            Upfront Custom Gate Pricing & Cost Guide <br />
            <span className="gradient-text-gold">Fabricated In Yamanto. Zero Middleman Markups.</span>
          </h2>
          <p className="section-subtitle">
            Average turnkey installed investment across Brisbane, Ipswich, Logan &amp; Gold Coast. Buy factory direct from our workshop to save $1,200 to $2,500 compared to reseller contractors.
          </p>
        </div>

        {/* 3-Tier Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
        className="pricing-cards-grid"
        >
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="card-themed"
              style={{
                borderRadius: '18px',
                border: '1.5px solid var(--border-light)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div>
                {/* Top Badge & Category */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className={`badge-tag ${tier.badgeClass}`} style={{ margin: 0, fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                    {tier.badge}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ShieldCheck size={13} /> 10-Yr Warranty
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.4rem', lineHeight: 1.25 }}>
                  {tier.category}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {tier.desc}
                </p>

                {/* Price Callout */}
                <div style={{ 
                  background: 'var(--bg-card-subtle)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '12px', 
                  padding: '1rem', 
                  marginBottom: '1.25rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Turnkey From</span>
                    <span style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--accent-gold)', letterSpacing: '-0.02em' }}>
                      {tier.startingPrice}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>+ GST</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-main)', marginTop: '0.25rem', fontWeight: '600' }}>
                    Typical span: <span style={{ color: 'var(--text-heading)' }}>{tier.typicalRange}</span>
                  </div>
                </div>

                {/* What's Included Bullet List */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
                    Turnkey Workshop Inclusions:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {tier.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onOpenEstimator && onOpenEstimator(tier.id)}
                  className="btn btn-gold btn-md"
                  style={{ width: '100%', fontWeight: '800', justifyContent: 'center' }}
                >
                  <Send size={15} />
                  Get Quote &amp; Free Measure
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Central Bottom Interactive Banner */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '18px',
          border: '1.5px solid var(--border-light)',
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge-tag badge-gold" style={{ margin: 0, fontSize: '0.72rem' }}>
                <ShieldCheck size={12} /> Fixed Pricing • Zero Sales Pressure
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free on-site laser measure</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', fontWeight: '800', color: 'var(--text-heading)', margin: '0 0 0.4rem 0' }}>
              Need an exact fixed quote for your driveway?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
              Request a fast 30-second quote or book a free on-site consultation with our Yamanto workshop team.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => onOpenEstimator && onOpenEstimator()}
              className="btn btn-gold btn-lg"
              style={{ fontWeight: '800' }}
            >
              <Send size={18} />
              Request Fast Quote &amp; Free Measure
            </button>

            {onNavigatePricing ? (
              <button
                type="button"
                onClick={onNavigatePricing}
                className="btn btn-outline-dark btn-lg"
              >
                View 2026 Price Guide &amp; FAQs
                <ArrowRight size={16} />
              </button>
            ) : (
              <a
                href="/pricing-guide"
                className="btn btn-outline-dark btn-lg"
              >
                View 2026 Price Guide &amp; FAQs
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Phone Consultation Note */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Prefer to talk to a workshop fabricator? Call our Yamanto team on{' '}
          <a href={COMPANY_INFO.tel} style={{ color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none' }}>
            {COMPANY_INFO.phone}
          </a>{' '}
          for immediate technical advice &amp; free on-site measuring.
        </div>
      </div>
    </section>
  );
}
