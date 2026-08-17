import React, { useState } from 'react';
import { 
  Wrench, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  Key, 
  Eye, 
  BatteryCharging
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function TroubleshooterModal({ isOpen, onClose, onOpenContact }) {
  const [selectedIssue, setSelectedIssue] = useState('power-cut');

  if (!isOpen) return null;

  const ISSUES = [
    {
      id: 'power-cut',
      title: 'Power Outage / Manual Unlock',
      icon: Key,
      summary: 'How to manually unlock and open your automatic gate during a power cut.',
      steps: [
        'Locate the manual release key supplied with your Nice or Centurion motor installation.',
        'Insert the key into the motor override lock cylinder (usually on the side or front of the motor housing).',
        'Turn the key 90 degrees and pull the release lever firmly outward to disengage the internal gearbox.',
        'You can now slide or swing the gate freely by hand.',
        'To re-engage automatic mode once power returns, close the lever and turn the key back.'
      ]
    },
    {
      id: 'gate-reverses',
      title: 'Gate Reverses / Safety Beam',
      icon: Eye,
      summary: 'Safety photo beam obstruction or track debris issue.',
      steps: [
        'Check the ground track for small stones, dirt build-up, or overgrown grass preventing full travel.',
        'Inspect both infrared safety sensor lenses on each gate post. Wipe away any cobwebs, spider nests, or dirt.',
        'Ensure the indicator LED on the receiving sensor is glowing steady (solid red/green) and not blinking rapidly.',
        'Check that the gate isn’t rubbing hard against the catch post rubber stopper.'
      ]
    },
    {
      id: 'remote-fail',
      title: 'Remotes Not Working / Range Issue',
      icon: BatteryCharging,
      summary: 'Remote battery depletion or antenna interference.',
      steps: [
        'Check if the remote LED light blinks brightly when pressed. If dim or unlit, replace the CR2032 / 27A battery.',
        'Test if other remotes or your indoor wall push-button opens the gate to isolate if it is a single remote issue.',
        'Check the motor antenna wire is pointing straight up and not touching metal fencing.',
        'If the motor does not respond to any remotes, power cycle the motor switch off for 30 seconds and back on.'
      ]
    },
    {
      id: 'beeping-motor',
      title: 'Motor Beeping / Warning Codes',
      icon: AlertTriangle,
      summary: 'Backup battery low voltage warning or control board alert.',
      steps: [
        'Centurion and Nice motors beep to indicate mains power has failed and the unit is running on backup battery.',
        'Verify your home safety switch (RCD) has not tripped the dedicated gate power circuit.',
        'If the motor clicks but the arm does not move, check for mechanical binding or ice/debris around the rack.',
        'If beeping persists, your internal AGM backup battery may be due for replacement (recommended every 3 years).'
      ]
    }
  ];

  const currentIssueData = ISSUES.find(i => i.id === selectedIssue) || ISSUES[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-light" 
        style={{ maxWidth: '850px', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-light" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wrench size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
              Gate Troubleshooting & Emergency Guide
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Official DIY diagnostics & emergency service support for Queensland gate owners.
            </p>
          </div>
        </div>

        {/* Diagnostic Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '1.75rem' }}>
          {ISSUES.map((issue) => {
            const Icon = issue.icon;
            const isSelected = selectedIssue === issue.id;
            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: isSelected ? '#eff6ff' : '#f8fafc',
                  border: isSelected ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                  color: isSelected ? '#1d4ed8' : '#334155',
                  textAlign: 'left',
                  fontSize: '0.8125rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span>{issue.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Issue Guide */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.35rem', fontWeight: '800' }}>
            {currentIssueData.title}
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {currentIssueData.summary}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentIssueData.steps.map((step, sIdx) => (
              <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {sIdx + 1}
                </div>
                <span style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Dispatch Request / Phone Box */}
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '14px',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#9f1239', fontWeight: '800', marginBottom: '0.25rem' }}>
              Still Having Trouble or Need An Emergency Technician?
            </h4>
            <p style={{ color: '#475569', fontSize: '0.875rem' }}>
              We provide prompt gate motor repair and servicing across South East Queensland.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={COMPANY_INFO.tel} className="btn btn-gold btn-sm">
              <PhoneCall size={16} /> Call (07) 3102 1801
            </a>
            <button 
              onClick={() => { onClose(); onOpenContact && onOpenContact(); }}
              className="btn btn-outline-dark btn-sm"
            >
              Book Service Technician
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
