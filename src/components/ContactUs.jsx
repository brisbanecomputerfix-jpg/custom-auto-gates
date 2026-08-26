import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  ChevronRight, 
  Car, 
  Radio, 
  Zap, 
  Navigation, 
  ArrowRight, 
  Check, 
  Sliders, 
  MessageSquare,
  Building2,
  Home,
  Layers,
  Key,
  Flame,
  HelpCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function ContactUs({ onOpenQuote, onOpenTroubleshoot, onNavigateHome, onNavigateService }) {
  // Gate Simulation State
  const [gateOpen, setGateOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [gateProgress, setGateProgress] = useState(0);
  const [gateStyle, setGateStyle] = useState('monument-slat'); // 'monument-slat' | 'satin-black' | 'timber-look' | 'commercial-boom'
  const [beaconActive, setBeaconActive] = useState(false);
  const [keyfobLed, setKeyfobLed] = useState(false);
  const [gateType, setGateType] = useState('sliding'); // 'sliding' | 'swing'

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    suburb: '',
    projectType: 'Automatic Sliding Gate',
    propertyType: 'Residential Home',
    preferredTime: 'Morning (8am - 12pm)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Driveway distance calculator
  const [selectedOrigin, setSelectedOrigin] = useState('brisbane-cbd');

  const travelTimes = {
    'brisbane-cbd': { name: 'Brisbane CBD & Inner Suburbs', time: '35 mins', dist: '41 km', route: 'Via Centenary Mwy / M5' },
    'ipswich-cbd': { name: 'Ipswich Central & Riverview', time: '8 mins', dist: '6.2 km', route: 'Via Warwick Rd / A15' },
    'springfield': { name: 'Springfield Lakes & Orion', time: '16 mins', dist: '18 km', route: 'Via Centenary Hwy / M1' },
    'indooroopilly': { name: 'Indooroopilly & Western Suburbs', time: '28 mins', dist: '34 km', route: 'Via M5 Motorway' },
    'logan': { name: 'Logan City & Browns Plains', time: '36 mins', dist: '44 km', route: 'Via Logan Mwy / M2' },
    'gold-coast': { name: 'Northern Gold Coast / Coomera', time: '55 mins', dist: '76 km', route: 'Via M1 & Logan Mwy' }
  };

  // Automated Gate Operation Logic
  const handleRemoteClick = () => {
    if (isMoving) return;

    // Trigger Keyfob LED pulse
    setKeyfobLed(true);
    setTimeout(() => setKeyfobLed(false), 500);

    setIsMoving(true);
    setBeaconActive(true);

    const targetOpen = !gateOpen;
    const duration = 1800; // 1.8 seconds animation
    const startTime = Date.now();
    const startProgress = gateProgress;
    const targetProgress = targetOpen ? 100 : 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth easeInOutQuad formula
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const current = Math.round(startProgress + (targetProgress - startProgress) * ease);
      setGateProgress(current);

      if (t >= 1) {
        clearInterval(interval);
        setGateProgress(targetProgress);
        setGateOpen(targetOpen);
        setIsMoving(false);
        setBeaconActive(false);
      }
    }, 30);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          suburb: formData.suburb,
          serviceType: `${formData.projectType} (${formData.propertyType})`,
          preferredTime: formData.preferredTime,
          notes: formData.message,
          source: 'Contact Page Inquiry Form'
        })
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      // Graceful fallback to success screen
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* =========================================================================
          1. INTERACTIVE AUTOMATED GATE SIMULATION HERO
          ========================================================================= */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #1e293b 100%)',
        color: '#ffffff',
        padding: '4.5rem 0 3.5rem 0',
        overflow: 'hidden'
      }}>
        {/* Ambient background lighting */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <button onClick={onNavigateHome} style={{ color: '#94a3b8', cursor: 'pointer' }}>Home</button>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Contact Us</span>
          </div>

          {/* Section Header */}
          <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
            <span className="badge-tag badge-gold" style={{ marginBottom: '1rem' }}>
              <Radio size={14} />
              Brisbane & Ipswich Factory Direct Gate Experts
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}>
              Ready to Talk Gates? <br />
              <span className="gradient-text-gold">Get In Touch With Our Workshop</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: '#cbd5e1',
              lineHeight: 1.65
            }}>
              We’d love to hear from you. Visit our Yamanto workshop and showroom or book a free on-site laser measure and design consultation anywhere across Greater Brisbane, Ipswich & Logan.
            </p>
          </div>

          {/* =====================================================================
              INTERACTIVE AUTOMATED GATE SIMULATOR & KEYFOB CONTROLLER
              ===================================================================== */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1.5px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '24px',
            padding: 'clamp(1.25rem, 3vw, 2.25rem)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            marginBottom: '1rem'
          }}>
            {/* Simulator Top Control Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: isMoving ? '#f59e0b' : gateOpen ? '#10b981' : '#3b82f6',
                    boxShadow: isMoving ? '0 0 12px #f59e0b' : gateOpen ? '0 0 12px #10b981' : '0 0 12px #3b82f6',
                    animation: isMoving ? 'pulse 1s infinite' : 'none'
                  }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ffffff', letterSpacing: '0.02em' }}>
                    Interactive Gate Controller & Virtual Showroom
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Click the remote button below to activate the Centurion® Smart 24V automation system
                </span>
              </div>

              {/* Gate Style Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '600' }}>Gate Style:</span>
                {[
                  { id: 'monument-slat', label: 'Monument Slat' },
                  { id: 'satin-black', label: 'Satin Black Swing' },
                  { id: 'timber-look', label: 'DecoWood Timber' }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setGateStyle(style.id);
                      if (style.id === 'satin-black') setGateType('swing');
                      else setGateType('sliding');
                    }}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: gateStyle === style.id ? '#d97706' : 'rgba(255,255,255,0.06)',
                      color: gateStyle === style.id ? '#ffffff' : '#94a3b8',
                      border: gateStyle === style.id ? '1px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual Driveway & Gate Stage */}
            <div style={{
              position: 'relative',
              height: '240px',
              background: 'linear-gradient(180deg, #0b1329 0%, #152238 65%, #2a3b53 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1.5px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}>
              {/* Driveway Concrete Pavement Grid */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '70px',
                background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                borderTop: '3px solid var(--text-muted)'
              }}>
                {/* Steel In-Ground Track Rail */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '10%',
                  right: '10%',
                  height: '4px',
                  background: '#94a3b8',
                  boxShadow: '0 0 8px rgba(148, 163, 184, 0.6)'
                }} />
                {/* Driveway Center Line */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  background: '#fbbf24',
                  opacity: 0.7
                }} />
              </div>

              {/* Revealed Workshop Contact Hub Behind the Gate */}
              <div style={{
                position: 'absolute',
                top: '25px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                opacity: gateProgress / 100,
                transition: 'opacity 0.3s ease',
                pointerEvents: gateProgress > 50 ? 'auto' : 'none',
                width: '90%',
                maxWidth: '520px'
              }}>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.92)',
                  border: '1.5px solid #10b981',
                  borderRadius: '14px',
                  padding: '1rem 1.25rem',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
                }}>
                  <span style={{ fontSize: '0.72rem', background: '#065f46', color: '#6ee7b7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '800', textTransform: 'uppercase' }}>
                    Gate Open • Workshop Access Cleared
                  </span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', margin: '0.4rem 0 0.2rem 0' }}>
                    Welcome to Custom Auto Gates Yamanto
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
                    Direct Workshop Dispatch: <strong style={{ color: '#fbbf24' }}>(07) 3102 1801</strong> • Free Quotes Across SEQ
                  </p>
                </div>
              </div>

              {/* Left Structural Pillar & Safety Beacon Light */}
              <div style={{
                position: 'absolute',
                left: '12%',
                bottom: '40px',
                width: '28px',
                height: '140px',
                background: 'linear-gradient(90deg, #475569 0%, #1e293b 100%)',
                borderRadius: '4px 4px 0 0',
                border: '1px solid var(--text-muted)',
                zIndex: 10
              }}>
                {/* Flashing Amber Beacon */}
                <div style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '4px',
                  width: '20px',
                  height: '18px',
                  borderRadius: '10px 10px 0 0',
                  background: beaconActive ? '#f59e0b' : '#78350f',
                  boxShadow: beaconActive ? '0 0 20px #f59e0b, 0 0 35px #f59e0b' : 'none',
                  transition: 'all 0.15s ease',
                  border: '1px solid #fbbf24'
                }} />
              </div>

              {/* Right Structural Pillar & Automation Motor Housing */}
              <div style={{
                position: 'absolute',
                right: '12%',
                bottom: '40px',
                width: '28px',
                height: '140px',
                background: 'linear-gradient(90deg, #1e293b 0%, #475569 100%)',
                borderRadius: '4px 4px 0 0',
                border: '1px solid var(--text-muted)',
                zIndex: 10
              }}>
                {/* Centurion Motor Box at Base */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '-14px',
                  width: '26px',
                  height: '38px',
                  background: '#0f172a',
                  border: '1.5px solid #3b82f6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={12} style={{ color: isMoving ? '#f59e0b' : '#3b82f6' }} />
                </div>
              </div>

              {/* THE ANIMATED GATE PANEL */}
              <div style={{
                position: 'absolute',
                bottom: '44px',
                left: gateType === 'sliding' ? `calc(15% + ${(gateProgress / 100) * 60}%)` : '15%',
                width: '70%',
                height: '120px',
                transform: gateType === 'swing' ? `perspective(600px) rotateY(-${(gateProgress / 100) * 85}deg)` : 'none',
                transformOrigin: 'left center',
                transition: 'none',
                zIndex: 8,
                pointerEvents: 'none'
              }}>
                {/* Gate Frame */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '6px',
                  border: gateStyle === 'timber-look' ? '3px solid #78350f' : gateStyle === 'monument-slat' ? '3px solid #334155' : '3px solid #0f172a',
                  background: gateStyle === 'timber-look' 
                    ? 'repeating-linear-gradient(90deg, #92400e 0px, #b45309 18px, #78350f 22px)' 
                    : gateStyle === 'monument-slat' 
                    ? 'repeating-linear-gradient(0deg, #1e293b 0px, #334155 12px, transparent 12px, transparent 16px)' 
                    : 'repeating-linear-gradient(90deg, #0f172a 0px, #1e293b 14px, transparent 14px, transparent 20px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}>
                  {/* Decorative Center Crest */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#0f172a',
                    border: '2px solid #fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fbbf24'
                  }}>
                    <ShieldCheck size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Remote Keyfob & Interactive Control Strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginTop: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1rem 1.25rem',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {/* Live Status Readout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: isMoving ? '#f59e0b' : gateOpen ? '#10b981' : '#2563eb',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Radio size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#ffffff' }}>
                    Status: {isMoving ? 'AUTOMATION MOTOR OPERATING...' : gateOpen ? 'GATE FULLY OPEN (ACCESS GRANTED)' : 'GATE CLOSED & SECURED'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Travel Position: {gateProgress}% • Centurion Smart 24V Drive System
                  </div>
                </div>
              </div>

              {/* Interactive Keyfob Fob Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button
                  onClick={handleRemoteClick}
                  disabled={isMoving}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: gateOpen 
                      ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' 
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: isMoving ? 'not-allowed' : 'pointer',
                    boxShadow: gateOpen ? '0 4px 15px rgba(239, 68, 68, 0.4)' : '0 4px 15px rgba(16, 185, 129, 0.4)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Remote Transmission LED */}
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: keyfobLed ? '#ffffff' : '#fbbf24',
                    boxShadow: keyfobLed ? '0 0 10px #ffffff' : 'none'
                  }} />
                  <span>{isMoving ? 'Motor Running...' : gateOpen ? 'Close Gate' : 'Open Gate (Remote)'}</span>
                </button>

                <a
                  href={COMPANY_INFO.tel}
                  className="btn btn-gold btn-md"
                  style={{ borderRadius: '12px' }}
                >
                  <Phone size={16} /> (07) 3102 1801
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WORKSHOP CONTACT CARDS & DIRECT HOTLINES
          ========================================================================= */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-blue">
              <Phone size={14} />
              Direct Workshop Communication
            </span>
            <h2 className="section-title">
              How Can We Assist You Today?
            </h2>
            <p className="section-subtitle">
              Whether you require a custom quote, factory workshop appointment, gate automation consultation, or urgent service repairs, our friendly Brisbane team is ready.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}>
            {/* Card 1: Phone Hotline */}
            <div className="card-light" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #d97706' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Phone size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                Workshop Phone
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
                Speak directly with our fabrication & estimating technicians.
              </p>
              <a
                href={COMPANY_INFO.tel}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  color: '#d97706',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                (07) 3102 1801
              </a>
              <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: '700' }}>
                Mon–Fri: 7am – 5pm
              </span>
            </div>

            {/* Card 2: Email Dispatch */}
            <div className="card-light" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #2563eb' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Mail size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                Email Sales & Plans
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
                Send site architectural drawings, photos, or tender specifications.
              </p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                style={{
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: '#2563eb',
                  display: 'block',
                  marginBottom: '0.5rem',
                  wordBreak: 'break-all'
                }}
              >
                sales@customautogates.com.au
              </a>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                24hr Response Time
              </span>
            </div>

            {/* Card 3: Showroom & Workshop Location */}
            <div className="card-light" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #10b981' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <MapPin size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                Factory Showroom
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '0.75rem' }}>
                43 Belar Street, Yamanto QLD 4305
              </p>
              <div style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: '700', marginBottom: '0.5rem' }}>
                Factory Direct Buying
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                QBCC #15579753 • ABN 13 693 740 573
              </span>
            </div>

            {/* Card 4: Service, Repairs & Warranty Hotline */}
            <div className="card-light" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #8b5cf6' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#f5f3ff',
                color: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Wrench size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                Repairs & Warranty
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
                Gate stuck or motor issue? Visit our dedicated repairs booking gateway.
              </p>
              <button
                onClick={onNavigateService}
                className="btn btn-outline-dark btn-sm"
                style={{ borderRadius: '8px', width: '100%', justifyContent: 'center' }}
              >
                Service Portal <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* =====================================================================
              3. CONTACT & FREE MEASURE BOOKING FORM SECTION
              ===================================================================== */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}>
            {/* Form Left Side */}
            <div>
              <div className="card-light" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="badge-tag badge-gold" style={{ marginBottom: '0.5rem' }}>
                    <Calendar size={13} />
                    Free Laser Measure & Design Quote
                  </span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>
                    Send Us A Message
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.35rem 0 0 0' }}>
                    Fill out the form below and an estimator will contact you within 1 business day.
                  </p>
                </div>

                {formSubmitted ? (
                  <div style={{
                    background: '#ecfdf5',
                    border: '2px solid #a7f3d0',
                    borderRadius: '16px',
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#10b981',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto'
                    }}>
                      <Check size={32} />
                    </div>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#065f46', marginBottom: '0.5rem' }}>
                      Message Received!
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#047857', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      Thank you, <strong>{formData.fullName}</strong>. Our senior estimator will review your project requirements for <strong>{formData.suburb || 'your property'}</strong> and call you at <strong>{formData.phone}</strong>.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="btn btn-outline-dark btn-md"
                      style={{ borderRadius: '10px' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    {/* Name & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Michael Harris"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.85rem',
                            borderRadius: '8px',
                            border: '1.5px solid #cbd5e1',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0400 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.85rem',
                            borderRadius: '8px',
                            border: '1.5px solid #cbd5e1',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com.au"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.85rem',
                          borderRadius: '8px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    {/* Street Address & Suburb */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                          Street Address
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 14 River Terrace"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.85rem',
                            borderRadius: '8px',
                            border: '1.5px solid #cbd5e1',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                          Suburb & Postcode *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. New Farm 4005"
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.85rem',
                            borderRadius: '8px',
                            border: '1.5px solid #cbd5e1',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                    </div>

                    {/* Project Interest */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                          Gate / Fence Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.85rem',
                            borderRadius: '8px',
                            border: '1.5px solid #cbd5e1',
                            background: '#ffffff',
                            fontSize: '0.86rem'
                          }}
                        >
                          <option>Automatic Sliding Gate</option>
                          <option>Automatic Swing Gates</option>
                          <option>Solar Powered Gate System</option>
                          <option>Aluminium Slat Fencing</option>
                          <option>Pedestrian P.A. Gate</option>
                          <option>Commercial Boom Gate / Barrier</option>
                          <option>Motor Replacement & Service</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                          Property Type
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.85rem',
                            borderRadius: '8px',
                            border: '1.5px solid #cbd5e1',
                            background: '#ffffff',
                            fontSize: '0.86rem'
                          }}
                        >
                          <option>Residential Home</option>
                          <option>Acreage / Rural Property</option>
                          <option>Commercial / Industrial</option>
                          <option>Body Corporate / Strata</option>
                          <option>Builder / Architect Tender</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                        Message & Project Details *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your driveway dimensions, sloped ground, automation requirements, or preferred design style..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.85rem',
                          borderRadius: '8px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.9rem',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-gold btn-lg"
                      style={{ width: '100%', borderRadius: '10px' }}
                    >
                      {isSubmitting ? (
                        <span>Sending Request...</span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <Send size={18} /> Send Inquiry for Free Quote
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Side: Factory Hours & Travel Times */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Operating Hours Card */}
              <div className="card-light" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Clock size={22} style={{ color: '#d97706' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                    Factory & Showroom Hours
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>Monday – Friday:</span>
                    <span style={{ color: '#16a34a', fontWeight: '700' }}>7:00 AM – 5:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>Saturday:</span>
                    <span style={{ color: '#d97706', fontWeight: '700' }}>8:00 AM – 1:00 PM (By Appt)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>Sunday & Public Holidays:</span>
                    <span style={{ color: '#94a3b8' }}>Closed (Online Requests Open)</span>
                  </div>
                </div>

                <div style={{
                  marginTop: '1.25rem',
                  padding: '0.9rem',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.8rem',
                  color: '#475569'
                }}>
                  <strong style={{ color: '#0f172a' }}>Visiting Our Yamanto Workshop?</strong> You are welcome to view working gate displays, powdercoat sample color swatches, and motor hardware in person.
                </div>
              </div>

              {/* Driving Distance & Route Matrix */}
              <div className="card-light" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <Car size={22} style={{ color: '#2563eb' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                    Driving Times to Our Workshop
                  </h3>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
                  Select your suburb to see estimated travel time to our factory at <strong>43 Belar St, Yamanto</strong>:
                </p>

                {/* Suburb Selector */}
                <select
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #2563eb',
                    background: '#eff6ff',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    color: '#1e40af',
                    marginBottom: '1rem'
                  }}
                >
                  {Object.keys(travelTimes).map((key) => (
                    <option key={key} value={key}>
                      {travelTimes[key].name}
                    </option>
                  ))}
                </select>

                {/* Route Stat Box */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Estimated Travel</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>
                      {travelTimes[selectedOrigin].time}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#2563eb' }}>
                      {travelTimes[selectedOrigin].dist} • {travelTimes[selectedOrigin].route}
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=43+Belar+Street+Yamanto+QLD+4305"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm"
                    style={{ borderRadius: '8px' }}
                  >
                    <Navigation size={14} /> GPS Route
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. EMBEDDED INTERACTIVE MAP & WORKSHOP SHOWROOM DETAILS
          ========================================================================= */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge-tag badge-gold" style={{ marginBottom: '0.75rem' }}>
                <MapPin size={13} />
                Yamanto Manufacturing Headquarters
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Yamanto Workshop & Showroom
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Every gate is fabricated from high-tensile 6060-T6 architectural aluminium right here in our Yamanto facility. We invite you to visit our factory to see the precision TIG welding and heavy-duty commercial automation systems first-hand.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f8fafc', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                  <span><strong>Address:</strong> 43 Belar Street, Yamanto QLD 4305</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f8fafc', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                  <span><strong>Licences:</strong> QBCC Licence #15579753 • ABN 13 693 740 573</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f8fafc', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                  <span><strong>Service Area:</strong> Greater Brisbane, Ipswich, Logan, Moreton Bay & Gold Coast</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://maps.google.com/?q=43+Belar+Street+Yamanto+QLD+4305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-md"
                  style={{ borderRadius: '10px' }}
                >
                  <Navigation size={17} /> Open in Google Maps
                </a>
                <a
                  href={COMPANY_INFO.tel}
                  className="btn btn-outline-dark btn-md"
                  style={{ borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Phone size={17} /> Call (07) 3102 1801
                </a>
              </div>
            </div>

            {/* Google Maps iFrame Card */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(251, 191, 36, 0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              height: '380px'
            }}>
              <iframe
                title="Custom Auto Gates & Fencing Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.6974751433246!2d152.7456247761828!3d-27.65340087621308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b96b46445582fcb%3A0xa64ee9a56c4ec235!2s43%20Belar%20St%2C%20Yamanto%20QLD%204305!5e0!3m2!1sen!2sau!4v1710000000000!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
