import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Zap,
  Smartphone, 
  Send, 
  Upload, 
  Info, 
  PhoneCall,
  CreditCard,
  Lock,
  Loader2,
  Clock,
  BatteryCharging,
  Maximize2,
  DollarSign,
  Tag
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { createStripeCheckout } from '../utils/stripeClient';

export default function GateVisualizerQuote() {
  const [step, setStep] = useState(1);
  
  // Gate Configuration State
  const [selectedDesign, setSelectedDesign] = useState('horizontal-slat');
  const [gateType, setGateType] = useState('sliding');
  const [width, setWidth] = useState(4.0); // meters (4000mm)
  const [height, setHeight] = useState(1.8); // meters (1800mm)
  const [powerSupply, setPowerSupply] = useState('240v-plugin');
  const [motor, setMotor] = useState('standard-slide');
  const [timeline, setTimeline] = useState('2-weeks');
  const [accessories, setAccessories] = useState(['phone-app']);
  
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

  // Helper to change step and smoothly scroll without page jumping or shrinking
  const goToStep = (newStep) => {
    setStep(newStep);
    setTimeout(() => {
      const el = document.getElementById('gate-visualizer');
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  // 1. GATE DESIGNS & INFILL STYLES (Extracted from WordPress Stylish Cost Calculator)
  const GATE_DESIGNS = [
    {
      id: 'horizontal-slat',
      name: 'Horizontal Slat Gate',
      category: 'Slats',
      baseRateM2: 750,
      desc: '65mm horizontal slats with 7mm or 20mm gaps. Most popular modern architectural look.',
      image: 'https://customautogates.com.au/wp-content/uploads/2023/06/custom-automated-sliding-gate-brisbane.jpg',
      badge: 'Most Popular'
    },
    {
      id: 'vertical-slat',
      name: 'Vertical Slat Gate',
      category: 'Slats',
      baseRateM2: 750,
      desc: '65mm wide slats vertical with 7mm or 20mm gaps. Sleek vertical lines for contemporary facades.',
      image: 'https://customautogates.com.au/wp-content/uploads/2020/12/image-3.jpg',
      badge: 'Modern Architectural'
    },
    {
      id: 'hampton-style',
      name: 'Hampton Style Gate',
      category: 'Prestige',
      baseRateM2: 855,
      desc: 'Dual-section frame: lower 65mm vertical slats (20mm gap), upper 3x 40x40 square tubes centred.',
      image: 'https://customautogates.com.au/wp-content/uploads/2024/10/434299467_861965892610424_2556695232572143965_n-1.jpg',
      badge: 'Coastal & Heritage'
    },
    {
      id: 'architectural-face-weld',
      name: 'Architectural Face Weld',
      category: 'Architectural',
      baseRateM2: 870,
      desc: '40x40 vertical face-welded tubes with 40mm gaps and clean welded aluminium top caps.',
      image: 'https://customautogates.com.au/wp-content/uploads/2023/05/sliding-gates.jpg',
      badge: 'Custom Sizing'
    },
    {
      id: 'security-pressed-spear',
      name: 'Security Gate (Pressed Spear)',
      category: 'Security',
      baseRateM2: 975,
      desc: '25x25 square pressed spear tops @ 125mm centres face welded for high perimeter security.',
      image: 'https://customautogates.com.au/wp-content/uploads/2020/12/image-1.jpg',
      badge: 'High Security'
    },
    {
      id: 'curve-top-tube',
      name: 'Curve Top Tube Gate',
      category: 'Heritage',
      baseRateM2: 1380,
      desc: '19mm round tube gate with dual curved top rails and integrated puppy / doggy lower bars.',
      image: 'https://customautogates.com.au/wp-content/uploads/2020/04/swing-gates8.jpg',
      badge: 'Ornate Curved'
    },
    {
      id: 'vertical-tube-rail',
      name: 'Vertical Tube (Extra Top Rail)',
      category: 'Tubular',
      baseRateM2: 675,
      desc: '19mm round tubes at 100mm centres in a classic 2-up / 2-down pattern with additional top rail.',
      image: 'https://customautogates.com.au/wp-content/uploads/2019/07/gates-and-fencingIMG_6770.jpg',
      badge: 'Classic Pool & Driveway'
    },
    {
      id: 'colorbond-infill',
      name: 'Colorbond Infill Gate',
      category: 'Privacy',
      baseRateM2: 640,
      desc: 'Aluminium powder-coated heavy-duty frame with Colorbond corrugated or panel infill sheets.',
      image: 'https://customautogates.com.au/wp-content/uploads/2024/10/244479862_2967542013559648_5841129152015725762_n-2.jpg',
      badge: '100% Solid Privacy'
    },
    {
      id: 'bare-frame-palings',
      name: 'Bare Frame (Fence Palings)',
      category: 'Cladding Frame',
      baseRateM2: 570,
      desc: 'TIG-welded aluminium frame powder coated, ready for on-site cladding with 100mm timber palings.',
      image: 'https://customautogates.com.au/wp-content/uploads/2019/07/gates-and-fencingIMG_6740.jpg',
      badge: 'DIY / Builder Clad'
    }
  ];

  // 2. OPENING TYPES & HARDWARE (Extracted from WordPress Calculator)
  const OPENING_TYPES = [
    { 
      id: 'sliding', 
      name: 'Automatic Sliding Gate', 
      hardwareCost: 750, 
      desc: 'In-ground steel track, ground rollers, top guide rollers, and anti-lift stop hardware.', 
      icon: '↔️' 
    },
    { 
      id: 'double-swing', 
      name: 'Dual Swing Gates', 
      hardwareCost: 450, 
      desc: 'Two-leaf dual swing gates with heavy-duty ball-bearing hinges & centre drop stops.', 
      icon: '🚪🚪' 
    },
    { 
      id: 'single-swing', 
      name: 'Single Swing Gate', 
      hardwareCost: 350, 
      desc: 'Single leaf swing entrance gate with post brackets and heavy-duty adjustable hinges.', 
      icon: '🚪' 
    },
    { 
      id: 'telescopic', 
      name: 'Telescopic Sliding Gate', 
      hardwareCost: 1100, 
      desc: 'Dual interlocking stacking panels for driveways with limited slide-back space.', 
      icon: '⏭️' 
    },
    { 
      id: 'cantilever', 
      name: 'Trackless Cantilever Gate', 
      hardwareCost: 1450, 
      desc: 'Suspended trackless sliding gate ideal for sloping driveways, gravel, or paving.', 
      icon: '✨' 
    }
  ];

  // 3. POWER SUPPLY OPTIONS (Extracted from WordPress Calculator)
  const POWER_OPTIONS = [
    { 
      id: '240v-plugin', 
      name: '240V Existing Power Point', 
      cost: 50, 
      desc: 'Existing weather-protected 240V power point already available at gate motor post.' 
    },
    { 
      id: 'low-voltage', 
      name: 'Low Voltage Run (12V–36V)', 
      cost: 1200, 
      desc: 'Cabling run from existing house power point to front gate (saves deep 240V trenching).' 
    },
    { 
      id: 'solar-system', 
      name: '100% Off-Grid Solar System', 
      cost: 1250, 
      desc: 'Monocrystalline solar panel mounted on gate post with high-capacity deep-cycle battery bank.' 
    }
  ];

  // 4. MOTOR & AUTOMATION CATEGORIES (Extracted from WordPress Calculator)
  const MOTORS = [
    { 
      id: 'standard-slide', 
      name: 'Residential Slide Motor', 
      cost: 2000, 
      desc: 'Heavy-duty 24V high-speed automatic sliding motor with battery backup and 2 encrypted remotes.' 
    },
    { 
      id: 'single-swing-motor', 
      name: 'Residential Single Swing Motor', 
      cost: 2200, 
      desc: 'Smooth linear actuator arm motor with soft-stop control, battery backup, and 2 remotes.' 
    },
    { 
      id: 'dual-swing-motors', 
      name: 'Residential Dual Swing Motors', 
      cost: 3000, 
      desc: 'Dual synchronized linear electro-mechanical actuator arms with control board and 2 remotes.' 
    },
    { 
      id: 'premium-smart', 
      name: 'Premium Smart High-Speed Motor', 
      cost: 2450, 
      desc: 'Whisper-quiet ultra-fast opening with iOS & Android smartphone app control and diagnostic alerts.' 
    },
    { 
      id: 'commercial-heavy', 
      name: 'Commercial Heavy-Duty Inverter Motor', 
      cost: 3600, 
      desc: 'Continuous 100% duty cycle commercial automation engineered for heavy gates & high-traffic sites.' 
    }
  ];

  // 5. PROJECT READINESS / TIMELINE (Extracted from WordPress Calculator)
  const TIMELINES = [
    { 
      id: 'budgeting', 
      name: 'Budgeting and Planing', 
      badge: 'Early Stage', 
      desc: 'Not ready for a site visit yet — gathering pricing a few months prior to starting.' 
    },
    { 
      id: '2-weeks', 
      name: 'Ready for Site Visit within 2 Weeks', 
      badge: 'Ready to Measure', 
      desc: 'Driveway is ready or in progress. Keen to compare on quality, craftsmanship, and factory-direct price.' 
    },
    { 
      id: 'urgent', 
      name: 'Priority / Need This Yesterday!', 
      badge: 'Fast-Track', 
      desc: 'Time is of the essence. Seeking immediate site visit, fast fabrication, and quick installation.' 
    }
  ];

  // 6. ACCESSORIES
  const ACCESSORIES = [
    { id: 'phone-app', name: '4G / WiFi Smartphone App Opener', cost: 280, desc: 'Open, close, and check gate status anywhere' },
    { id: 'keypad', name: 'Wireless Digital Keypad', cost: 195, desc: 'Pin code access for guests, gardeners, and trades' },
    { id: 'intercom', name: 'HD Video Intercom with Phone Alert', cost: 650, desc: 'See, speak, and buzz in visitors from your phone' },
    { id: 'extra-remotes', name: 'Pack of 3 Extra Long-Range Remotes', cost: 150, desc: 'Encrypted long-range key fobs for family cars' },
    { id: 'safety-beams', name: 'Anti-Crush Infrared Safety Beams', cost: 180, desc: 'Prevents gate from closing on vehicles, pets, or kids' }
  ];

  const toggleAccessory = (id) => {
    if (accessories.includes(id)) {
      setAccessories(accessories.filter(a => a !== id));
    } else {
      setAccessories([...accessories, id]);
    }
  };

  // Math Calculations based on the requested formula:
  // Gate Design Price = 2.25 * Height(m) * Width(m) * Design Price
  const currentDesignObj = GATE_DESIGNS.find(d => d.id === selectedDesign) || GATE_DESIGNS[0];
  const currentOpeningObj = OPENING_TYPES.find(o => o.id === gateType) || OPENING_TYPES[0];
  const currentPowerObj = POWER_OPTIONS.find(p => p.id === powerSupply) || POWER_OPTIONS[0];
  const currentMotorObj = MOTORS.find(m => m.id === motor) || MOTORS[0];
  const currentTimelineObj = TIMELINES.find(t => t.id === timeline) || TIMELINES[1];

  const areaM2Num = width * height;
  const areaM2 = areaM2Num.toFixed(2);

  // Exact 2.25 multiplier formula from user PDF Page 6 & 7:
  const gateDesignPrice = Math.round(2.25 * height * width * currentDesignObj.baseRateM2);
  const calculatedHardware = currentOpeningObj.hardwareCost;
  const calculatedPower = currentPowerObj.cost;
  const calculatedMotor = currentMotorObj.cost;
  const calculatedAccessories = accessories.reduce((sum, accId) => {
    const item = ACCESSORIES.find(a => a.id === accId);
    return sum + (item ? item.cost : 0);
  }, 0);

  const subtotal = gateDesignPrice + calculatedHardware + calculatedPower + calculatedMotor + calculatedAccessories;
  const taxAmount = Math.round(subtotal * 0.10);
  const totalCalculatedPrice = subtotal + taxAmount;

  // Price range matching existing website (+15% band):
  const rangeLow = totalCalculatedPrice;
  const rangeHigh = Math.round(totalCalculatedPrice * 1.15);
  const formattedRange = `$${rangeLow.toLocaleString()} - $${rangeHigh.toLocaleString()}`;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          suburb: formData.suburb,
          design: currentDesignObj.name,
          gateType: currentOpeningObj.name,
          widthMm: Math.round(width * 1000),
          heightMm: Math.round(height * 1000),
          areaM2: areaM2,
          powerSupply: currentPowerObj.name,
          motor: currentMotorObj.name,
          timeline: currentTimelineObj.name,
          accessories: accessories.map(a => ACCESSORIES.find(acc => acc.id === a)?.name).join(', '),
          estimatedTotal: formattedRange,
          subtotal: `$${subtotal.toLocaleString()}`,
          tax: `$${taxAmount.toLocaleString()}`,
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

  const STEPS = [
    { num: 1, label: '1. Gate Design' },
    { num: 2, label: '2. Dimensions' },
    { num: 3, label: '3. Opening Hardware' },
    { num: 4, label: '4. Power & Motor' },
    { num: 5, label: '5. Instant Quote' },
  ];

  return (
    <section id="gate-visualizer" className="section" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Calculator size={14} />
            Instant Gate Pricing Calculator & Quote
          </span>
          <h2 className="section-title">
            Interactive Gate Pricing Calculator <br />
            <span className="gradient-text-gold">& Live Factory-Direct Cost Estimator</span>
          </h2>
          <p className="section-subtitle">
            Configure your gate design, exact millimeter dimensions, opening track kit, power supply, and automation motor for an instant price estimate range.
          </p>
        </div>

        {/* Step Indicator Navigation */}
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
          {STEPS.map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <button
                key={s.num}
                onClick={() => goToStep(s.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '2px solid var(--accent-gold)' : isDone ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)',
                  background: isActive ? 'var(--accent-gold-light)' : isDone ? 'var(--badge-green-bg)' : 'var(--bg-card)',
                  color: isActive ? 'var(--accent-gold)' : isDone ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: isActive || isDone ? '800' : '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
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
          gridTemplateColumns: '1.35fr 0.85fr',
          gap: '1.75rem',
          alignItems: 'start'
        }}
        className="visualizer-grid"
        >
          {/* Left Column: Interactive Step Configuration */}
          <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3.5vw, 2rem)', border: '1.5px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-md)' }}>
            
            {/* STEP 1: Select Authentic Gate Design */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', margin: 0 }}>Step 1: Select Your Gate Design</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '800' }}>
                    9 Workshop Styles
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  All designs are 100% custom-fabricated in our Yamanto workshop using structural 6060-T6 Australian aluminium.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.85rem' }}>
                  {GATE_DESIGNS.map((d) => {
                    const isSelected = selectedDesign === d.id;
                    return (
                      <div
                        key={d.id}
                        onClick={() => setSelectedDesign(d.id)}
                        style={{
                          borderRadius: '12px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {/* Design Photo Preview */}
                        <div style={{ position: 'relative', width: '100%', height: '125px', background: '#0f172a', overflow: 'hidden' }}>
                          <img 
                            src={d.image} 
                            alt={d.name}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                          />
                          <span style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            fontSize: '0.68rem',
                            fontWeight: '800',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(9, 14, 26, 0.85)',
                            color: '#fbbf24',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            backdropFilter: 'blur(4px)'
                          }}>
                            {d.badge}
                          </span>
                        </div>

                        <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                              <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: isSelected ? 'var(--accent-gold-hover)' : 'var(--text-heading)', margin: 0 }}>
                                {d.name}
                              </h4>
                            </div>
                            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                              {d.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => goToStep(2)} className="btn btn-blue">
                    Next: Set Dimensions <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Millimeter Accurate Dimensions */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 2: Driveway Opening Dimensions</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Set your driveway opening. We custom engineer and fabricate every gate to your exact millimeter specifications.
                </p>

                {/* Width Slider */}
                <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'var(--bg-card-subtle)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <div>
                      <label style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)' }}>Driveway Clear Opening (Width)</label>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From inside edge of post to post</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--accent-gold)' }}>{Math.round(width * 1000)} mm</span>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>({width.toFixed(1)}m / {(width * 3.28).toFixed(1)} ft)</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.05"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)', height: '8px', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    <span>Pedestrian (1000mm)</span>
                    <span>Standard Double (4000mm)</span>
                    <span>Wide Opening (6000mm)</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'var(--bg-card-subtle)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <div>
                      <label style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)' }}>Gate Height</label>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From ground clearance to top rail/spear</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--accent-blue)' }}>{Math.round(height * 1000)} mm</span>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>({height.toFixed(1)}m • {height >= 1.8 ? 'Full Privacy' : 'Standard'})</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.4"
                    step="0.05"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-blue)', height: '8px', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    <span>Low Boundary (1000mm)</span>
                    <span>Standard Council (1500mm)</span>
                    <span>Max Privacy (2400mm)</span>
                  </div>
                </div>

                {/* Area Badge Card (No prices shown) */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  background: 'var(--badge-blue-bg)',
                  border: '1.5px solid var(--badge-blue-border)',
                  borderRadius: '12px',
                  color: 'var(--badge-blue-text)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem', fontWeight: '700' }}>
                    <Maximize2 size={18} />
                    <span>Calculated Panel Surface Area: <strong>{areaM2} m²</strong></span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--accent-gold)' }}>
                    Custom Yamanto Fabrication
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => goToStep(1)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => goToStep(3)} className="btn btn-blue">
                    Next: Opening Hardware <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Opening Hardware Kit */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 3: Opening Hardware Kit</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Select your track or hinge hardware kit for your driveway layout.
                </p>

                {/* Opening Mechanism */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  Select Opening Hardware Kit:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.65rem', marginBottom: '1.75rem' }}>
                  {OPENING_TYPES.map((o) => {
                    const isSelected = gateType === o.id;
                    return (
                      <div
                        key={o.id}
                        onClick={() => setGateType(o.id)}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '1.4rem' }}>{o.icon}</span>
                          </div>
                          <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: isSelected ? 'var(--accent-gold-hover)' : 'var(--text-heading)', marginBottom: '0.2rem' }}>
                            {o.name}
                          </h4>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                            {o.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => goToStep(2)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => goToStep(4)} className="btn btn-blue">
                    Next: Power & Motors <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Power Supply & Automation Motors */}
            {step === 4 && (
              <div className="animate-fadeIn">
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>Step 4: Power Infrastructure & Motor System</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Select your on-site electrical power supply, matching gate motor, and optional smart access accessories.
                </p>

                {/* Power Supply Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  1. Power Supply Connection:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                  {POWER_OPTIONS.map((p) => {
                    const isSelected = powerSupply === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPowerSupply(p.id)}
                        style={{
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.15rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>{p.name}</h4>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{p.desc}</p>
                        </div>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: isSelected ? '5px solid var(--accent-gold)' : '2px solid var(--border-subtle)', background: 'var(--bg-card)', flexShrink: 0 }} />
                      </div>
                    );
                  })}
                </div>

                {/* Motor Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  2. Automation Motor System (Includes 2 Remotes):
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                  {MOTORS.map((m) => {
                    const isSelected = motor === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setMotor(m.id)}
                        style={{
                          padding: '0.8rem 1rem',
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.15rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>{m.name}</h4>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{m.desc}</p>
                        </div>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: isSelected ? '5px solid var(--accent-blue)' : '2px solid var(--border-subtle)', background: 'var(--bg-card)', flexShrink: 0 }} />
                      </div>
                    );
                  })}
                </div>

                {/* Project Timeline Selection */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  3. Project Readiness & Timeline:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.55rem', marginBottom: '1.5rem' }}>
                  {TIMELINES.map((t) => {
                    const isSelected = timeline === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setTimeline(t.id)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-card-subtle)',
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', fontWeight: '800', color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {t.badge}
                        </span>
                        <h4 style={{ fontSize: '0.86rem', fontWeight: '800', color: 'var(--text-heading)', margin: '0.2rem 0' }}>{t.name}</h4>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35, margin: 0 }}>{t.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Accessories Checkboxes */}
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.55rem' }}>
                  4. Smart Access & Safety Add-ons:
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
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-heading)' }}>{acc.name}</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{acc.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => goToStep(3)} className="btn btn-outline-dark">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => goToStep(5)} className="btn btn-blue">
                    Review Customised Quote <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Itemized Proposal & Free Site Visit Submission */}
            {step === 5 && (
              <div className="animate-fadeIn">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-heading)', margin: 0 }}>Step 5: Lock In Your Estimate</h3>
                  <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--accent-gold)' }}>
                    Total: {formattedRange}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Submit your custom specification to our engineering workshop for a comprehensive, obligation-free proposal and free on-site visit.
                </p>

                {isSubmitted ? (
                  <div style={{ padding: '1.75rem', background: 'var(--badge-green-bg)', border: '1px solid var(--badge-green-border)', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
                      <Check size={28} />
                    </div>
                    <h4 style={{ fontSize: '1.3rem', color: 'var(--badge-green-text)', marginBottom: '0.4rem' }}>Quote Request Received!</h4>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                      Thank you <strong>{formData.fullName}</strong>. Our senior fabrication team has received your <strong>{Math.round(width*1000)}mm × {Math.round(height*1000)}mm {currentDesignObj.name}</strong> specification (Estimated range: <strong>{formattedRange}</strong>) and will contact you promptly to confirm your free on-site visit.
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
                          placeholder="e.g. Yamanto / Brisbane / Ipswich"
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.3rem' }}>Driveway Slope, Fencing, or Access Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your driveway gradient, existing posts, or boundary fencing..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', fontSize: '0.9rem', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <button type="button" onClick={() => goToStep(4)} className="btn btn-outline-dark">
                          <ChevronLeft size={17} /> Back
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-blue" 
                          style={{ flex: '1 1 auto', fontWeight: '800', letterSpacing: '0.02em' }} 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                          SUBMIT FOR A FREE SITE VISIT
                        </button>
                      </div>

                      {/* Optional Fast-Track Production Deposit via Stripe */}
                      <button
                        type="button"
                        onClick={async () => {
                          if (!formData.fullName || !formData.email) {
                            alert('Please enter your Name and Email above before locking in your production deposit.');
                            return;
                          }
                          setIsPayingDeposit(true);
                          try {
                            await createStripeCheckout({
                              amount: 500,
                              title: `Custom ${currentDesignObj.name} Production Deposit ($500)`,
                              description: `${Math.round(width*1000)}mm x ${Math.round(height*1000)}mm ${currentDesignObj.name} (${currentOpeningObj.name}) - Total Est: ${formattedRange} - For ${formData.fullName}`,
                              customerEmail: formData.email,
                              customerName: formData.fullName,
                              customerPhone: formData.phone,
                              metadata: {
                                design: currentDesignObj.name,
                                openingType: currentOpeningObj.name,
                                widthMm: (width * 1000).toString(),
                                heightMm: (height * 1000).toString(),
                                areaM2,
                                powerSupply: currentPowerObj.name,
                                motor: currentMotorObj.name,
                                timeline: currentTimelineObj.name,
                                estimatedTotal: formattedRange,
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
                        <Lock size={11} /> 100% Refundable prior to on-site visit • 256-Bit SSL Encrypted
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Instant Quote Visualisation (Description & Quantity Layout matching Page 10) */}
          <div style={{ width: '100%' }}>
            <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3.5vw, 1.75rem)', border: '1.5px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-lg)' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
                  Instant Gate Quotes - Now
                </h3>
              </div>

              {/* Table Header: Description & Quantity */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '2px solid var(--border-light)', 
                paddingBottom: '0.5rem', 
                marginBottom: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: '800',
                color: 'var(--text-heading)'
              }}>
                <span>Description</span>
                <span>Quantity</span>
              </div>

              {/* Selected Items List with Quantity 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {/* 1. DESIGNS */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    DESIGNS
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img 
                        src={currentDesignObj.image} 
                        alt={currentDesignObj.name} 
                        style={{ width: '42px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-light)' }} 
                      />
                      <span style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-heading)' }}>
                        {currentDesignObj.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                      1
                    </span>
                  </div>
                </div>

                {/* 2. Gate Type */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                    Gate Type
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      {currentOpeningObj.name}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                      1
                    </span>
                  </div>
                </div>

                {/* 3. Gate Size */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                    Gate Size
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      {Math.round(width * 1000)}mm (W) × {Math.round(height * 1000)}mm (H) ({areaM2} m²)
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                      1
                    </span>
                  </div>
                </div>

                {/* 4. Power Supply */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                    Power Supply
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      {currentPowerObj.name}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                      1
                    </span>
                  </div>
                </div>

                {/* 5. Automation Type */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                    Automation Type
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      {currentMotorObj.name}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                      1
                    </span>
                  </div>
                </div>

                {/* 6. Project Readiness */}
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                    What stage are you at for this project?
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      {currentTimelineObj.name}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                      1
                    </span>
                  </div>
                </div>

                {/* 7. Accessories (if any selected) */}
                {accessories.length > 0 && accessories.map((accId) => {
                  const accObj = ACCESSORIES.find(a => a.id === accId);
                  if (!accObj) return null;
                  return (
                    <div key={accId}>
                      <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                        Accessory / Add-on
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          {accObj.name}
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-heading)', minWidth: '20px', textAlign: 'right' }}>
                          1
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal, Tax 10%, and Total Price */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>TAX 10%:</span>
                  <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>${taxAmount.toLocaleString()}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'baseline', 
                  borderTop: '2px solid var(--border-light)', 
                  paddingTop: '0.75rem',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                    Total Price:
                  </span>
                  <span style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: '900', color: 'var(--accent-gold)', letterSpacing: '-0.02em', textAlign: 'right' }}>
                    {formattedRange}
                  </span>
                </div>
              </div>

              {/* Mandatory Estimate Disclaimer Note (From Page 10 of PDF) */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '0.85rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: 1.55,
                marginBottom: '1rem'
              }}>
                <strong>Please Note:</strong> Quote provided is an estimate only and is subject to site inspection - pricing may vary, this is not a firm quote but a pricing tool for budgeting. We offer individual site quotes for free to ensure you have a 100% firm quote to move forward with.
              </div>

              {/* Trust Guarantees Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={15} style={{ color: 'var(--accent-emerald)' }} />
                  <span>10-Year Structural Aluminium Guarantee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Yamanto Factory Direct (Zero Middleman Markups)</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
