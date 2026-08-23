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
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      overflowY: 'auto',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '1.25rem',
        maxWidth: '560px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeIn 0.25s ease-out',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
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
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '2rem 1.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span style={{
              backgroundColor: '#eab308',
              color: '#0f172a',
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
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
          {errorMsg && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Payment Purpose */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Payment Purpose *
            </label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 0.9rem',
                borderRadius: '0.65rem',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                color: '#0f172a',
                backgroundColor: '#f8fafc',
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
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Select Amount (AUD) *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {['189', '500', '1000', 'custom'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  style={{
                    padding: '0.6rem 0.4rem',
                    borderRadius: '0.5rem',
                    border: formData.amount === amt ? '2px solid #eab308' : '1px solid #cbd5e1',
                    backgroundColor: formData.amount === amt ? '#fefce8' : '#ffffff',
                    color: formData.amount === amt ? '#854d0e' : '#334155',
                    fontWeight: formData.amount === amt ? '800' : '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {amt === 'custom' ? 'Custom' : `$${amt}`}
                </button>
              ))}
            </div>

            {formData.amount === 'custom' && (
              <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                <DollarSign size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
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
                    border: '1px solid #cbd5e1',
                    fontSize: '0.95rem',
                    color: '#0f172a',
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
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Customer Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
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
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
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
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
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
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
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
              backgroundColor: '#eab308',
              color: '#0f172a',
              border: 'none',
              borderRadius: '0.75rem',
              fontWeight: '800',
              fontSize: '1.05rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(234, 179, 8, 0.35)',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.75 : 1,
            }}
            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#ca8a04'; }}
            onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#eab308'; }}
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
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <ShieldCheck size={16} style={{ color: '#16a34a' }} />
            <span>Powered by <strong>Stripe</strong> • Apple Pay • Google Pay • Link • Visa • Mastercard</span>
          </div>
        </form>
      </div>
    </div>
  );
}
