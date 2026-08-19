import React, { useState } from 'react';
import { 
  X, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  HelpCircle, 
  ChevronRight, 
  Battery, 
  Radio, 
  Key, 
  Sun, 
  Layers 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

const ISSUES = [
  {
    id: 'remote-not-working',
    title: 'Remotes Not Opening Gate',
    icon: Radio,
    summary: 'The motor does not respond when pressing the handheld remote buttons.',
    steps: [
      'Check if the remote LED lights up bright red/blue when pressed. If dim or unlit, replace the CR2032 lithium battery.',
      'Check the safety infrared photo-eye sensors at the base of both gate posts. Ensure no cobwebs, leaves, or dirt block the beam lenses.',
      'Ensure the main 240V power switch or isolation breaker at your switchboard is switched ON.',
      'If using multiple remotes and none work, the receiver antenna may be loose or water damaged.'
    ],
    urgency: 'Common / DIY Fixable'
  },
  {
    id: 'gate-stops-halfway',
    title: 'Gate Reverses or Stops Midway',
    icon: AlertTriangle,
    summary: 'The gate begins to travel and then suddenly stops or reverses backward.',
    steps: [
      'For sliding gates: Inspect the ground track for gravel, stones, mulch, or dirt build-up in the wheel groove.',
      'For swing gates: Check if wind resistance is activating the motor safety force limit threshold.',
      'Inspect the physical mechanical stops or limit switch brackets on the rack to see if they shifted.',
      'Check if the manual release clutch key is tightened 100% securely.'
    ],
    urgency: 'High / Obstruction Safety Trigger'
  },
  {
    id: 'manual-release',
    title: 'Power Outage: How to Open Manually',
    icon: Key,
    summary: 'How to disengage the motor and push your gate open by hand during a blackout.',
    steps: [
      'Locate your metallic or triangular manual release key provided in your handover pack.',
      'Insert the key into the lock cylinder on the side of the Nice or Centurion motor housing.',
      'Turn the key clockwise and pull the release lever outward 90 degrees.',
      'You can now slide or swing the gate smoothly by hand to allow vehicles in or out.',
      'When power returns, push the lever back in and lock with the key to re-engage automatic driving.'
    ],
    urgency: 'Emergency Manual Access'
  },
  {
    id: 'solar-low-battery',
    title: 'Solar Gate Beeping / Slow',
    icon: Sun,
    summary: 'Solar powered system operates sluggishly or beeps intermittently after rainy days.',
    steps: [
      'Prolonged overcast weather may have depleted the 12V / 24V deep-cycle battery bank.',
      'Check that the solar panel glass surface is free from tree sap, bird droppings, or heavy dust.',
      'Ensure overhanging tree branches haven’t grown to shade the solar panel during peak midday sun hours.',
      'Contact our service department if batteries are over 3–4 years old and require replacement.'
    ],
    urgency: 'Battery Maintenance'
  },
  {
    id: 'motor-humming-no-movement',
    title: 'Motor Hums but Gate Doesn’t Move',
    icon: Wrench,
    summary: 'The motor makes an electrical humming noise but the gate mechanism is locked.',
    steps: [
      'Switch off power at the isolator immediately to avoid overheating the motor winding.',
      'Check for seized internal bearings or a jammed pinion gear on the sliding rack.',
      'Check if the manual release clutch is stuck halfway between engaged and disengaged.',
      'Call our Yamanto service team for a qualified technician inspection.'
    ],
    urgency: 'Urgent Service Required'
  }
];

export default function TroubleshooterModal({ isOpen, onClose }) {
  const [selectedIssue, setSelectedIssue] = useState('remote-not-working');

  if (!isOpen) return null;

  const currentIssueData = ISSUES.find(i => i.id === selectedIssue) || ISSUES[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-themed"
        style={{ maxWidth: '800px', padding: 'clamp(1.25rem, 3.5vw, 2rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-light" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--badge-gold-bg)', color: 'var(--badge-gold-text)', border: '1px solid var(--badge-gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wrench size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: '800', color: 'var(--text-heading)' }}>
              Gate Troubleshooting & Emergency Guide
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              Official DIY diagnostics & emergency service support for Queensland gate owners.
            </p>
          </div>
        </div>

        {/* Diagnostic Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {ISSUES.map((issue) => {
            const Icon = issue.icon;
            const isSelected = selectedIssue === issue.id;
            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                style={{
                  padding: '0.65rem 0.8rem',
                  borderRadius: '10px',
                  background: isSelected ? 'var(--badge-gold-bg)' : 'var(--bg-card-subtle)',
                  border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)',
                  textAlign: 'left',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <Icon size={15} style={{ flexShrink: 0 }} />
                <span>{issue.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Issue Guide */}
        <div style={{ background: 'var(--bg-card-subtle)', borderRadius: '14px', padding: 'clamp(1rem, 3vw, 1.5rem)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: '0.25rem', fontWeight: '800' }}>
            {currentIssueData.title}
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1rem' }}>
            {currentIssueData.summary}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {currentIssueData.steps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--badge-gold-bg)', color: 'var(--badge-gold-text)', border: '1px solid var(--badge-gold-border)', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Need an on-site technician in Brisbane or Ipswich?
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', width: '100%', maxWidth: '380px' }}>
            <a href={COMPANY_INFO.tel} className="btn btn-blue btn-md" style={{ flex: '1 1 auto' }}>
              <Phone size={16} /> Call (07) 3102 1801
            </a>
            <button onClick={onClose} className="btn btn-outline-dark btn-md" style={{ flex: '1 1 auto' }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
