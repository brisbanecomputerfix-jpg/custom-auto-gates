import React from 'react';
import { RefreshCw, AlertTriangle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          backgroundColor: '#f8fafc',
          fontFamily: "'Inter', sans-serif",
          color: '#0f172a'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12)',
            border: '1.5px solid #e2e8f0'
          }}>
            <img 
              src="/images/custom-auto-gates-logo-dark.png" 
              alt="Custom Auto Gates & Fencing" 
              style={{ 
                height: 'auto', 
                maxHeight: '52px', 
                width: 'auto', 
                maxWidth: '200px', 
                margin: '0 auto 1.5rem auto', 
                display: 'block',
                objectFit: 'contain'
              }}
            />
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <AlertTriangle size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
              Custom Auto Gates & Fencing
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Queensland's Premier Automatic Gates Manufacturer. Click below to reload the workshop live page.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="btn btn-gold btn-lg"
                style={{ width: '100%', borderRadius: '12px' }}
              >
                <RefreshCw size={18} /> Refresh Page
              </button>
              <a
                href={COMPANY_INFO.tel}
                className="btn btn-blue btn-lg"
                style={{ width: '100%', borderRadius: '12px' }}
              >
                <Phone size={18} /> Call Workshop: (07) 3102 1801
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
