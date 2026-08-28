import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Smartphone, 
  Send, 
  Upload, 
  Info, 
  PhoneCall,
  CreditCard,
  Lock,
  Loader2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { createStripeCheckout } from '../utils/stripeClient';

export default function GateVisualizerQuote() {
  const [step, setStep] = useState(1);
  
  // Gate Configuration State
  const [gateType, setGateType] = useState('sliding');
  const [width, setWidth] = useState(4.0); // meters
  const [height, setHeight] = useState(1.8); // meters
  const [material, setMaterial] = useState('horizontal-slat');
  const [color, setColor] = useState('monument');
  const [motor, setMotor] = useState('centurion-d5');
  const [accessories, setAccessories] = useState(['remotes', 'phone-app']);
  
  // Quote Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    suburb: '',
    notes: '',
    file: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPayingDeposit, setIsPayingDeposit] = useState(false);

  // Gate Type Options
  const GATE_TYPES = [
    { id: 'sliding', name: 'Automatic Sliding Gate', basePrice: 2400, desc: 'Smooth single sliding track system', icon: '↔️' },
    { id: 'double-swing', name: 'Double Swing Gates', basePrice: 2800, desc: 'Classic dual leaf grand entrance', icon: '🚪🚪' },
    { id: 'single-swing', name: 'Single Swing Gate', basePrice: 1900, desc: 'Cost-effective single leaf swing', icon: '🚪' },
    { id: 'telescopic', name: 'Telescopic Sliding', basePrice: 3600, desc: 'Stacking panels for tight slide space', icon: '⏭️' },
    { id: 'cantilever', name: 'Trackless Cantilever', basePrice: 4200, desc: 'Suspended system for slopes & gravel', icon: '✨' },
    { id: 'boom-gate', name: 'Commercial Boom Gate', basePrice: 3200, desc: 'Rapid barrier arm access control', icon: '🛑' }
  ];

  // Material & Infill Options
  const MATERIALS = [
    { id: 'horizontal-slat', name: 'Horizontal 65mm Slat', multiplier: 1.0, desc: 'Most popular modern architectural look', previewColor: '#334155' },
    { id: 'vertical-slat', name: 'Vertical Slat Battens', multiplier: 1.15, desc: 'Contemporary timber-alternative profile', previewColor: '#1e293b' },
    { id: 'decowood-cedar', name: 'DecoWood Timber (Cedar)', multiplier: 1.35, desc: 'Warm natural woodgrain aluminium - no oiling', previewColor: '#8B5A2B' },
    { id: 'decowood-jarrah', name: 'DecoWood Timber (Jarrah)', multiplier: 1.35, desc: 'Deep rich red-brown timber finish', previewColor: '#5C241C' },
    { id: 'privacy-louver', name: 'Privacy Louvers (Angled)', multiplier: 1.25, desc: 'Complete 100% privacy with airflow', previewColor: '#0f172a' },
    { id: 'laser-cut', name: '3D Laser-Cut Screen Panels', multiplier: 1.45, desc: 'Artistic geometric & botanical designs', previewColor: '#475569' }
  ];

  // Color Finishes
  const COLORS = [
    { id: 'monument', name: 'Colorbond Monument', hex: '#2B2E33' },
    { id: 'matt-black', name: 'Satin / Matt Black', hex: '#111111' },
    { id: 'woodland-grey', name: 'Woodland Grey', hex: '#4A4F4C' },
    { id: 'surfmist', name: 'Surfmist / Warm White', hex: '#ECECE7' },
    { id: 'dune', name: 'Dune / Warm Neutral', hex: '#B8B3A8' },
    { id: 'custom-ral', name: 'Custom Powdercoat Color', hex: '#3b82f6' }
  ];

  // Motor & Automation
  const MOTORS = [
    { id: 'centurion-d5', name: 'Centurion D5 Smart Automation', cost: 1200, desc: 'Ultra-fast smartphone app control & battery backup with 2 remotes' },
    { id: 'centurion-smart', name: 'Centurion D5 Smart High-Speed', cost: 1450, desc: 'Ultra-fast 36m/min opening + app diagnostic' },
    { id: 'solar-pro', name: 'Custom Solar Pro (100% Off-Grid)', cost: 1750, desc: 'Oversized solar panel + deep cycle battery bank' },
    { id: 'heavy-commercial', name: 'Heavy Duty 3-Phase Commercial', cost: 2200, desc: 'Continuous 100% duty cycle for 500+ ops/day' }
  ];

  // Access Accessories
  const ACCESSORIES = [
    { id: 'phone-app', name: '4G / WiFi Smartphone App Opener', cost: 280, desc: 'Open & check status from anywhere' },
    { id: 'keypad', name: 'Wireless Weatherproof Digital Keypad', cost: 195, desc: 'Pin code access for family, guests & trades' },
    { id: 'intercom', name: 'HD Video Intercom with Phone Alert', cost: 650, desc: 'See & talk to visitors at your gate' },
    { id: 'extra-remotes', name: 'Pack of 3 Extra Long-Range Remotes', cost: 150, desc: '100m+ range encrypted key fobs' },
    { id: 'safety-beams', name: 'Infrared Safety Anti-Crush Photo Beams', cost: 180, desc: 'Prevents gate closing on cars or pets' }
  ];

  const toggleAccessory = (id) => {
    if (accessories.includes(id)) {
      setAccessories(accessories.filter(a => a !== id));
    } else {
      setAccessories([...accessories, id]);
    }
  };

  // Calculate dynamic price estimation
  const calculatePrice = () => {
    const selectedGate = GATE_TYPES.find(g => g.id === gateType) || GATE_TYPES[0];
    const selectedMaterial = MATERIALS.find(m => m.id === material) || MATERIALS[0];
    const selectedMotor = MOTORS.find(m => m.id === motor) || MOTORS[0];
    
    const area = width * height;
    const areaFactor = Math.max(0.8, area / 7.2);
    
    const gateFabrication = selectedGate.basePrice * areaFactor * selectedMaterial.multiplier;
    const motorCost = selectedMotor.cost;
    
    const accessoryCost = accessories.reduce((sum, accId) => {
      const acc = ACCESSORIES.find(a => a.id === accId);
      return sum + (acc ? acc.cost : 0);
    }, 0);

    const subtotal = gateFabrication + motorCost + accessoryCost;
    const lowEst = Math.round((subtotal * 0.95) / 50) * 50;
    const highEst = Math.round((subtotal * 1.1) / 50) * 50;

    return { lowEst, highEst, subtotal: Math.round(subtotal) };
  };

  const { lowEst, highEst, subtotal } = calculatePrice();

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const selectedGate = GATE_TYPES.find(g => g.id === gateType)?.name || 'Custom Gate';
      const selectedMat = MATERIALS.find(m => m.id === material)?.name || 'Aluminium Slat';
      const selectedMot = MOTORS.find(m => m.id === motor)?.name || 'Centurion Smart';
      
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          suburb: formData.suburb,
          gateType: selectedGate,
          width: width,
          height: height,
          material: selectedMat,
          motor: selectedMot,
          estimatedTotal: `$${lowEst} - $${highEst}`,
          notes: formData.notes
        })
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Quote submit error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="gate-visualizer" className="section" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Calculator size={14} />
            Live Pricing Estimator & Builder
          </span>
          <h2 className="section-title">
            Design Your Custom Gate <br />
            <span className="gradient-text-gold">& Get Instant Factory-Direct Pricing</span>
          </h2>
          <p className="section-subtitle">
            Configure your gate type, dimensions, finish, and automation options in 5 simple steps to get an accurate instant estimate for your Queensland property.
          </p>
        </div>

        {/* Step Indicator Navigation - Scrollable on mobile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
        className="step-scroll-container"
        >
          {[
            { num: 1, label: '1. Style' },
            { num: 2, label: '2. Dimensions' },
            { num: 3, label: '3. Material' },
            { num: 4, label: '4. Motors' },
            { num: 5, label: '5. Instant Quote' }
          ].map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: isActive ? 'var(--accent-gold)' : isDone ? 'var(--badge-green-bg)' : 'var(--bg-card-subtle)',
                  color: isActive ? '#090e1a' : isDone ? 'var(--badge-green-text)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-gold)' : isDone ? '1px solid var(--badge-green-border)' : '1px solid var(--border-light)',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {isDone ? <Check size={13} /> : null}
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Visualizer Main Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 0.9fr',
          gap: '1.75rem',
          alignItems: 'start'
        }}
        className="visualizer-grid"
        >
          {/* Left Column: Interactive Configuration Form */}
          <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3.5vw, 2rem)', border: '1.5px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-md)' }}>
            {/* STEP 1: Gate Type */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 1: Select Your Gate Style</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Choose the mechanical gate structure that best fits your driveway layout and gradient.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.75rem' }}>
                  {GATE_TYPES.map((g) => {
                    const isSelected = gateType === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => setGateType(g.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                      >
                        <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{g.icon}</div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: isSelected ? 'var(--accent-gold-hover)' : 'var(--text-heading)', marginBottom: '0.2rem' }}>{g.name}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{g.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setStep(2)} className="btn btn-blue">
                    Next: Set Dimensions <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Dimensions */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 2: Driveway Dimensions</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Adjust the approximate width and height. Every gate is custom-built to your exact millimeter.
                </p>

                {/* Width Slider */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-heading)' }}>Driveway Width (Opening)</label>
                    <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-gold)' }}>{width} Meters ({(width * 3.28).toFixed(1)} ft)</span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="8.0"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)', height: '8px', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>Compact (2.0m)</span>
                    <span>Standard Double (4.5m)</span>
                    <span>Wide Acreage (8.0m)</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-heading)' }}>Gate Height</label>
                    <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-blue)' }}>{height} Meters ({height >= 1.8 ? 'Max Privacy' : 'Standard'})</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="2.4"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-blue)', height: '8px', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>Low Profile (1.2m)</span>
                    <span>Standard Security (1.8m)</span>
                    <span>High Security (2.4m)</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(1)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-blue">
                    Next: Materials & Infill <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Material & Color */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 3: Infill Material & Powdercoat Color</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Choose architectural aluminium slat styling and premium Colorbond powdercoat finish.
                </p>

                {/* Infill Types */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  Select Infill Style:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {MATERIALS.map((m) => {
                    const isSelected = material === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setMaterial(m.id)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer'
                        }}
                      >
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: isSelected ? 'var(--accent-gold-hover)' : 'var(--text-heading)', marginBottom: '0.2rem' }}>{m.name}</h4>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Color Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  Select Colorbond Finish:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '0.55rem' }}>
                  {COLORS.map((c) => {
                    const isSelected = color === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setColor(c.id)}
                        style={{
                          padding: '0.6rem',
                          borderRadius: '8px',
                          background: isSelected ? 'var(--accent-blue-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-blue)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem'
                        }}
                      >
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: c.hex, border: '1px solid var(--border-subtle)', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: '600' }}>{c.name}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(2)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(4)} className="btn btn-blue">
                    Next: Motors <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Motor & Smart Accessories */}
            {step === 4 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 4: Automation Motor & Smart Access</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Choose your motor power source and optional smart access accessories.
                </p>

                {/* Motor Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  Select Motor System:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {MOTORS.map((m) => {
                    const isSelected = motor === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setMotor(m.id)}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--accent-blue-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-blue)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.15rem' }}>{m.name}</h4>
                          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{m.desc}</p>
                        </div>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: isSelected ? '5px solid var(--accent-blue)' : '2px solid var(--border-subtle)', background: 'var(--bg-card)', flexShrink: 0 }} />
                      </div>
                    );
                  })}
                </div>

                {/* Accessories Checkboxes */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  Smart Access & Safety Add-ons:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.55rem' }}>
                  {ACCESSORIES.map((acc) => {
                    const isSelected = accessories.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem'
                        }}
                      >
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: isSelected ? 'var(--accent-gold)' : 'var(--bg-card)', border: '1.5px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#090e1a', flexShrink: 0 }}>
                          {isSelected && <Check size={11} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-heading)' }}>{acc.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+${acc.cost} AUD</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(3)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(5)} className="btn btn-blue">
                    Review Quote <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Instant Quote Submission */}
            {step === 5 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 5: Lock In Your Factory-Direct Price</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Send your configured specification to our engineering team for an exact itemized PDF quote and fast-track booking.
                </p>

                {isSubmitted ? (
                  <div style={{ padding: '1.75rem', background: 'var(--badge-green-bg)', border: '1px solid var(--badge-green-border)', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
                      <Check size={28} />
                    </div>
                    <h4 style={{ fontSize: '1.3rem', color: 'var(--badge-green-text)', marginBottom: '0.4rem' }}>Quote Request Received!</h4>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                      Thank you <strong>{formData.fullName}</strong>. One of our senior gate fabricators will review your {width}m x {height}m {GATE_TYPES.find(g=>g.id===gateType)?.name} specs and call you shortly to confirm your free on-site measure.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <a href={COMPANY_INFO.tel} className="btn btn-gold" style={{ width: '100%', maxWidth: '320px' }}>
                        <PhoneCall size={17} /> Call Factory Direct: (07) 3102 1801
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.3rem' }}>Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.3rem' }}>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0400 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@example.com.au"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.3rem' }}>Property Suburb *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Yamanto / Brisbane"
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.3rem' }}>Driveway Notes or Slope Info</label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about any slopes or fencing..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setStep(4)} className="btn btn-outline-dark">
                          <ChevronLeft size={17} /> Back
                        </button>
                        <button type="submit" className="btn btn-blue" style={{ flex: '1 1 auto' }}>
                          <Send size={17} /> Request Free Itemized Quote
                        </button>
                      </div>

                      {/* Optional Fast-Track Production Deposit via Stripe */}
                      <button
                        type="button"
                        onClick={async () => {
                          if (!formData.fullName || !formData.email) {
                            alert('Please enter your Name and Email above before securing your production deposit.');
                            return;
                          }
                          setIsPayingDeposit(true);
                          try {
                            const selectedTypeObj = GATE_TYPES.find(g => g.id === gateType);
                            await createStripeCheckout({
                              amount: 500,
                              title: `Custom ${selectedTypeObj?.name || 'Gate'} Production Deposit ($500)`,
                              description: `${width}m x ${height}m ${selectedTypeObj?.name || 'Gate'}, ${material}, ${color.toUpperCase()} - For ${formData.fullName}`,
                              customerEmail: formData.email,
                              customerName: formData.fullName,
                              customerPhone: formData.phone,
                              metadata: {
                                gateType,
                                width: width.toString(),
                                height: height.toString(),
                                material,
                                color,
                                motor,
                                accessories: accessories.join(', '),
                                suburb: formData.suburb,
                                notes: formData.notes,
                                purpose: 'production_deposit'
                              }
                            });
                          } catch (err) {
                            alert(err.message || 'Error connecting to Stripe.');
                            setIsPayingDeposit(false);
                          }
                        }}
                        disabled={isPayingDeposit}
                        className="btn btn-gold btn-lg btn-pulse"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.55rem',
                          padding: '0.9rem',
                          fontWeight: '800',
                          fontSize: '0.95rem'
                        }}
                      >
                        {isPayingDeposit ? (
                          <>
                            <Loader2 size={18} className="animate-spin" /> Securing with Stripe...
                          </>
                        ) : (
                          <>
                            <CreditCard size={18} /> Lock In Queue & Pay $500 Deposit (Stripe Gateway)
                          </>
                        )}
                      </button>
                      <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                        <Lock size={11} /> 100% Refundable prior to on-site laser measure • 256-Bit SSL Encrypted
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Blueprint & Price Summary Card */}
          <div style={{ width: '100%' }}>
            <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3.5vw, 1.75rem)', border: '1.5px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                  LIVE SPECIFICATION
                </span>
                <span className="badge-tag badge-green" style={{ margin: 0, fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}>
                  Factory Direct
                </span>
              </div>

              {/* Dynamic Gate Wireframe Graphic */}
              <div style={{
                height: '120px',
                background: 'var(--bg-card-subtle)',
                borderRadius: '8px',
                border: '1.5px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1.25rem'
              }}>
                <div style={{
                  width: `${Math.min(85, (width / 10) * 85 + 25)}%`,
                  height: `${Math.min(75, (height / 2.4) * 75 + 20)}%`,
                  border: '3px solid var(--accent-gold)',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: material.includes('vertical') ? 'row' : 'column',
                  gap: '3px',
                  padding: '3px',
                  background: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        flex: 1, 
                        background: COLORS.find(c=>c.id===color)?.hex || '#334155',
                        borderRadius: '2px',
                        border: '0.5px solid rgba(255,255,255,0.1)'
                      }} 
                    />
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: '5px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {width}m wide × {height}m high
                </div>
              </div>

              {/* Specification Summary List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Gate Style:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700', textAlign: 'right' }}>{GATE_TYPES.find(g=>g.id===gateType)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Size:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>{width}m × {height}m</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Material:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>{MATERIALS.find(m=>m.id===material)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Finish:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>{COLORS.find(c=>c.id===color)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Motor:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>{(MOTORS.find(m=>m.id===motor)?.name || 'Centurion Automation').split(' ')[0]} {(MOTORS.find(m=>m.id===motor)?.name || '').split(' ')[1] || ''}</span>
                </div>
              </div>

              {/* Estimated Price Range Box */}
              <div style={{
                background: 'var(--badge-gold-bg)',
                border: '1.5px solid var(--badge-gold-border)',
                borderRadius: '10px',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '0.85rem'
              }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--badge-gold-text)', fontWeight: '800', marginBottom: '0.2rem' }}>
                  Estimated Factory Direct Range:
                </div>
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 1.85rem)', fontWeight: '900', color: 'var(--badge-gold-text)', letterSpacing: '-0.02em' }}>
                  ${lowEst.toLocaleString()} – ${highEst.toLocaleString()} <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-heading)' }}>AUD</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--badge-green-text)', fontWeight: '700', marginTop: '0.2rem' }}>
                  ✓ All Prices Include GST (10% GST Inc.)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-main)', marginTop: '0.35rem', lineHeight: 1.4 }}>
                  *Includes custom fabrication, premium powdercoating & complete motor kit. Final itemized quote confirmed on free laser measure.
                </div>
              </div>


              {/* Guarantees Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={15} style={{ color: 'var(--accent-emerald)' }} />
                  <span>10-Year Structural Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Yamanto Workshop Direct Pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
