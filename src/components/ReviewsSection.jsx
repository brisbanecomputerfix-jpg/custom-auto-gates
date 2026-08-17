import React from 'react';
import { TESTIMONIALS } from '../data/siteData';
import { 
  Star, 
  CheckCircle2, 
  Quote, 
  MapPin,
  Award
} from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section className="section" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Award size={14} />
            Verified Customer Reviews
          </span>
          <h2 className="section-title" style={{ color: '#0f172a' }}>
            Trusted by Thousands of <br />
            <span className="gradient-text-gold">Homeowners & Builders Across QLD</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it. Read what our clients have to say about our factory direct gates, installation quality, and ongoing support.
          </p>
        </div>

        {/* Overall Rating Banner */}
        <div style={{
          maxWidth: '520px',
          margin: '0 auto 3rem auto',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1 }}>4.9</div>
            <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', margin: '4px 0' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" />
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Over 150+ 5-Star Reviews</div>
          </div>
          <div style={{ width: '1px', height: '50px', background: '#e2e8f0' }} />
          <div style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.4 }}>
            <strong>100% Australian Made</strong><br />
            10-Year Factory Warranty Guarantee
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}>
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={idx}
              className="card-light"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                position: 'relative'
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>
                    <CheckCircle2 size={13} /> Verified Installation
                  </span>
                </div>

                {/* Quote Text */}
                <p style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'normal' }}>
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                  {review.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8125rem', marginBottom: '0.2rem' }}>
                  <MapPin size={12} /> {review.suburb}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold-hover)', fontWeight: '600' }}>
                  Installed: {review.gateType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
