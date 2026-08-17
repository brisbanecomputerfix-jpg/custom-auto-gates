import React from 'react';
import { Phone, Calculator, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function QuickActionBar({ onOpenQuote, onOpenTroubleshoot }) {
  return (
    <>
      {/* Mobile Floating Bottom Bar */}
      <div className="floating-mobile-bar">
        <a 
          href={COMPANY_INFO.tel} 
          className="btn btn-blue btn-md"
          style={{ width: '100%', padding: '0.75rem 0.5rem', fontSize: '0.9375rem' }}
        >
          <Phone size={18} />
          Call Direct
        </a>
        <button 
          onClick={onOpenQuote} 
          className="btn btn-gold btn-md"
          style={{ width: '100%', padding: '0.75rem 0.5rem', fontSize: '0.9375rem', fontWeight: '800' }}
        >
          <Calculator size={18} />
          Instant Quote
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
