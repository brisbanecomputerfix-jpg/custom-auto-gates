import React, { useEffect } from 'react';
import { X, Calculator } from 'lucide-react';
import GateVisualizerQuote from './GateVisualizerQuote';

export default function EstimatorModal({ isOpen, onClose, defaultCategory }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      style={{ 
        zIndex: 1100, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '1rem',
        background: 'rgba(4, 7, 14, 0.86)',
        backdropFilter: 'blur(6px)'
      }}
    >
      <div 
        className="modal-content-themed animate-fadeIn"
        style={{
          width: '100%',
          maxWidth: '1150px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(1rem, 2.5vw, 1.75rem)',
          borderRadius: '20px',
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-tag badge-gold" style={{ margin: 0, fontSize: '0.72rem' }}>
              <Calculator size={13} /> Interactive Gate Cost Builder
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              100% Factory Direct Pricing • Yamanto Workshop
            </span>
          </div>
          <button 
            type="button"
            className="modal-close-light" 
            onClick={onClose}
            aria-label="Close Gate Cost Estimator"
            style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-heading)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Embedded Interactive Visualizer */}
        <GateVisualizerQuote defaultCategory={defaultCategory} isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
