import React from 'react';
import { Star, CheckCircle2, MapPin, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';

export default function ReviewsSection({ onNavigateTestimonials }) {
  return (
    <section id="reviews" className="section" style={{ backgroundColor: 'var(--bg-body)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Star size={14} fill="var(--accent-gold)" />
            Verified Customer Experiences
          </span>
          <h2 className="section-title">
            What Queensland Property Owners <br />
            <span className="gradient-text-gold">Say About Custom Auto Gates</span>
          </h2>
          <p className="section-subtitle">
            Read authentic feedback from Brisbane, Ipswich, and Gold Coast homeowners who chose factory direct quality.
          </p>
        </div>

        {/* Overall Rating Banner */}
        <div style={{
          maxWidth: '520px',
          margin: '0 auto 2.5rem auto',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1rem, 3vw, 2rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--text-heading)', lineHeight: 1 }}>4.9</div>
            <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', margin: '4px 0', justifyContent: 'center' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Over 150+ 5-Star Reviews</div>
          </div>
          <div style={{ width: '1px', height: '45px', background: 'var(--border-light)' }} className="hidden-mobile" />
          <div style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.4, textAlign: 'center' }}>
            <strong style={{ color: 'var(--text-heading)' }}>100% Australian Made</strong><br />
            10-Year Factory Warranty Guarantee
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.25rem'
        }}>
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={idx}
              className="card-themed"
              style={{
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>

                {/* Quote Text */}
                <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'normal' }}>
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)' }}>{review.name}</h4>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={11} style={{ color: 'var(--accent-blue)' }} /> {review.suburb}
                  </div>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--badge-green-text)', background: 'var(--badge-green-bg)', border: '1px solid var(--badge-green-border)', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: '700' }}>
                  {review.gateType}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Testimonials & Case Studies CTA */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <button
            onClick={() => onNavigateTestimonials && onNavigateTestimonials()}
            className="btn btn-outline-dark btn-lg"
            style={{ borderRadius: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>Explore All 180+ Verified Case Studies & Reviews</span>
            <span style={{ color: 'var(--accent-gold)' }}>★</span>
          </button>
        </div>
      </div>
    </section>
  );
}
