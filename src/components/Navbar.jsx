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
      {/* Sleek Top Notification Bar - Responsive */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#cbd5e1',
        fontSize: '0.82rem',
        padding: '0.45rem 0',
        lineHeight: 1.4
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* Top Bar Left: Address & Hours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MapPin size={13} style={{ color: '#fbbf24', flexShrink: 0 }} />
              <span className="hidden-mobile">Shed 2, 43-45 Belar St, Yamanto QLD 4305</span>
              <span className="visible-mobile-only" style={{ display: 'none' }}>Yamanto, QLD</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }} className="hidden-mobile">
              <Clock size={13} style={{ color: '#94a3b8', flexShrink: 0 }} />
              <span>Mon–Fri: 9am – 4pm</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#34d399', fontWeight: '600' }} className="hidden-tablet">
              <ShieldCheck size={13} />
              <span>10-Yr Factory Warranty</span>
            </span>
          </div>

          {/* Top Bar Right: DIY Troubleshoot & Direct Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <button 
              onClick={onOpenTroubleshoot}
              className="hidden-mobile"
              style={{
                color: '#e2e8f0',
                background: 'rgba(255,255,255,0.06)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.76rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <Wrench size={12} style={{ color: '#fbbf24' }} />
              <span>Gate Stuck?</span>
            </button>

            <a 
              href={COMPANY_INFO.tel}
              style={{
                color: '#fbbf24',
                fontWeight: '800',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                letterSpacing: '0.01em'
              }}
            >
              <Phone size={13} />
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
          minHeight: '68px',
          height: 'clamp(68px, 10vw, 84px)'
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
              padding: '0.2rem 0',
              marginRight: '1rem',
              maxWidth: '65%'
            }}
          >
            <img 
              src="/images/custom-auto-gates-logo.png" 
              alt="Custom Auto Gates & Fencing" 
              style={{
                height: 'auto',
                maxHeight: 'clamp(40px, 7vw, 54px)',
                width: 'auto',
                maxWidth: '100%',
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
              gap: '1.5rem',
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
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
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
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
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
                      width: '270px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      boxShadow: '0 18px 36px rgba(15,23,42,0.12)',
                      padding: '0.55rem',
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
                      { name: 'Service, Repairs & Warranty Page', id: 'service', isRoute: true },
                      { name: 'QLD Council & Pool Safety Guide', id: 'council-guide', isRoute: true }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setServicesDropdown(false);
                          if (s.isRoute) {
                            onNavigate(s.id);
                          } else {
                            onSelectCategory && onSelectCategory(s.id);
                            handleNavClick('services');
                          }
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 0.8rem',
                          color: '#334155',
                          fontSize: '0.86rem',
                          fontWeight: '600',
                          borderRadius: '8px',
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
                  onClick={() => onNavigate('service')}
                  style={{
                    color: currentPage === 'service' ? '#2563eb' : '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'service' ? '800' : '600',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Service & Repairs
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('gallery')}
                  style={{
                    color: '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Project Gallery
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => onNavigate('testimonials')}
                  style={{
                    color: currentPage === 'testimonials' ? '#2563eb' : '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'testimonials' ? '800' : '600',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                >
                  Reviews (4.9★)
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
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
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
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
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
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
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
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  FAQs
                </button>
              </li>

              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => onNavigate('contact')}
                  style={{
                    color: currentPage === 'contact' ? '#2563eb' : '#334155',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'contact' ? '800' : '600',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease'
                  }}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            <button 
              onClick={onOpenQuote}
              className="btn btn-gold btn-sm btn-pulse hidden-mobile"
              style={{ fontWeight: '800', padding: '0.6rem 1.1rem', fontSize: '0.9rem' }}
            >
              <Calculator size={15} />
              <span>Instant Quote</span>
            </button>

            <button 
              onClick={onOpenContact}
              className="btn btn-outline-dark btn-sm hidden-mobile"
              style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
            >
              <Calendar size={14} />
              <span>Free Measure</span>
            </button>

            {/* Mobile Toggle Button */}
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.55rem',
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '42px',
                minHeight: '42px'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <img 
                src="/images/custom-auto-gates-logo.png" 
                alt="Custom Auto Gates" 
                style={{ height: '42px', width: 'auto', maxWidth: '180px', objectFit: 'contain' }}
              />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: '#f1f5f9',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
                style={{ color: currentPage === 'about' ? '#2563eb' : '#0f172a' }}
              >
                <span>About Us & Our Team</span>
                <Info size={17} style={{ color: 'var(--accent-gold)' }} />
              </button>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onNavigate('service'); }}
                style={{ color: currentPage === 'service' ? '#2563eb' : '#0f172a' }}
              >
                <span>Service, Repairs & Warranty</span>
                <Wrench size={17} style={{ color: 'var(--accent-gold)' }} />
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('services')}>
                <span>Services & Gate Styles</span>
                <ChevronDown size={17} />
              </button>
              <button className="mobile-nav-item" onClick={() => handleNavClick('gallery')}>
                <span>Our Project Gallery (600+ Builds)</span>
                <Sparkles size={17} style={{ color: 'var(--accent-gold)' }} />
              </button>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onNavigate('testimonials'); }}
                style={{ color: currentPage === 'testimonials' ? '#2563eb' : '#0f172a' }}
              >
                <span>Verified Reviews (4.9★)</span>
                <Star size={17} style={{ color: '#f59e0b' }} />
              </button>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onNavigate('council-guide'); }}
                style={{ color: currentPage === 'council-guide' ? '#2563eb' : '#0f172a' }}
              >
                <span>QLD Council & Pool Safety Guide</span>
                <Scale size={17} style={{ color: 'var(--accent-gold)' }} />
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
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }}
                style={{ color: currentPage === 'contact' ? '#2563eb' : '#0f172a' }}
              >
                <span>Contact Us & Showroom</span>
                <Phone size={17} style={{ color: 'var(--accent-gold)' }} />
              </button>
              <button 
                className="mobile-nav-item" 
                onClick={() => { setMobileMenuOpen(false); onOpenTroubleshoot(); }}
                style={{ color: '#d97706' }}
              >
                <span>Emergency Gate Troubleshooting</span>
                <Wrench size={17} />
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <a 
              href={COMPANY_INFO.tel} 
              className="btn btn-blue btn-lg" 
              style={{ width: '100%', borderRadius: '12px' }}
            >
              <Phone size={18} />
              Call (07) 3102 1801
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="btn btn-gold btn-lg" 
              style={{ width: '100%', borderRadius: '12px', fontWeight: '800' }}
            >
              <Calculator size={18} />
              Get Instant Online Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
