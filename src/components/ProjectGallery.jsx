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
  { id: 'all', label: 'All Projects (600+)' },
  { id: 'sliding', label: 'Sliding Gates' },
  { id: 'swing', label: 'Swing Gates' },
  { id: 'solar', label: 'Solar Gates' },
  { id: 'commercial', label: 'Commercial & Security' },
  { id: 'slat-fencing', label: 'Slat Fencing' },
  { id: 'decowood', label: 'DecoWood Timber Look' }
];

export default function ProjectGallery({ onOpenQuoteWithProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const query = searchTerm.toLowerCase();
      const titleMatch = (item?.title || '').toLowerCase().includes(query);
      const locMatch = (item?.location || item?.suburb || '').toLowerCase().includes(query);
      const descMatch = (item?.description || '').toLowerCase().includes(query);
      return matchesCategory && (!searchTerm || titleMatch || locMatch || descMatch);
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
    <section id="gallery" className="section" style={{ backgroundColor: '#ffffff' }}>
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
            <Search size={18} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by suburb (e.g. Paddington, Yamanto, New Farm)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem 0.8rem 2.85rem',
                borderRadius: 'var(--radius-full)',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9rem',
                color: '#0f172a',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}
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
            {CATEGORIES.map((cat) => (
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
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
              {/* Image with progressive loading */}
              <img
                src={item.thumbUrl || item.url}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.35s ease'
                }}
              />

              {/* Hover Badge Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.1rem',
                  color: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <MapPin size={12} style={{ color: '#fbbf24' }} />
                  <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase' }}>
                    {item.location}
                  </span>
                </div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#ffffff', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="btn btn-outline-dark btn-lg"
            >
              Load More Projects ({filteredItems.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div 
            className="modal-content-light"
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
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
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
                  background: 'rgba(0,0,0,0.65)',
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
                  background: 'rgba(0,0,0,0.65)',
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

            {/* Project Specs & Description - Stacks cleanly on mobile */}
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

                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.4rem', fontWeight: '800' }}>
                  {selectedImage.title}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '0.65rem' }}>
                  {selectedImage.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', fontSize: '0.78rem', color: '#334155' }}>
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
                <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
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
