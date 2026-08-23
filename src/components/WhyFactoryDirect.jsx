import React from 'react';
import { 
  Factory, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  MapPin,
  Award
} from 'lucide-react';

export default function WhyFactoryDirect({ onOpenQuote, onNavigateAbout }) {
  return (
    <section id="why-factory-direct" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Factory size={14} />
            The Factory Direct Advantage
          </span>
          <h2 className="section-title">
            Direct From Our Yamanto Workshop <br />
            <span className="gradient-text-gold">Better Build Quality. Zero Middleman Markups.</span>
          </h2>
          <p className="section-subtitle">
            Most gate installers are middleman resellers who outsource welding and mark up the price. We engineer, weld, powdercoat, and install everything in-house.
          </p>
        </div>

        {/* 3 High-Impact Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Pillar 1 */}
          <div
            className="card-themed"
            style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              background: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--badge-gold-bg)',
                color: 'var(--badge-gold-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid var(--badge-gold-border)'
              }}>
                <Factory size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                100% In-House Fabrication
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Every gate is custom-measured, TIG-welded, and quality checked at our Yamanto workshop. No imported flat-packs or middleman subcontractors.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: '700' }}>
              <CheckCircle2 size={15} />
              <span>Save 20%–30% on middleman commissions</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            className="card-themed"
            style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              background: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--badge-blue-bg)',
                color: 'var(--badge-blue-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid var(--badge-blue-border)'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                10-Year Structural Warranty
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Heavy-wall 6060-T5 architectural aluminium engineered to never rust, sag, or warp under Queensland’s sub-tropical sun and coastal storms.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: '700' }}>
              <CheckCircle2 size={15} />
              <span>Dulux & Blondies certified powdercoating</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            className="card-themed"
            style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              background: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--badge-gold-bg)',
                color: 'var(--badge-gold-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid var(--badge-gold-border)'
              }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Guaranteed Fast Turnaround
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Standard sliding & swing gates completed in 7–10 days from sign-off. Need your gate urgent? Direct workshop scheduling gets it done fast.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: '700' }}>
              <CheckCircle2 size={15} />
              <span>Full turn-key installation & automation</span>
            </div>
          </div>
        </div>

        {/* High-Converting CTA Banner */}
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge-tag badge-gold" style={{ margin: 0 }}>Yamanto Workshop Direct</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 1/14 Saleyards Rd, Yamanto QLD</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
              Ready to see what a factory-direct automatic gate costs?
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenQuote}
              className="btn btn-gold btn-lg"
              style={{ fontWeight: '800' }}
            >
              <Calculator size={18} />
              Calculate Instant Price
            </button>
            <button
              onClick={onNavigateAbout}
              className="btn btn-outline-dark btn-lg"
            >
              Learn More About Our Workshop
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
