import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, ArrowRight, Loader2, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { createStripeCheckout } from '../utils/stripeClient';

export default function QuickPayModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customerName: '',
    email: '',
    phone: '',
    amount: '500',
    customAmount: '',
    purpose: 'gate-deposit',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAmountSelect = (val) => {
    setFormData({ ...formData, amount: val, customAmount: '' });
  };

  const getFinalAmount = () => {
    if (formData.amount === 'custom') {
      return parseFloat(formData.customAmount) || 0;
    }
    return parseFloat(formData.amount) || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const finalAmount = getFinalAmount();
    if (!finalAmount || finalAmount < 5) {
      setErrorMsg('Please enter a valid payment amount of at least $5.00 AUD.');
      return;
    }

    if (!formData.customerName || !formData.email) {
      setErrorMsg('Please provide your name and email address for the tax receipt.');
      return;
    }

    setIsLoading(true);

    try {
      const purposeLabels = {
        'gate-deposit': 'Custom Gate Production Deposit',
        'repair-callout': 'Emergency Gate Repair Call-Out Fee',
        'quote-balance': 'Custom Gate Quote / Invoice Balance',
        'service-maintenance': 'Annual Preventative Gate Service',
      };

      const title = `${purposeLabels[formData.purpose] || 'Custom Gate Payment'} ${formData.invoiceNumber ? `(#${formData.invoiceNumber})` : ''}`.trim();
      const description = `Payment for Custom Auto Gates & Blondies Powder Coating Yamanto. Ref: ${formData.invoiceNumber || 'Direct Web Payment'}`;

      await createStripeCheckout({
        amount: finalAmount,
        title,
        description,
        customerEmail: formData.email,
        customerName: formData.customerName,
        customerPhone: formData.phone,
        metadata: {
          invoiceNumber: formData.invoiceNumber || 'N/A',
          purpose: formData.purpose,
        },
      });
    } catch (err) {
      console.error('Payment Error:', err);
      setErrorMsg(err.message || 'Unable to connect to Stripe gateway. Please try again.');
      setIsLoading(false);
    }
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
      padding: '1.25rem',
      overflowY: 'auto',
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: '1.25rem',
        maxWidth: '560px',
        width: '100%',
        boxShadow: 'var(--shadow-xl)',
        border: '1.5px solid var(--border-light)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeIn 0.25s ease-out',
        color: 'var(--text-main)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Payment Modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '9999px',
            width: '2.25rem',
            height: '2.25rem',
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
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #090e1a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '2rem 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span style={{
              backgroundColor: 'var(--accent-gold)',
              color: '#090e1a',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Direct Gateway
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={12} /> 256-Bit SSL Encrypted
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
            Pay Invoice or Deposit
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0.35rem 0 0 0' }}>
            Secure instant payment via Stripe (Apple Pay, Google Pay, Link & Credit Cards).
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface)' }}>
          {errorMsg && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#ef4444',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: '600' }}>{errorMsg}</span>
            </div>
          )}

          {/* Payment Purpose */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Payment Purpose *
            </label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 0.9rem',
                borderRadius: '0.65rem',
                border: '1.5px solid var(--input-border)',
                fontSize: '0.9rem',
                color: 'var(--input-text)',
                backgroundColor: 'var(--input-bg)',
                outline: 'none',
              }}
            >
              <option value="gate-deposit">Custom Gate Production Deposit ($500 standard)</option>
              <option value="repair-callout">Emergency Gate Repair / Call-Out Fee ($189)</option>
              <option value="quote-balance">Custom Quote or Existing Invoice Balance</option>
              <option value="service-maintenance">Routine Annual Gate Service ($149)</option>
            </select>
          </div>

          {/* Amount Selection */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Select Amount (AUD) *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {['189', '500', '1000', 'custom'].map((amt) => {
                const isSelected = formData.amount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountSelect(amt)}
                    style={{
                      padding: '0.65rem 0.4rem',
                      borderRadius: '0.5rem',
                      border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      backgroundColor: isSelected ? 'var(--badge-gold-bg)' : 'var(--bg-card-subtle)',
                      color: isSelected ? 'var(--accent-gold)' : 'var(--text-heading)',
                      fontWeight: isSelected ? '800' : '600',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      boxShadow: isSelected ? '0 0 10px var(--accent-gold-glow)' : 'none'
                    }}
                  >
                    {amt === 'custom' ? 'Custom' : `$${amt}`}
                  </button>
                );
              })}
            </div>

            {formData.amount === 'custom' && (
              <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                <DollarSign size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="number"
                  placeholder="Enter custom amount (e.g. 1250.00)"
                  min="5"
                  step="0.01"
                  value={formData.customAmount}
                  onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem 0.75rem 2.25rem',
                    borderRadius: '0.65rem',
                    border: '1.5px solid var(--input-border)',
                    fontSize: '0.95rem',
                    color: 'var(--input-text)',
                    backgroundColor: 'var(--input-bg)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              </div>
            )}
          </div>

          {/* Invoice / Reference Number */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quote / Invoice Reference (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. CAG-10492 or Property Address"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 0.9rem',
                borderRadius: '0.65rem',
                border: '1.5px solid var(--input-border)',
                fontSize: '0.9rem',
                color: 'var(--input-text)',
                backgroundColor: 'var(--input-bg)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Customer Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                Full Name *
              </label>
              <input
                type="text"
                placeholder="John Smith"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '0.65rem',
                  border: '1.5px solid var(--input-border)',
                  fontSize: '0.88rem',
                  color: 'var(--input-text)',
                  backgroundColor: 'var(--input-bg)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
                Email (Tax Receipt) *
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '0.65rem',
                  border: '1.5px solid var(--input-border)',
                  fontSize: '0.88rem',
                  color: 'var(--input-text)',
                  backgroundColor: 'var(--input-bg)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
              Mobile Phone
            </label>
            <input
              type="tel"
              placeholder="0400 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 0.85rem',
                borderRadius: '0.65rem',
                border: '1.5px solid var(--input-border)',
                fontSize: '0.88rem',
                color: 'var(--input-text)',
                backgroundColor: 'var(--input-bg)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'var(--accent-gold)',
              color: '#090e1a',
              border: 'none',
              borderRadius: '0.75rem',
              fontWeight: '800',
              fontSize: '1.05rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px var(--accent-gold-glow)',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.75 : 1,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Connecting to Stripe...
              </>
            ) : (
              <>
                <CreditCard size={20} /> Proceed to Stripe Checkout (${getFinalAmount().toFixed(2)} AUD) <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Security badge footer */}
          <div style={{
            marginTop: '1.25rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
            <span>Powered by <strong>Stripe</strong> • Apple Pay • Google Pay • Link • Visa • Mastercard</span>
          </div>
        </form>
      </div>
    </div>
  );
}
