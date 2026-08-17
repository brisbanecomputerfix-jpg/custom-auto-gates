import React from 'react';
import { MOTOR_BRANDS } from '../data/siteData';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Gauge, 
  Smartphone, 
  BatteryCharging, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function MotorShowcase({ onOpenQuote }) {
  return (
    <section id="motors" className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Cpu size={14} />
            Industry-Leading Automation Hardware
          </span>
          <h2 className="section-title">
            World-Class Gate Motors <br />
            <span className="gradient-text-gold">Italian Nice & Centurion Smart Systems</span>
          </h2>
          <p className="section-subtitle">
            A gate is only as reliable as its motor. We partner with the world's most trusted manufacturers to deliver whisper-quiet operation, rapid opening speeds, and bulletproof reliability.
          </p>
        </div>

        {/* Motors Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}>
          {MOTOR_BRANDS.map((motor, idx) => (
            <div
              key={idx}
              className="card-light"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                background: '#ffffff',
                boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                {/* Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge-tag badge-blue" style={{ margin: 0 }}>
                    {motor.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} /> {motor.warranty}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                  {motor.name}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {motor.desc}
                </p>

                {/* Specs Box */}
                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Gauge size={14} /> Opening Speed:
                    </span>
                    <span style={{ color: '#0f172a', fontWeight: '700' }}>{motor.speed}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Best Application:</span>
                    <span style={{ color: '#d97706', fontWeight: '700', textAlign: 'right', maxWidth: '140px' }}>{motor.bestFor}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {motor.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#334155' }}>
                      <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="btn btn-outline-dark btn-sm"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Inquire With This Motor
              </button>
            </div>
          ))}
        </div>

        {/* Smart Access Accessories Banner */}
        <div style={{
          background: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: '16px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
              <Smartphone size={24} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: '800' }}>Smartphone WiFi & 4G Access</h4>
              <p style={{ color: '#475569', fontSize: '0.8125rem' }}>Open & check your gate from anywhere on iOS & Android.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
              <BatteryCharging size={24} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: '800' }}>Battery Backup Built-In</h4>
              <p style={{ color: '#475569', fontSize: '0.8125rem' }}>Never get stuck in a blackout with integrated backup batteries.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', flexShrink: 0 }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: '800' }}>Obstacle Safety Sensors</h4>
              <p style={{ color: '#475569', fontSize: '0.8125rem' }}>Anti-crush infrared beams protect vehicles, children & pets.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
