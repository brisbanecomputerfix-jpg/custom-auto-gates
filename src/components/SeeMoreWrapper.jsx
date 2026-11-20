import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * SeeMoreWrapper - Progressive disclosure container for long sections.
 * Preserves 100% of HTML and keyword text in the DOM for Googlebot / SEO crawlers,
 * while trimming the physical mobile scroll depth with a smooth CSS transition.
 */
export default function SeeMoreWrapper({
  children,
  initialHeight = 440,
  expandLabel = "See More Details",
  collapseLabel = "Show Less",
  gradientBg = "var(--bg-surface)",
  className = ""
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`see-more-container ${className}`} style={{ position: 'relative', width: '100%' }}>
      {/* Content wrapper with smooth height transition */}
      <div
        style={{
          maxHeight: isExpanded ? '5000px' : `${initialHeight}px`,
          overflow: 'hidden',
          transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative'
        }}
      >
        {children}

        {/* Soft gradient fade overlay when collapsed */}
        {!isExpanded && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '110px',
              background: `linear-gradient(to bottom, transparent 0%, ${gradientBg} 100%)`,
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </div>

      {/* Branded Expand / Collapse Toggle Button */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-outline-dark btn-md"
          style={{
            fontWeight: '800',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1.6rem',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer'
          }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              <span>{collapseLabel}</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span>{expandLabel}</span>
              <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
