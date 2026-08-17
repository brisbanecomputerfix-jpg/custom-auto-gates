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

        {/* Step Indicator Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {[
            { num: 1, label: '1. Gate Type' },
            { num: 2, label: '2. Dimensions' },
            { num: 3, label: '3. Material & Style' },
            { num: 4, label: '4. Automation & Specs' },
            { num: 5, label: '5. Instant Quote' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: '700',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: step === s.num ? '#0f172a' : step > s.num ? '#ecfdf5' : '#f1f5f9',
                color: step === s.num ? '#ffffff' : step > s.num ? '#047857' : '#475569',
                border: step === s.num ? '1px solid #0f172a' : step > s.num ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                transition: 'all var(--transition-fast)'
              }}
            >
              {step > s.num ? <Check size={14} /> : null}
              {s.label}
            </button>
          ))}
        </div>

        {/* Visualizer Main Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 0.9fr',
          gap: '2rem',
          alignItems: 'start'
        }}
        className="visualizer-grid"
        >
          {/* Left Column: Interactive Configuration Form (Light Theme) */}
          <div className="card-light" style={{ padding: '2.25rem', border: '1.5px solid #e2e8f0', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {/* STEP 1: Gate Type */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>Step 1: Select Your Gate Style</h3>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  Choose the mechanical gate structure that best fits your driveway layout and gradient.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
                  {GATE_TYPES.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setGateType(g.id)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '12px',
                        background: gateType === g.id ? '#eff6ff' : '#f8fafc',
                        border: gateType === g.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{g.icon}</div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>{g.name}</h4>
                      <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.4 }}>{g.desc}</p>
                      {gateType === g.id && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '22px', height: '22px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setStep(2)} className="btn btn-blue">
                    Next: Dimensions <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Dimensions */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>Step 2: Enter Driveway Dimensions</h3>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '2rem' }}>
                  Adjust the approximate width and height. (Our team performs precision laser measurements on-site before fabrication).
                </p>

                {/* Width Slider */}
                <div style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Driveway Opening Width (Clear Opening):</label>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb' }}>{width.toFixed(1)} Metres</span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="10.0"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '8px', borderRadius: '4px', accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                    <span>2.0m (Single Car)</span>
                    <span>4.0m (Standard Double)</span>
                    <span>6.0m (Wide Double)</span>
                    <span>10.0m (Commercial)</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Gate Height:</label>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb' }}>{height.toFixed(2)} Metres</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="2.4"
                    step="0.05"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '8px', borderRadius: '4px', accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                    <span>1.2m (Low Boundary)</span>
                    <span>1.5m (Standard Garden)</span>
                    <span>1.8m (Full Privacy Standard)</span>
                    <span>2.4m (High Security)</span>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(1)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-blue">
                    Next: Materials & Finish <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Material & Color */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>Step 3: Material, Infill & Powdercoat Finish</h3>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  Select the architectural infill style and powdercoat colour for corrosion-proof durability.
                </p>

                {/* Materials Selection */}
                <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Gate Infill Profile:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {MATERIALS.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        background: material === m.id ? '#eff6ff' : '#f8fafc',
                        border: material === m.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.2rem' }}>{m.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Color Selection */}
                <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Colorbond / Powdercoat Finish:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                  {COLORS.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: color === c.id ? '#eff6ff' : '#f8fafc',
                        border: color === c.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: c.hex, border: '1px solid #cbd5e1', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8125rem', color: '#0f172a', fontWeight: '600' }}>{c.name}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(2)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(4)} className="btn btn-blue">
                    Next: Automation & Motors <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Motor & Smart Accessories */}
            {step === 4 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>Step 4: Automation Motor & Smart Access</h3>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  Choose your motor power source and optional smart access accessories.
                </p>

                {/* Motor Selection */}
                <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Select Motor System:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {MOTORS.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setMotor(m.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        background: motor === m.id ? '#eff6ff' : '#f8fafc',
                        border: motor === m.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.2rem' }}>{m.name}</h4>
                        <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>{m.desc}</p>
                      </div>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: motor === m.id ? '6px solid #2563eb' : '2px solid #cbd5e1', background: '#ffffff', flexShrink: 0 }} />
                    </div>
                  ))}
                </div>

                {/* Accessories Checkboxes */}
                <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Smart Access & Safety Add-ons:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
                  {ACCESSORIES.map((acc) => {
                    const isSelected = accessories.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          background: isSelected ? '#eff6ff' : '#f8fafc',
                          border: isSelected ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: isSelected ? '#2563eb' : '#ffffff', border: '1.5px solid #2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          {isSelected && <Check size={12} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>{acc.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>+${acc.cost} AUD</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setStep(3)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(5)} className="btn btn-blue">
                    Review & Lock In Quote <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Instant Quote Submission */}
            {step === 5 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a' }}>Step 5: Lock In Your Factory-Direct Price</h3>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  Send your configured specification to our engineering team for an exact itemized PDF quote and fast-track booking.
                </p>

                {isSubmitted ? (
                  <div style={{ padding: '2rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
                      <Check size={32} />
                    </div>
                    <h4 style={{ fontSize: '1.5rem', color: '#065f46', marginBottom: '0.5rem' }}>Quote Request Received!</h4>
                    <p style={{ color: '#334155', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                      Thank you <strong>{formData.fullName}</strong>. One of our senior gate fabricators will review your {width}m x {height}m {GATE_TYPES.find(g=>g.id===gateType)?.name} specs and call you shortly to confirm your free on-site measure.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <a href={COMPANY_INFO.tel} className="btn btn-gold">
                        <PhoneCall size={18} /> Call Factory Direct: (07) 3102 1801
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '600', marginBottom: '0.35rem' }}>Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '600', marginBottom: '0.35rem' }}>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0400 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '600', marginBottom: '0.35rem' }}>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@example.com.au"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '600', marginBottom: '0.35rem' }}>Property Suburb / Postcode *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Yamanto / Brisbane"
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', fontWeight: '600', marginBottom: '0.35rem' }}>Driveway Notes or Slope Information</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about any slopes, existing fencing, or power availability..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f172a', fontSize: '0.9375rem', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button type="button" onClick={() => setStep(4)} className="btn btn-outline-dark">
                        <ChevronLeft size={18} /> Back
                      </button>
                      <button type="submit" className="btn btn-gold btn-lg btn-pulse">
                        <Send size={18} /> Submit for Official Fixed Quote
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Blueprint & Price Summary Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="card-light" style={{ padding: '1.75rem', border: '2px solid #e2e8f0', background: '#ffffff', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2563eb' }}>
                  LIVE SPECIFICATION
                </span>
                <span className="badge-tag badge-green" style={{ margin: 0 }}>
                  Factory Direct
                </span>
              </div>

              {/* Dynamic Gate Wireframe Graphic */}
              <div style={{
                height: '140px',
                background: '#f8fafc',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: `${Math.min(85, (width / 10) * 85 + 25)}%`,
                  height: `${Math.min(75, (height / 2.4) * 75 + 20)}%`,
                  border: '3px solid #2563eb',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: material.includes('vertical') ? 'row' : 'column',
                  gap: '4px',
                  padding: '4px',
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
                <div style={{ position: 'absolute', bottom: '6px', fontSize: '0.6875rem', color: '#64748b', fontWeight: '600' }}>
                  {width}m wide × {height}m high ({GATE_TYPES.find(g=>g.id===gateType)?.name})
                </div>
              </div>

              {/* Specification Summary List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Gate Type:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{GATE_TYPES.find(g=>g.id===gateType)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Dimensions:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{width}m (W) × {height}m (H)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Material & Infill:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{MATERIALS.find(m=>m.id===material)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Powdercoat Finish:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{COLORS.find(c=>c.id===color)?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Motor Automation:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{MOTORS.find(m=>m.id===motor)?.name.split(' ')[0]} {MOTORS.find(m=>m.id===motor)?.name.split(' ')[1]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Add-ons:</span>
                  <span style={{ color: '#0f172a', fontWeight: '700' }}>{accessories.length} Included</span>
                </div>
              </div>

              {/* Estimated Price Range Box */}
              <div style={{
                background: '#eff6ff',
                border: '1.5px solid #bfdbfe',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.8125rem', color: '#1e40af', fontWeight: '600', marginBottom: '0.25rem' }}>Estimated Factory Direct Range:</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1d4ed8', letterSpacing: '-0.02em' }}>
                  ${lowEst.toLocaleString()} – ${highEst.toLocaleString()} <span style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#64748b' }}>AUD*</span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '0.35rem' }}>
                  *Includes custom fabrication, powdercoating & motor kit. Final price confirmed upon on-site laser measure.
                </div>
              </div>

              {/* Guarantees Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8125rem', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} style={{ color: '#059669' }} />
                  <span>10-Year Structural Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#059669' }} />
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
