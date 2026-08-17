import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Calendar, 
  Phone,
  ShieldCheck,
  Building2,
  Navigation
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function ServiceAreaChecker({ onOpenContact }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('inner');

  // Structured Geo Suburbs Directory for Brisbane & SE QLD
  const SUBURB_REGIONS = [
    {
      id: 'inner',
      name: 'Brisbane Inner Suburbs (5–10km CBD)',
      badge: 'Priority Daily Van Dispatches',
      suburbs: [
        'New Farm', 'Teneriffe', 'Fortitude Valley', 'Ascot', 'Hamilton', 'Paddington',
        'Red Hill', 'Rosalie', 'Milton', 'Bardon', 'Spring Hill', 'Kangaroo Point',
        'South Brisbane', 'Highgate Hill', 'West End', 'Woolloongabba', 'East Brisbane',
        'Hawthorne', 'Bulimba', 'Balmoral', 'Morningside', 'Norman Park', 'Coorparoo',
        'Camp Hill', 'Greenslopes', 'Dutton Park', 'Fairfield', 'Annerley', 'Yeronga',
        'St Lucia', 'Toowong', 'Taringa', 'Indooroopilly', 'Ashgrove', 'Kelvin Grove',
        'Wilston', 'Windsor', 'Grange', 'Newmarket', 'Alderley', 'Lutwyche', 'Albion',
        'Clayfield', 'Hendra'
      ]
    },
    {
      id: 'western-ipswich',
      name: 'Ipswich, Springfield & Western Suburbs',
      badge: 'Yamanto Workshop Local Zone',
      suburbs: [
        'Yamanto', 'Ipswich CBD', 'Brookwater', 'Springfield Lakes', 'Augustine Heights',
        'Spring Mountain', 'Ripley', 'Deebing Heights', 'Flinders View', 'Brassall',
        'Raceview', 'Booval', 'Karalee', 'Barellan Point', 'Chuwar', 'Kenmore',
        'Kenmore Hills', 'Chapel Hill', 'Pullenvale', 'Brookfield', 'Pinjarra Hills',
        'Bellbowrie', 'Moggill', 'Anstead', 'Mount Crosby', 'Karana Downs'
      ]
    },
    {
      id: 'northside',
      name: 'Brisbane Northside & Moreton Bay',
      badge: 'Daily Rapid Service',
      suburbs: [
        'Chermside', 'Chermside West', 'Aspley', 'Bridgeman Downs', 'McDowall',
        'Stafford', 'Stafford Heights', 'Everton Park', 'Everton Hills', 'Mitchelton',
        'Gaythorne', 'Enoggera', 'Keperra', 'Arana Hills', 'Ferny Hills', 'Ferny Grove',
        'Samford Valley', 'Dayboro', 'North Lakes', 'Mango Hill', 'Redcliffe',
        'Scarborough', 'Margate', 'Woody Point', 'Clontarf', 'Caboolture', 'Morayfield'
      ]
    },
    {
      id: 'southside-logan',
      name: 'Brisbane Southside, Logan & Redlands',
      badge: 'Free On-Site Measures',
      suburbs: [
        'Carindale', 'Carina', 'Carina Heights', 'Sunnybank', 'Sunnybank Hills',
        'Runcorn', 'Eight Mile Plains', 'Underwood', 'Rochedale', 'Rochedale South',
        'Springwood', 'Daisy Hill', 'Priestsdale', 'Shailer Park', 'Loganholme',
        'Browns Plains', 'Greenbank', 'Park Ridge', 'Jimboomba', 'Cleveland',
        'Thornlands', 'Victoria Point', 'Redland Bay', 'Wellington Point', 'Ormiston'
      ]
    },
    {
      id: 'gold-coast',
      name: 'Gold Coast & Scenic Rim',
      badge: 'Weekly Installation Routes',
      suburbs: [
        'Hope Island', 'Sanctuary Cove', 'Coomera', 'Upper Coomera', 'Helensvale',
        'Oxenford', 'Pacific Pines', 'Arundel', 'Southport', 'Main Beach', 'Surfers Paradise',
        'Broadbeach', 'Bundall', 'Benowa', 'Ashmore', 'Robina', 'Varsity Lakes',
        'Tamborine Mountain', 'Beaudesert', 'Boonah'
      ]
    }
  ];

  const currentRegionData = SUBURB_REGIONS.find(r => r.id === selectedRegion) || SUBURB_REGIONS[0];

  const allSuburbs = SUBURB_REGIONS.flatMap(r => r.suburbs);
  const searchResults = searchTerm.trim() 
    ? allSuburbs.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    : [];

  return (
    <section id="suburbs" className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-tag badge-blue">
            <Navigation size={14} />
            South East Queensland Service Coverage
          </span>
          <h2 className="section-title">
            Servicing Brisbane Inner Suburbs, <br />
            <span className="gradient-text-gold">Ipswich, Logan & Gold Coast</span>
          </h2>
          <p className="section-subtitle">
            Our laser measurement vans travel daily across South East Queensland. Check your suburb below to confirm free on-site measure availability.
          </p>
        </div>

        {/* Suburb Search Input */}
        <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={20} style={{ position: 'absolute', left: '1.25rem', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search your suburb (e.g. New Farm, Paddington, Ascot, Yamanto...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1.1rem 1.25rem 1.1rem 3.25rem',
                borderRadius: 'var(--radius-full)',
                background: '#f8fafc',
                border: '2px solid #cbd5e1',
                fontSize: '1rem',
                color: '#0f172a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '1.25rem', color: '#64748b', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Result Instant Status */}
          {searchTerm.trim() && (
            <div style={{
              marginTop: '1rem',
              background: searchResults.length > 0 ? '#ecfdf5' : '#fef3c7',
              border: searchResults.length > 0 ? '1.5px solid #a7f3d0' : '1.5px solid #fde68a',
              borderRadius: '14px',
              padding: '1.25rem',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              {searchResults.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46' }}>
                    <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Yes! We Service {searchResults.join(', ')} (Free Laser Measure Available)
                    </span>
                  </div>
                  <button onClick={onOpenContact} className="btn btn-gold btn-sm">
                    <Calendar size={15} /> Book For This Suburb
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ color: '#92400e', fontSize: '0.9rem' }}>
                    Didn’t find "{searchTerm}"? We cover almost all SE Queensland properties within 100km of Yamanto.
                  </div>
                  <a href={COMPANY_INFO.tel} className="btn btn-blue btn-sm">
                    <Phone size={15} /> Call (07) 3102 1801
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Regional Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {SUBURB_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              style={{
                padding: '0.7rem 1.3rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: '700',
                fontSize: '0.875rem',
                background: selectedRegion === region.id ? '#0f172a' : '#f1f5f9',
                color: selectedRegion === region.id ? '#ffffff' : '#334155',
                border: selectedRegion === region.id ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Selected Region Suburbs Grid */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: '18px',
          padding: '2.25rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                {currentRegionData.name}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Residential character homes, modern architectural builds, acreage properties & commercial sites.
              </p>
            </div>
            <span className="badge-tag badge-gold" style={{ margin: 0 }}>
              {currentRegionData.badge}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
            gap: '0.65rem'
          }}>
            {currentRegionData.suburbs.map((suburb, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <MapPin size={13} style={{ color: '#2563eb', flexShrink: 0 }} />
                <span>{suburb}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value Callout 3-Column Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.3rem' }}>Free On-Site Laser Measure</h4>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', lineHeight: 1.5 }}>We visit your property with precision laser gear to check ground levels, driveway slope, and boundary clearance.</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.3rem' }}>Character & Council Compliance</h4>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', lineHeight: 1.5 }}>Full alignment with Brisbane City Council, Ipswich City, and Gold Coast heritage and boundary setback codes.</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.3rem' }}>10-Year Factory Warranty</h4>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', lineHeight: 1.5 }}>Every single custom gate manufactured in Yamanto is backed by our direct 10-year structural warranty.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
