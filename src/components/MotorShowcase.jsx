import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Gauge, 
  Smartphone, 
  BatteryCharging, 
  Sun, 
  Cpu, 
  Award,
  ArrowRight
} from 'lucide-react';
import { MOTOR_BRANDS } from '../data/siteData';

export default function MotorShowcase({ onOpenQuote }) {
  return (
    <section id="motors" className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Cpu size={14} />
            Premium Automation Hardware
          </span>
          <h2 className="section-title">
            Italian Nice & Centurion Motors <br />
            <span className="gradient-text-gold">Engineered for Rapid, Whisper-Quiet Operation</span>
          </h2>
          <p className="section-subtitle">
            A custom gate is only as good as its motor. We exclusively install genuine commercial-grade motors backed by full Australian warranties and intelligent safety obstruction sensors.
          </p>
        </div>

        {/* Motors Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {MOTOR_BRANDS.map((motor, idx) => (
            <div
              key={idx}
              className="card-light"
              style={{
                padding: 'clamp(1.25rem, 3vw, 1.85rem)',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="badge-tag badge-blue" style={{ margin: 0, fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                    {motor.badge}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={13} /> {motor.warranty}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                  {motor.name}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {motor.desc}
                </p>

                {/* Specs Box */}
                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.85rem', border: '1px solid #e2e8f0', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Gauge size={13} /> Opening Speed:
                    </span>
                    <span style={{ color: '#0f172a', fontWeight: '700' }}>{motor.speed}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Best Application:</span>
                    <span style={{ color: '#d97706', fontWeight: '700', textAlign: 'right' }}>{motor.bestFor}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                  {motor.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#334155' }}>
                      <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="btn btn-outline-dark btn-sm"
                style={{ width: '100%', marginTop: '0.4rem' }}
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
          padding: 'clamp(1.25rem, 3.5vw, 2rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '1.25rem',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
              <Smartphone size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '800' }}>Smartphone App Access</h4>
              <p style={{ color: '#475569', fontSize: '0.78rem' }}>Open & check your gate from anywhere on iOS & Android.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
              <BatteryCharging size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '800' }}>Battery Backup Built-In</h4>
              <p style={{ color: '#475569', fontSize: '0.78rem' }}>Never get stuck in a blackout with integrated backup batteries.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', flexShrink: 0 }}>
              <Sun size={22} />
            </div>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '800' }}>100% Solar Compatible</h4>
              <p style={{ color: '#475569', fontSize: '0.78rem' }}>Zero power cables required for rural & long driveways.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
