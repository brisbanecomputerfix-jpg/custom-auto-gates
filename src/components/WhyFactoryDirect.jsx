import React from 'react';
import { 
  Factory, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Wrench, 
  Award, 
  CheckCircle2, 
  XCircle,
  Truck,
  HeartHandshake,
  Cpu,
  Calculator,
  Info
} from 'lucide-react';
import { WHY_US_POINTS } from '../data/siteData';

const iconMap = {
  Factory: Factory,
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  Sparkles: Sparkles,
  Wrench: Wrench,
  Award: Award,
  Truck: Truck,
  HeartHandshake: HeartHandshake,
  Cpu: Cpu
};

export default function WhyFactoryDirect({ onOpenQuote, onNavigateAbout }) {
  return (
    <section id="why-factory-direct" className="section" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Factory size={14} />
            The Custom Auto Gates Advantage
          </span>
          <h2 className="section-title" style={{ color: '#0f172a' }}>
            Why Buying Factory Direct <br />
            <span className="gradient-text-gold">Saves You Thousands</span>
          </h2>
          <p className="section-subtitle">
            Most gate companies are middleman resellers who subcontract fabrication and installation. We do 100% of CAD engineering, welding, powdercoating, and motor setup right here in Yamanto.
          </p>
        </div>

        {/* 6 Value Prop Cards Grid with Isometric Styled Icon Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem'
        }}>
          {WHY_US_POINTS.map((pt, idx) => {
            const IconComponent = iconMap[pt.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="card-light"
                style={{
                  padding: 'clamp(1.25rem, 3vw, 1.85rem)',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                }}
              >
                {/* 3D / Isometric Icon Badge */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: idx % 2 === 0 ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  color: idx % 2 === 0 ? '#b45309' : '#1d4ed8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: idx % 2 === 0 ? '0 6px 14px rgba(217, 119, 6, 0.15)' : '0 6px 14px rgba(37, 99, 235, 0.15)',
                  border: '1px solid rgba(255,255,255,0.8)'
                }}>
                  <IconComponent size={24} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                    {pt.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.55 }}>
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Comparison Table */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1.5px solid #e2e8f0',
          padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
          boxShadow: '0 10px 30px rgba(15,23,42,0.06)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge-tag badge-blue">Direct Comparison</span>
            <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
              Custom Auto Gates vs. Middleman Resellers
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              See what makes an authentic Australian manufacturer different.
            </p>
          </div>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '0.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '540px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.85rem', color: '#64748b', fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase' }}>Feature & Quality Factor</th>
                  <th style={{ padding: '0.85rem', color: '#0f172a', fontSize: '0.92rem', fontWeight: '800', background: '#eff6ff', borderRadius: '8px 8px 0 0' }}>Custom Auto Gates (Factory Direct)</th>
                  <th style={{ padding: '0.85rem', color: '#64748b', fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase' }}>Middleman Resellers</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.875rem' }}>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.9rem 0.85rem', fontWeight: '600', color: '#1e293b' }}>Manufacturing Origin</td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#059669', fontWeight: '700', background: '#eff6ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={15} /> 100% Built in Yamanto Workshop, QLD
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <XCircle size={15} /> Mass Imported / Subcontracted
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.9rem 0.85rem', fontWeight: '600', color: '#1e293b' }}>Pricing Structure</td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#059669', fontWeight: '700', background: '#eff6ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={15} /> True Wholesale Factory Direct Rates
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <XCircle size={15} /> 30%–50% Middleman Sales Markups
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.9rem 0.85rem', fontWeight: '600', color: '#1e293b' }}>Structural Warranty</td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#059669', fontWeight: '700', background: '#eff6ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={15} /> 10-Year Direct Manufacturer Guarantee
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <XCircle size={15} /> 1-Year Limited Warranty
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.9rem 0.85rem', fontWeight: '600', color: '#1e293b' }}>Custom Engineering & Raking</td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#059669', fontWeight: '700', background: '#eff6ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={15} /> Custom CAD Laser Raked to Millimeter
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <XCircle size={15} /> Fixed Modular Sizes with Gaps
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '0.9rem 0.85rem', fontWeight: '600', color: '#1e293b' }}>Turnaround & Lead Time</td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#059669', fontWeight: '700', background: '#eff6ff', borderRadius: '0 0 8px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={15} /> Rapid 2–4 Weeks From Measure
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 0.85rem', color: '#dc2626' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <XCircle size={15} /> 8–14 Weeks Shipping Delays
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenQuote} className="btn btn-gold btn-lg">
              <Calculator size={18} />
              Calculate Factory Direct Price
            </button>
            <button onClick={onNavigateAbout} className="btn btn-outline-dark btn-lg">
              <Info size={18} />
              Read Our Story & Values
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
