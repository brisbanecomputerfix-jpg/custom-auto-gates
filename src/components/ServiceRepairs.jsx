import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Phone, 
  Send, 
  FileText, 
  HelpCircle, 
  ChevronRight, 
  Calendar, 
  Key, 
  Radio, 
  Battery, 
  Sun, 
  Check, 
  Info,
  Layers,
  Sparkles,
  Building2,
  Home
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function ServiceRepairs({ onOpenQuote, onOpenContact, onNavigateHome }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState('residential'); // 'residential' | 'commercial'
  const [isOriginalPurchaser, setIsOriginalPurchaser] = useState('yes');
  const [serviceRequirement, setServiceRequirement] = useState('repair');
  const [checklistConfirmed, setChecklistConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    address: '',
    suburb: '',
    gateType: 'Sliding Gate',
    motorBrand: 'Nice (Italian)',
    issueDescription: '',
    preferredDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checklistConfirmed) {
      alert('Please confirm you have reviewed the pre-service maintenance checklist.');
      return;
    }
    setFormSubmitted(true);
  };

  const callOutFee = propertyType === 'residential' ? '$250 inc GST' : '$350 inc GST';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Dedicated Service & Repairs Hero Header */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '5rem 0 4rem 0',
        overflow: 'hidden'
      }}>
        {/* Background Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
            <button onClick={onNavigateHome} style={{ color: '#94a3b8', hover: { color: '#ffffff' } }}>Home</button>
            <span>/</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Service, Repairs & Warranty</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <span className="badge-tag badge-gold" style={{ marginBottom: '1rem' }}>
              <Wrench size={14} />
              Authorised Service & Emergency Gate Repairs
            </span>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}>
              Gate Automation Service, <br />
              <span className="gradient-text-gold">Repairs & Warranty Support</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: '#cbd5e1',
              lineHeight: 1.65,
              marginBottom: '2rem'
            }}>
              Professional diagnostics, preventative maintenance, scheduled servicing, and genuine warranty repairs for all residential sliding gates, swing gates, solar systems, and commercial boom gates across South East Queensland.
            </p>

            {/* Quick Action Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href={COMPANY_INFO.tel}
                className="btn btn-gold btn-lg"
                style={{ borderRadius: '12px' }}
              >
                <Phone size={19} /> Call Workshop: (07) 3102 1801
              </a>
              <a
                href="#book-service"
                className="btn btn-outline-dark btn-lg"
                style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <Calendar size={19} /> Book Technician Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Transparent Call Out Fees & Pricing Schedule */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-blue">
              <DollarSign size={14} />
              Upfront Transparent Pricing
            </span>
            <h2 className="section-title">
              Fees & Call Out Charges Schedule
            </h2>
            <p className="section-subtitle">
              We believe in 100% upfront, transparent pricing. Our standard call-out fees include technician travel and the first 30 minutes of on-site diagnostic testing.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem'
          }}>
            {/* Residential Call Out Card */}
            <div className="card-light" style={{ padding: '2rem', borderTop: '4px solid #d97706', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Home size={22} style={{ color: '#d97706' }} />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>Residential Call Out</h3>
                </div>
                <span className="badge-tag badge-gold">$250 Flat</span>
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                $250 <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600' }}>inc GST</span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Upfront booking fee covering technician travel across Greater Brisbane, Ipswich & Logan + up to 30 minutes of diagnostic time.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Includes 30 mins on-site diagnostics</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Additional time: $30 per 15-min ($120/hr)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Response: 10 – 15 business days standard</span>
                </div>
              </div>
            </div>

            {/* Commercial Call Out Card */}
            <div className="card-light" style={{ padding: '2rem', borderTop: '4px solid #2563eb', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Building2 size={22} style={{ color: '#2563eb' }} />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>Commercial & Industrial</h3>
                </div>
                <span className="badge-tag badge-blue">$350 Flat</span>
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                $350 <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600' }}>inc GST</span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Heavy-duty commercial boom gates, industrial cantilever systems, access control card readers, and strata car park installations.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Includes 30 mins industrial diagnostics</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Additional time: $30 per 15-min ($120/hr)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>High-duty cycle motors, loops & barrier arms</span>
                </div>
              </div>
            </div>

            {/* Warranty Coverage Card */}
            <div className="card-light" style={{ padding: '2rem', borderTop: '4px solid #10b981', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ShieldCheck size={22} style={{ color: '#10b981' }} />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>Warranty Terms</h3>
                </div>
                <span className="badge-tag badge-green">Genuine Support</span>
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                12 Mo <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600' }}>Labour Warranty</span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Labour is covered for 12 months from installation. If outside 12 months, call out fee applies, but genuine manufacturer parts remain 100% free if within parts warranty.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>10-Year Factory Structural Warranty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Return visit to fit warranty parts is FREE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Fencing labour warranty: 6 months</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Terms Notice Box */}
          <div style={{
            background: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <Info size={24} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              <strong style={{ color: '#0f172a' }}>Payment Policy & Response Times:</strong> Call-out fees are paid upfront to secure technician scheduling. Any additional time or replacement parts required are payable prior to the technician leaving your site (Card or Cash accepted). A manual release key was supplied at installation to allow manual gate operation while you wait for your scheduled visit.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Owner's Essential Routine Maintenance Checklist */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-gold">
              <CheckCircle2 size={14} />
              Owner’s Maintenance Guide
            </span>
            <h2 className="section-title">
              How to Keep Your Automatic Gate Running Like New
            </h2>
            <p className="section-subtitle">
              Regular maintenance prevents 95% of unexpected gate motor breakdowns and ensures compliance with your manufacturer warranty terms.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '1.75rem'
          }}>
            {/* Automation Maintenance Card */}
            <div className="card-light" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Wrench size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                  Automation & Motor Care
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    title: 'Bi-Monthly Manual Check',
                    desc: 'Put the gate into manual release mode and push it fully open and closed to ensure the hinge bearings or track wheels slide effortlessly.'
                  },
                  {
                    title: 'Weekly Sliding Track Cleaning',
                    desc: 'Sweep ground tracks weekly to prevent mulch, stones, gravel, and grass clippings from causing roller jams or motor strain.'
                  },
                  {
                    title: 'Gecko & Insect Protection',
                    desc: 'Geckos, ants, and spiders seeking warmth can short out high-voltage electronic circuit boards. Inspect and treat around the motor housing periodically.'
                  },
                  {
                    title: 'Battery Checks & Replacement',
                    desc: 'Check remotes, wireless keypads, infrared safety PE beams, and solar battery banks. Replace CR2032 or 9V batteries when indicator LEDs become dim.'
                  },
                  {
                    title: 'Vegetation Clearance',
                    desc: 'Trim back overhanging bushes, tree branches, and creeping vines that may interfere with infrared safety beams or physical gate travel.'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={17} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{item.title}: </strong>
                      <span style={{ color: '#475569', fontSize: '0.86rem' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fencing & Gate Finishes Card */}
            <div className="card-light" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Layers size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                  Fencing & Finish Care
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    title: 'Gentle Washing (2–3 Times/Year)',
                    desc: 'Wash powdercoated aluminium, DecoWood, and Colorbond finishes with a soft brush, warm water, and mild detergent, then rinse with fresh clean water.'
                  },
                  {
                    title: 'DO NOT Water Blast',
                    desc: 'High-pressure water blasters can strip powdercoating bonds and force water inside motor seals. Water blasting voids your finish warranty.'
                  },
                  {
                    title: 'Avoid Abrasive or Acidic Cleaners',
                    desc: 'Never use harsh solvents, bleach, or wire scouring pads, as these permanently damage architectural protective coatings.'
                  },
                  {
                    title: 'Keep Tree Roots Away',
                    desc: 'Ensure root systems from nearby trees or large shrubs do not heave concrete footing foundations or push fence alignments out of plumb.'
                  },
                  {
                    title: 'Timber Fencing Preservation',
                    desc: 'Natural timber fencing should be oiled, painted, or preservative-treated annually to prevent weathering, rot, and severe Queensland humidity warping.'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={17} style={{ color: '#2563eb', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{item.title}: </strong>
                      <span style={{ color: '#475569', fontSize: '0.86rem' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Book A Service / Repair Request Form */}
      <section id="book-service" className="section section-light">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div className="section-header">
              <span className="badge-tag badge-gold">
                <Calendar size={14} />
                Official Service Booking
              </span>
              <h2 className="section-title">
                Request A Technician Call Out
              </h2>
              <p className="section-subtitle">
                Please complete the details below. Our service dispatch team will review your diagnostic notes and schedule our mobile technician to your property.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                background: '#ecfdf5',
                border: '2px solid #a7f3d0',
                borderRadius: '20px',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#065f46', marginBottom: '0.75rem' }}>
                  Service Booking Request Received!
                </h3>
                <p style={{ color: '#047857', fontSize: '1rem', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 1.75rem auto' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Our workshop service coordinator will review your ticket and contact you at <strong>{formData.phone}</strong> within 1–2 business days to confirm your appointment time and call out fee arrangement.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn btn-outline-dark btn-md"
                    style={{ borderRadius: '10px' }}
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={COMPANY_INFO.tel}
                    className="btn btn-gold btn-md"
                    style={{ borderRadius: '10px' }}
                  >
                    <Phone size={17} /> Urgent Call Out: (07) 3102 1801
                  </a>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="card-light"
                style={{
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.1)'
                }}
              >
                {/* 1. Property Type Selector */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem' }}>
                    1. Property Category & Call Out Rate *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setPropertyType('residential')}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: propertyType === 'residential' ? '2px solid #d97706' : '1.5px solid #e2e8f0',
                        background: propertyType === 'residential' ? '#fef3c7' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Home size={18} style={{ color: '#d97706' }} />
                        <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Residential Property</strong>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#475569' }}>$250 inc GST (Travel + 30 mins onsite)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPropertyType('commercial')}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: propertyType === 'commercial' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        background: propertyType === 'commercial' ? '#eff6ff' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Building2 size={18} style={{ color: '#2563eb' }} />
                        <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Commercial / Strata</strong>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#475569' }}>$350 inc GST (Travel + 30 mins onsite)</span>
                    </button>
                  </div>
                </div>

                {/* 2. Service Requirement & Original Purchaser */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.45rem' }}>
                      2. Service Requirement *
                    </label>
                    <select
                      value={serviceRequirement}
                      onChange={(e) => setServiceRequirement(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.9rem',
                        color: '#0f172a'
                      }}
                    >
                      <option value="repair">Gate Broken / Urgent Repair</option>
                      <option value="routine-service">Routine Preventative Service</option>
                      <option value="warranty-claim">Warranty Assessment Claim</option>
                      <option value="motor-upgrade">Motor Replacement / Automation Upgrade</option>
                      <option value="remote-keypad">Remotes / Wireless Keypad Programming</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.45rem' }}>
                      Are you the original purchaser? *
                    </label>
                    <select
                      value={isOriginalPurchaser}
                      onChange={(e) => setIsOriginalPurchaser(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.9rem',
                        color: '#0f172a'
                      }}
                    >
                      <option value="yes">Yes — Installed by Custom Auto Gates</option>
                      <option value="no-new-owner">No — Bought property with gate already installed</option>
                      <option value="other-company">Installed by another gate company</option>
                    </select>
                  </div>
                </div>

                {/* 3. Customer Contact Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Mitchell"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
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
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
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
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                {/* 4. Installation Address */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12 Riverview Terrace"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                      Suburb & Postcode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Indooroopilly QLD 4068"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                {/* 5. Issue Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                    Describe the Fault or Symptoms (e.g. motor humming, reverses halfway, remote unlit) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Please provide any details about the gate behaviour, error sounds, or when the issue began..."
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* 6. Mandatory Pre-Service Checklist Confirmation */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1.75rem'
                }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      required
                      checked={checklistConfirmed}
                      onChange={(e) => setChecklistConfirmed(e.target.checked)}
                      style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: '#d97706' }}
                    />
                    <span style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
                      <strong>Pre-Service Confirmation:</strong> I understand the upfront call-out fee is <strong>{callOutFee}</strong> (covering travel + 30 mins onsite). I have confirmed my 240V power switch is ON and checked for obvious physical track/beam obstructions.
                    </span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <button
                    type="submit"
                    className="btn btn-gold btn-lg"
                    style={{ flex: '1 1 auto', borderRadius: '12px' }}
                  >
                    <Send size={18} /> Submit Service Request ({callOutFee})
                  </button>
                  <a
                    href={COMPANY_INFO.tel}
                    className="btn btn-outline-dark btn-lg"
                    style={{ borderRadius: '12px' }}
                  >
                    <Phone size={18} /> Call Workshop
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. Zero Tolerance Policy Banner */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '2.5rem 2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.85rem', color: '#ffffff' }}>
              Our Zero Tolerance Safety Commitment
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto 1.5rem auto' }}>
              The safety, dignity, and wellbeing of our technicians, fabricators, and contractors are paramount. Custom Auto Gates Pty Ltd enforces a strict Zero Tolerance policy regarding aggressive or anti-social conduct. We are committed to treating every customer with utmost courtesy and respect, and we ask for the same in return.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#fbbf24', fontWeight: '700' }}>
              <span>QBCC Licence No. 15579753</span>
              <span>•</span>
              <span>ABN 13 693 740 573</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
