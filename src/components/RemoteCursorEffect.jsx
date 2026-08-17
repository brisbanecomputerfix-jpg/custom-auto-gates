import React, { useEffect, useState } from 'react';

/**
 * RemoteCursorEffect - Adds sleek gate remote radio wave pulses on click for desktop pointers.
 */
export default function RemoteCursorEffect() {
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    // Only enable on desktop pointer devices with a mouse
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      const newPulse = { id, x: e.clientX, y: e.clientY };

      setPulses((prev) => [...prev.slice(-4), newPulse]);

      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (pulses.length === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {pulses.map((pulse) => (
        <React.Fragment key={pulse.id}>
          {/* Expanding Radio Signal Ring 1 */}
          <div
            style={{
              position: 'absolute',
              left: pulse.x,
              top: pulse.y,
              width: '12px',
              height: '12px',
              marginLeft: '-6px',
              marginTop: '-6px',
              borderRadius: '50%',
              border: '2px solid #d97706',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
              animation: 'remoteSignalWave 0.55s ease-out forwards',
            }}
          />
          {/* Expanding Radio Signal Ring 2 */}
          <div
            style={{
              position: 'absolute',
              left: pulse.x,
              top: pulse.y,
              width: '8px',
              height: '8px',
              marginLeft: '-4px',
              marginTop: '-4px',
              borderRadius: '50%',
              border: '1.5px solid #38bdf8',
              boxShadow: '0 0 8px rgba(56, 189, 248, 0.7)',
              animation: 'remoteSignalWave 0.45s 0.08s ease-out forwards',
            }}
          />
        </React.Fragment>
      ))}
      <style>{`
        @keyframes remoteSignalWave {
          0% {
            transform: scale(0.4);
            opacity: 1;
          }
          100% {
            transform: scale(4.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
