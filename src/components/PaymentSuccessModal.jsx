import React from 'react';
import { CheckCircle2, ShieldCheck, Printer, ArrowRight, Phone, Clock, FileText, X } from 'lucide-react';

export default function PaymentSuccessModal({ isOpen, onClose, sessionId }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'var(--modal-overlay-bg)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto',
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: '1.5rem',
        maxWidth: '650px',
        width: '100%',
        boxShadow: 'var(--shadow-xl)',
        border: '1.5px solid var(--border-light)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeIn 0.3s ease-out',
        color: 'var(--text-main)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Confirmation Modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '9999px',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #090e1a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '2.5rem 2rem 2rem 2rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            marginBottom: '1rem',
          }}>
            <CheckCircle2 size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: '#ffffff' }}>
            Payment & Booking Confirmed!
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto' }}>
            Your transaction has been processed securely via Stripe. Our Yamanto factory team has received your booking.
          </p>
        </div>

        {/* Receipt Body */}
        <div style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
          {/* Status Alert */}
          <div style={{
            backgroundColor: 'var(--badge-green-bg)',
            border: '1px solid var(--badge-green-border)',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}>
            <ShieldCheck size={24} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontWeight: '700', color: 'var(--text-heading)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                Official Stripe Verified Transaction
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant. An official tax receipt and confirmation email has been dispatched.
              </p>
            </div>
          </div>

          {/* Session / Receipt Reference */}
          {sessionId && (
            <div style={{
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Stripe Reference:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-heading)' }}>{sessionId.substring(0, 24)}...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Merchant:</span>
                <span style={{ fontWeight: '600', color: 'var(--text-heading)' }}>Custom Auto Gates Pty Ltd</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Factory Workshop:</span>
                <span style={{ fontWeight: '600', color: 'var(--text-heading)' }}>Shed 2, 43-45 Belar St, Yamanto QLD</span>
              </div>
            </div>
          )}

          {/* Next Steps Card */}
          <div style={{
            borderLeft: '4px solid var(--accent-gold)',
            backgroundColor: 'var(--badge-gold-bg)',
            padding: '1rem 1.25rem',
            borderRadius: '0 0.75rem 0.75rem 0',
            marginBottom: '1.5rem',
          }}>
            <h4 style={{ fontWeight: '700', color: 'var(--text-heading)', fontSize: '0.9rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} style={{ color: 'var(--accent-gold)' }} /> What Happens Next?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Our senior service coordinator will review your gate details and dispatch the nearest available technician. If urgent assistance is required, call our priority hotline directly at <strong style={{ color: 'var(--text-heading)' }}>(07) 3102 1801</strong>.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              style={{
                flex: '1 1 180px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--bg-card-subtle)',
                color: 'var(--text-heading)',
                border: '1px solid var(--border-light)',
                borderRadius: '0.75rem',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Printer size={18} /> Print Tax Receipt
            </button>

            <a
              href="tel:0731021801"
              style={{
                flex: '1 1 180px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: '#090e1a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Phone size={18} /> Call Workshop (07) 3102 1801
            </a>

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: 'var(--accent-gold)',
                color: '#090e1a',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              Return to Website <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
