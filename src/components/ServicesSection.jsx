import React, { useState } from 'react';
import { 
  SERVICES 
} from '../data/siteData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  Phone,
  Wrench,
  Sun,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function ServicesSection({ selectedServiceId, onSelectService, onConfigureGate, onOpenContact }) {
  const [activeTab, setActiveTab] = useState(selectedServiceId || 'sliding-gates');

  const currentService = SERVICES.find(s => s.id === activeTab) || SERVICES[0];

  return (
    <section id="services" className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-blue">
            <Layers size={14} />
            Our Comprehensive Solutions
          </span>
          <h2 className="section-title" style={{ color: '#0f172a' }}>
            Custom Gates & Fencing <br />
            <span className="gradient-text-blue">Engineered to Perfection</span>
          </h2>
          <p className="section-subtitle">
            From modern residential sliding gates to heavy-duty commercial boom barriers and 100% off-grid solar gates. Explore our full range of Australian-manufactured solutions.
          </p>
        </div>

        {/* Horizontal Category Tab Bar */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2.5rem',
          scrollbarWidth: 'thin'
        }}>
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveTab(s.id);
                onSelectService && onSelectService(s.id);
              }}
              style={{
                padding: '0.85rem 1.4rem',
                borderRadius: '12px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: '700',
                fontSize: '0.9375rem',
                whiteSpace: 'nowrap',
                background: activeTab === s.id ? '#0f172a' : '#f1f5f9',
                color: activeTab === s.id ? 'var(--accent-gold)' : '#475569',
                border: activeTab === s.id ? '1px solid #0f172a' : '1px solid #e2e8f0',
                boxShadow: activeTab === s.id ? '0 10px 20px -5px rgba(15,23,42,0.3)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active Service Showcase Card */}
        <div className="card-light animate-fadeIn" style={{ padding: '2.5rem', border: '1px solid #e2e8f0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="service-detail-grid"
          >
            {/* Left: Content & Bullet Points */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '20px', background: 'rgba(37,99,235,0.1)', color: '#2563eb', fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <ShieldCheck size={14} /> Factory Direct Fabrication
              </div>

              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2 }}>
                {currentService.title}
              </h3>

              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {currentService.shortDesc}
              </p>

              {/* Highlights Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {currentService.highlights.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ color: '#334155', fontSize: '0.9375rem', fontWeight: '500' }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onConfigureGate && onConfigureGate(currentService.id)}
                  className="btn btn-gold btn-md"
                >
                  <Sliders size={18} />
                  Configure This Gate Style
                </button>
                <button
                  onClick={onOpenContact}
                  className="btn btn-outline-dark btn-md"
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
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.15)',
                marginBottom: '1rem'
              }}>
                <img
                  src={currentService.heroImage}
                  alt={currentService.title}
                  style={{
                    width: '100%',
                    height: '340px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(15,23,42,0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.8125rem',
                  fontWeight: '600'
                }}>
                  Custom Auto Gates - Real Project Installation
                </div>
              </div>

              {/* Mini Gallery Thumbnails */}
              {currentService.gallery && currentService.gallery.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {currentService.gallery.slice(1, 4).map((imgUrl, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        borderRadius: '10px', 
                        overflow: 'hidden', 
                        height: '90px',
                        border: '2px solid #f1f5f9',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid #f1f5f9'
          }}>
            {currentService.features.map((feat, i) => (
              <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>•</span> {feat.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
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
