import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  Check, 
  Calendar, 
  ShieldCheck 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function ContactModal({ isOpen, onClose, defaultGateStyle }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    suburb: '',
    serviceType: defaultGateStyle || 'sliding-gates',
    preferredTime: 'morning',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-themed" 
        style={{ maxWidth: '780px', padding: 'clamp(1.25rem, 3.5vw, 2rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-light" onClick={onClose}>
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0.5rem' }} className="animate-fadeIn">
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--badge-green-bg)', color: 'var(--badge-green-text)', border: '1px solid var(--badge-green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              On-Site Measure Request Received!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.name}</strong>. Our booking coordinator will call you on <strong>{formData.phone}</strong> within 2 business hours to schedule your free laser measure and design consultation in {formData.suburb || 'your area'}.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={COMPANY_INFO.tel} className="btn btn-gold">
                <Phone size={17} /> Call Us Direct: (07) 3102 1801
              </a>
              <button onClick={onClose} className="btn btn-outline-dark">
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge-tag badge-gold" style={{ margin: 0, fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                <Calendar size={13} /> Free On-Site Consultation
              </span>
              <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.65rem)', fontWeight: '800', color: 'var(--text-heading)', marginTop: '0.4rem', marginBottom: '0.3rem' }}>
                Book Your Free Measure & Quote
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Have a senior technician visit your property for an accurate laser measure, driveway slope check, and fixed-price quotation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }} className="contact-modal-grid">
              {/* Form Column */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.65rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', marginBottom: '0.3rem' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--input-text)', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', marginBottom: '0.3rem' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0412 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--input-text)', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.65rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', marginBottom: '0.3rem' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--input-text)', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', marginBottom: '0.3rem' }}>Property Suburb *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paddington / Ipswich"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--input-text)', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', marginBottom: '0.3rem' }}>Service or Gate Type</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--input-text)', fontSize: '0.88rem' }}
                  >
                    <option value="sliding-gates">Automatic Sliding Gate</option>
                    <option value="swing-gates">Automatic Swing Gates</option>
                    <option value="solar-gates">Off-Grid Solar Automated Gate</option>
                    <option value="fencing">Aluminium Slat Fencing</option>
                    <option value="commercial-gates">Commercial & Boom Gate</option>
                    <option value="repairs">Service, Repair or Motor Replacement</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '700', marginBottom: '0.3rem' }}>Driveway Notes or Slope Info</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your property or preferred appointment times..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--input-text)', fontSize: '0.88rem', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-gold btn-lg btn-pulse" style={{ width: '100%', marginTop: '0.35rem' }}>
                  <Send size={17} /> Confirm Free On-Site Measure
                </button>
              </form>

              {/* Sidebar Info Column */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>
                    What Happens Next?
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)', border: '1px solid var(--badge-blue-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '0.72rem' }}>1</div>
                      <span>We confirm your preferred time & check driveway location.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)', border: '1px solid var(--badge-blue-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '0.72rem' }}>2</div>
                      <span>Senior technician performs laser measure & level evaluation.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)', border: '1px solid var(--badge-blue-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '0.72rem' }}>3</div>
                      <span>Receive an exact itemized factory direct price in 24 hours.</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Need immediate assistance?</div>
                  <a href={COMPANY_INFO.tel} style={{ color: 'var(--text-heading)', fontWeight: '800', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={15} style={{ color: 'var(--accent-gold)' }} /> (07) 3102 1801
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
