import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calculator, 
  Menu, 
  X, 
  ShieldCheck, 
  Wrench, 
  ChevronDown,
  Sparkles,
  Calendar,
  Info
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function Navbar({ currentPage, onNavigate, onOpenQuote, onOpenContact, onOpenTroubleshoot, onSelectCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Sleek Top Notification Bar */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#cbd5e1',
        fontSize: '0.84rem',
        padding: '0.55rem 0',
        lineHeight: 1.4
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Top Bar Left: Address & Hours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MapPin size={14} style={{ color: '#fbbf24', flexShrink: 0 }} />
              <span>Shed 2, 43-45 Belar St, Yamanto QLD 4305</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }} className="hidden-mobile">
              <Clock size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
              <span>Mon–Fri: 9:00 AM – 4:00 PM</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#34d399', fontWeight: '600' }} className="hidden-tablet">
              <ShieldCheck size={14} />
              <span>10-Year Factory Structural Warranty</span>
            </span>
          </div>

          {/* Top Bar Right: DIY Troubleshoot & Direct Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button 
              onClick={onOpenTroubleshoot}
              style={{
                color: '#e2e8f0',
                background: 'rgba(255,255,255,0.06)',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.78rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(251, 191, 36, 0.15)';
                e.currentTarget.style.borderColor = '#fbbf24';
                e.currentTarget.style.color = '#fbbf24';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#e2e8f0';
              }}
            >
              <Wrench size={13} style={{ color: '#fbbf24' }} />
              <span>Gate Stuck? Troubleshooting</span>
            </button>

            <a 
              href={COMPANY_INFO.tel}
              style={{
                color: '#fbbf24',
                fontWeight: '800',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                letterSpacing: '0.01em'
              }}
            >
              <Phone size={14} />
              <span>(07) 3102 1801</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: isScrolled ? '0 8px 24px rgba(15, 23, 42, 0.08)' : '0 2px 10px rgba(0, 0, 0, 0.03)',
        transition: 'box-shadow 0.25s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '86px'
        }}>
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            aria-label="Custom Auto Gates & Fencing Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              padding: '0.25rem 0',
              marginRight: '2rem'
            }}
          >
            <img 
              src="/images/custom-auto-gates-logo.png" 
              alt="Custom Auto Gates & Fencing" 
              style={{
                height: '56px',
                width: 'auto',
                maxWidth: '250px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <ul style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {/* About Us Link */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => onNavigate('about')}
                  style={{
                    color: currentPage === 'about' ? '#2563eb' : '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'about' ? '800' : '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => {
                    if (currentPage !== 'about') e.currentTarget.style.color = '#334155';
                  }}
                >
                  About Us
                </button>
              </li>

              {/* Services Dropdown */}
              <li style={{ position: 'relative' }} onMouseLeave={() => setServicesDropdown(false)}>
                <button 
                  className="nav-link-btn"
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                  onClick={() => handleNavClick('services')}
                  onMouseEnter={() => setServicesDropdown(true)}
                >
                  <span>Services & Gates</span>
                  <ChevronDown size={14} style={{ transform: servicesDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {/* Dropdown Menu */}
                {servicesDropdown && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '280px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      boxShadow: '0 18px 36px rgba(15,23,42,0.12)',
                      padding: '0.65rem',
                      zIndex: 120,
                      animation: 'fadeIn 0.18s ease-out'
                    }}
                    onMouseEnter={() => setServicesDropdown(true)}
                  >
                    {[
                      { name: 'Automatic Sliding Gates', id: 'sliding-gates' },
                      { name: 'Automatic Swing Gates', id: 'swing-gates' },
                      { name: 'Off-Grid Solar Gates', id: 'solar-gates' },
                      { name: 'Commercial & Security Gates', id: 'commercial-gates' },
                      { name: 'Boom Gates & Barriers', id: 'boom-gates' },
                      { name: 'Aluminium Slat Fencing', id: 'fencing' },
                      { name: 'Service, Repairs & Warranty', id: 'servicing-repairs' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onSelectCategory && onSelectCategory(s.id);
                          handleNavClick('services');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.65rem 0.85rem',
                          color: '#334155',
                          fontSize: '0.88rem',
                          fontWeight: '600',
                          borderRadius: '8px',
                          transition: 'all 0.15s ease',
                          display: 'block',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#eff6ff';
                          e.currentTarget.style.color = '#2563eb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#334155';
                        }}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('gallery')}
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                >
                  Project Gallery
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('motors')}
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                >
                  Motors & Specs
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('why-factory-direct')}
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                >
                  Why Factory Direct
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('suburbs')}
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                >
                  Service Areas
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('faqs')}
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.96rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                >
                  FAQs
                </button>
              </li>
            </ul>
          </nav>

          {/* Desktop Nav Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            <button 
              onClick={onOpenQuote}
              className="btn btn-gold btn-sm btn-pulse"
              style={{ fontWeight: '800', padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
            >
              <Calculator size={16} />
              <span>Instant Quote</span>
            </button>

            <button 
              onClick={onOpenContact}
              className="btn btn-outline-dark btn-sm"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.92rem' }}
            >
              <Calendar size={15} />
              <span>Free Measure</span>
            </button>

            {/* Mobile Toggle Button */}
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <img 
                src="/images/custom-auto-gates-logo.png" 
                alt="Custom Auto Gates" 
                style={{ height: '48px', width: 'auto', maxWidth: '200px', objectFit: 'contain' }}
              />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#0f172a', padding: '0.5rem' }}
              >
                <X size={26} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
                style={{ color: currentPage === 'about' ? '#2563eb' : '#0f172a' }}
              >
                <span>About Us & Our Team</span>
                <Info size={18} style={{ color: 'var(--accent-gold)' }} />
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('services')}>
                <span>Services & Gate Styles</span>
                <ChevronDown size={18} />
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('gallery')}>
                <span>Our Project Gallery (600+ Builds)</span>
                <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('motors')}>
                <span>Italian Nice & Centurion Motors</span>
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('why-factory-direct')}>
                <span>Why Buy Factory Direct</span>
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('suburbs')}>
                <span>Service Coverage Areas</span>
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('faqs')}>
                <span>Frequently Asked Questions</span>
              </button>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onOpenTroubleshoot(); }}
                style={{ color: '#d97706' }}
              >
                <span>Emergency Gate Troubleshooting</span>
                <Wrench size={18} />
              </button>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a 
              href={COMPANY_INFO.tel} 
              className="btn btn-blue btn-lg" 
              style={{ width: '100%' }}
            >
              <Phone size={19} />
              Call (07) 3102 1801
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="btn btn-gold btn-lg" 
              style={{ width: '100%' }}
            >
              <Calculator size={19} />
              Get Instant Online Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
