import React, { useState } from 'react';
import { 
  Factory, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Sparkles, 
  Target, 
  Compass, 
  Award, 
  Check, 
  Phone, 
  Calculator, 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function AboutUs({ onNavigateHome, onOpenQuote, onOpenContact }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--bg-body)' }}>
      {/* 1. HERO SECTION WITH VIMEO BACKGROUND VIDEO */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 5.5rem)',
        backgroundColor: 'var(--bg-body)'
      }}>
        {/* Background Video Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {/* Fallback Static Poster Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/Swinging-Gates.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: videoLoaded ? 0.08 : 0.4,
            transition: 'opacity 1s ease'
          }} />

          {/* Vimeo Background Video */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            minWidth: '177.78vh',
            minHeight: '56.25vw',
            transform: 'translate(-50%, -50%)',
            opacity: 0.76,
            filter: 'brightness(1.02) contrast(1.05)'
          }}>
            <iframe
              src="https://player.vimeo.com/video/1218815565?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1&badge=0&autopause=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
              title="gate-automated-brisbane-QLD"
              onLoad={() => setVideoLoaded(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Dynamic Gradient Overlays */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--hero-overlay-1) 0%, var(--hero-overlay-2) 50%, var(--hero-overlay-3) 100%)'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--hero-overlay-1) 0%, transparent 60%)'
          }} />
        </div>

        {/* Hero Content */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '840px' }}>
            {/* Breadcrumb Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={onNavigateHome}
                style={{ color: 'var(--accent-gold)', fontWeight: '700', cursor: 'pointer' }}
              >
                Home
              </button>
              <ChevronRight size={13} />
              <span style={{ color: 'var(--text-heading)' }}>About Our Workshop & Team</span>
            </div>

            {/* Badge Tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge-tag badge-gold" style={{ margin: 0, fontSize: '0.76rem' }}>
                <Factory size={13} /> 100% Australian Made In Yamanto
              </span>
              <span className="badge-tag badge-green" style={{ margin: 0, fontSize: '0.76rem' }}>
                <ShieldCheck size={13} /> 10-Yr Warranty
              </span>
              <span className="badge-tag badge-blue" style={{ margin: 0, fontSize: '0.76rem' }}>
                <HeartHandshake size={13} /> Community Champions
              </span>
            </div>

            {/* H1 SEO Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.3rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              color: 'var(--text-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '1rem'
            }}>
              Crafting Excellence, <br />
              <span className="gradient-text-gold">Building Trust Across Queensland</span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.96rem, 2vw, 1.125rem)',
              color: 'var(--text-main)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '680px'
            }}>
              At Custom Auto Gates & Fencing, we are dedicated to leading the automated gate industry through uncompromising quality, genuine Australian craftsmanship, and complete transparency. Buy factory direct from our Yamanto workshop and experience the difference of working with the actual builders.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={onOpenQuote} className="btn btn-gold btn-lg btn-pulse" style={{ flex: '1 1 auto' }}>
                <Calculator size={18} />
                Get Factory Quote
              </button>
              <button 
                onClick={onOpenContact} 
                className="btn btn-outline-dark btn-lg" 
                style={{ flex: '1 1 auto' }}
              >
                <Calendar size={17} />
                Book Free Measure
              </button>
              <a 
                href={COMPANY_INFO.tel} 
                className="btn-outline-dark"
                style={{
                  color: 'var(--text-heading)',
                  fontWeight: '800',
                  fontSize: '0.98rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  flex: '1 1 auto',
                  justifyContent: 'center'
                }}
              >
                <Phone size={17} style={{ color: 'var(--accent-gold)' }} /> {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PURPOSE, VISION & MISSION */}
      <section className="section" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-blue">
              <Compass size={14} />
              Our Purpose & Driving Force
            </span>
            <h2 className="section-title">
              What Drives Us Every Single Day
            </h2>
            <p className="section-subtitle">
              Our commitment goes beyond gates and fencing; we're proud to be industry leaders, local community champions, and advocates for fairness and opportunity.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            {/* Vision Card */}
            <div className="card-themed" style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-light)',
              borderRadius: '18px',
              padding: 'clamp(1.25rem, 3.5vw, 2rem)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--badge-gold-bg)',
                color: 'var(--badge-gold-text)',
                border: '1px solid var(--badge-gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                boxShadow: '0 4px 12px var(--accent-gold-glow)'
              }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Our Vision
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                To be the most trusted and respected name in automated gate solutions across Queensland — an iconic local manufacturer recognized for engineering excellence, fairness, and meaningful contributions to our community.
              </p>
            </div>

            {/* Mission Card */}
            <div className="card-themed" style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-light)',
              borderRadius: '18px',
              padding: 'clamp(1.25rem, 3.5vw, 2rem)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--badge-blue-bg)',
                color: 'var(--badge-blue-text)',
                border: '1px solid var(--badge-blue-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                boxShadow: '0 4px 12px var(--accent-blue-glow)'
              }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Our Mission
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We deliver industry-leading quality and reliability in automated gate solutions while supporting our local community, empowering our team of skilled craftsmen, and operating with complete honesty and integrity in every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR FOUR CORE PILLARS OF TRUST */}
      <section className="section" style={{ backgroundColor: 'var(--bg-body)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-gold">
              <ShieldCheck size={14} />
              The Standards We Live By
            </span>
            <h2 className="section-title">
              Our 4 Core Values <br />
              <span className="gradient-text-gold">Why Queensland Homeowners Trust Us</span>
            </h2>
            <p className="section-subtitle">
              Every single gate project we undertake in our Yamanto workshop is guided by four unwavering principles.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1.25rem'
          }}>
            {/* Value 1: Reliability */}
            <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'var(--bg-card)' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--badge-green-bg)',
                color: 'var(--badge-green-text)',
                border: '1px solid var(--badge-green-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Clock size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                1. Reliability
              </h3>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '0.55rem' }}>
                Delivered on time, every time
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                We respect your time. When we schedule a laser measurement or an installation date, we show up on time and deliver your completed project within our promised 2–4 week turnaround.
              </p>
            </div>

            {/* Value 2: Quality */}
            <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'var(--bg-card)' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--badge-gold-bg)',
                color: 'var(--badge-gold-text)',
                border: '1px solid var(--badge-gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                2. Quality
              </h3>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '0.55rem' }}>
                Craftsmanship you can see & feel
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                Built using structural marine-grade Australian aluminium, reinforced box frames, commercial architectural powdercoating, and premium smart automation systems.
              </p>
            </div>

            {/* Value 3: Honesty */}
            <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'var(--bg-card)' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--badge-blue-bg)',
                color: 'var(--badge-blue-text)',
                border: '1px solid var(--badge-blue-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                3. Honesty
              </h3>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '0.55rem' }}>
                Transparent communication & fair pricing
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                Zero middleman markups, zero hidden fees, and straightforward advice. If your driveway has a challenging slope or wind load, we engineer the correct solution from day one.
              </p>
            </div>

            {/* Value 4: Cleanliness */}
            <div className="card-themed" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'var(--bg-card)' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--badge-gold-bg)',
                color: 'var(--badge-gold-text)',
                border: '1px solid var(--badge-gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                4. Cleanliness
              </h3>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '0.55rem' }}>
                Professional standards from start to finish
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                We treat your property with utmost respect. Our installation teams leave your driveway, landscaping, and boundary spotless after testing every remote and safety sensor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE YAMANTO WORKSHOP & IN-HOUSE FACILITY */}
      <section className="section" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'center' }} className="hero-grid">
            <div>
              <span className="badge-tag badge-gold">
                <Factory size={14} /> Shed 2, 43-45 Belar St, Yamanto
              </span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Our Yamanto Workshop: <br />
                <span className="gradient-text-gold">Where Quality Takes Shape</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Unlike resellers who drop-ship mass-manufactured gates or subcontract their welding to third parties, <strong>Custom Auto Gates & Fencing</strong> operates a fully equipped fabrication and powdercoating workshop right here in Yamanto, Queensland.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--badge-green-bg)', color: 'var(--badge-green-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <strong style={{ color: 'var(--text-heading)' }}>Precision Laser CAD Cutting & Raking:</strong> Custom raking for sloping driveways engineered to the exact millimeter so there are no unsightly bottom gaps.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--badge-green-bg)', color: 'var(--badge-green-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <strong style={{ color: 'var(--text-heading)' }}>Blondies Commercial Powdercoating:</strong> In-house pretreatment and architectural powdercoat curing tested for extreme Queensland UV resistance and coastal salt air.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--badge-green-bg)', color: 'var(--badge-green-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <strong style={{ color: 'var(--text-heading)' }}>Motor Bench Testing:</strong> Every automation motor and control board is pre-wired, tested, and paired with remotes prior to on-site installation.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={onOpenContact} className="btn btn-blue" style={{ flex: '1 1 auto' }}>
                  <Calendar size={17} /> Free Consultation
                </button>
                <button onClick={onOpenQuote} className="btn btn-outline-dark" style={{ flex: '1 1 auto' }}>
                  <Calculator size={17} /> Custom Configurator
                </button>
              </div>
            </div>

            {/* Workshop Visual Showcase Card */}
            <div className="card-themed" style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-light)',
              borderRadius: '20px',
              padding: 'clamp(1.25rem, 3.5vw, 1.75rem)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-light)'
              }}>
                <img
                  src="/images/Swinging-Gates.jpg"
                  alt="Custom Auto Gates Yamanto Workshop"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(9,14,26,0.92) 0%, transparent 100%)',
                  padding: '0.85rem',
                  color: '#ffffff'
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: '800' }}>
                    📍 Yamanto Workshop & Showroom
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>
                    Shed 2, 43-45 Belar Street, Yamanto QLD
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-card-subtle)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--accent-gold)' }}>10-Yr</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>Structural Warranty</div>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--accent-blue)' }}>2–4 Wks</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>Fast Turnaround</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EARNING TRUST & CONFIDENCE */}
      <section className="section" style={{ backgroundColor: 'var(--bg-body)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-tag badge-blue">
              <MapPin size={14} />
              Serving Queensland Communities
            </span>
            <h2 className="section-title">
              Local Expertise & Community Commitment
            </h2>
            <p className="section-subtitle">
              We proudly service homeowners, builders, and commercial enterprises across all of South East Queensland.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            <div className="card-themed" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                Brisbane Inner & Greater Metro
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                New Farm, Paddington, Ascot, Bulimba, Hawthorne, Indooroopilly, Toowong, Camp Hill, Carindale, and Chermside.
              </p>
            </div>

            <div className="card-themed" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                Ipswich & Greater Springfield
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                Yamanto, Brookwater, Springfield Lakes, Augustine Heights, Ripley, Brassall, Karalee, and Kenmore.
              </p>
            </div>

            <div className="card-themed" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                Logan, Redlands & Gold Coast
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                Underwood, Rochedale, Springwood, Cleveland, Redland Bay, Hope Island, Sanctuary Cove, and Robina.
              </p>
            </div>
          </div>

          {/* Direct CTA Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #090e1a 0%, #162238 100%)',
            border: '1.5px solid var(--border-light)',
            borderRadius: '18px',
            padding: 'clamp(1.75rem, 4vw, 2.75rem) clamp(1rem, 3vw, 2rem)',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h3 style={{ fontSize: 'clamp(1.45rem, 3vw, 2.15rem)', fontWeight: '900', color: '#ffffff', marginBottom: '0.5rem' }}>
              Ready to Work with Queensland's Trusted Gate Builders?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.96rem', maxWidth: '640px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              Contact our Yamanto workshop team today for honest expert advice, driveway slope analysis, and a free on-site laser measure.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={onOpenQuote} className="btn btn-gold btn-lg">
                <Calculator size={18} />
                Calculate Instant Gate Price
              </button>
              <a href={COMPANY_INFO.tel} className="btn btn-blue btn-lg">
                <Phone size={18} /> Call (07) 3102 1801
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
