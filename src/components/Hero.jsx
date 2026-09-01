import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Calculator, 
  CheckCircle2, 
  Award, 
  Zap, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Ruler, 
  Factory, 
  Sliders, 
  Calendar, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function Hero({ onOpenQuote, onOpenContact, onExploreVisualizer, onNavigateAbout }) {
  const [selectedQuickGate, setSelectedQuickGate] = useState('sliding');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const BACKGROUND_SLIDES = [
    { url: '/images/hero-monument-sliding.webp', title: 'Automated Monument Slat Sliding Gate', loc: 'Brisbane' },
    { url: '/images/hero-swing-gates.webp', title: 'Custom Architectural Double Swing Gate', loc: 'Yamanto' },
    { url: '/images/hero-decowood-slat.webp', title: 'DecoWood Timber & Aluminium Security Gate', loc: 'Brookfield' },
    { url: '/images/hero-solar-entry.webp', title: 'Solar Automated Entry Gate System', loc: 'Redland Bay' },
    { url: '/images/hero-factory-slat.webp', title: 'Factory Direct Slat & Pedestrian System', loc: 'Workshop Direct' }
  ];

  // Rotate background showcase images smoothly
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const GATE_STYLES_PREVIEW = [
    { id: 'sliding', label: 'Sliding Gate', badge: 'Most Popular', time: '2–3 Wks' },
    { id: 'swing', label: 'Swing Gate', badge: 'Architectural', time: '2–3 Wks' },
    { id: 'solar', label: 'Solar Off-Grid', badge: '100% Eco', time: '2–4 Wks' },
    { id: 'fencing', label: 'Slat Fencing', badge: 'DecoWood / Slat', time: '1–2 Wks' }
  ];

  return (
    <section 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: '88vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)', 
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)', 
        backgroundColor: 'var(--bg-body)' 
      }}
      aria-label="Custom Auto Gates & Fencing Introduction"
    >
      {/* Background Video & Motion Showcase Layer - Highly Visible & Cinematic */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {/* Animated High-Definition Photo Showcase with LCP High Priority */}
        {BACKGROUND_SLIDES.map((slide, idx) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.title}
            width="1920"
            height="1080"
            fetchPriority={idx === 0 ? "high" : "low"}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding={idx === 0 ? "sync" : "async"}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: activeSlide === idx ? 0.92 : 0,
              transform: activeSlide === idx ? 'scale(1.08) translate(-1%, -1%)' : 'scale(1.0)',
              transition: 'opacity 1.6s ease-in-out, transform 6s ease-out',
              filter: 'brightness(0.98) contrast(1.08)',
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* Clean Translucent Gradient Overlays - Feathered for Crisp Text Readability & Max Video Visibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--hero-overlay-1) 0%, var(--hero-overlay-2) 46%, var(--hero-overlay-3) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to top, var(--bg-body) 0%, transparent 100%)'
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left Hero Content with High-Transparency Glassmorphic Card Backing */}
          <div style={{
            background: 'var(--hero-card-bg)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            borderRadius: '24px',
            border: '1.5px solid var(--hero-card-border)',
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            boxShadow: 'var(--hero-card-shadow)',
            transition: 'all 0.3s ease'
          }}>
            {/* Top Pill Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button 
                onClick={onNavigateAbout}
                className="badge-tag badge-gold" 
                style={{ margin: 0, fontWeight: '800', cursor: 'pointer', fontSize: '0.78rem', backdropFilter: 'blur(8px)' }}
              >
                <Factory size={13} /> Buy Factory Direct Yamanto
              </button>
              <span className="badge-tag badge-blue" style={{ margin: 0, fontWeight: '800', fontSize: '0.78rem', backdropFilter: 'blur(8px)' }}>
                <MapPin size={13} /> Brisbane Inner Suburbs & QLD
              </span>
              <span className="badge-tag badge-green" style={{ margin: 0, fontWeight: '800', fontSize: '0.78rem', backdropFilter: 'blur(8px)' }}>
                <ShieldCheck size={13} /> 10-Yr Warranty
              </span>
            </div>

            {/* Semantic SEO H1 Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: 'var(--text-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Custom Automatic Gates <br />
              <span className="gradient-text-gold">
                Engineered & Fabricated in QLD
              </span>
            </h1>

            {/* Subtitle & Value Proposition */}
            <p style={{
              fontSize: 'clamp(0.98rem, 2vw, 1.125rem)',
              color: 'var(--text-main)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '650px',
              fontWeight: '400',
              textShadow: '0 1px 4px rgba(0,0,0,0.2)'
            }}>
              South East Queensland's dedicated specialist in custom automated <strong style={{ color: 'var(--text-heading)' }}>sliding gates, swing gates, solar off-grid systems</strong>, and <strong style={{ color: 'var(--text-heading)' }}>architectural aluminium slat fencing</strong>. Precision laser CAD measured, built in our Yamanto workshop, and installed with commercial-grade automation systems.
            </p>

            {/* Call to Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem' }}>
              <button
                onClick={onOpenQuote}
                className="btn btn-gold btn-lg btn-pulse"
                style={{ fontWeight: '800', flex: '1 1 auto' }}
              >
                <Calculator size={19} />
                Calculate Instant Gate Price
              </button>

              <button
                onClick={onOpenContact}
                className="btn btn-outline-dark btn-lg"
                style={{ flex: '1 1 auto', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.06)' }}
              >
                Book Free Measure
              </button>

              <a
                href={COMPANY_INFO.tel}
                className="btn-outline-dark"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  color: 'var(--text-heading)',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  padding: '0.75rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  flex: '1 1 auto',
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(255,255,255,0.06)'
                }}
              >
                <Phone size={17} style={{ color: 'var(--accent-gold)' }} />
                <span>(07) 3102 1801</span>
              </a>
            </div>

            {/* Trust Checklist */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.75rem',
              paddingTop: '1.25rem',
              borderTop: '1.5px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)', fontSize: '0.84rem', fontWeight: '700' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span>Zero Middleman Markups</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)', fontSize: '0.84rem', fontWeight: '700' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span>Premium Gate Automation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)', fontSize: '0.84rem', fontWeight: '700' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span>Sloping Driveway Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Quick Gate Estimator Card with Transparent Glass */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{
              background: 'var(--bg-card-glass)',
              backdropFilter: 'blur(24px) saturate(190%)',
              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
              borderRadius: '24px',
              border: '1.5px solid var(--hero-card-border)',
              padding: 'clamp(1.25rem, 3.5vw, 2rem)',
              boxShadow: 'var(--hero-card-shadow)',
              position: 'relative',
              zIndex: 5,
              transition: 'all 0.3s ease'
            }}>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Yamanto Workshop
                  </span>
                </div>
                <span className="badge-tag badge-blue" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.72rem', backdropFilter: 'blur(8px)' }}>
                  Daily On-Site Measures
                </span>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                Quick Gate Configurator & Quote
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1rem' }}>
                Select a custom style to configure your factory-direct quote:
              </p>

              {/* Gate Style Selector Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.55rem', marginBottom: '1.25rem' }}>
                {GATE_STYLES_PREVIEW.map((style) => {
                  const isSelected = selectedQuickGate === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelectedQuickGate(style.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                        background: isSelected ? 'var(--badge-gold-bg)' : 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.84rem', fontWeight: '800', color: isSelected ? 'var(--badge-gold-text)' : 'var(--text-heading)' }}>
                        {style.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--badge-gold-text)' : 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '0.15rem', fontWeight: '600' }}>
                        <span>{style.badge}</span>
                        <span>⚡ {style.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 3D Badges Showcase */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'var(--badge-gold-bg)',
                    color: 'var(--badge-gold-text)',
                    border: '1px solid var(--badge-gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Factory size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600' }}>Fabrication</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)' }}>100% In-House</div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'var(--badge-blue-bg)',
                    color: 'var(--badge-blue-text)',
                    border: '1px solid var(--badge-blue-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Zap size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600' }}>Automation</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)' }}>Smart & Solar Automation</div>
                  </div>
                </div>
              </div>

              {/* Action Button inside Card */}
              <button
                onClick={onOpenQuote}
                className="btn btn-gold btn-lg"
                style={{ width: '100%', marginBottom: '0.75rem', fontWeight: '800' }}
              >
                <Calculator size={17} />
                Get Custom Quote for {GATE_STYLES_PREVIEW.find(g => g.id === selectedQuickGate)?.label}
              </button>

              {/* Suburbs Micro-Banner */}
              <div style={{
                background: 'var(--badge-blue-bg)',
                border: '1px solid var(--badge-blue-border)',
                backdropFilter: 'blur(8px)',
                borderRadius: '10px',
                padding: '0.6rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.4rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--badge-blue-text)' }}>
                  <MapPin size={13} style={{ flexShrink: 0 }} />
                  <span><strong>Brisbane Inner Suburbs</strong> & QLD</span>
                </div>
                <button
                  onClick={onOpenContact}
                  style={{
                    color: 'var(--badge-blue-text)',
                    fontWeight: '800',
                    fontSize: '0.76rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Book Measure <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Background Project Showcase Pill & Indicators */}
      <div 
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'rgba(9, 14, 26, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '0.35rem 0.95rem',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          maxWidth: '90vw'
        }}
      >
        <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', flexShrink: 0 }} />
          <span>{BACKGROUND_SLIDES[activeSlide].title}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>• {BACKGROUND_SLIDES[activeSlide].loc}</span>
        </span>

        <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
          {BACKGROUND_SLIDES.map((slide, i) => (
            <button
              key={slide.url}
              onClick={() => setActiveSlide(i)}
              aria-label={`View ${slide.title}`}
              style={{
                minWidth: '28px',
                minHeight: '28px',
                padding: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  width: activeSlide === i ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: activeSlide === i ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.45)',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
