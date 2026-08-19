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
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)', 
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)', 
        backgroundColor: 'var(--bg-body)' 
      }}
      aria-label="Custom Auto Gates & Fencing Introduction"
    >
      {/* Background Video Layer with Refined Visible Transparency */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {/* Fallback Static Poster Image */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/Swinging-Gates.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: videoLoaded ? 0.08 : 0.3,
            transition: 'opacity 1s ease'
          }}
        />

        {/* Vimeo Video Background (Auto-playing, Looping, Muted) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          minWidth: '177.78vh',
          minHeight: '56.25vw',
          transform: 'translate(-50%, -50%)',
          opacity: 0.72,
          filter: 'brightness(1.02) contrast(1.05)'
        }}>
          <iframe
            src="https://player.vimeo.com/video/1218804316?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1&badge=0&autopause=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            title="Automatic Driveway Gate Custom Brisbane Video"
            onLoad={() => setVideoLoaded(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Dynamic Theme Gradient Overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--hero-overlay-1) 0%, var(--hero-overlay-2) 52%, var(--hero-overlay-3) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--hero-overlay-1) 0%, transparent 65%)'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--hero-overlay-1) 0%, transparent 25%)'
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left Hero Content */}
          <div>
            {/* Top Pill Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button 
                onClick={onNavigateAbout}
                className="badge-tag badge-gold" 
                style={{ margin: 0, fontWeight: '800', cursor: 'pointer', fontSize: '0.78rem' }}
              >
                <Factory size={13} /> Buy Factory Direct Yamanto
              </button>
              <span className="badge-tag badge-blue" style={{ margin: 0, fontWeight: '800', fontSize: '0.78rem' }}>
                <MapPin size={13} /> Brisbane Inner Suburbs & QLD
              </span>
              <span className="badge-tag badge-green" style={{ margin: 0, fontWeight: '800', fontSize: '0.78rem' }}>
                <ShieldCheck size={13} /> 10-Yr Warranty
              </span>
            </div>

            {/* Semantic SEO H1 Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.3rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: 'var(--text-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '1rem'
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
              fontWeight: '400'
            }}>
              South East Queensland's dedicated specialist in custom automated <strong style={{ color: 'var(--text-heading)' }}>sliding gates, swing gates, solar off-grid systems</strong>, and <strong style={{ color: 'var(--text-heading)' }}>architectural aluminium slat fencing</strong>. Precision laser CAD measured, built in our Yamanto workshop, and installed with genuine Italian automation.
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
                style={{ flex: '1 1 auto' }}
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
                  flex: '1 1 auto'
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
                <span>Italian Nice & Centurion Motors</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)', fontSize: '0.84rem', fontWeight: '700' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span>Sloping Driveway Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Quick Gate Estimator Card */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              border: '1.5px solid var(--border-light)',
              padding: 'clamp(1.25rem, 3.5vw, 1.85rem)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              zIndex: 5
            }}>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Yamanto Workshop
                  </span>
                </div>
                <span className="badge-tag badge-blue" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                  Daily On-Site Measures
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                Quick Gate Price Estimator
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1rem' }}>
                Select a custom style to get an instant wholesale fabrication quote:
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
                        borderRadius: '10px',
                        border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                        background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.84rem', fontWeight: '800', color: isSelected ? 'var(--accent-gold-hover)' : 'var(--text-heading)' }}>
                        {style.label}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '0.15rem' }}>
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
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
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
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
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
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)' }}>Nice / Centurion</div>
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
                Calculate Price for {GATE_STYLES_PREVIEW.find(g => g.id === selectedQuickGate)?.label}
              </button>

              {/* Suburbs Micro-Banner */}
              <div style={{
                background: 'var(--badge-blue-bg)',
                border: '1px solid var(--badge-blue-border)',
                borderRadius: '8px',
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
    </section>
  );
}
