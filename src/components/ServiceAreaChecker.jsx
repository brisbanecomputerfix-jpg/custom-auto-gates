import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Compass, 
  Truck, 
  Calendar, 
  Phone, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

const SERVICE_REGIONS = [
  {
    id: 'brisbane-inner',
    name: 'Brisbane Inner & Character Suburbs',
    badge: 'Daily Measures',
    suburbs: ['Paddington', 'New Farm', 'Ascot', 'Hamilton', 'Bulimba', 'Hawthorne', 'Teneriffe', 'Indooroopilly', 'Camp Hill', 'Coorparoo', 'St Lucia', 'Chelmer']
  },
  {
    id: 'brisbane-north',
    name: 'Brisbane Northside & Moreton',
    badge: 'Fast Dispatch',
    suburbs: ['Clayfield', 'Hendra', 'Nundah', 'Wavell Heights', 'Chermside', 'Stafford', 'Grange', 'Wilston', 'Samford Valley', 'Bridgeman Downs', 'North Lakes']
  },
  {
    id: 'brisbane-south',
    name: 'Brisbane Southside & Logan',
    badge: 'Rapid Response',
    suburbs: ['Morningside', 'Carina', 'Carindale', 'Mount Gravatt', 'Sunnybank', 'Rochedale', 'Underwood', 'Springwood', 'Daisy Hill', 'Loganholme']
  },
  {
    id: 'ipswich-springfield',
    name: 'Ipswich & Greater Springfield',
    badge: 'Workshop Local',
    suburbs: ['Yamanto', 'Ipswich Central', 'Brassall', 'Booval', 'Brookwater', 'Springfield', 'Springfield Lakes', 'Augustine Heights', 'Ripley', 'Karalee']
  },
  {
    id: 'bayside-goldcoast',
    name: 'Redlands & Northern Gold Coast',
    badge: 'Coastal Powdercoating',
    suburbs: ['Manly', 'Wynnum', 'Birkdale', 'Cleveland', 'Victoria Point', 'Redland Bay', 'Ormeau', 'Coomera', 'Hope Island', 'Sanctuary Cove']
  }
];

export default function ServiceAreaChecker({ onOpenContact, onNavigateSuburbs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('brisbane-inner');

  // Search logic
  const searchResults = searchTerm.trim() 
    ? SERVICE_REGIONS.flatMap(r => r.suburbs).filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const currentRegionData = SERVICE_REGIONS.find(r => r.id === selectedRegion) || SERVICE_REGIONS[0];

  return (
    <section id="suburbs" className="section" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-blue">
            <Compass size={14} />
            South East Queensland Coverage
          </span>
          <h2 className="section-title">
            We Service Your Suburb Daily <br />
            <span className="gradient-text-gold">Free Site Visit</span>
          </h2>
          <p className="section-subtitle">
            Our mobile technicians check ground levels, driveway slope, boundary clearances, and power availability across all SEQ regions.
          </p>
        </div>

        {/* Suburb Search Input Card */}
        <div style={{ maxWidth: '620px', margin: '0 auto 2.25rem auto' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1.1rem', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search your suburb (e.g. Bulimba, New Farm, Springfield, Ascot)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.1rem 0.85rem 2.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--input-bg)',
                border: '2px solid var(--input-border)',
                fontSize: '0.92rem',
                color: 'var(--input-text)',
                boxShadow: 'var(--shadow-sm)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1.1rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Instant Search Feedback */}
          {searchTerm.trim() && (
            <div style={{
              marginTop: '0.85rem',
              background: searchResults.length > 0 ? 'var(--badge-green-bg)' : 'var(--badge-gold-bg)',
              border: searchResults.length > 0 ? '1.5px solid var(--badge-green-border)' : '1.5px solid var(--badge-gold-border)',
              borderRadius: '12px',
              padding: '1rem',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              {searchResults.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--badge-green-text)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                    <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>
                      Yes! We Service {searchResults.slice(0, 4).join(', ')} Daily
                    </span>
                  </div>
                  <button onClick={onOpenContact} className="btn btn-gold btn-sm" style={{ flex: '1 1 auto' }}>
                    <Calendar size={14} /> Book Free Measure
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <div style={{ color: 'var(--badge-gold-text)', fontSize: '0.84rem' }}>
                    We service virtually all SEQ properties within 100km of our Yamanto workshop.
                  </div>
                  <a href={COMPANY_INFO.tel} className="btn btn-blue btn-sm" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
                    <Phone size={14} /> Call (07) 3102 1801
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Region Pills Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.45rem',
          overflowX: 'auto',
          paddingBottom: '0.65rem',
          marginBottom: '1.25rem',
          WebkitOverflowScrolling: 'touch',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {SERVICE_REGIONS.map((region) => {
            const isActive = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--accent-gold)' : 'var(--bg-card)',
                  color: isActive ? '#090e1a' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {region.name}
              </button>
            );
          })}
        </div>

        {/* Active Region Suburbs Grid Showcase */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3vw, 1.75rem)',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-heading)', margin: 0 }}>
                {currentRegionData.name}
              </h3>
              <span className="badge-tag badge-gold" style={{ margin: 0, fontSize: '0.7rem' }}>
                {currentRegionData.badge}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Free mobile site visit & site inspection
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))',
            gap: '0.45rem',
            marginBottom: '1.25rem'
          }}>
            {currentRegionData.suburbs.map((suburb, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <MapPin size={11} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>{suburb}</span>
              </div>
            ))}
          </div>

          {/* Direct Region Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: '700' }}>
              <ShieldCheck size={16} />
              <span>Full Queensland QBCC licensed installation & warranty</span>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenContact}
                className="btn btn-gold btn-sm"
                style={{ fontWeight: '800' }}
              >
                <Calendar size={14} />
                Book Free Measure in {currentRegionData.name.split('&')[0]}
              </button>
              {onNavigateSuburbs && (
                <button
                  onClick={onNavigateSuburbs}
                  className="btn btn-outline-dark btn-sm"
                >
                  View All 100+ Suburb Guides <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
