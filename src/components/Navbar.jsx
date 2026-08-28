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
  Moon, 
  Building2, 
  HardHat, 
  Home, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Flame, 
  CheckCircle2,
  CreditCard 
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from './SocialIcons';
import { COMPANY_INFO } from '../data/siteData';

export default function Navbar({ 
  currentPage = 'home',
  theme = 'dark',
  onToggleTheme,
  onNavigate, 
  onOpenQuote, 
  onOpenContact, 
  onOpenTroubleshoot,
  onOpenPay,
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
        background: 'var(--bg-header-top)',
        color: '#ffffff',
        fontSize: '0.78rem',
        padding: '0.4rem 0',
        borderBottom: '1px solid var(--border-light)',
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
              <span>Mon-Fri: 9:00 AM – 4:00 PM</span>
            </span>

            <span className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
              <MapPin size={12} style={{ color: 'var(--accent-gold)' }} />
              <span>Brisbane, Ipswich & SE QLD</span>
            </span>
          </div>

          {/* Right: Social Links, Emergency Repairs & Direct Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
            {/* Social Media Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <a
                href={COMPANY_INFO.instagram || 'https://www.instagram.com/customautogates/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Custom Auto Gates on Instagram"
                title="Follow Custom Auto Gates on Instagram"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e1306c'; e.currentTarget.style.background = 'rgba(225, 48, 108, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
              >
                <InstagramIcon size={13} />
              </a>

              <a
                href={COMPANY_INFO.facebook || 'https://www.facebook.com/profile.php?id=61593825539148'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Custom Auto Gates on Facebook"
                title="Follow Custom Auto Gates on Facebook"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1877f2'; e.currentTarget.style.background = 'rgba(24, 119, 242, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
              >
                <FacebookIcon size={13} />
              </a>

              <a
                href={COMPANY_INFO.linkedin || 'https://au.linkedin.com/company/customautogates'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Custom Auto Gates on LinkedIn"
                title="Follow Custom Auto Gates on LinkedIn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0a66c2'; e.currentTarget.style.background = 'rgba(10, 102, 194, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
              >
                <LinkedInIcon size={13} />
              </a>
            </div>

            <button
              onClick={onOpenPay}
              style={{
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
                border: '1px solid rgba(147, 197, 253, 0.4)',
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
              <CreditCard size={12} style={{ color: '#60a5fa' }} />
              <span>Pay Invoice</span>
            </button>

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

      {/* Main Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-navbar)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.25s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '68px',
          height: 'clamp(68px, 9vw, 80px)'
        }}>
          {/* Brand Logo - Responsive Horizontal Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleRouteClick('home'); }}
            aria-label="Custom Auto Gates & Fencing Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              padding: '0.2rem 0',
              marginRight: '1rem',
              maxWidth: 'min(280px, 60vw)',
              textDecoration: 'none'
            }}
          >
            <img 
              src={theme === 'light' ? '/images/custom-auto-gates-logo-horizontal-light.png' : '/images/custom-auto-gates-logo-horizontal-dark.png'} 
              alt="Custom Auto Gates & Fencing" 
              style={{
                height: 'clamp(38px, 5.2vw, 48px)',
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
                    color: 'var(--text-heading)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
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
                      background: 'var(--bg-card)',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: '14px',
                      boxShadow: 'var(--shadow-xl)',
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
                      { name: 'Trade & Builders Portal (Wholesale)', id: 'trade', isRoute: true },
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
                          color: 'var(--text-main)',
                          fontSize: '0.86rem',
                          fontWeight: '600',
                          borderRadius: '8px',
                          display: 'block',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-card-hover)';
                          e.currentTarget.style.color = 'var(--accent-gold)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-main)';
                        }}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* 2. Trade & Builders Portal */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleRouteClick('trade')}
                  style={{
                    color: currentPage === 'trade' ? 'var(--accent-gold)' : 'var(--text-heading)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'trade' ? '800' : '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <HardHat size={15} style={{ color: 'var(--accent-gold)' }} />
                  <span>Trade & Builders</span>
                </button>
              </li>

              {/* 3. Project Gallery */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleNavClick('gallery')}
                  style={{
                    color: 'var(--text-heading)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                >
                  Gallery
                </button>
              </li>

              {/* 4. Verified Reviews (4.9★) */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleRouteClick('testimonials')}
                  style={{
                    color: currentPage === 'testimonials' ? 'var(--accent-gold)' : 'var(--text-heading)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'testimonials' ? '800' : '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span>Reviews</span>
                  <span style={{ 
                    color: 'var(--badge-gold-text)', 
                    fontSize: '0.78rem', 
                    background: 'var(--badge-gold-bg)', 
                    border: '1px solid var(--badge-gold-border)',
                    padding: '0.1rem 0.4rem', 
                    borderRadius: '4px', 
                    fontWeight: '800' 
                  }}>4.9★</span>
                </button>
              </li>

              {/* 5. Contact Us */}
              <li>
                <button 
                  className="nav-link-btn" 
                  onClick={() => handleRouteClick('contact')}
                  style={{
                    color: currentPage === 'contact' ? 'var(--accent-gold)' : 'var(--text-heading)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: currentPage === 'contact' ? '800' : '700',
                    fontSize: '0.94rem',
                    padding: '0.5rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Action CTA Buttons + Theme Toggle Switch + Burger Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            {/* Theme Toggle Button (Dark / Day Mode Switcher) */}
            <button
              onClick={onToggleTheme}
              className="theme-toggle-switch"
              aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Dark'} Mode`}
              title={`Currently in ${theme === 'dark' ? 'Dark' : 'Day'} Mode. Click to switch to ${theme === 'dark' ? 'Day' : 'Dark'} Mode.`}
            >
              <div className="theme-toggle-indicator">
                {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
              </div>
              <span className="hidden-mobile">{theme === 'dark' ? 'Dark Mode' : 'Day Mode'}</span>
            </button>

            {/* Instant Quote CTA */}
            <button 
              onClick={onOpenQuote}
              className="btn btn-gold btn-sm btn-pulse hidden-mobile"
              style={{ fontWeight: '800', padding: '0.6rem 1.15rem', fontSize: '0.9rem', borderRadius: '10px' }}
            >
              <Calculator size={15} />
              <span>Instant Quote</span>
            </button>

            {/* Universal Burger Menu Button */}
            <button 
              onClick={() => setMenuOpen(true)}
              aria-label="Open full site navigation menu"
              style={{
                background: 'var(--bg-card-subtle)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '0.55rem 0.85rem',
                color: 'var(--text-heading)',
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
                e.currentTarget.style.background = 'var(--bg-card-hover)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card-subtle)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-heading)';
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
            background: 'var(--modal-overlay-bg)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
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
              background: 'var(--bg-drawer)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.5rem',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              borderLeft: '1px solid var(--border-light)'
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
                borderBottom: '1.5px solid var(--border-light)',
                marginBottom: '1.25rem'
              }}>
                <img 
                  src={theme === 'light' ? '/images/custom-auto-gates-logo-horizontal-light.png' : '/images/custom-auto-gates-logo-horizontal-dark.png'} 
                  alt="Custom Auto Gates" 
                  style={{ 
                    height: 'clamp(32px, 5vw, 40px)', 
                    width: 'auto', 
                    maxWidth: '190px', 
                    objectFit: 'contain'
                  }}
                />
                <button 
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  style={{
                    background: 'var(--bg-card-muted)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-heading)',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Theme Toggle Banner Inside Mobile Menu */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                marginBottom: '1.25rem'
              }}>
                <span style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  {theme === 'dark' ? <Moon size={15} style={{ color: 'var(--accent-gold)' }} /> : <Sun size={15} style={{ color: 'var(--accent-gold)' }} />}
                  Appearance: {theme === 'dark' ? 'Dark Mode' : 'Day Mode'}
                </span>
                <button
                  onClick={onToggleTheme}
                  className="theme-toggle-switch"
                  style={{ padding: '0.3rem 0.65rem' }}
                >
                  <span>{theme === 'dark' ? 'Day Mode ☀️' : 'Dark Mode 🌙'}</span>
                </button>
              </div>

              {/* SECTION 1: CORE PAGES */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Main Navigation
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('home')}
                    style={{ color: currentPage === 'home' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Home size={17} style={{ color: 'var(--text-muted)' }} />
                      Home
                    </span>
                    <ChevronRight size={16} style={{ color: 'var(--border-subtle)' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('about')}
                    style={{ color: currentPage === 'about' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Info size={17} style={{ color: 'var(--accent-blue)' }} />
                      About Us & Our Yamanto Team
                    </span>
                    <ChevronRight size={16} style={{ color: 'var(--border-subtle)' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('service')}
                    style={{ color: currentPage === 'service' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Wrench size={17} style={{ color: 'var(--accent-gold)' }} />
                      Service, Repairs & Warranty
                    </span>
                    <ChevronRight size={16} style={{ color: 'var(--border-subtle)' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('testimonials')}
                    style={{ color: currentPage === 'testimonials' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Star size={17} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                      Verified Reviews & Case Studies (4.9★)
                    </span>
                    <ChevronRight size={16} style={{ color: 'var(--border-subtle)' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('trade')}
                    style={{ color: currentPage === 'trade' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <HardHat size={17} style={{ color: 'var(--accent-gold)' }} />
                      Trade & Builders Portal (Wholesale)
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.2)',
                      color: '#fbbf24',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(251, 191, 36, 0.4)'
                    }}>
                      7–10 Days
                    </span>
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('council-guide')}
                    style={{ color: currentPage === 'council-guide' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Scale size={17} style={{ color: 'var(--accent-emerald)' }} />
                      QLD Council & Pool Safety Guide
                    </span>
                    <ChevronRight size={16} style={{ color: 'var(--border-subtle)' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('contact')}
                    style={{ color: currentPage === 'contact' ? 'var(--accent-gold)' : 'var(--text-heading)', padding: '0.65rem 0' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Phone size={17} style={{ color: 'var(--accent-blue)' }} />
                      Contact Us & Showroom
                    </span>
                    <ChevronRight size={16} style={{ color: 'var(--border-subtle)' }} />
                  </button>

                  <button 
                    className="mobile-nav-item" 
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenPay && onOpenPay();
                    }}
                    style={{ color: '#60a5fa', padding: '0.65rem 0', fontWeight: '800' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <CreditCard size={17} style={{ color: '#60a5fa' }} />
                      Pay Invoice or Deposit (Stripe)
                    </span>
                    <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid rgba(147, 197, 253, 0.3)' }}>
                      Instant Pay
                    </span>
                  </button>
                </div>
              </div>

              {/* SECTION 2: GATE STYLES & WORKSHOP CAPABILITIES */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
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
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{style.name}</span>
                      <ChevronRight size={13} style={{ color: 'var(--text-muted)' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: TECHNICAL & TRUST HUB */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Technical & Research
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('gallery')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Our Project Gallery (600+ Builds)</span>
                    <Sparkles size={15} style={{ color: 'var(--accent-gold)' }} />
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('motors')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Centurion Smart Motors</span>
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('why-factory-direct')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Why Buy Factory Direct</span>
                  </button>
                  <button 
                    className="mobile-nav-item" 
                    onClick={() => handleRouteClick('suburbs')} 
                    style={{ padding: '0.55rem 0', color: currentPage === 'suburbs' ? 'var(--accent-gold)' : 'var(--text-heading)' }}
                  >
                    <span style={{ fontSize: '0.92rem' }}>Service Areas (Brisbane, Ipswich, Logan, GC)</span>
                    <MapPin size={15} style={{ color: 'var(--accent-blue)' }} />
                  </button>
                  <button className="mobile-nav-item" onClick={() => handleNavClick('faqs')} style={{ padding: '0.55rem 0' }}>
                    <span style={{ fontSize: '0.92rem' }}>Frequently Asked Questions</span>
                  </button>
                  <button 
                    className="mobile-nav-item" 
                    onClick={() => { setMenuOpen(false); onOpenTroubleshoot(); }}
                    style={{ color: 'var(--accent-gold)', padding: '0.55rem 0' }}
                  >
                    <span style={{ fontSize: '0.92rem', fontWeight: '700' }}>Emergency Gate Diagnostics</span>
                    <Wrench size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions & Social Links */}
            <div style={{ paddingTop: '1.25rem', borderTop: '1.5px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem', marginBottom: '0.25rem' }}>
                <a 
                  href={COMPANY_INFO.instagram || 'https://www.instagram.com/customautogates/'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.55rem 0.35rem' }}
                >
                  <InstagramIcon size={15} style={{ color: '#e1306c' }} /> Insta
                </a>
                <a 
                  href={COMPANY_INFO.facebook || 'https://www.facebook.com/profile.php?id=61593825539148'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.55rem 0.35rem' }}
                >
                  <FacebookIcon size={15} style={{ color: '#1877f2' }} /> FB
                </a>
                <a 
                  href={COMPANY_INFO.linkedin || 'https://au.linkedin.com/company/customautogates'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.55rem 0.35rem' }}
                >
                  <LinkedInIcon size={15} style={{ color: '#0a66c2' }} /> LinkedIn
                </a>
              </div>

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
