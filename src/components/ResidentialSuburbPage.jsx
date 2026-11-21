import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  Clock,
  Star,
  FileText,
  Sliders
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { RESIDENTIAL_SUBURBS_DATA, RESIDENTIAL_SUBURBS_LIST } from '../data/residentialSuburbsData';

export default function ResidentialSuburbPage({
  suburbId = 'carindale',
  onOpenQuote,
  onOpenContact,
  onNavigateHome,
  onNavigateBrisbane
}) {
  const data = RESIDENTIAL_SUBURBS_DATA[suburbId] || RESIDENTIAL_SUBURBS_DATA['carindale'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [suburbId]);

  return (
    <div style={{ backgroundColor: 'var(--bg-body, #0b1120)', minHeight: '100vh', color: 'var(--text-main, #f8fafc)' }}>
      {/* 1. HERO SECTION (Minimalist, Mobile-First) */}
      <section style={{
        position: 'relative',
        padding: '3rem 1.5rem 2.5rem 1.5rem',
        background: 'linear-gradient(180deg, #0f172a 0%, #0b1120 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigateHome && onNavigateHome(); }}
              style={{ color: '#94a3b8', textDecoration: 'none' }}
            >
              Home
            </a>
            <ChevronRight size={13} />
            <a 
              href="/gates-brisbane" 
              onClick={(e) => { e.preventDefault(); onNavigateBrisbane && onNavigateBrisbane(); }}
              style={{ color: '#94a3b8', textDecoration: 'none' }}
            >
              Brisbane
            </a>
            <ChevronRight size={13} />
            <span style={{ color: '#fbbf24', fontWeight: '700' }}>{data.suburbName}</span>
          </nav>

          {/* Suburb Selector Strip for Quick Navigation across all 9 suburbs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', flexShrink: 0, marginRight: '0.25rem' }}>
              Suburbs:
            </span>
            {RESIDENTIAL_SUBURBS_LIST.map((key) => {
              const sub = RESIDENTIAL_SUBURBS_DATA[key];
              const isActive = key === suburbId;
              return (
                <a
                  key={key}
                  href={`/${sub.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = sub.slug;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    background: isActive ? '#fbbf24' : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#090e1a' : '#cbd5e1',
                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {sub.suburbName}
                </a>
              );
            })}
          </div>

          {/* Hero Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }} className="hero-grid-responsive">
            <div>
              <span className="badge-tag badge-gold" style={{
                marginBottom: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                background: 'rgba(251, 191, 36, 0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700'
              }}>
                <Sparkles size={14} />
                {data.badge}
              </span>

              <h1 style={{
                fontSize: 'clamp(2rem, 4.2vw, 3rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1rem',
                fontFamily: 'Outfit, sans-serif'
              }}>
                {data.h1}
              </h1>

              <p style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#cbd5e1',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}>
                {data.subtitle}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <button
                  onClick={() => onOpenQuote && onOpenQuote('residential-gate-fencing')}
                  className="btn btn-gold btn-lg"
                  style={{
                    padding: '0.9rem 1.8rem',
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    background: '#fbbf24',
                    color: '#090e1a',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Get a Free On-Site Quote <ArrowRight size={18} />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw || '0731021801'}`}
                  className="btn btn-outline btn-lg"
                  style={{
                    padding: '0.9rem 1.6rem',
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    color: '#fbbf24',
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Phone size={18} /> Call {COMPANY_INFO.phone || '(07) 3102 1801'}
                </a>
              </div>

              {/* Key Trust Badges */}
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', color: '#94a3b8' }}>
                  <ShieldCheck size={16} style={{ color: '#fbbf24' }} />
                  <span>10-Yr Structural Warranty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', color: '#94a3b8' }}>
                  <CheckCircle2 size={16} style={{ color: '#fbbf24' }} />
                  <span>QBCC Lic #{COMPANY_INFO.qbcc || '15579753'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', color: '#94a3b8' }}>
                  <Star size={16} style={{ color: '#fbbf24' }} />
                  <span>4.9★ Rated (180+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Featured Hero Visual */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
                background: '#111a2e'
              }}>
                <img
                  src={data.heroImage}
                  alt={data.h1}
                  width="600"
                  height="450"
                  loading="eager"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
                <div style={{ padding: '0.9rem 1.25rem', background: '#090e1a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '600' }}>
                    📍 Residential installation in {data.suburbName}, QLD {data.postcode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GATE STYLES NAVIGATION GRID */}
      <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: '800', marginBottom: '0.75rem' }}>
          Explore Gate &amp; Fencing Styles for {data.suburbName}:
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/driveway-gates', label: 'Driveway Gates', desc: 'Sliding & swing systems' },
            { href: '/automatic-sliding-gates', label: 'Sliding Gates', desc: 'Space-saving track systems' },
            { href: '/swing-gates', label: 'Swing Gates', desc: 'Single & double swing' },
            { href: '/fencing', label: 'Slat & Pool Fencing', desc: 'Aluminium privacy screens' },
            { href: '/solar-gates', label: 'Solar Acreage', desc: '100% off-grid battery backed' },
            { href: '/service', label: 'Repairs & Motors', desc: 'Fast motor servicing' }
          ].map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              style={{
                display: 'block',
                padding: '0.85rem 1rem',
                background: '#111a2e',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <strong style={{ display: 'block', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.2rem', color: '#fbbf24' }}>
                {cat.label}
              </strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8' }}>{cat.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 3. RECENT WORKSHOP INSTALLATIONS & GALLERY */}
      {data.galleryImages && data.galleryImages.length > 0 && (
        <section style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Recent Installations in &amp; around {data.suburbName}
            </h2>
            <a href="/testimonials" style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>
              View 180+ Local Customer Reviews &rarr;
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {data.galleryImages.map((img, i) => (
              <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', background: '#111a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width="600"
                  height="400"
                  loading="lazy"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '0.75rem 1rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. SUBURB OVERVIEW & POPULAR SOLUTIONS */}
      <section style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1.5rem' }}>
        <div style={{ background: '#111a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
            {data.overviewHeading}
          </h2>
          {data.overviewParagraphs.map((p, idx) => (
            <p key={idx} style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '1rem' }}>
              {p}
            </p>
          ))}

          {/* 4 Popular Solutions Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
            {data.popularSolutions.map((sol, sIdx) => (
              <div key={sIdx} style={{ background: '#090e1a', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fbbf24', marginTop: 0, marginBottom: '0.5rem' }}>
                  {sol.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
                  {sol.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOLD-OUT ACCORDION SECTIONS (Specs, Pricing, Council Rules, Streets, FAQs) */}
      <section className="seo-accordions-section" style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>
          {data.suburbName} Council Rules, Engineering Specs &amp; FAQs
        </h2>

        {/* 5a. Council Regulations Accordion */}
        <details className="seo-accordion" open style={{ background: '#111a2e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', marginBottom: '0.75rem', overflow: 'hidden' }}>
          <summary style={{ padding: '1.1rem 1.4rem', fontWeight: '800', fontSize: '1.05rem', color: '#ffffff', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>🏛️ {data.council} Fencing &amp; Gate Regulations</span>
          </summary>
          <div style={{ padding: '1.25rem 1.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <p style={{ margin: 0 }}>{data.councilRules}</p>
          </div>
        </details>

        {/* 5b. Local Streets & Enclaves Serviced */}
        {data.localStreets && data.localStreets.length > 0 && (
          <details className="seo-accordion" style={{ background: '#111a2e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', marginBottom: '0.75rem', overflow: 'hidden' }}>
            <summary style={{ padding: '1.1rem 1.4rem', fontWeight: '800', fontSize: '1.05rem', color: '#ffffff', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>📍 Local Streets &amp; Enclaves Serviced in {data.suburbName}</span>
            </summary>
            <div style={{ padding: '1.25rem 1.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.7' }}>
              <p style={{ marginTop: 0, marginBottom: '0.75rem', color: '#94a3b8' }}>
                Our mobile installation and measure vans regularly service residential properties across {data.suburbName}, including:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {data.localStreets.map((street, idx) => (
                  <span key={idx} style={{ display: 'inline-block', padding: '0.35rem 0.75rem', background: '#090e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                    {street}
                  </span>
                ))}
              </div>
            </div>
          </details>
        )}

        {/* 5c. Material Specifications Accordion */}
        <details className="seo-accordion" style={{ background: '#111a2e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', marginBottom: '0.75rem', overflow: 'hidden' }}>
          <summary style={{ padding: '1.1rem 1.4rem', fontWeight: '800', fontSize: '1.05rem', color: '#ffffff', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>⚙️ Residential Engineering Specifications &amp; Powdercoating</span>
          </summary>
          <div style={{ padding: '1.25rem 1.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#090e1a', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#fbbf24', fontWeight: '700', marginBottom: '0.25rem' }}>Aluminium Alloy</span>
                <span style={{ fontWeight: '600', color: '#ffffff' }}>Marine-Grade 6060-T6 Architectural Structural Alloy (Rust-Proof)</span>
              </div>
              <div style={{ background: '#090e1a', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#fbbf24', fontWeight: '700', marginBottom: '0.25rem' }}>Slat Dimensions</span>
                <span style={{ fontWeight: '600', color: '#ffffff' }}>65mm x 16mm or 90mm x 16mm with 10mm–20mm compliant spacing</span>
              </div>
              <div style={{ background: '#090e1a', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#fbbf24', fontWeight: '700', marginBottom: '0.25rem' }}>Automation Motors</span>
                <span style={{ fontWeight: '600', color: '#ffffff' }}>Centurion D5 Smart, Nice Robus, Italian linear actuators with dual battery backup</span>
              </div>
              <div style={{ background: '#090e1a', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#fbbf24', fontWeight: '700', marginBottom: '0.25rem' }}>Finishes</span>
                <span style={{ fontWeight: '600', color: '#ffffff' }}>Dulux Architectural Powdercoat (Monument, Surfmist, Black) &amp; DecoWood</span>
              </div>
            </div>
          </div>
        </details>

        {/* 5d. Suburb FAQs Accordion */}
        {data.faqs && data.faqs.length > 0 && (
          <details className="seo-accordion" open style={{ background: '#111a2e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', marginBottom: '0.75rem', overflow: 'hidden' }}>
            <summary style={{ padding: '1.1rem 1.4rem', fontWeight: '800', fontSize: '1.05rem', color: '#ffffff', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>❓ Frequently Asked Questions for {data.suburbName} Residents</span>
            </summary>
            <div style={{ padding: '1.25rem 1.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.7' }}>
              {data.faqs.map((f, fIdx) => (
                <div key={fIdx} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: fIdx < data.faqs.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fbbf24', margin: '0 0 0.4rem 0' }}>
                    {f.q}
                  </h3>
                  <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.6' }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </details>
        )}
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '3rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '900', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
            Ready to Secure Your {data.suburbName} Home?
          </h2>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '1.75rem', lineHeight: '1.6' }}>
            Book a 100% free on-site measure and design consultation with our experienced gate specialists. We manufacture in our Yamanto workshop and install across {data.suburbName} with a 10-Year Structural Guarantee.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenQuote && onOpenQuote('residential-gate-fencing')}
              className="btn btn-gold btn-lg"
              style={{
                padding: '0.9rem 2rem',
                fontSize: '1.05rem',
                fontWeight: '800',
                background: '#fbbf24',
                color: '#090e1a',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Get My Free Measure &amp; Quote
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw || '0731021801'}`}
              className="btn btn-outline btn-lg"
              style={{
                padding: '0.9rem 1.8rem',
                fontSize: '1.05rem',
                fontWeight: '800',
                color: '#fbbf24',
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                borderRadius: '10px',
                textDecoration: 'none'
              }}
            >
              <Phone size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              (07) 3102 1801
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
