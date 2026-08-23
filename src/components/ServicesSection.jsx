import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sun, 
  Sliders, 
  Wrench, 
  Building2, 
  Layers,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SERVICES } from '../data/siteData';

export default function ServicesSection({ onOpenQuote, onOpenContact, onConfigureGate, activeCategory, selectedServiceId, onSelectService }) {
  const [activeTab, setActiveTab] = useState(selectedServiceId || activeCategory || 'sliding-gates');
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (selectedServiceId) {
      setActiveTab(selectedServiceId);
    }
  }, [selectedServiceId]);

  const currentService = (SERVICES && SERVICES.find((s) => s.id === activeTab)) || (SERVICES && SERVICES[0]) || { highlights: [], features: [], gallery: [] };
  const serviceGallery = currentService.gallery && currentService.gallery.length > 0 
    ? currentService.gallery 
    : [currentService.heroImage || currentService.image || '/images/Sliding-Gates.jpg'];

  const mainImage = selectedImage || serviceGallery[0] || currentService.heroImage || '/images/Sliding-Gates.jpg';

  // Reset selected image when tab changes
  useEffect(() => {
    setSelectedImage(serviceGallery[0]);
  }, [activeTab]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % serviceGallery.length);
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + serviceGallery.length) % serviceGallery.length);
  };

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--bg-body)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-blue">
            <Layers size={14} />
            Our Manufacturing Range
          </span>
          <h2 className="section-title">
            Custom Gate Systems & Architectural Fencing <br />
            <span className="gradient-text-gold">Engineered In South East Queensland</span>
          </h2>
          <p className="section-subtitle">
            Explore our specialized range of residential and commercial automatic gate solutions, designed for smooth operation, high security, and extreme weather endurance.
          </p>
        </div>

        {/* Category Navigation Pills - Touch Horizontal Scrolling */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          overflowX: 'auto',
          paddingBottom: '0.65rem',
          marginBottom: '2rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
        className="step-scroll-container"
        >
          {SERVICES.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveTab(s.id);
                  if (onSelectService) onSelectService(s.id);
                }}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.86rem',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--accent-gold)' : 'var(--bg-card-subtle)',
                  color: isActive ? '#090e1a' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="card-themed animate-fadeIn" style={{ padding: 'clamp(1.25rem, 3.5vw, 2.25rem)', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
          className="service-detail-grid"
          >
            {/* Left: Content & Bullet Points */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)', border: '1px solid var(--badge-blue-border)', fontWeight: '700', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                <ShieldCheck size={13} /> Factory Direct Fabrication
              </div>

              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                {currentService.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {currentService.shortDesc}
              </p>

              {/* Highlights Checklist - 3 Crisp Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                {currentService.highlights.slice(0, 3).map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: '500' }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={() => onConfigureGate && onConfigureGate(currentService.id)}
                  className="btn btn-gold btn-md"
                  style={{ flex: '1 1 auto', fontWeight: '800' }}
                >
                  <Sliders size={16} />
                  Configure Style in 3D
                </button>
                <button
                  onClick={onOpenContact}
                  className="btn btn-outline-dark btn-md"
                  style={{ flex: '1 1 auto' }}
                >
                  Book Site Measure
                </button>
              </div>
            </div>

            {/* Right: Interactive High-Res Imagery Showcase & Thumbnails Strip */}
            <div>
              {/* Main Feature Image with Zoom Trigger */}
              <div 
                onClick={() => handleOpenLightbox(serviceGallery.indexOf(mainImage) >= 0 ? serviceGallery.indexOf(mainImage) : 0)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1.5px solid var(--border-light)',
                  cursor: 'pointer',
                  marginBottom: '0.85rem',
                  background: '#090e1a'
                }}
                className="group"
              >
                <img
                  src={mainImage}
                  alt={currentService.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/Sliding-Gates.jpg';
                  }}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                />
                
                {/* Top-Right Zoom Indicator Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(9, 14, 26, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <ZoomIn size={13} style={{ color: 'var(--accent-gold)' }} />
                  <span>Click to Expand</span>
                </div>

                {/* Bottom Overlay Bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(9,14,26,0.92) 0%, transparent 100%)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>
                  <span>Yamanto Workshop Direct</span>
                  <span style={{ color: 'var(--accent-gold)' }}>100% Australian Made</span>
                </div>
              </div>

              {/* Small Thumbnails Strip - Clickable Image Selector */}
              {serviceGallery.length > 1 && (
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                    Select Photo to Preview ({serviceGallery.length} Workshop Builds):
                  </span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${serviceGallery.length}, 1fr)`,
                    gap: '0.5rem'
                  }}>
                    {serviceGallery.map((imgUrl, idx) => {
                      const isSelected = mainImage === imgUrl;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImage(imgUrl)}
                          aria-label={`View photo ${idx + 1} for ${currentService.title}`}
                          style={{
                            padding: 0,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: isSelected ? '2.5px solid var(--accent-gold)' : '1.5px solid var(--border-light)',
                            boxShadow: isSelected ? '0 0 12px var(--accent-gold-glow)' : 'var(--shadow-xs)',
                            cursor: 'pointer',
                            background: 'var(--bg-card-subtle)',
                            height: '62px',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            transform: isSelected ? 'scale(1.03)' : 'scale(1)'
                          }}
                        >
                          <img
                            src={imgUrl}
                            alt={`${currentService.title} thumbnail ${idx + 1}`}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/images/Sliding-Gates.jpg';
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Ultra-High Res Inspection */}
      {lightboxOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setLightboxOpen(false)}
          style={{ zIndex: 1000 }}
        >
          <div 
            className="modal-content-themed" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '880px', padding: 0, overflow: 'hidden' }}
          >
            {/* Close Button */}
            <button 
              className="modal-close-light" 
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {/* Lightbox Image Container */}
            <div style={{ position: 'relative', background: '#04070e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={serviceGallery[lightboxIndex]}
                alt={`${currentService.title} build ${lightboxIndex + 1}`}
                style={{
                  width: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />

              {/* Prev / Next Controls */}
              {serviceGallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevLightbox}
                    aria-label="Previous build image"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(9, 14, 26, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={handleNextLightbox}
                    aria-label="Next build image"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(9, 14, 26, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer Bar */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-card)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                  {currentService.title} — Build {lightboxIndex + 1} of {serviceGallery.length}
                </h4>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Custom fabricated in Yamanto with marine-grade architectural aluminium.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={() => {
                    setLightboxOpen(false);
                    if (onConfigureGate) onConfigureGate(currentService.id);
                  }}
                  className="btn btn-gold btn-sm"
                  style={{ fontWeight: '800' }}
                >
                  <Sliders size={15} /> Configure Style in 3D
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
