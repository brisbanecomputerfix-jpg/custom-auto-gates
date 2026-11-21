import React from 'react';
import { Phone, Calculator, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function QuickActionBar({ onOpenQuote, onOpenTroubleshoot }) {
  return (
    <>
      {/* Mobile Floating Bottom Bar */}
      <div className="floating-mobile-bar" role="navigation" aria-label="Mobile Quick Action Bar">
        <a 
          href={COMPANY_INFO.tel} 
          className="btn btn-blue btn-md"
          style={{ 
            width: '100%', 
            padding: '0.6rem 0.35rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '2px', 
            fontWeight: '700',
            lineHeight: 1.15
          }}
          aria-label="Call Workshop (07) 3102 1801"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Phone size={15} />
            <span style={{ fontSize: '0.85rem' }}>Call Workshop</span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.95, fontWeight: '600', letterSpacing: '-0.01em' }}>
            (07) 3102 1801
          </span>
        </a>
        <button 
          onClick={onOpenQuote} 
          className="btn btn-gold btn-md"
          style={{ 
            width: '100%', 
            padding: '0.6rem 0.35rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '2px', 
            fontWeight: '800',
            lineHeight: 1.15
          }}
          aria-label="Instant Estimate Factory Direct Pricing"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calculator size={15} />
            <span style={{ fontSize: '0.85rem' }}>Instant Estimate</span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.95, fontWeight: '700', letterSpacing: '-0.01em' }}>
            Factory Direct Pricing
          </span>
        </button>
      </div>

      {/* Floating Troubleshoot / Emergency Help Tab (Desktop) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
        className="hidden-mobile"
      >
        <button
          onClick={onOpenTroubleshoot}
          style={{
            background: '#0f172a',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: '700',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'var(--accent-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
          }}
        >
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <Wrench size={16} style={{ color: 'var(--accent-gold)' }} />
          Gate Stuck? Repair Guide
        </button>
      </div>
    </>
  );
}
