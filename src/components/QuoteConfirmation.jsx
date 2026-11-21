import React, { useEffect } from 'react';
import { CheckCircle2, Phone, ArrowLeft, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

export default function QuoteConfirmation({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackPageView();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '85vh', padding: '4rem 1rem', color: 'var(--text-main)' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
        {/* Success Icon */}
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid #10b981',
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.75rem auto'
        }}>
          <CheckCircle2 size={48} />
        </div>

        {/* Headline */}
        <span style={{
          display: 'inline-block',
          padding: '0.4rem 1rem',
          background: 'rgba(251, 191, 36, 0.18)',
          color: 'var(--accent-gold)',
          border: '1px solid rgba(251, 191, 36, 0.35)',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '800',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          Quote Request Received
        </span>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          fontWeight: '900',
          color: 'var(--text-heading)',
          lineHeight: 1.2,
          marginBottom: '1rem',
          fontFamily: 'Outfit, sans-serif'
        }}>
          Thank You! Your Request Has Been Logged.
        </h1>

        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          marginBottom: '2.5rem'
        }}>
          Our Yamanto workshop estimators have received your inquiry. A licensed gate technician will review your specifications, verify site geometry, and contact you within 24 hours with your transparent proposal and laser measure booking.
        </p>

        {/* Immediate Assistance Box */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Phone size={24} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-heading)' }}>
              Need Urgent Assistance or Immediate Advice?
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            If you need emergency gate repairs or have an active construction tender deadline, speak directly with our workshop team:
          </p>
          <a
            href="tel:0731021801"
            className="btn btn-gold btn-lg"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontWeight: '800',
              textDecoration: 'none'
            }}
          >
            <Phone size={18} />
            <span>Call (07) 3102 1801</span>
          </a>
        </div>

        {/* Trust Points */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem', textAlign: 'left' }}>
          <div style={{ background: 'var(--bg-card-muted)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#10b981', fontWeight: '700' }}>
              <ShieldCheck size={18} />
              <span>10-Yr Structural Warranty</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Heavy-duty marine aluminium TIG welded in Yamanto.</p>
          </div>

          <div style={{ background: 'var(--bg-card-muted)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#60a5fa', fontWeight: '700' }}>
              <Clock size={18} />
              <span>Rapid Turnaround</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Free measure within 48h; standard fabrication in 2 weeks.</p>
          </div>

          <div style={{ background: 'var(--bg-card-muted)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#fbbf24', fontWeight: '700' }}>
              <MapPin size={18} />
              <span>Yamanto Workshop</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Shed 2, 43-45 Belar St. QBCC License #15579753.</p>
          </div>
        </div>

        {/* Return Button */}
        <button
          onClick={onNavigateHome}
          className="btn btn-outline-light"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
}
