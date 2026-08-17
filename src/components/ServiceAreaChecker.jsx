import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Compass, 
  Truck, 
  Calendar, 
  Phone, 
  Building2, 
  Home, 
  TreePine 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

const SERVICE_REGIONS = [
  {
    id: 'brisbane-inner',
    name: 'Brisbane Inner & Character Suburbs',
    badge: 'High Demand',
    desc: 'Bespoke character-matching sliding and double swing gates for Queenslanders and heritage renovations.',
    suburbs: [
      'Paddington', 'New Farm', 'Ascot', 'Hamilton', 'Bulimba', 'Hawthorne',
      'Teneriffe', 'Red Hill', 'Bardon', 'Ashgrove', 'Auchenflower', 'Toowong',
      'Indooroopilly', 'St Lucia', 'Chelmer', 'Graceville', 'Sherwood', 'Corinda',
      'Highgate Hill', 'West End', 'South Brisbane', 'Kangaroo Point', 'East Brisbane',
      'Norman Park', 'Camp Hill', 'Coorparoo', 'Greenslopes', 'Holland Park'
    ]
  },
  {
    id: 'brisbane-north',
    name: 'Brisbane Northside & Moreton Bay',
    badge: 'Daily Installations',
    desc: 'Modern slat fencing, solar automated gates, and heavy-duty sliding gates.',
    suburbs: [
      'Clayfield', 'Hendra', 'Nundah', 'Wavell Heights', 'Chermside', 'Stafford',
      'Grange', 'Wilston', 'Windsor', 'Kelvin Grove', 'Mitchelton', 'Enoggera',
      'Keperra', 'Ferny Grove', 'Samford Valley', 'Bridgeman Downs', 'Carseldine',
      'Aspley', 'Albany Creek', 'Eatons Hill', 'Warner', 'North Lakes', 'Redcliffe'
    ]
  },
  {
    id: 'brisbane-south',
    name: 'Brisbane Southside & Logan',
    badge: 'Rapid Response',
    desc: 'Wide driveway security gates, cantilever gates, and commercial boom gates.',
    suburbs: [
      'Morningside', 'Carina', 'Carindale', 'Mount Gravatt', 'Mansfield', 'Wishart',
      'Sunnybank', 'Sunnybank Hills', 'Runcorn', 'Calamvale', 'Stretton', 'Algester',
      'Parkinson', 'Eight Mile Plains', 'Rochedale', 'Underwood', 'Springwood',
      'Daisy Hill', 'Shailer Park', 'Loganholme', 'Beenleigh', 'Browns Plains'
    ]
  },
  {
    id: 'ipswich-springfield',
    name: 'Ipswich, Yamanto & Greater Springfield',
    badge: 'Workshop Home Region',
    desc: 'Direct manufacturer visits within 24 hours. Acreage double swing gates and solar systems.',
    suburbs: [
      'Yamanto', 'Ipswich Central', 'Brassall', 'Booval', 'Bundamba', 'Silkstone',
      'Raceview', 'Flinders View', 'Ripley', 'South Ripley', 'Deebing Heights',
      'Brookwater', 'Springfield', 'Springfield Lakes', 'Springfield Central',
      'Augustine Heights', 'Redbank Plains', 'Karalee', 'Chuwar', 'Pine Mountain',
      'Rosewood', 'Marburg', 'Walloon', 'Willowbank', 'Peak Crossing'
    ]
  },
  {
    id: 'bayside-goldcoast',
    name: 'Redlands Bayside & Northern Gold Coast',
    badge: 'Coastal Powdercoating',
    desc: 'Specialized coastal-grade powdercoated aluminium gates resistant to ocean air and salt spray.',
    suburbs: [
      'Manly', 'Wynnum', 'Lota', 'Capalaba', 'Birkdale', 'Wellington Point',
      'Ormiston', 'Cleveland', 'Thornlands', 'Victoria Point', 'Redland Bay',
      'Ormeau', 'Pimpama', 'Coomera', 'Upper Coomera', 'Helensvale', 'Hope Island',
      'Sanctuary Cove', 'Paradise Point', 'Runaway Bay', 'Southport'
    ]
  }
];

export default function ServiceAreaChecker({ onOpenContact }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('brisbane-inner');

  // Search logic
  const searchResults = searchTerm.trim() 
    ? SERVICE_REGIONS.flatMap(r => r.suburbs).filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const currentRegionData = SERVICE_REGIONS.find(r => r.id === selectedRegion) || SERVICE_REGIONS[0];

  return (
    <section id="suburbs" className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-blue">
            <Compass size={14} />
            South East Queensland Coverage
          </span>
          <h2 className="section-title">
            Service Areas & Free On-Site Measures <br />
            <span className="gradient-text-gold">Brisbane, Ipswich & Surrounds</span>
          </h2>
          <p className="section-subtitle">
            From inner-city character residences to expansive regional acreages, our mobile laser measure team travels across all of South East Queensland daily.
          </p>
        </div>

        {/* Suburb Search Input */}
        <div style={{ maxWidth: '560px', margin: '0 auto 2rem auto' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1.1rem', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search your suburb (e.g. New Farm, Paddington, Yamanto...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.1rem 0.85rem 2.85rem',
                borderRadius: 'var(--radius-full)',
                background: '#f8fafc',
                border: '2px solid #cbd5e1',
                fontSize: '0.92rem',
                color: '#0f172a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1.1rem', color: '#64748b', fontSize: '0.8125rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Result Instant Status */}
          {searchTerm.trim() && (
            <div style={{
              marginTop: '0.85rem',
              background: searchResults.length > 0 ? '#ecfdf5' : '#fef3c7',
              border: searchResults.length > 0 ? '1.5px solid #a7f3d0' : '1.5px solid #fde68a',
              borderRadius: '12px',
              padding: '1rem',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              {searchResults.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#065f46' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>
                      Yes! We Service {searchResults.slice(0, 4).join(', ')} (Free Measure Available)
                    </span>
                  </div>
                  <button onClick={onOpenContact} className="btn btn-gold btn-sm" style={{ flex: '1 1 auto' }}>
                    <Calendar size={14} /> Book Measure
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <div style={{ color: '#92400e', fontSize: '0.84rem' }}>
                    Didn’t find "{searchTerm}"? We cover almost all SE Queensland properties within 100km of Yamanto.
                  </div>
                  <a href={COMPANY_INFO.tel} className="btn btn-blue btn-sm" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
                    <Phone size={14} /> Call (07) 3102 1801
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Region Pills Navigation - Horizontal Scrollable on Mobile */}
        <div style={{
          display: 'flex',
          gap: '0.45rem',
          overflowX: 'auto',
          paddingBottom: '0.65rem',
          marginBottom: '1.75rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
        className="step-scroll-container"
        >
          {SERVICE_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: '700',
                fontSize: '0.84rem',
                whiteSpace: 'nowrap',
                background: selectedRegion === region.id ? '#0f172a' : '#f8fafc',
                color: selectedRegion === region.id ? '#ffffff' : '#475569',
                border: selectedRegion === region.id ? '1px solid #0f172a' : '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                cursor: 'pointer'
              }}
            >
              {region.name.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Active Region Suburbs Grid Showcase */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3.5vw, 2rem)',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                {currentRegionData.name}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.84rem' }}>
                Residential character homes, modern architectural builds, acreage properties & commercial sites.
              </p>
            </div>
            <span className="badge-tag badge-gold" style={{ margin: 0, fontSize: '0.72rem' }}>
              {currentRegionData.badge}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
            gap: '0.5rem'
          }}>
            {currentRegionData.suburbs.map((suburb, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <MapPin size={12} style={{ color: '#2563eb', flexShrink: 0 }} />
                <span>{suburb}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value Callout 3-Column Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.25rem' }}>Free On-Site Laser Measure</h4>
              <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5 }}>We visit your property with precision laser gear to check ground levels, driveway slope, and boundary clearance.</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.25rem' }}>Architectural & Heritage Focus</h4>
              <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5 }}>Custom slat spacing and DecoWood timber finishes tailored to character homes across Ascot, Paddington, and New Farm.</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TreePine size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.25rem' }}>Acreage Solar Specialists</h4>
              <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5 }}>Deep experience with long rural driveways, solar off-grid automation, and cantilever systems across Ipswich and Redlands.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
