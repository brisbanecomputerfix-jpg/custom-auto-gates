import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calculator, 
  Ruler, 
  Phone, 
  Eye 
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/siteData';

const CATEGORIES = [
  { id: 'all', label: `All Projects (${GALLERY_ITEMS.length})` },
  { id: 'sliding', label: 'Sliding Gates' },
  { id: 'swing', label: 'Swing Gates' },
  { id: 'solar', label: 'Solar Gates' },
  { id: 'commercial', label: 'Commercial & Security' },
  { id: 'fencing', label: 'Architectural Fencing' }
];

export default function ProjectGallery({ onOpenQuoteWithProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item?.category === activeCategory || (activeCategory === 'fencing' && (item?.category === 'fencing' || item?.category === 'slat-fencing'));
      const query = (searchTerm || '').toLowerCase().trim();
      const titleMatch = (item?.title || '').toLowerCase().includes(query);
      const locMatch = (item?.location || item?.suburb || '').toLowerCase().includes(query);
      const descMatch = (item?.description || '').toLowerCase().includes(query);
      return matchesCategory && (!query || titleMatch || locMatch || descMatch);
    });
  }, [activeCategory, searchTerm]);

  const openLightbox = (item, idx) => {
    setSelectedImage(item);
    setCurrentImageIndex(idx);
  };

  const nextImage = () => {
    const nextIdx = (currentImageIndex + 1) % filteredItems.length;
    setCurrentImageIndex(nextIdx);
    setSelectedImage(filteredItems[nextIdx]);
  };

  const prevImage = () => {
    const prevIdx = (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentImageIndex(prevIdx);
    setSelectedImage(filteredItems[prevIdx]);
  };

  return (
    <section id="gallery" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-gold">
            <Sparkles size={14} />
            Genuine Queensland Installations
          </span>
          <h2 className="section-title">
            Explore Our Project Gallery <br />
            <span className="gradient-text-gold">Over 600+ Custom Gates Built</span>
          </h2>
          <p className="section-subtitle">
            Every gate shown below was custom measured, fabricated in Yamanto, and installed by our dedicated team across Brisbane, Ipswich, and South East Queensland.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div style={{ marginBottom: '2.5rem' }}>
          {/* Search Bar */}
          <div style={{
            maxWidth: '520px',
            margin: '0 auto 1.5rem auto',
            position: 'relative'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by suburb (e.g. Paddington, Yamanto, New Farm)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem 0.8rem 2.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--input-bg)',
                border: '1.5px solid var(--input-border)',
                fontSize: '0.9rem',
                color: 'var(--input-text)',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.45rem',
            flexWrap: 'wrap'
          }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setVisibleCount(24);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.82rem',
                    background: isActive ? 'var(--accent-gold)' : 'var(--bg-card)',
                    color: isActive ? '#090e1a' : 'var(--text-muted)',
                    border: isActive ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-light)',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {filteredItems.slice(0, visibleCount).map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(item, idx)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
              }}
              className="gallery-card card-themed"
            >
              {/* Image container */}
              <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
                <img
                  src={item.thumbUrl || item.url}
                  alt={item.alt || item.title || `${item.category || 'Custom'} gate installation in ${item.suburb || item.location || 'Brisbane'}`}
                  loading="lazy"
                  onError={(e) => {
                    if (item.fallbackUrl && e.target.src !== item.fallbackUrl) {
                      e.target.src = item.fallbackUrl;
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.35s ease'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(9, 14, 26, 0.82)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <MapPin size={11} /> {item.suburb || item.location}
                </span>
              </div>

              {/* Clean Caption Bar: "Gate Type, Suburb" */}
              <div style={{
                padding: '0.85rem 1rem',
                background: 'var(--bg-card)',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                flexGrow: 1,
                justifyContent: 'space-between'
              }}>
                <h3 style={{
                  fontSize: '0.92rem',
                  fontWeight: '800',
                  color: 'var(--text-heading)',
                  margin: 0,
                  lineHeight: 1.35
                }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                  <span>{item.finish ? item.finish.split(' ')[0] + ' ' + (item.finish.split(' ')[1] || '') : 'Dulux Coat'}</span>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>View Specs →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Controls */}
        {visibleCount < filteredItems.length && (
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="btn btn-outline-dark btn-md"
              style={{ fontWeight: '800' }}
            >
              Load 8 More Projects ({filteredItems.length - visibleCount} remaining)
            </button>

            <button
              onClick={() => setVisibleCount(filteredItems.length)}
              className="btn btn-gold btn-md"
              style={{ fontWeight: '800' }}
            >
              View All {filteredItems.length} Projects
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div 
            className="modal-content-themed"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '820px' }}
          >
            {/* Close Button */}
            <button className="modal-close-light" onClick={() => setSelectedImage(null)}>
              <X size={20} />
            </button>

            {/* Main High-Res Image Container */}
            <div style={{
              position: 'relative',
              marginBottom: '1.25rem',
              borderRadius: '12px',
              overflow: 'hidden',
              maxHeight: '56vh',
              background: '#090e1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.alt || selectedImage.title || 'Custom automatic gate installation'}
                onError={(e) => {
                  if (selectedImage.fallbackUrl && e.target.src !== selectedImage.fallbackUrl) {
                    e.target.src = selectedImage.fallbackUrl;
                  }
                }}
                style={{ maxHeight: '52vh', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
              />

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(9, 14, 26, 0.75)',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(9, 14, 26, 0.75)',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Project Specs & Description */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.25rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <span className="badge-tag badge-gold" style={{ margin: 0, padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}>
                    <MapPin size={11} /> {selectedImage.location}
                  </span>
                  <span className="badge-tag badge-green" style={{ margin: 0, padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}>
                    <ShieldCheck size={11} /> 10-Yr Structural Warranty
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '0.4rem', fontWeight: '800' }}>
                  {selectedImage.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '0.65rem' }}>
                  {selectedImage.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                  {selectedImage.finish && <span>🎨 <strong>Finish:</strong> {selectedImage.finish}</span>}
                  {selectedImage.motor && <span>⚙️ <strong>Motor:</strong> {selectedImage.motor}</span>}
                </div>
              </div>

              {/* Action Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', alignItems: 'stretch' }}>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenQuoteWithProject && onOpenQuoteWithProject(selectedImage);
                  }}
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%' }}
                >
                  <Calculator size={17} />
                  Quote A Gate Like This
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
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
