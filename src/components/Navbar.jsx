import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Calculator, 
  Calendar, 
  Wrench, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Clock, 
  Info,
  Star,
  Scale,
  Sun,
  Building2,
  Home,
  Layers,
  ArrowRight,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function Navbar({ 
  currentPage = 'home',
  onNavigate, 
  onOpenQuote, 
  onOpenContact, 
  onOpenTroubleshoot, 
  onSelectCategory 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    setServicesDropdown(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRouteClick = (page) => {
    setMenuOpen(false);
    setServicesDropdown(false);
    onNavigate(page);
  };

  return (
    <>
      {/* Top Announcements & Quick Contact Bar */}
      <div style={{
        background: '#090e1a',
        color: '#ffffff',
        fontSize: '0.78rem',
        padding: '0.4rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 101
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {/* Left: Trust Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1' }}>
              <ShieldCheck size={13} style={{ color: 'var(--accent-gold)' }} />
              <span>100% Australian Made in Yamanto</span>
            </span>

            <span className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
              <Clock size={12} style={{ color: 'var(--accent-gold)' }} />
              <span>Mon-Fri: 7:00 AM - 5:00 PM</span>
            </span>

            <span className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
              <MapPin size={12} style={{ color: 'var(--accent-gold)' }} />
              <span>Brisbane, Ipswich & SE QLD</span>
            </span>
          </div>

          {/* Right: Emergency Repairs Hotline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
            <button
              onClick={onOpenTroubleshoot}
              style={{
                background: 'rgba(217, 119, 6, 0.2)',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                borderRadius: '6px',
                padding: '0.18rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
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

      {/* Main Minimalist Sticky Header */}
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
          height: 'clamp(68px, 9vw, 80px)'
        }}>
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleRouteClick('home'); }}
            aria-label="Custom Auto Gates & Fencing Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              padding: '0.2rem 0',
              marginRight: '1.25rem',
              maxWidth: '55%'
            }}
          >
            <img 
              src="/images/custom-auto-gates-logo.png" 
              alt="Custom Auto Gates & Fencing" 
              style={{
                height: 'auto',
                maxHeight: 'clamp(38px, 6.5vw, 50px)',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </a>

          {/* Minimalist Desktop Navigation Links (Main 4 Core Items) */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <ul style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {/* 1. Services & Gates Dropdown */}
              <li style={{ position: 'relative' }} onMouseLeave={() => setServicesDropdown(false)}>
                <button 
                  className="nav-link-btn"
                  style={{
                    color: '#1e293b',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '700',
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
                  <span>Services & Gate Styles</span>
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
                      border: '1.5px solid #e2e8f0',
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
                      { name: 'Automatic Swing & Bi-Fold', id: 'swing-gates' },
                      { name: 'Off-Grid Solar Gates', id: 'solar-gates' },
                      { name: 'Commercial Boom & Barriers', id: 'boom-gates' },
                      { name: 'Aluminium Slat Fencing', id: 'fencing' },
                      { name: 'Service, Repairs & Warranty', id: 'service', isRoute: true },
                      { name: 'QLD Council & Pool Safety Guide', id: 'council-guide', isRoute: true }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setServicesDropdown(false);
                          if (s.isRoute) {
                            handleRouteClick(s.id);
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
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
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

              {/* 2. Project Gallery */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('gallery')}
                  style={{
                    color: '#1e293b',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Gallery
                </button>
              </li>

              {/* 3. Verified Reviews (4.9★) */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleRouteClick('testimonials')}
                  style={{
                    color: currentPage === 'testimonials' ? '#2563eb' : '#1e293b',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'testimonials' ? '800' : '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>Reviews</span>
                  <span style={{ color: '#d97706', fontSize: '0.78rem', background: '#fef3c7', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '800' }}>4.9★</span>
                </button>
              </li>

              {/* 4. Contact Us */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleRouteClick('contact')}
                  style={{
                    color: currentPage === 'contact' ? '#2563eb' : '#1e293b',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'contact' ? '800' : '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Action CTA Buttons + Minimalist Burger Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            {/* Instant Quote CTA */}
            <button 
              onClick={onOpenQuote}
              className="btn btn-gold btn-sm btn-pulse hidden-mobile"
              style={{ fontWeight: '800', padding: '0.6rem 1.15rem', fontSize: '0.9rem', borderRadius: '10px' }}
            >
              <Calculator size={15} />
              <span>Instant Quote</span>
            </button>

            {/* Universal Burger Menu Button (Visible on ALL devices for full catalog access) */}
            <button 
              onClick={() => setMenuOpen(true)}
              aria-label="Open full site navigation menu"
              style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '0.55rem 0.85rem',
                color: '#0f172a',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: '700',
                fontSize: '0.86rem',
                fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#eff6ff';
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.color = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.color = '#0f172a';
              }}
            >
              <Menu size={19} />
              <span className="hidden-mobile">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          FULL-SCREEN SLIDE-OUT DRAWER (BURGER MENU)
          ========================================================================= */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setMenuOpen(false)}
        >
          {/* Drawer Panel */}
          <div 
            style={{
              width: '100%',
              maxWidth: '440px',
              height: '100%',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.5rem',
              overflowY: 'auto',
              boxShadow: '-10px 0 35px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.25rem',
                borderBottom: '1.5px solid #f1f5f9',
                marginBottom: '1.25rem'
              }}>
                <img 
                  src="/images/custom-auto-gates-logo.png" 
                  alt="Custom Auto Gates" 
                  style={{ height: '40px', width: 'auto', maxWidth: '170px', objectFit: 'contain' }}
                />
                <button 
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* SECTION 1: CORE PAGES */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Main Navigation
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('home')}
                    style={{ color: currentPage === 'home' ? '#2563eb' : '#0f172a', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Home size={17} style={{ color: '#64748b' }} />
                      Home
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('about')}
                    style={{ color: currentPage === 'about' ? '#2563eb' : '#0f172a', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Info size={17} style={{ color: '#2563eb' }} />
                      About Us & Our Yamanto Team
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('service')}
                    style={{ color: currentPage === 'service' ? '#2563eb' : '#0f172a', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Wrench size={17} style={{ color: 'var(--accent-gold)' }} />
                      Service, Repairs & Warranty
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('testimonials')}
                    style={{ color: currentPage === 'testimonials' ? '#2563eb' : '#0f172a', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Star size={17} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                      Verified Reviews & Case Studies (4.9★)
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('council-guide')}
                    style={{ color: currentPage === 'council-guide' ? '#2563eb' : '#0f172a', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Scale size={17} style={{ color: '#10b981' }} />
                      QLD Council & Pool Safety Guide
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('contact')}
                    style={{ color: currentPage === 'contact' ? '#2563eb' : '#0f172a', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Phone size={17} style={{ color: '#2563eb' }} />
                      Contact Us & Showroom
                    </span>
                    <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                  </button>
                </div>
              </div>

              {/* SECTION 2: GATE STYLES & WORKSHOP CAPABILITIES */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Gate Styles & Fabrication
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                  {[
                    { name: 'Sliding Gates', id: 'sliding-gates' },
                    { name: 'Swing & Bi-Fold', id: 'swing-gates' },
                    { name: 'Solar Acreage', id: 'solar-gates' },
                    { name: 'Slat Fencing', id: 'fencing' },
                    { name: 'Boom Barriers', id: 'boom-gates' },
                    { name: 'Commercial Gates', id: 'commercial-gates' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        onSelectCategory && onSelectCategory(style.id);
                        handleNavClick('services');
                      }}
                      style={{
                        padding: '0.55rem 0.75rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        color: '#334155',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{style.name}</span>
                      <ChevronRight size={13} style={{ color: '#94a3b8' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: TECHNICAL & TRUST HUB */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Technical & Research
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('gallery')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Our Project Gallery (600+ Builds)</span>
                    <Sparkles size={15} style={{ color: 'var(--accent-gold)' }} />
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('motors')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Italian Nice & Centurion Motors</span>
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('why-factory-direct')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Why Buy Factory Direct</span>
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('suburbs')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Service Coverage Areas</span>
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('faqs')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Frequently Asked Questions</span>
                  </button>
                  <button 
                    className="mobile-nav-item" 
                    onClick={() => { setMenuOpen(false); onOpenTroubleshoot(); }}
                    style={{ color: '#d97706', padding: '0.55rem 0' }}
                  >
                    <span style={{ fontSize: '0.92rem', fontWeight: '700' }}>Emergency Gate Diagnostics</span>
                    <Wrench size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div style={{ paddingTop: '1.25rem', borderTop: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a 
                href={COMPANY_INFO.tel} 
                className="btn btn-blue btn-lg" 
                style={{ width: '100%', borderRadius: '12px' }}
              >
                <Phone size={18} />
                Call (07) 3102 1801
              </a>
              <button 
                onClick={() => { setMenuOpen(false); onOpenQuote(); }}
                className="btn btn-gold btn-lg" 
                style={{ width: '100%', borderRadius: '12px', fontWeight: '800' }}
              >
                <Calculator size={18} />
                Instant Online Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
