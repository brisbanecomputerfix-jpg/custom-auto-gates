import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const SOLUTIONS = [
  {
    id: 'sliding-gates',
    title: 'Sliding Gates',
    image: '/images/Sliding-Gates.jpg',
    alt: 'Custom automatic aluminium sliding driveway gate fabricated in Brisbane',
    desc: "Smooth, space saving, and secure. Our custom sliding gates are ideal for driveways and tight spaces, built tough to withstand Brisbane's climate.",
    category: 'sliding-gates'
  },
  {
    id: 'swing-gates',
    title: 'Swing Gates',
    image: '/images/Swinging-Gates.jpg',
    alt: 'Grand architectural double swing automated entrance gates',
    desc: "Elegant and durable, our swing gates are custom-built to suit your property's entry and can be automated for seamless access.",
    category: 'swing-gates'
  },
  {
    id: 'commercial-gates',
    title: 'Commercial Gates',
    image: '/images/commercial-gates.jpg',
    alt: 'Heavy duty commercial and industrial security slide gate installation',
    desc: "Protect your premises with heavy-duty commercial gate solutions, tailored for high-traffic environments and enhanced security.",
    category: 'commercial-gates'
  },
  {
    id: 'pool-fencing',
    title: 'Pool Fencing',
    image: '/images/pool-fencing.png',
    alt: 'Aluminium pool safety fencing and compliance gates in Queensland',
    desc: "Engineered to meet Australian safety standard AS1926.1. Premium rust-proof aluminium pool fencing and self-closing safety gates.",
    category: 'fencing'
  },
  {
    id: 'solar-gates',
    title: 'Solar Gates',
    image: '/images/solar-gates.jpg',
    alt: 'Off-grid solar powered automated farm and acreage driveway gate',
    desc: "Go green with energy-efficient solar-powered gates—perfect for remote properties or eco-conscious households.",
    category: 'solar-gates'
  },
  {
    id: 'gate-motors-automation',
    title: 'Gate Motors & Automation',
    image: '/images/gate-motors.jpg',
    alt: 'Automatic gate motors and smart wireless automation systems',
    desc: "Reliable, whisper-quiet electric gate motors and intelligent access control for sliding and swing gates with smartphone control.",
    category: 'repairs'
  },
  {
    id: 'security-fencing',
    title: 'Security Fencing',
    image: '/images/security-fencing.jpg',
    alt: 'Robust commercial and residential perimeter security fencing panels',
    desc: "Keep your property protected with our sturdy, professionally-installed security fencing—built for both residential and commercial use.",
    category: 'fencing'
  },
  {
    id: 'aluminum-fencing',
    title: 'Aluminum Fencing',
    image: '/images/aluminum-fencing.jpg',
    alt: 'Modern architectural vertical white aluminium blade fencing and pedestrian gate',
    desc: "Lightweight, rust-resistant, and low-maintenance—our aluminium fencing offers modern style without sacrificing durability.",
    category: 'fencing'
  }
];

export default function CoreSolutionsSection({ onSelectService, onOpenQuote }) {
  const handleCardClick = (solution) => {
    if (solution.category === 'repairs' || solution.id === 'gate-motors-automation') {
      const elem = document.getElementById('motors');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (onSelectService) {
      onSelectService(solution.category);
    }
    
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenQuote) {
      onOpenQuote();
    }
  };

  return (
    <section id="custom-solutions" className="section" style={{ backgroundColor: 'var(--bg-card-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 3rem auto' }}>
          <span style={{ 
            display: 'inline-block',
            fontSize: '0.85rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            color: 'var(--accent-gold)', 
            marginBottom: '0.75rem' 
          }}>
            CUSTOM GATES AND FENCING SOLUTIONS
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.75rem)', 
            fontWeight: '900', 
            color: 'var(--text-heading)', 
            lineHeight: 1.2, 
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em'
          }}>
            Secure Gates And Fences For Your Home
          </h2>
          <p style={{ 
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', 
            color: 'var(--text-muted)', 
            lineHeight: 1.7,
            margin: 0
          }}>
            Our team designs, manufactures and installs gates and fences in Brisbane, Logan and Ipswich. We specialise in <strong style={{ color: 'var(--text-heading)' }}>Automatic Gate Installation</strong> and gate motors, we build traditional <strong style={{ color: 'var(--text-heading)' }}>Automatic Sliding Gate</strong> & fences, and we customise to meet even highly unique requirements. Choose Custom Auto Gates to add real <span style={{ textDecoration: 'underline', color: 'var(--text-heading)', fontWeight: '600' }}>value for money</span> value to your home.
          </p>
        </div>

        {/* 8-Card Grid (4 across on desktop, 2 on tablet, 1 on mobile) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}
        className="core-solutions-grid"
        >
          {SOLUTIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="card-themed group"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              {/* Card Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '185px',
                overflow: 'hidden',
                background: '#090e1a'
              }}>
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/Sliding-Gates.jpg';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.4rem 1.25rem 1.6rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'var(--text-heading)',
                  marginBottom: '0.65rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  margin: 0,
                  flex: 1
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleLearnMore}
            className="btn btn-gold btn-lg"
            style={{
              padding: '0.9rem 2.25rem',
              fontSize: '0.95rem',
              fontWeight: '800',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderRadius: '8px',
              boxShadow: '0 4px 15px var(--accent-gold-glow)'
            }}
          >
            LEARN MORE ABOUT OUR SERVICES
          </button>
        </div>
      </div>
    </section>
  );
}
