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
        className="modal-content-light" 
        style={{ maxWidth: '820px', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-light" onClick={onClose}>
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }} className="animate-fadeIn">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#fff' }}>
              <Check size={36} />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              On-Site Measure Request Received!
            </h3>
            <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.name}</strong>. Our booking coordinator will call you on <strong>{formData.phone}</strong> within 2 business hours to schedule your free laser measure and design consultation in {formData.suburb || 'your area'}.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={COMPANY_INFO.tel} className="btn btn-gold">
                <Phone size={18} /> Call Us Direct: (07) 3102 1801
              </a>
              <button onClick={onClose} className="btn btn-outline-dark">
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge-tag badge-gold">
                <Calendar size={14} /> Free On-Site Consultation
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                Book Your Free Measure & Quote
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>
                Have a senior technician visit your property for an accurate laser measure, driveway slope check, and fixed-price quotation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }} className="contact-modal-grid">
              {/* Form Column */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0412 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Property Suburb *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brookwater, QLD"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Gate Type of Interest</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                    >
                      <option value="sliding-gates">Automatic Sliding Gate</option>
                      <option value="swing-gates">Automatic Swing Gate</option>
                      <option value="solar-gates">100% Off-Grid Solar Gate</option>
                      <option value="commercial-gates">Commercial / Security Gate</option>
                      <option value="boom-gates">Boom Gate / Barrier</option>
                      <option value="fencing">Aluminium Slat Fencing</option>
                      <option value="repairs">Gate Repairs & Servicing</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Preferred Measure Window</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                    >
                      <option value="morning">Morning (8am – 12pm)</option>
                      <option value="afternoon">Afternoon (12pm – 4pm)</option>
                      <option value="anytime">Anytime / First Available</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '700', marginBottom: '0.35rem' }}>Additional Property Notes or Questions</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Existing brick piers in place, slope from left to right..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem', resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-blue btn-lg" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <Send size={18} /> Confirm Measure Booking Request
                </button>
              </form>

              {/* Direct Info Sidebar */}
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', fontWeight: '800' }}>
                    Yamanto Workshop & Office
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155' }}>
                      <MapPin size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                      <span>{COMPANY_INFO.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155' }}>
                      <Phone size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                      <a href={COMPANY_INFO.tel} style={{ color: '#d97706', fontWeight: '700' }}>
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155' }}>
                      <Mail size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                      <span>{COMPANY_INFO.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155' }}>
                      <Clock size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                      <span>{COMPANY_INFO.hours}</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={14} style={{ color: '#059669' }} />
                    <span>No-obligation free quotes</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={14} style={{ color: '#059669' }} />
                    <span>QBCC compliant & fully insured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
