import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Sliders, 
  Sun, 
  Building2, 
  Wrench, 
  Layers, 
  DollarSign, 
  Upload,
  Lock,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import FileUploadField from './FileUploadField';
import { uploadFormFiles } from '../utils/uploadHelper';
import { trackFormLead } from '../utils/analytics';

const GATE_STYLES = [
  { id: 'sliding-gates', name: 'Automatic Sliding Gate', priceTag: 'From $3,850', icon: Sliders },
  { id: 'swing-gates', name: 'Automatic Double Swing Gate', priceTag: 'From $4,500', icon: Layers },
  { id: 'solar-gates', name: 'Off-Grid Solar Powered Gate', priceTag: 'From $4,850', icon: Sun },
  { id: 'commercial-gates', name: 'Commercial & Cantilever Gate', priceTag: 'Heavy Duty', icon: Building2 },
  { id: 'fencing', name: 'Architectural Fencing & Slat Gate', priceTag: 'Custom Sizing', icon: ShieldCheck },
  { id: 'service', name: 'Gate Motor Replacement / Repair', priceTag: 'From $250 Call-Out', icon: Wrench },
];

const DRIVEWAY_WIDTHS = [
  { id: 'single', label: 'Single Driveway (3.0m – 4.0m)' },
  { id: 'double', label: 'Double Driveway (4.0m – 5.5m)' },
  { id: 'wide', label: 'Acreage / Wide (5.5m – 7.0m+)' },
  { id: 'unsure', label: 'Not Sure (Need Laser Measure)' },
];

export default function FastQuoteModal({ isOpen, onClose, defaultGateStyle = 'sliding-gates' }) {
  const [selectedStyle, setSelectedStyle] = useState(defaultGateStyle || 'sliding-gates');
  const [selectedWidth, setSelectedWidth] = useState('double');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [suburb, setSuburb] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (defaultGateStyle) {
      let key = defaultGateStyle;
      if (key === 'automatic-sliding-gates' || key === 'driveway-gates') key = 'sliding-gates';
      if (key === 'pool-fencing' || key === 'aluminum-fencing' || key === 'security-fencing') key = 'fencing';
      const match = GATE_STYLES.find(g => g.id === key);
      if (match) setSelectedStyle(match.id);
    }
  }, [defaultGateStyle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone && !email) {
      setErrorMessage('Please provide a phone number so our team can provide your quote.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let uploadedFiles = [];
      if (files && files.length > 0) {
        uploadedFiles = await uploadFormFiles(files);
      }

      const styleObj = GATE_STYLES.find(s => s.id === selectedStyle) || GATE_STYLES[0];
      const widthObj = DRIVEWAY_WIDTHS.find(w => w.id === selectedWidth) || DRIVEWAY_WIDTHS[1];

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name ? name.trim() : 'Valued Customer',
          phone: phone.trim(),
          email: email.trim(),
          address: suburb.trim(),
          suburb: suburb.trim(),
          design: styleObj.name,
          gateType: styleObj.name,
          timeline: widthObj.label,
          estimatedTotal: styleObj.priceTag,
          totalPriceRange: styleObj.priceTag,
          notes: `Driveway Width: ${widthObj.label}. Notes: ${notes}`,
          files: uploadedFiles,
          source: 'Fast Quote & Free Measure Modal'
        })
      });

      if (!res.ok) {
        // Fallback to contact API if quote API has an issue
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name ? name.trim() : 'Valued Customer',
            phone: phone.trim(),
            email: email.trim(),
            address: suburb.trim(),
            suburb: suburb.trim(),
            serviceType: styleObj.name,
            preferredTime: widthObj.label,
            notes: `Gate Style: ${styleObj.name}. Driveway Width: ${widthObj.label}. Additional: ${notes}`,
            files: uploadedFiles,
            source: 'Fast Quote & Free Measure Modal'
          })
        });
      }

      await trackFormLead(email, phone, 'fast_quote');
      setIsSubmitted(true);
      try {
        window.history.pushState({}, '', '/quote-confirmation');
      } catch (e) {}
    } catch (err) {
      console.error('Fast quote submission error:', err);
      setErrorMessage('There was a slight connection issue. Please call our Yamanto workshop directly on (07) 3102 1801.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(4, 7, 14, 0.86)',
        backdropFilter: 'blur(6px)'
      }}
    >
      <div 
        className="modal-content-themed animate-fadeIn"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
          borderRadius: '20px',
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button"
          className="modal-close-light" 
          onClick={onClose}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-heading)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }} className="animate-fadeIn">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--badge-green-bg)', color: 'var(--badge-green-text)', border: '1.5px solid var(--badge-green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <Check size={36} />
            </div>

            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.65rem' }}>
              Quote &amp; Measure Request Received!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              Thank you, <strong>{name || 'Valued Customer'}</strong>. Our workshop coordinator will review your property details in <strong>{suburb || 'SE Queensland'}</strong> and call you on <strong>{phone}</strong> within 2 business hours with estimated pricing &amp; free laser measure availability.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={COMPANY_INFO.tel} className="btn btn-gold btn-md" style={{ fontWeight: '800' }}>
                <Phone size={17} /> Call Workshop: (07) 3102 1801
              </a>
              <button onClick={onClose} className="btn btn-outline-dark btn-md">
                Done &amp; Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', borderRadius: '20px', background: 'var(--badge-gold-bg)', color: 'var(--badge-gold-text)', border: '1px solid var(--badge-gold-border)', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <ShieldCheck size={13} /> Factory Direct • QBCC #15579753
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: '800', color: 'var(--text-heading)', margin: '0 0 0.35rem 0', lineHeight: 1.25 }}>
                Get a Fast Quote &amp; Free Site Measure
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                No middleman commissions. Select your preferred style and tell us about your property for an honest, upfront estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Step 1: Select Gate Style */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                  1. Select Gate Style
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
                  gap: '0.5rem'
                }}>
                  {GATE_STYLES.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    const IconComponent = style.icon;
                    return (
                      <button
                        type="button"
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        style={{
                          padding: '0.65rem 0.75rem',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <IconComponent size={16} style={{ color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: '800', color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                            {style.priceTag}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: isSelected ? 'var(--text-heading)' : 'var(--text-main)', lineHeight: 1.3 }}>
                          {style.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Approximate Driveway Width */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                  2. Approximate Driveway Width
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
                  gap: '0.45rem'
                }}>
                  {DRIVEWAY_WIDTHS.map((w) => {
                    const isSelected = selectedWidth === w.id;
                    return (
                      <button
                        type="button"
                        key={w.id}
                        onClick={() => setSelectedWidth(w.id)}
                        style={{
                          padding: '0.5rem 0.65rem',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          background: isSelected ? 'var(--accent-gold)' : 'var(--bg-card-subtle)',
                          color: isSelected ? '#090e1a' : 'var(--text-main)',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'center'
                        }}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Suburb & Contact Info */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                  3. Suburb &amp; Contact Details
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone / Mobile Number * (e.g. 0412 345 678)"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address (for written quote)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Property Suburb (e.g. Yamanto, Paddington, Springfield)"
                      required
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Optional Driveway Photo / Notes */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <textarea
                    placeholder="Optional details: Any driveway slope, power supply preference, or specific color?"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--input-text)',
                      fontSize: '0.84rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <FileUploadField
                  files={files}
                  setFiles={setFiles}
                  label="Attach Driveway / Fence Photo (Optional)"
                />
              </div>

              {errorMessage && (
                <div style={{ color: '#ef4444', fontSize: '0.82rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%', fontWeight: '800', justifyContent: 'center', fontSize: '1rem' }}
                >
                  {isSubmitting ? (
                    <span>Submitting Your Request...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit for Free Quote &amp; Site Measure
                    </>
                  )}
                </button>
              </div>

              {/* Trust Footer */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={13} style={{ color: 'var(--accent-emerald)' }} /> 10-Yr Structural Warranty
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Lock size={13} style={{ color: 'var(--accent-emerald)' }} /> Zero Sales Pressure
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Phone size={13} style={{ color: 'var(--accent-gold)' }} /> Free Phone Advice: (07) 3102 1801
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
