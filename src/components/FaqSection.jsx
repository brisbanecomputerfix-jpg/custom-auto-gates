import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/siteData';
import { 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  Calculator, 
  MessageCircleQuestion 
} from 'lucide-react';

export default function FaqSection({ onOpenQuote, onOpenContact }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="section" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <HelpCircle size={14} />
            Got Questions? We Have Answers
          </span>
          <h2 className="section-title">
            Frequently Asked <br />
            <span className="gradient-text-gold">Automatic Gate Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about custom gate design, sloping driveways, solar power viability, and council approvals in Queensland.
          </p>
        </div>

        {/* Accordion Container */}
        <div style={{ maxWidth: '820px', margin: '0 auto 2.5rem auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  borderRadius: '14px',
                  border: isOpen ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.85rem, 2.5vw, 1.15rem) clamp(1rem, 3vw, 1.35rem)',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: isOpen ? 'var(--accent-gold)' : 'var(--text-heading)',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--accent-gold)' : 'var(--bg-card-subtle)',
                    color: isOpen ? '#090e1a' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 clamp(1rem, 3vw, 1.35rem) clamp(1rem, 3vw, 1.35rem) clamp(1rem, 3vw, 1.35rem)', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }} className="animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3.5vw, 2rem)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <MessageCircleQuestion size={32} style={{ color: 'var(--accent-gold)' }} />
          <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', color: 'var(--text-heading)', fontWeight: '800' }}>
            Have a question about your specific property or boundary?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '580px' }}>
            Our Brisbane gate engineers are available Monday to Friday 9am to 4pm to assist with layout advice, sloping driveway questions, and custom powdercoat matching.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={COMPANY_INFO.tel} className="btn btn-blue btn-md">
              <Phone size={17} /> Call Us: (07) 3102 1801
            </a>
            <button onClick={onOpenContact} className="btn btn-outline-dark btn-md">
              Send an Online Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
