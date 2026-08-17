import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Factory, 
  ChevronRight, 
  ArrowUp,
  HeartHandshake
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function Footer({ onOpenQuote, onSelectCategory, onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id) => {
    if (onNavigate) {
      onNavigate('home');
    }
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer style={{
      background: '#0a0f1d',
      color: '#94a3b8',
      paddingTop: 'clamp(2.75rem, 5vw, 4.5rem)',
      paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="container">
        {/* Main 4-Column Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr 1fr 1.2fr',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
          className="footer-grid"
        >
          {/* Column 1: Company Profile */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img 
                src="/images/custom-auto-gates-logo.png" 
                alt="Custom Auto Gates & Fencing" 
                style={{ height: '48px', width: 'auto', maxWidth: '200px', objectFit: 'contain' }}
              />
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#cbd5e1', marginBottom: '1.25rem' }}>
              South East Queensland's premier manufacturer of custom automatic driveway sliding gates, swing gates, solar off-grid gates, and aluminium slat fencing. 100% fabricated in our Yamanto workshop.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#10b981' }}>
                <ShieldCheck size={15} />
                <span>10-Year Factory Structural Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#fbbf24' }}>
                <Factory size={15} />
                <span>Yamanto Direct Wholesale Pricing</span>
              </div>
            </div>
          </div>

          {/* Column 2: Custom Gate Styles */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.1rem' }}>
              Custom Gate Systems
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem' }}>
              {[
                { name: 'Automatic Sliding Gates', id: 'sliding-gates' },
                { name: 'Double Swing Gates', id: 'swing-gates' },
                { name: 'Off-Grid Solar Gates', id: 'solar-gates' },
                { name: 'Commercial & Boom Gates', id: 'commercial-gates' },
                { name: 'Aluminium Slat Fencing', id: 'fencing' },
                { name: 'DecoWood Timber Finishes', id: 'decowood' },
                { name: 'Gate Servicing & Repairs', id: 'servicing-repairs' }
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
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.1rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('about')} 
                  style={{ color: '#fbbf24', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                >
                  <ChevronRight size={13} /> About Us & Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('service')} 
                  style={{ color: '#fbbf24', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                >
                  <ChevronRight size={13} /> Service, Repairs & Warranty
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
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.1rem' }}>
              Yamanto Workshop & Office
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', color: '#cbd5e1' }}>
                <MapPin size={15} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#cbd5e1' }}>
                <Phone size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <a href={COMPANY_INFO.tel} style={{ color: '#fbbf24', fontWeight: '800' }}>
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#cbd5e1' }}>
                <Mail size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#cbd5e1' }}>
                <Clock size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>

            <button onClick={onOpenQuote} className="btn btn-gold btn-sm" style={{ width: '100%', padding: '0.65rem' }}>
              Get Instant Online Quote
            </button>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Custom Auto Gates Pty Ltd. All Rights Reserved. ABN & QBCC Licensed.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <button 
              onClick={scrollToTop}
              style={{
                width: '36px',
                height: '36px',
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
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
