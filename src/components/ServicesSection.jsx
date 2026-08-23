import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sun, 
  Sliders, 
  Wrench, 
  Building2, 
  Layers 
} from 'lucide-react';
import { SERVICES } from '../data/siteData';

export default function ServicesSection({ onOpenQuote, onOpenContact, onConfigureGate, activeCategory, selectedServiceId, onSelectService }) {
  const [activeTab, setActiveTab] = useState(selectedServiceId || activeCategory || 'sliding-gates');

  React.useEffect(() => {
    if (selectedServiceId) {
      setActiveTab(selectedServiceId);
    }
  }, [selectedServiceId]);

  const currentService = (SERVICES && SERVICES.find((s) => s.id === activeTab)) || (SERVICES && SERVICES[0]) || { highlights: [], features: [] };

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--bg-body)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-blue">
            <Layers size={14} />
            Our Manufacturing Range
          </span>
          <h2 className="section-title">
            Custom Gate Systems & Architectural Fencing <br />
            <span className="gradient-text-gold">Engineered In South East Queensland</span>
          </h2>
          <p className="section-subtitle">
            Explore our specialized range of residential and commercial automatic gate solutions, designed for smooth operation, high security, and extreme weather endurance.
          </p>
        </div>

        {/* Category Navigation Pills - Touch Horizontal Scrolling */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          overflowX: 'auto',
          paddingBottom: '0.65rem',
          marginBottom: '2rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
        className="step-scroll-container"
        >
          {SERVICES.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.86rem',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--accent-gold)' : 'var(--bg-card-subtle)',
                  color: isActive ? '#090e1a' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  flexShrink: 0
                }}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="card-themed animate-fadeIn" style={{ padding: 'clamp(1.25rem, 3.5vw, 2.25rem)', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
          className="service-detail-grid"
          >
            {/* Left: Content & Bullet Points */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)', border: '1px solid var(--badge-blue-border)', fontWeight: '700', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                <ShieldCheck size={13} /> Factory Direct Fabrication
              </div>

              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                {currentService.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {currentService.shortDesc}
              </p>

              {/* Highlights Checklist - 3 Crisp Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                {currentService.highlights.slice(0, 3).map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: '500' }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons & Subpage Link */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={() => onConfigureGate && onConfigureGate(currentService.id)}
                  className="btn btn-gold btn-md"
                  style={{ flex: '1 1 auto', fontWeight: '800' }}
                >
                  <Sliders size={16} />
                  Configure Style in 3D
                </button>
                <button
                  onClick={onOpenContact}
                  className="btn btn-outline-dark btn-md"
                  style={{ flex: '1 1 auto' }}
                >
                  Book Site Measure
                </button>
              </div>
            </div>

            {/* Right: High-Res Real Imagery Showcase */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1.5px solid var(--border-light)'
              }}>
                <img
                  src={currentService.heroImage || currentService.image}
                  alt={currentService.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '260px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(9,14,26,0.92) 0%, transparent 100%)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>
                  <span>Yamanto Factory Direct</span>
                  <span style={{ color: 'var(--accent-gold)' }}>10-Yr Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
