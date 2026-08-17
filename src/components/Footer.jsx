import React from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

export default function Footer({ onNavigate, onOpenQuote, onOpenContact, onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id) => {
    onNavigate && onNavigate('home');
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer style={{ background: '#0f172a', color: '#cbd5e1', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Footer Main 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
          gap: '3rem',
          marginBottom: '4rem'
        }}
        className="footer-grid"
        >
          {/* Column 1: Company Profile & Badges */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <img 
                src="/images/custom-auto-gates-logo.png" 
                alt="Custom Auto Gates Logo" 
                style={{ height: '56px', width: 'auto', background: '#ffffff', padding: '6px 14px', borderRadius: '10px', display: 'inline-block' }}
              />
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              South East Queensland's trusted manufacturer of custom automatic sliding gates, swing gates, solar gates, and architectural aluminium slat fencing. Buy factory direct from our Yamanto workshop.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399' }}>
                <ShieldCheck size={17} /> 10-Year Factory Structural Warranty
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24' }}>
                <Award size={17} /> 100% Australian Made In Yamanto QLD
              </div>
            </div>
          </div>

          {/* Column 2: Gate Styles & Services */}
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.4rem' }}>
              Gate & Fencing Solutions
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem' }}>
              {[
                { name: 'Automatic Sliding Gates', id: 'sliding-gates' },
                { name: 'Automatic Swing Gates', id: 'swing-gates' },
                { name: 'Solar Powered Gates', id: 'solar-gates' },
                { name: 'Commercial Security Gates', id: 'commercial-gates' },
                { name: 'Boom Gates & Barriers', id: 'boom-gates' },
                { name: 'Aluminium Slat Fencing', id: 'fencing' },
                { name: 'Repairs & Servicing', id: 'servicing-repairs' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      onSelectCategory && onSelectCategory(item.id);
                      handleLinkClick('services');
                    }}
                    style={{ color: '#94a3b8', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '0.4rem', textAlign: 'left', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fbbf24'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <ChevronRight size={13} /> {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.4rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('about')} 
                  style={{ color: '#fbbf24', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                >
                  <ChevronRight size={13} /> About Us & Our Team
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('gate-visualizer')} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <ChevronRight size={13} /> Live Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('gallery')} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <ChevronRight size={13} /> Completed Gallery (600+)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('motors')} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <ChevronRight size={13} /> Motors & Automation
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('why-factory-direct')} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <ChevronRight size={13} /> Why Buy Factory Direct
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('suburbs')} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <ChevronRight size={13} /> Service Areas
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('faqs')} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <ChevronRight size={13} /> FAQs & Answers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Contact & Operating Hours */}
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.4rem' }}>
              Yamanto Workshop & Office
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: '#cbd5e1' }}>
                <MapPin size={17} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#cbd5e1' }}>
                <Phone size={17} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <a href={COMPANY_INFO.tel} style={{ color: '#fbbf24', fontWeight: '800' }}>
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#cbd5e1' }}>
                <Mail size={17} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#cbd5e1' }}>
                <Clock size={17} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>

            <button onClick={onOpenQuote} className="btn btn-gold btn-sm" style={{ width: '100%', padding: '0.75rem' }}>
              Get Instant Online Quote
            </button>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Custom Auto Gates Pty Ltd & Blondies Powder Coating. All Rights Reserved. ABN & QBCC Licensed.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Price Match Guarantee</span>
            <button 
              onClick={scrollToTop}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
                cursor: 'pointer'
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
