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
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function GateVisualizerQuote() {
  const [step, setStep] = useState(1);
  
  // Gate Configuration State
  const [gateType, setGateType] = useState('sliding');
  const [width, setWidth] = useState(4.0); // meters
  const [height, setHeight] = useState(1.8); // meters
  const [material, setMaterial] = useState('horizontal-slat');
  const [color, setColor] = useState('monument');
  const [motor, setMotor] = useState('nice-240v');
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
    { id: 'nice-240v', name: 'Italian Nice 240V Automation', cost: 1200, desc: 'Whisper quiet Italian reliability with 2 remotes' },
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

  const { lowEst, highEst } = calculatePrice();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="gate-visualizer" className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
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
          ].map((s) => (
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
                background: step === s.num ? '#0f172a' : step > s.num ? '#ecfdf5' : '#f1f5f9',
                color: step === s.num ? '#ffffff' : step > s.num ? '#047857' : '#475569',
                border: step === s.num ? '1px solid #0f172a' : step > s.num ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {step > s.num ? <Check size={13} /> : null}
              {s.label}
            </button>
          ))}
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
          {/* Left Column: Interactive Configuration Form (Light Theme) */}
          <div className="card-light" style={{ padding: 'clamp(1.25rem, 3.5vw, 2rem)', border: '1.5px solid #e2e8f0', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {/* STEP 1: Gate Type */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: '#0f172a' }}>Step 1: Select Your Gate Style</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Choose the mechanical gate structure that best fits your driveway layout and gradient.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.75rem' }}>
                  {GATE_TYPES.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setGateType(g.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: gateType === g.id ? '#eff6ff' : '#f8fafc',
                        border: gateType === g.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{g.icon}</div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.2rem' }}>{g.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{g.desc}</p>
                    </div>
                  ))}
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
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: '#0f172a' }}>Step 2: Driveway Dimensions</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Adjust the approximate width and height. Every gate is custom-built to your exact millimeter.
                </p>

                {/* Width Slider */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>Driveway Opening Width:</label>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb' }}>{width} Meters</span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="8.0"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '8px', accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                    <span>2.0m (Standard Single)</span>
                    <span>4.5m (Standard Double)</span>
                    <span>8.0m (Wide Commercial)</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>Gate Finished Height:</label>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb' }}>{height} Meters</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="2.4"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '8px', accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                    <span>1.2m (Low Boundary)</span>
                    <span>1.8m (Council Standard Privacy)</span>
                    <span>2.4m (High Security)</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(1)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-blue">
                    Next: Material & Color <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Material & Color */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: '#0f172a' }}>Step 3: Material Profile & Color Finish</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Select the infill design and high-grade architectural powdercoat finish.
                </p>

                {/* Materials Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.55rem' }}>
                  Gate Infill Profile:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {MATERIALS.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        background: material === m.id ? '#eff6ff' : '#f8fafc',
                        border: material === m.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.15rem' }}>{m.name}</h4>
                      <p style={{ fontSize: '0.72rem', color: '#64748b' }}>{m.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Color Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.55rem' }}>
                  Colorbond / Powdercoat Finish:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '0.5rem' }}>
                  {COLORS.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '8px',
                        background: color === c.id ? '#eff6ff' : '#f8fafc',
                        border: color === c.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: c.hex, border: '1px solid #cbd5e1', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.78rem', color: '#0f172a', fontWeight: '600' }}>{c.name}</span>
                    </div>
                  ))}
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
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: '#0f172a' }}>Step 4: Automation Motor & Smart Access</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Choose your motor power source and optional smart access accessories.
                </p>

                {/* Motor Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.55rem' }}>
                  Select Motor System:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {MOTORS.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setMotor(m.id)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '10px',
                        background: motor === m.id ? '#eff6ff' : '#f8fafc',
                        border: motor === m.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.15rem' }}>{m.name}</h4>
                        <p style={{ fontSize: '0.76rem', color: '#64748b' }}>{m.desc}</p>
                      </div>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: motor === m.id ? '5px solid #2563eb' : '2px solid #cbd5e1', background: '#ffffff', flexShrink: 0 }} />
                    </div>
                  ))}
                </div>

                {/* Accessories Checkboxes */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.55rem' }}>
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
                          background: isSelected ? '#eff6ff' : '#f8fafc',
                          border: isSelected ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem'
                        }}
                      >
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: isSelected ? '#2563eb' : '#ffffff', border: '1.5px solid #2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                          {isSelected && <Check size={11} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#0f172a' }}>{acc.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>+${acc.cost} AUD</div>
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
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: '#0f172a' }}>Step 5: Lock In Your Factory-Direct Price</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Send your configured specification to our engineering team for an exact itemized PDF quote and fast-track booking.
                </p>

                {isSubmitted ? (
                  <div style={{ padding: '1.75rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
                      <Check size={28} />
                    </div>
                    <h4 style={{ fontSize: '1.3rem', color: '#065f46', marginBottom: '0.4rem' }}>Quote Request Received!</h4>
                    <p style={{ color: '#334155', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
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
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#334155', fontWeight: '600', marginBottom: '0.3rem' }}>Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#334155', fontWeight: '600', marginBottom: '0.3rem' }}>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0400 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#334155', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@example.com.au"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#334155', fontWeight: '600', marginBottom: '0.3rem' }}>Property Suburb *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Yamanto / Brisbane"
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#334155', fontWeight: '600', marginBottom: '0.3rem' }}>Driveway Notes or Slope Info</label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about any slopes or fencing..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9rem', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <button type="button" onClick={() => setStep(4)} className="btn btn-outline-dark">
                        <ChevronLeft size={17} /> Back
                      </button>
                      <button type="submit" className="btn btn-gold btn-lg btn-pulse" style={{ flex: '1 1 auto' }}>
                        <Send size={17} /> Submit for Official Quote
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Blueprint & Price Summary Card */}
          <div style={{ width: '100%' }}>
            <div className="card-light" style={{ padding: 'clamp(1.25rem, 3.5vw, 1.75rem)', border: '2px solid #e2e8f0', background: '#ffffff', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2563eb' }}>
                  LIVE SPECIFICATION
                </span>
                <span className="badge-tag badge-green" style={{ margin: 0, fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}>
                  Factory Direct
                </span>
              </div>

              {/* Dynamic Gate Wireframe Graphic */}
              <div style={{
                height: '120px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1.5px solid #e2e8f0',
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
                  border: '3px solid #2563eb',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: material.includes('vertical') ? 'row' : 'column',
                  gap: '3px',
                  padding: '3px',
                  background: '#ffffff',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)'
                }}>
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        flex: 1, 
                        background: COLORS.find(c=>c.id===color)?.hex || '#334155',
                        borderRadius: '2px',
                        border: '0.5px solid rgba(0,0,0,0.1)'
                      }} 
                    />
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: '5px', fontSize: '0.65rem', color: '#64748b', fontWeight: '600' }}>
                  {width}m wide × {height}m high
                </div>
              </div>

              {/* Specification Summary List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Gate Style:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700', textAlign: 'right' }}>{GATE_TYPES.find(g=>g.id===gateType)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Size:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{width}m × {height}m</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Material:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{MATERIALS.find(m=>m.id===material)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Finish:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{COLORS.find(c=>c.id===color)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Motor:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{MOTORS.find(m=>m.id===motor)?.name.split(' ')[0]} {MOTORS.find(m=>m.id===motor)?.name.split(' ')[1]}</span>
                </div>
              </div>

              {/* Estimated Price Range Box */}
              <div style={{
                background: '#eff6ff',
                border: '1.5px solid #bfdbfe',
                borderRadius: '10px',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '0.85rem'
              }}>
                <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: '600', marginBottom: '0.2rem' }}>Estimated Factory Direct Range:</div>
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 1.85rem)', fontWeight: '900', color: '#1d4ed8', letterSpacing: '-0.02em' }}>
                  ${lowEst.toLocaleString()} – ${highEst.toLocaleString()} <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>AUD*</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.25rem' }}>
                  *Includes fabrication, powdercoating & motor kit.
                </div>
              </div>

              {/* Guarantees Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={15} style={{ color: '#059669' }} />
                  <span>10-Year Structural Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} style={{ color: '#059669' }} />
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
