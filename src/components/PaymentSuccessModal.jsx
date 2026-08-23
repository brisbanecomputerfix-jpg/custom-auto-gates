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
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '1.5rem',
        maxWidth: '650px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeIn 0.3s ease-out',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(241, 245, 249, 0.8)',
            border: 'none',
            borderRadius: '9999px',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.8)'; e.currentTarget.style.color = '#64748b'; }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '2.5rem 2rem 2rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#22c55e',
            border: '2px solid rgba(34, 197, 94, 0.4)',
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
        <div style={{ padding: '2rem' }}>
          {/* Status Alert */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}>
            <ShieldCheck size={24} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontWeight: '700', color: '#166534', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                Official Stripe Verified Transaction
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#15803d', margin: 0, lineHeight: 1.5 }}>
                256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant. An official tax receipt and confirmation email has been dispatched.
              </p>
            </div>
          </div>

          {/* Session / Receipt Reference */}
          {sessionId && (
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Stripe Reference:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#0f172a' }}>{sessionId.substring(0, 24)}...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Merchant:</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Custom Auto Gates Pty Ltd</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Factory Workshop:</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Shed 2, 43-45 Belar St, Yamanto QLD</span>
              </div>
            </div>
          )}

          {/* Next Steps Card */}
          <div style={{
            borderLeft: '4px solid #eab308',
            backgroundColor: '#fffbeb',
            padding: '1rem 1.25rem',
            borderRadius: '0 0.75rem 0.75rem 0',
            marginBottom: '1.5rem',
          }}>
            <h4 style={{ fontWeight: '700', color: '#92400e', fontSize: '0.9rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} /> What Happens Next?
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#b45309', margin: 0, lineHeight: 1.5 }}>
              Our senior service coordinator will review your gate details and dispatch the nearest available technician. If urgent assistance is required, call our priority hotline directly at <strong>(07) 3102 1801</strong>.
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
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '0.75rem',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
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
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; }}
            >
              <Phone size={18} /> Call Workshop (07) 3102 1801
            </a>

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#eab308',
                color: '#0f172a',
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
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ca8a04'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#eab308'; }}
            >
              Return to Website <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
