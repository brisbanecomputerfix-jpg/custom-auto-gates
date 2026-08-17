import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/siteData';
import { 
  Sparkles, 
  Eye, 
  X, 
  MapPin, 
  Check, 
  Calculator, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  Search,
  Paintbrush
} from 'lucide-react';

export default function ProjectGallery({ onOpenQuoteWithProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(24);
  const [searchTerm, setSearchTerm] = useState('');

  // Categories
  const CATEGORIES = [
    { id: 'all', label: 'All Projects (600+ Builds)' },
    { id: 'sliding', label: 'Sliding Gates' },
    { id: 'swing', label: 'Swing Gates' },
    { id: 'solar', label: 'Solar Powered' },
    { id: 'commercial', label: 'Commercial & Security' },
    { id: 'fencing', label: 'Aluminium Slat Fencing' }
  ];

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchTerm.trim() || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.finish && item.finish.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const openLightbox = (item, idx) => {
    setSelectedImage(item);
    setSelectedIndex(idx);
  };

  const nextImage = () => {
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(filteredItems[nextIdx]);
  };

  const prevImage = () => {
    const prevIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(prevIdx);
    setSelectedImage(filteredItems[prevIdx]);
  };

  return (
    <section id="gallery" className="section" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Sparkles size={14} />
            Verified QLD Installations
          </span>
          <h2 className="section-title">
            Our Custom Gate Gallery <br />
            <span className="gradient-text-gold">Crafted in Yamanto, Installed Across QLD</span>
          </h2>
          <p className="section-subtitle">
            Explore authentic completed installations across Brisbane Inner Suburbs, Ipswich, Logan & Gold Coast. Every gate is custom measured, fabricated, and powdercoated to order.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
          {/* Suburb / Style Search Filter */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Filter by suburb or style (e.g. Cleveland, Camp Hill, Karalee, Monument, DecoWood...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem 0.85rem 3rem',
                borderRadius: 'var(--radius-full)',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9375rem',
                color: '#0f172a',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.8125rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(24);
                }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  background: activeCategory === cat.id ? '#0f172a' : '#ffffff',
                  color: activeCategory === cat.id ? '#ffffff' : '#475569',
                  border: activeCategory === cat.id ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredItems.slice(0, visibleCount).map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(item, idx)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(15,23,42,0.05)',
                cursor: 'pointer',
                aspectRatio: '4/3',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="gallery-card"
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.07)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Overlay Card Details */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.2) 65%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0.95
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    <MapPin size={12} /> {item.location}
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.3, marginBottom: '0.25rem' }}>
                    {item.title}
                  </h4>
                  {item.finish && (
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Paintbrush size={11} style={{ color: '#93c5fd' }} /> {item.finish}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More & Fast Quote CTA */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>
            Showing {Math.min(visibleCount, filteredItems.length)} of {filteredItems.length} custom completed builds
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {visibleCount < filteredItems.length && (
              <button 
                onClick={() => setVisibleCount(prev => prev + 24)}
                className="btn btn-outline-dark"
              >
                Load More Projects ({filteredItems.length - visibleCount} remaining)
              </button>
            )}

            <button 
              onClick={() => onOpenQuoteWithProject && onOpenQuoteWithProject()}
              className="btn btn-gold btn-lg"
            >
              <Calculator size={18} />
              Get A Fast Quote On Any Gate Style
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Full Project Specs */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div 
            className="modal-content-light" 
            style={{ maxWidth: '960px', padding: '1.75rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close-light" onClick={() => setSelectedImage(null)}>
              <X size={20} />
            </button>

            {/* Main High-Res Image Container */}
            <div style={{
              position: 'relative',
              marginBottom: '1.5rem',
              borderRadius: '14px',
              overflow: 'hidden',
              maxHeight: '62vh',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                style={{ maxHeight: '58vh', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
              />

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.65)',
                  color: '#fff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.65)',
                  color: '#fff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Project Specs & Description */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="badge-tag badge-gold" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                    <MapPin size={12} /> {selectedImage.location}
                  </span>
                  <span className="badge-tag badge-green" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                    <ShieldCheck size={12} /> 10-Yr Structural Warranty
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: '800' }}>
                  {selectedImage.title}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {selectedImage.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8125rem', color: '#334155' }}>
                  {selectedImage.finish && <span>🎨 <strong>Finish:</strong> {selectedImage.finish}</span>}
                  {selectedImage.motor && <span>⚙️ <strong>Motor:</strong> {selectedImage.motor}</span>}
                </div>
              </div>

              {/* Action Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch' }}>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenQuoteWithProject && onOpenQuoteWithProject(selectedImage);
                  }}
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%' }}
                >
                  <Calculator size={18} />
                  Quote A Gate Like This
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                  ⚡ Free on-site laser measure across South East QLD
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
