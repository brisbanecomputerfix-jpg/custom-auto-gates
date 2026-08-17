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

export default function ServicesSection({ onOpenQuote, onOpenContact, onConfigureGate, activeCategory }) {
  const [activeTab, setActiveTab] = useState(activeCategory || 'sliding-gates');

  const currentService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

  return (
    <section id="services" className="section" style={{ backgroundColor: '#ffffff' }}>
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
          {SERVICES_DATA.map((s) => (
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
                background: activeTab === s.id ? '#0f172a' : '#f1f5f9',
                color: activeTab === s.id ? 'var(--accent-gold)' : '#475569',
                border: activeTab === s.id ? '1px solid #0f172a' : '1px solid #e2e8f0',
                boxShadow: activeTab === s.id ? '0 8px 16px -4px rgba(15,23,42,0.25)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                flexShrink: 0
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active Service Showcase Card */}
        <div className="card-light animate-fadeIn" style={{ padding: 'clamp(1.25rem, 3.5vw, 2.25rem)', border: '1px solid #e2e8f0' }}>
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(37,99,235,0.1)', color: '#2563eb', fontWeight: '700', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                <ShieldCheck size={13} /> Factory Direct Fabrication
              </div>

              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                {currentService.title}
              </h3>

              <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {currentService.shortDesc}
              </p>

              {/* Highlights Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {currentService.highlights.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ color: '#334155', fontSize: '0.88rem', fontWeight: '500' }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onConfigureGate && onConfigureGate(currentService.id)}
                  className="btn btn-gold btn-md"
                  style={{ flex: '1 1 auto' }}
                >
                  <Sliders size={17} />
                  Configure This Gate Style
                </button>
                <button
                  onClick={onOpenContact}
                  className="btn btn-outline-dark btn-md"
                  style={{ flex: '1 1 auto' }}
                >
                  Request Consultation
                </button>
              </div>
            </div>

            {/* Right: High-Res Real Imagery Collage */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 16px 28px -8px rgba(0,0,0,0.12)',
                marginBottom: '0.85rem'
              }}>
                <img
                  src={currentService.heroImage || currentService.image}
                  alt={currentService.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)',
                  padding: '0.85rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: '600'
                }}>
                  Yamanto Workshop Fabrication Reference
                </div>
              </div>

              {/* Thumbnail Gallery Sub-strip */}
              {currentService.gallery && currentService.gallery.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem'
                }}>
                  {currentService.gallery.slice(0, 3).map((imgUrl, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        height: '75px', 
                        borderRadius: '8px', 
                        overflow: 'hidden', 
                        border: '1px solid #e2e8f0' 
                      }}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${currentService.title} preview ${i}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3 Detailed Feature Explanations */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid #f1f5f9'
          }}>
            {currentService.features.map((feat, i) => (
              <div key={i} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>•</span> {feat.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: 1.5 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
