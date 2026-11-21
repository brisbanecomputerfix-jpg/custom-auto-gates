/**
 * High-Performance Server-Side Pre-Renderer for Custom Auto Gates & Fencing
 * Injects complete, semantic, keyword-optimized HTML directly into <div id="root">
 * Ensures 100% indexability by Googlebot, Bingbot, ChatGPT, Claude, Perplexity & AI Crawlers
 */
import { RESIDENTIAL_SUBURBS_DATA } from './residentialSuburbsData.js';

const BASE_URL = 'https://customautogates.com.au';
const PHONE_NUMBER = '(07) 3102 1801';
const PHONE_TEL = 'tel:0731021801';
const WORKSHOP_ADDRESS = 'Shed 2, 43-45 Belar Street, Yamanto QLD 4305';
const QBCC_LICENSE = '#15579753';

// Gate categories navigation pills
const GATE_CATEGORIES = [
  { href: '/driveway-gates', label: 'Driveway Gates', desc: 'Custom electric driveway systems' },
  { href: '/automatic-sliding-gates', label: 'Sliding Gates', desc: 'Space-saving track & cantilever' },
  { href: '/swing-gates', label: 'Swing & Bi-Fold', desc: 'Single, double & fast-folding' },
  { href: '/fencing', label: 'Slat & Pool Fencing', desc: 'Architectural aluminium privacy screens' },
  { href: '/solar-gates', label: 'Solar Acreage', desc: '100% off-grid battery backed' },
  { href: '/commercial-gates', label: 'Commercial & Cantilever', desc: 'Heavy-duty security & boom gates' },
  { href: '/service', label: 'Repairs & Motors', desc: 'Motor replacements & diagnostics' }
];

// Reusable Navigation Header HTML
function renderHeader() {
  return `
    <header class="seo-site-header" style="background:#090e1a;border-bottom:1px solid rgba(255,255,255,0.1);padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <a href="/" class="brand-link" style="display:flex;align-items:center;gap:0.75rem;text-decoration:none;color:#ffffff;font-family:Outfit,sans-serif;font-weight:900;font-size:1.25rem;">
        <span style="display:inline-block;width:34px;height:34px;background:#fbbf24;border-radius:8px;color:#090e1a;font-weight:900;text-align:center;line-height:34px;font-size:1.1rem;">C</span>
        <span>CUSTOM AUTO <span style="color:#fbbf24;">GATES</span></span>
      </a>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <a href="${PHONE_TEL}" class="phone-pill" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.1rem;background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:10px;color:#fbbf24;font-weight:800;text-decoration:none;font-size:0.95rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          ${PHONE_NUMBER}
        </a>
        <a href="/#quote" class="quote-btn" style="display:inline-flex;align-items:center;padding:0.6rem 1.25rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:10px;text-decoration:none;font-size:0.95rem;">
          Get Instant Quote
        </a>
      </div>
    </header>
  `;
}

// Reusable Gate Categories Grid HTML
function renderGateCategories(activeSlug = '') {
  const items = GATE_CATEGORIES.map(cat => {
    const isActive = cat.href === activeSlug || (activeSlug === '/' && cat.href === '/driveway-gates');
    const bg = isActive ? '#fbbf24' : '#111a2e';
    const color = isActive ? '#090e1a' : '#ffffff';
    const border = isActive ? 'none' : '1px solid rgba(255,255,255,0.12)';
    return `
      <a href="${cat.href}" style="display:block;padding:0.85rem 1rem;background:${bg};color:${color};border:${border};border-radius:12px;text-decoration:none;transition:all 0.2s ease;">
        <strong style="display:block;font-size:0.95rem;font-weight:800;margin-bottom:0.2rem;">${cat.label}</strong>
        <span style="display:block;font-size:0.8rem;opacity:${isActive ? '0.9' : '0.7'};">${cat.desc}</span>
      </a>
    `;
  }).join('');

  return `
    <nav class="gate-categories-nav" style="margin:2rem 0;">
      <h2 style="font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;font-weight:800;margin-bottom:0.75rem;">Explore Gate Styles:</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0.75rem;">
        ${items}
      </div>
    </nav>
  `;
}

// Reusable Project Gallery HTML
function renderProjectGallery(images = []) {
  if (!images || images.length === 0) return '';
  const cards = images.map((img, i) => `
    <div style="border-radius:12px;overflow:hidden;background:#111a2e;border:1px solid rgba(255,255,255,0.1);">
      <img src="${img.src}" alt="${img.alt}" width="600" height="400" loading="${i < 2 ? 'eager' : 'lazy'}" style="width:100%;height:220px;object-fit:cover;display:block;" />
      <div style="padding:0.75rem 1rem;">
        <p style="font-size:0.85rem;font-weight:600;color:#e2e8f0;margin:0;">${img.alt}</p>
      </div>
    </div>
  `).join('');

  return `
    <section class="gallery-preview-section" style="margin:3rem 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
        <h2 style="font-size:1.4rem;font-weight:800;color:#ffffff;font-family:Outfit,sans-serif;margin:0;">Recent Workshop Installations & Gallery</h2>
        <a href="/testimonials" style="color:#fbbf24;font-weight:700;font-size:0.9rem;text-decoration:none;">View 180+ Reviews &rarr;</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;">
        ${cards}
      </div>
    </section>
  `;
}

// Reusable Fold-Out Accordions HTML (Semantic <details> & <summary>)
function renderAccordions({ specs = [], pricing = [], council = '', suburbs = [], faqs = [] }) {
  let output = '<section class="seo-accordions-section" style="margin:3rem 0;">';
  output += '<h2 style="font-size:1.4rem;font-weight:800;color:#ffffff;font-family:Outfit,sans-serif;margin-bottom:1rem;">In-Depth Specifications, Pricing, Council & Suburb Details</h2>';

  // 1. Specifications Accordion
  if (specs && specs.length > 0) {
    output += `
      <details class="seo-accordion" style="background:#111a2e;border:1px solid rgba(255,255,255,0.12);border-radius:12px;margin-bottom:0.75rem;overflow:hidden;">
        <summary style="padding:1.1rem 1.4rem;font-weight:800;font-size:1.05rem;color:#ffffff;cursor:pointer;background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:space-between;">
          <span>⚙️ Engineering Specifications & Materials</span>
        </summary>
        <div style="padding:1.25rem 1.4rem;border-top:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:0.95rem;line-height:1.7;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;">
            ${specs.map(s => `
              <div style="background:#090e1a;padding:0.85rem 1rem;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
                <span style="display:block;font-size:0.8rem;text-transform:uppercase;color:#fbbf24;font-weight:700;margin-bottom:0.25rem;">${s.label}</span>
                <span style="font-weight:600;color:#ffffff;">${s.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </details>
    `;
  }

  // 2. Pricing Guide Accordion
  if (pricing && pricing.length > 0) {
    output += `
      <details class="seo-accordion" style="background:#111a2e;border:1px solid rgba(255,255,255,0.12);border-radius:12px;margin-bottom:0.75rem;overflow:hidden;">
        <summary style="padding:1.1rem 1.4rem;font-weight:800;font-size:1.05rem;color:#ffffff;cursor:pointer;background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:space-between;">
          <span>💰 Transparent Pricing Guide & Factory-Direct Estimates</span>
        </summary>
        <div style="padding:1.25rem 1.4rem;border-top:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:0.95rem;line-height:1.7;">
          <p style="margin-top:0;margin-bottom:1rem;color:#94a3b8;">Fabricating direct from our Yamanto workshop eliminates retail markups, saving homeowners $1,200 to $2,500 on full gate installations.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
            ${pricing.map(p => `
              <div style="background:#090e1a;padding:1rem;border-radius:8px;border:1px solid rgba(251,191,36,0.25);">
                <h4 style="margin:0 0 0.5rem 0;color:#ffffff;font-size:1rem;font-weight:800;">${p.title}</h4>
                <div style="font-size:1.35rem;font-weight:900;color:#fbbf24;margin-bottom:0.4rem;">${p.price}</div>
                <p style="margin:0;font-size:0.85rem;color:#94a3b8;">${p.notes}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </details>
    `;
  }

  // 3. Queensland Council Regulations Accordion
  if (council) {
    output += `
      <details class="seo-accordion" style="background:#111a2e;border:1px solid rgba(255,255,255,0.12);border-radius:12px;margin-bottom:0.75rem;overflow:hidden;">
        <summary style="padding:1.1rem 1.4rem;font-weight:800;font-size:1.05rem;color:#ffffff;cursor:pointer;background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:space-between;">
          <span>🏛️ Queensland Council Fence & Boundary Regulations (BCC, ICC & AS1926.1)</span>
        </summary>
        <div style="padding:1.25rem 1.4rem;border-top:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:0.95rem;line-height:1.7;">
          ${council}
        </div>
      </details>
    `;
  }

  // 4. Suburbs & Service Areas Accordion
  if (suburbs && suburbs.length > 0) {
    output += `
      <details class="seo-accordion" style="background:#111a2e;border:1px solid rgba(255,255,255,0.12);border-radius:12px;margin-bottom:0.75rem;overflow:hidden;">
        <summary style="padding:1.1rem 1.4rem;font-weight:800;font-size:1.05rem;color:#ffffff;cursor:pointer;background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:space-between;">
          <span>📍 Suburbs & Regional Service Coverage (Brisbane, Ipswich, Logan, Gold Coast)</span>
        </summary>
        <div style="padding:1.25rem 1.4rem;border-top:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:0.95rem;line-height:1.7;">
          <p style="margin-top:0;margin-bottom:1rem;color:#94a3b8;">We provide free on-site measures, manufacturing, and installation across all South East Queensland suburbs:</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            ${suburbs.map(s => `
              <span style="display:inline-block;padding:0.35rem 0.75rem;background:#090e1a;border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:0.85rem;color:#cbd5e1;">
                <strong>${s.name}</strong> <span style="color:#94a3b8;">(${s.postcode})</span>
              </span>
            `).join('')}
          </div>
        </div>
      </details>
    `;
  }

  // 5. Frequently Asked Questions Accordion
  if (faqs && faqs.length > 0) {
    output += `
      <details class="seo-accordion" open style="background:#111a2e;border:1px solid rgba(255,255,255,0.12);border-radius:12px;margin-bottom:0.75rem;overflow:hidden;">
        <summary style="padding:1.1rem 1.4rem;font-weight:800;font-size:1.05rem;color:#ffffff;cursor:pointer;background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:space-between;">
          <span>❓ Frequently Asked Questions (FAQ)</span>
        </summary>
        <div style="padding:1.25rem 1.4rem;border-top:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:0.95rem;line-height:1.7;">
          ${faqs.map(f => `
            <div style="margin-bottom:1.25rem;padding-bottom:1.25rem;border-bottom:1px solid rgba(255,255,255,0.08);">
              <h3 style="font-size:1.05rem;font-weight:800;color:#fbbf24;margin:0 0 0.4rem 0;">${f.q}</h3>
              <p style="margin:0;color:#cbd5e1;line-height:1.6;">${f.a}</p>
            </div>
          `).join('')}
        </div>
      </details>
    `;
  }

  output += '</section>';
  return output;
}

// Reusable Footer HTML
function renderFooter() {
  return `
    <footer class="seo-site-footer" style="background:#060a12;border-top:1px solid rgba(255,255,255,0.1);padding:3rem 1.5rem 2rem 1.5rem;color:#94a3b8;font-size:0.88rem;">
      <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem;margin-bottom:2.5rem;">
        <div>
          <h4 style="color:#ffffff;font-size:1rem;font-weight:800;margin-bottom:0.75rem;font-family:Outfit,sans-serif;">CUSTOM AUTO GATES</h4>
          <p style="line-height:1.6;margin-bottom:1rem;">South East Queensland's factory-direct gate manufacturer. Fabricating custom automatic sliding, swing, and solar gates in Yamanto.</p>
          <p style="margin:0;color:#fbbf24;font-weight:700;">QBCC Lic: ${QBCC_LICENSE} &bull; ABN 88 642 795 819</p>
        </div>
        <div>
          <h4 style="color:#ffffff;font-size:1rem;font-weight:800;margin-bottom:0.75rem;font-family:Outfit,sans-serif;">Workshop & Contact</h4>
          <p style="margin:0 0 0.5rem 0;"><strong>Address:</strong> ${WORKSHOP_ADDRESS}</p>
          <p style="margin:0 0 0.5rem 0;"><strong>Phone:</strong> <a href="${PHONE_TEL}" style="color:#fbbf24;text-decoration:none;font-weight:700;">${PHONE_NUMBER}</a></p>
          <p style="margin:0 0 0.5rem 0;"><strong>Hours:</strong> Mon – Fri: 9:00 AM – 4:00 PM</p>
          <p style="margin:0;"><strong>Email:</strong> sales@customautogates.com.au</p>
        </div>
        <div>
          <h4 style="color:#ffffff;font-size:1rem;font-weight:800;margin-bottom:0.75rem;font-family:Outfit,sans-serif;">Gate Categories</h4>
          <ul style="list-style:none;padding:0;margin:0;line-height:1.9;">
            <li><a href="/driveway-gates" style="color:#cbd5e1;text-decoration:none;">Automatic Driveway Gates</a></li>
            <li><a href="/automatic-sliding-gates" style="color:#cbd5e1;text-decoration:none;">Sliding Gates</a></li>
            <li><a href="/swing-gates" style="color:#cbd5e1;text-decoration:none;">Swing & Bi-Fold Gates</a></li>
            <li><a href="/fencing" style="color:#cbd5e1;text-decoration:none;">Slat & Pool Fencing</a></li>
            <li><a href="/solar-gates" style="color:#cbd5e1;text-decoration:none;">Solar Acreage Gates</a></li>
            <li><a href="/commercial-gates" style="color:#cbd5e1;text-decoration:none;">Commercial Cantilever Gates</a></li>
            <li><a href="/service" style="color:#cbd5e1;text-decoration:none;">Gate Repairs & Motor Service</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#ffffff;font-size:1rem;font-weight:800;margin-bottom:0.75rem;font-family:Outfit,sans-serif;">Service Regions</h4>
          <ul style="list-style:none;padding:0;margin:0;line-height:1.9;">
            <li><a href="/gates-brisbane" style="color:#cbd5e1;text-decoration:none;">Brisbane Automatic Gates</a></li>
            <li><a href="/gates-ipswich" style="color:#cbd5e1;text-decoration:none;">Ipswich & Yamanto Gates</a></li>
            <li><a href="/gates-logan" style="color:#cbd5e1;text-decoration:none;">Logan & Redlands Gates</a></li>
            <li><a href="/gates-gold-coast" style="color:#cbd5e1;text-decoration:none;">Gold Coast Automatic Gates</a></li>
            <li><a href="/pricing-guide" style="color:#cbd5e1;text-decoration:none;">2026 Pricing Guide</a></li>
            <li><a href="/council-guide" style="color:#cbd5e1;text-decoration:none;">QLD Council & Pool Rules</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#ffffff;font-size:1rem;font-weight:800;margin-bottom:0.75rem;font-family:Outfit,sans-serif;">Residential Suburbs</h4>
          <ul style="list-style:none;padding:0;margin:0;line-height:1.9;">
            <li><a href="/gates-fencing-carindale" style="color:#cbd5e1;text-decoration:none;">Carindale Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-camp-hill" style="color:#cbd5e1;text-decoration:none;">Camp Hill Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-rochedale" style="color:#cbd5e1;text-decoration:none;">Rochedale Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-wishart" style="color:#cbd5e1;text-decoration:none;">Wishart Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-mansfield" style="color:#cbd5e1;text-decoration:none;">Mansfield Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-capalaba" style="color:#cbd5e1;text-decoration:none;">Capalaba Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-gumdale" style="color:#cbd5e1;text-decoration:none;">Gumdale Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-wavell-heights" style="color:#cbd5e1;text-decoration:none;">Wavell Heights Gates &amp; Fencing</a></li>
            <li><a href="/gates-fencing-pullenvale" style="color:#cbd5e1;text-decoration:none;">Pullenvale Gates &amp; Fencing</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem;text-align:center;font-size:0.8rem;color:#94a3b8;">
        &copy; ${new Date().getFullYear()} Custom Auto Gates Pty Ltd &bull; All Rights Reserved &bull; <a href="/privacy-policy" style="color:#cbd5e1;text-decoration:underline;">Privacy Policy</a> &bull; <a href="/llms.txt" style="color:#cbd5e1;text-decoration:underline;">AI Context (llms.txt)</a>
      </div>
    </footer>
  `;
}

// Master Pre-Render Generator Function
export function renderRouteHtml(path) {
  const cleanPath = (path || '/').toLowerCase().replace(/\/$/, '') || '/';

  // Common pricing table
  const defaultPricing = [
    { title: 'Automatic Sliding Gate Package', price: '$3,850 – $7,900', notes: 'Includes heavy-duty aluminium frame, ground track/cantilever, high-speed motor & 2 remotes.' },
    { title: 'Double Swing Automatic Gates', price: '$4,200 – $8,800', notes: 'Mirrored dual leaf gate with Italian linear rams or articulated arms, hinges & ground stops.' },
    { title: 'Off-Grid Solar Acreage System', price: '$5,200 – $9,500', notes: 'Zero trenching needed! Tier-1 solar panel, weatherproof battery enclosure & 5-7 days reserve.' },
    { title: 'Commercial Cantilever Security Gate', price: '$8,500 – $18,000+', notes: 'Heavy industrial continuous-duty automation, vehicle loops, access control & AS1725 compliance.' }
  ];

  // Common council rules text
  const defaultCouncil = `
    <p><strong>Brisbane City Council (BCC) & Ipswich City Council (ICC) Regulations:</strong></p>
    <ul style="padding-left:1.25rem;line-height:1.7;">
      <li><strong>Front Boundary Height:</strong> Solid fence structures cannot exceed 1.2 metres in height along street frontages. Gates up to 1.8 metres are permitted provided they maintain at least <strong>50% visual transparency</strong> (e.g. open aluminium slat spacing).</li>
      <li><strong>Road Reserve & Footpaths:</strong> Automatic gates must never swing outwards over council footpaths or road reserves. All driveway gates must open entirely within your legal property boundary.</li>
      <li><strong>Pool Safety Compliance (AS 1926.1):</strong> If a gate forms part of a pool safety barrier, it must swing outwards away from the pool, self-close and self-latch from any open position, and have the latch located at least 1,500mm above finished ground level.</li>
    </ul>
  `;

  // Common suburbs list
  const seqSuburbs = [
    { name: 'Yamanto', postcode: '4305' }, { name: 'Ipswich', postcode: '4305' }, { name: 'Springfield Lakes', postcode: '4300' },
    { name: 'Brookwater', postcode: '4300' }, { name: 'Ripley', postcode: '4306' }, { name: 'Karalee', postcode: '4306' },
    { name: 'New Farm', postcode: '4005' }, { name: 'Ascot', postcode: '4007' }, { name: 'Hamilton', postcode: '4007' },
    { name: 'Paddington', postcode: '4064' }, { name: 'Bulimba', postcode: '4171' }, { name: 'Kenmore', postcode: '4069' },
    { name: 'Pullenvale', postcode: '4069' }, { name: 'Brookfield', postcode: '4069' }, { name: 'Chermside', postcode: '4032' },
    { name: 'Sunnybank', postcode: '4109' }, { name: 'Springwood', postcode: '4127' }, { name: 'Berrinba', postcode: '4117' },
    { name: 'Browns Plains', postcode: '4118' }, { name: 'Greenbank', postcode: '4124' }, { name: 'Hope Island', postcode: '4212' },
    { name: 'Southport', postcode: '4215' }, { name: 'Coomera', postcode: '4209' }, { name: 'Surfers Paradise', postcode: '4217' }
  ];

  // =========================================================================
  // ROUTE 0: ARCHITECTURAL FENCING (/fencing)
  // =========================================================================
  if (cleanPath === '/fencing') {
    const h1 = 'Architectural Fencing Brisbane | Aluminium Slat & Boundary Fences';
    const subtitle = 'Custom designed and manufactured architectural aluminium boundary fencing, privacy slat screens, pool safety fencing, and matching pedestrian gates. Engineered for Brisbane, Ipswich, and Gold Coast homes with a 10-year structural warranty.';
    const heroImage = '/images/aluminum-fencing.jpg';
    const galleryImages = [
      { src: '/images/aluminum-fencing.jpg', alt: 'Architectural aluminium horizontal slat fencing Brisbane' },
      { src: '/images/gallery/imgur-01-KvcLWwl.jpeg', alt: 'Modern boundary fence with integrated pedestrian gate' },
      { src: '/images/gallery/imgur-06-ic4DkjV.jpeg', alt: 'Black powdercoated privacy slat boundary fence' },
      { src: '/images/gallery/imgur-10-HBAhNBc.jpeg', alt: 'Vertical blade architectural screen fencing' }
    ];
    const specs = [
      { label: 'Aluminium Material', value: 'Marine-grade 6060-T6 architectural structural alloy (100% rust-proof & non-combustible)' },
      { label: 'Slat Profiles', value: '65mm x 16mm or 90mm x 16mm extruded aluminium slats with reinforced internal ribs' },
      { label: 'Spacing & Gaps', value: '10mm, 20mm, 40mm, or solid tongue-and-groove louvres (custom spacing available)' },
      { label: 'Powdercoat Finish', value: 'Dulux / Interpon architectural powdercoating (Monument, Surfmist, Black, Basalt) or DecoWood timber grain' },
      { label: 'Pedestrian Hardware', value: 'D&D Technologies MagnaLatch, LokkLatch, Locinox mechanical keypads & electric release strikes' },
      { label: 'Structural Warranty', value: '10-Year Factory Structural Warranty on all fabrication and welding' }
    ];
    const faqs = [
      { q: 'How does aluminium slat fencing compare to timber or Colorbond steel in Brisbane?', a: 'Aluminium slat fencing is vastly superior in South East Queensland’s harsh climate. Timber requires annual staining, rots in summer rains, and attracts termites. Colorbond sheet fencing acts like a solid sail in storms and can rust at ground contact. Marine-grade aluminium never rots, warps, or rusts, withstands gale winds with ease, and requires zero painting maintenance for decades.' },
      { q: 'Does your front slat fencing comply with Brisbane City Council rules?', a: 'Yes. Brisbane City Council allows front boundary fencing up to 1.8 metres high as long as it maintains at least 50% open visual transparency (or 1.2m if solid). Our 65mm slats spaced with 10mm to 20mm gaps meet BCC requirements while blocking sightlines into your living areas from the street.' },
      { q: 'Can our front fencing match our automatic driveway gate exactly?', a: 'Yes! Because Custom Auto Gates manufactures both the automated driveway gate and the boundary fencing in our Yamanto factory, we ensure exact matching slat dimensions, gap spacing, post sections, and genuine Dulux powdercoating colour codes.' },
      { q: 'How much does custom aluminium slat fencing cost in Brisbane?', a: 'Custom aluminium slat fencing typically ranges from $220 to $380 per linear metre fully fabricated and installed, depending on fence height, slat gap spacing, and whether concrete core-drilling or post footings are required. Buying factory-direct from our workshop eliminates middleman builder markups.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Factory Direct Architectural Slat Fencing</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
              <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                <span>🛡️ 10-Yr Structural Warranty</span>
                <span>🏭 100% Rust-Proof Marine Aluminium</span>
                <span>⭐ 4.9★ Over 180 Verified Reviews</span>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" fetchpriority="high" decoding="sync" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories(cleanPath)}
          ${renderProjectGallery(galleryImages)}

          <section class="overview-section" style="margin:3rem 0;background:#111a2e;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:2rem;">
            <h2 style="font-size:1.5rem;font-weight:800;color:#ffffff;font-family:Outfit,sans-serif;margin-top:0;margin-bottom:1rem;">Architectural Aluminium Fencing & Privacy Screens Built for Queensland Homes</h2>
            <p style="font-size:1rem;line-height:1.7;color:#cbd5e1;margin-bottom:1rem;">Front boundary fencing defines the street appeal, privacy, and security of your home. At Custom Auto Gates, we manufacture premium architectural aluminium slat fencing, vertical blade panels, decorative privacy screens, and pool safety fences directly from our Yamanto workshop. Unlike timber fencing that rots, warps, and attracts termites, or Colorbond steel that can rust near coastal areas, our marine-grade structural aluminium fencing never rusts or degrades.</p>
            <p style="font-size:1rem;line-height:1.7;color:#cbd5e1;margin-bottom:1rem;">We tailor every fencing panel to your property’s exact dimensions, slopes, and architectural style. Whether you are modernising a post-war home, building a new contemporary masterpiece, or enclosing your front yard to give children and pets a safe play area, our fencing seamlessly integrates with our custom automated driveway sliding and swing gates for a cohesive, factory-matched aesthetic.</p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-top:2rem;">
              <div style="background:#090e1a;padding:1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <h3 style="font-size:1rem;font-weight:800;color:#fbbf24;margin-top:0;margin-bottom:0.4rem;">Horizontal Slat Fencing</h3>
                <p style="font-size:0.88rem;color:#94a3b8;line-height:1.6;margin:0;">65mm or 90mm slat profiles with customizable 10mm–20mm spacing meeting BCC 50% transparency rules.</p>
              </div>
              <div style="background:#090e1a;padding:1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <h3 style="font-size:1rem;font-weight:800;color:#fbbf24;margin-top:0;margin-bottom:0.4rem;">Vertical Blade & 3D Battens</h3>
                <p style="font-size:0.88rem;color:#94a3b8;line-height:1.6;margin:0;">Contemporary aerofoil fins and box battens offering dynamic shadow lines and premium Hamptons curb appeal.</p>
              </div>
              <div style="background:#090e1a;padding:1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <h3 style="font-size:1rem;font-weight:800;color:#fbbf24;margin-top:0;margin-bottom:0.4rem;">Certified Pool Safety Fencing</h3>
                <p style="font-size:0.88rem;color:#94a3b8;line-height:1.6;margin:0;">AS1926.1 compliant safety fencing with MagnaLatch magnetic latches and hydraulic self-closing hinges.</p>
              </div>
              <div style="background:#090e1a;padding:1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <h3 style="font-size:1rem;font-weight:800;color:#fbbf24;margin-top:0;margin-bottom:0.4rem;">Rendered Pier Infills & Pedestrian Gates</h3>
                <p style="font-size:0.88rem;color:#94a3b8;line-height:1.6;margin:0;">Custom infill panels fitted between brick pillars, with integrated keyless digital keypads and intercom pillars.</p>
              </div>
            </div>
          </section>

          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE: RESIDENTIAL SUBURBS (/gates-fencing-carindale, etc.)
  // =========================================================================
  if (cleanPath.startsWith('/gates-fencing-')) {
    const suburbSlug = cleanPath.replace('/gates-fencing-', '');
    const data = RESIDENTIAL_SUBURBS_DATA[suburbSlug];
    if (data) {
      const heroImage = data.heroImage || '/images/custom-automated-sliding-gate-brisbane.jpg';
      const galleryImages = data.galleryImages || [];
      const specs = [
        { label: 'Aluminium Alloy', value: 'Marine-Grade 6060-T6 Architectural Structural Alloy (Rust-Proof)' },
        { label: 'Slat Dimensions', value: '65mm x 16mm or 90mm x 16mm with 10mm–20mm compliant spacing' },
        { label: 'Automation Motors', value: 'Centurion D5 Smart, Nice Robus, Italian linear actuators with dual battery backup' },
        { label: 'Finishes', value: 'Dulux Architectural Powdercoat (Monument, Surfmist, Black) & DecoWood' },
        { label: 'Local Council', value: data.council },
        { label: 'Warranty', value: '10-Year Factory Structural Warranty' }
      ];

      return `
        <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
          ${renderHeader()}
          <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
            <nav aria-label="Breadcrumb" style="font-size:0.85rem;color:#94a3b8;margin-bottom:1.5rem;">
              <a href="/" style="color:#94a3b8;text-decoration:none;">Home</a> &gt; 
              <a href="/gates-brisbane" style="color:#94a3b8;text-decoration:none;">Brisbane</a> &gt; 
              <span style="color:#fbbf24;font-weight:700;">${data.suburbName}</span>
            </nav>

            <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
              <div>
                <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">${data.badge}</span>
                <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${data.h1}</h1>
                <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${data.subtitle}</p>
                <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                  <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
                  <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
                </div>
                <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                  <span>🛡️ 10-Yr Structural Warranty</span>
                  <span>🏭 Yamanto Workshop Direct</span>
                  <span>⭐ 4.9★ Over 180 Verified Reviews</span>
                </div>
              </div>
              <div>
                <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                  <img src="${heroImage}" alt="${data.h1}" width="800" height="450" loading="eager" fetchpriority="high" decoding="sync" style="width:100%;height:auto;display:block;" />
                </div>
              </div>
            </section>

            ${renderGateCategories(cleanPath)}
            ${renderProjectGallery(galleryImages)}

            <section class="overview-section" style="margin:3rem 0;background:#111a2e;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:2rem;">
              <h2 style="font-size:1.5rem;font-weight:800;color:#ffffff;font-family:Outfit,sans-serif;margin-top:0;margin-bottom:1rem;">${data.overviewHeading}</h2>
              ${data.overviewParagraphs.map(p => `<p style="font-size:1rem;line-height:1.7;color:#cbd5e1;margin-bottom:1rem;">${p}</p>`).join('')}
              
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-top:2rem;">
                ${data.popularSolutions.map(sol => `
                  <div style="background:#090e1a;padding:1.25rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                    <h3 style="font-size:1rem;font-weight:800;color:#fbbf24;margin-top:0;margin-bottom:0.4rem;">${sol.title}</h3>
                    <p style="font-size:0.88rem;color:#94a3b8;line-height:1.6;margin:0;">${sol.description}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            ${renderAccordions({
              specs,
              pricing: defaultPricing,
              council: `<p><strong>${data.council} Fencing Regulations for ${data.suburbName}:</strong></p><p>${data.councilRules}</p>`,
              suburbs: (data.localStreets || []).map(st => ({ name: st, postcode: data.postcode })),
              faqs: data.faqs
            })}
          </main>
          ${renderFooter()}
        </div>
      `;
    }
  }

  // =========================================================================
  // ROUTE 1: DRIVEWAY GATES (/driveway-gates)
  // =========================================================================
  if (cleanPath === '/driveway-gates') {
    const h1 = 'Automatic Driveway Gates Brisbane | Custom Electric Driveway Gates';
    const subtitle = 'Custom designed, manufactured and automated electric driveway gates for Brisbane, Ipswich and Gold Coast homes. Sliding, double swing, and space-saving telescopic designs engineered with a 10-year structural warranty.';
    const heroImage = '/images/custom-automated-sliding-gate-brisbane.jpg';
    const galleryImages = [
      { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Automatic driveway gate installation Brisbane' },
      { src: '/images/Sliding-Gates.jpg', alt: 'Custom aluminium electric driveway gate' },
      { src: '/images/Swinging-Gates.jpg', alt: 'Grand double swing driveway gate entrance' },
      { src: '/images/Dayboro-Design-Slide.webp', alt: 'Architectural residential driveway gate' }
    ];
    const specs = [
      { label: 'Frame Construction', value: 'Heavy-duty 50x50mm, 65x65mm or 100x50mm structural marine aluminium' },
      { label: 'Infill Finishes', value: 'Horizontal/vertical slats, 3D battens, laser cut architectural screens, louvres' },
      { label: 'Driveway Automation', value: 'Centurion D5/D10 Smart, Nice Robus, BFT & FAAC high-speed motors' },
      { label: 'Opening Speed', value: 'Up to 400mm/sec with soft-start & soft-stop obstruction sensing' },
      { label: 'Smart Access Control', value: 'Smartphone app (iOS/Android), Apple CarPlay, wireless 4G intercom & keypads' },
      { label: 'Safety Systems', value: 'Dual infrared safety beams, auto-reverse obstruction detection, manual release key' }
    ];
    const faqs = [
      { q: 'What is the best automatic gate design for a wide driveway?', a: 'For driveway openings wider than 5 to 6 metres, a telescopic sliding gate or a cantilever trackless sliding gate is typically best. Telescopic gates split the span across two or three overlapping panels, cutting required slide-back clearance in half. For rural properties, double swing gates spanning up to 8 metres provide a grand entrance without ground tracks.' },
      { q: 'Can an electric driveway gate be installed on a steep incline?', a: 'Yes. For sideways driveway crossfalls, we fabricate raked sliding gates where the bottom rail matches the exact slope of your driveway. For upward inclines, we engineer outward-swinging double gates (where legal), bi-fold folding gates, or trackless cantilever sliding systems.' },
      { q: 'How much does a custom automatic driveway gate cost in Brisbane?', a: 'Fully installed custom automatic driveway gates in Brisbane typically range from $3,800 to $7,500 for standard 4m–5m sliding gates, and $4,500 to $9,000 for automated double swing gates. Buying factory-direct from our Yamanto workshop eliminates middleman reseller markups, saving homeowners between $1,200 and $2,500.' },
      { q: 'What happens to my electric driveway gate during a power outage?', a: 'All our electric gate motors are equipped with internal 12V or 24V rechargeable battery backups that seamlessly power the gate for 30 to 50 cycles during blackouts. Every motor also includes a mechanical keyed override for instant manual release.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Brisbane & SEQ #1 Driveway Choice</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
              <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                <span>🛡️ 10-Yr Structural Warranty</span>
                <span>🏭 Yamanto Workshop Direct</span>
                <span>⭐ 4.9★ Over 180 Reviews</span>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/driveway-gates')}
          ${renderProjectGallery(galleryImages)}
          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 2: AUTOMATIC SLIDING GATES (/automatic-sliding-gates & /sliding-gates)
  // =========================================================================
  if (cleanPath === '/automatic-sliding-gates' || cleanPath === '/sliding-gates') {
    const h1 = 'Automatic Sliding Gates Brisbane | Factory Direct [From $3,850]';
    const subtitle = 'Custom built automatic sliding gates engineered for Brisbane homes and commercial properties. Space-saving, smooth-glide rack & pinion smart automation with a 10-year structural warranty.';
    const heroImage = '/images/Sliding-Gates.jpg';
    const galleryImages = [
      { src: '/images/Sliding-Gates.jpg', alt: 'Monument aluminium sliding driveway gate Brisbane' },
      { src: '/images/Dayboro-Design-Slide.webp', alt: 'Dayboro custom automatic sliding gate' },
      { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Architectural custom sliding gate installation Brisbane' },
      { src: '/images/Bundamba-Aluminium-Sliding-Gate.webp', alt: 'Bundamba horizontal slat sliding gate' }
    ];
    const specs = [
      { label: 'Frame Construction', value: 'Heavy-duty 50x50mm or 100x50mm marine-grade structural aluminium' },
      { label: 'Infill Styles', value: '65mm / 90mm horizontal slats, 3D louvres, laser cut decorative screens, 3D battens' },
      { label: 'Automation Motors', value: 'Centurion D5 Smart / D10 Smart, Nice Robus, BFT Deimos (Battery backup standard)' },
      { label: 'Speed & Cycle Rate', value: 'High-speed 400mm/sec opening speed; up to 150 cycles/day' },
      { label: 'Access Control', value: 'Smartphone app (iOS/Android), Apple CarPlay, 4G wireless intercom, long-range remotes' },
      { label: 'Safety Protection', value: 'Dual infrared safety beams, auto-reverse obstruction sensing, manual override key' }
    ];
    const faqs = [
      { q: 'Can a sliding gate be installed on a driveway that slopes sideways?', a: 'Yes! We custom design "raked" sliding gates where the bottom rail is welded at the exact angle of your driveway crossfall, while keeping the top rail perfectly horizontal. For severe inclines, a cantilever trackless system is the ideal engineering solution.' },
      { q: 'What happens to my automatic sliding gate during a power outage or storm?', a: 'All our automated sliding gate motors include internal rechargeable 12V/24V battery backups. Your gate will continue opening and closing normally for 30 to 50 cycles during a blackout. Every gate also includes an emergency manual release key.' },
      { q: 'How much slide-back clearance do I need beside the driveway?', a: 'A standard track sliding gate requires the width of the driveway opening plus 400mm for the motor tail. If your boundary wall is shorter than this, our telescopic sliding gate system splits the gate into 2 overlapping leaves, cutting required clearance almost in half.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Brisbane & SEQ #1 Most Popular</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
              <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                <span>🛡️ 10-Yr Structural Warranty</span>
                <span>⚡ High-Speed Centurion Motor</span>
                <span>⭐ 4.9★ Over 180 Reviews</span>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/automatic-sliding-gates')}
          ${renderProjectGallery(galleryImages)}
          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 3: SWING GATES (/swing-gates)
  // =========================================================================
  if (cleanPath === '/swing-gates') {
    const h1 = 'Automatic Swing Gates Brisbane & Gold Coast | Double & Bi-Fold Electric Gates';
    const subtitle = 'Custom single, double swing & bi-fold automatic gates factory fabricated in Yamanto. Architectural beauty, whisper-quiet high-torque motors, and premium magnetic security locks with a 10-year warranty.';
    const heroImage = '/images/Swinging-Gates.jpg';
    const galleryImages = [
      { src: '/images/Swinging-Gates.jpg', alt: 'Double swing automated entrance gate Brisbane' },
      { src: '/images/swing-gates8.jpg', alt: 'Custom aluminium swing gates with matching boundary fence' },
      { src: '/images/swing-gates7.jpg', alt: 'Black dual swing driveway gates Gold Coast' },
      { src: '/images/swing-gates13.jpg', alt: 'Prestige Hamptons swing gates Ascot Brisbane' }
    ];
    const specs = [
      { label: 'Hinge System', value: 'Heavy-duty stainless steel ball-bearing pivot hinges (rated to 800kg load)' },
      { label: 'Motor Actuators', value: 'Linear worm-drive rams, articulated arms, or concealed underground in-ground motors' },
      { label: 'Locking Strength', value: 'Mechanical self-locking gearboxes + optional 500kg magnetic lock' },
      { label: 'Power Options', value: '240V mains with battery backup OR 100% off-grid high-capacity solar kit' },
      { label: 'Finish', value: 'Dulux architectural powdercoat (Monument, Surfmist, Dune, White) or DecoWood timber finish' },
      { label: 'Warranty', value: '10-Year Factory Structural Warranty on fabrication; 2-3 Year motor manufacturer warranty' }
    ];
    const faqs = [
      { q: 'Can swing gates open outwards towards the road?', a: 'Yes, swing gates can be engineered to open outwards if your driveway slopes steeply upwards into your property. However, Queensland council regulations strictly forbid gates from swinging over council footpaths or road reserves, so your boundary must be set back adequately.' },
      { q: 'Can swing gates handle strong Brisbane summer storm winds?', a: 'Yes. For windy areas (like Brisbane riverfronts, bayside, or open acreage), we engineer the gates with 50% open slat permeability to let wind pass through, and pair them with heavy-duty commercial linear ram motors with hydraulic or worm-drive locking.' },
      { q: 'How fast do automatic double swing gates open?', a: 'High-speed smart actuators typically open 90 degrees in approximately 12 to 16 seconds. Bi-fold gates open in as little as 7 to 9 seconds.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Grand Architectural Entrance</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
              <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                <span>🛡️ 10-Yr Structural Warranty</span>
                <span>🔒 500kg Magnetic Lock Option</span>
                <span>⭐ 4.9★ Over 180 Reviews</span>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/swing-gates')}
          ${renderProjectGallery(galleryImages)}
          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 4: SOLAR GATES (/solar-gates)
  // =========================================================================
  if (cleanPath === '/solar-gates') {
    const h1 = 'Solar Automatic Gates Brisbane | 100% Off-Grid Electric Acreage Gates';
    const subtitle = 'Reliable, off-grid solar automatic gates engineered for acreage, rural properties, and long driveways across South East Queensland. Zero electrical trenching fees required.';
    const heroImage = '/images/solar-gate-installation-1.jpg';
    const galleryImages = [
      { src: '/images/solar-gate-installation-1.jpg', alt: 'Acreage solar powered double swing gate installation' },
      { src: '/images/solar-gate-installation-2.jpg', alt: 'Heavy duty solar panel and battery enclosure for automatic gate' },
      { src: '/images/solar-gate-installation-3.jpg', alt: 'Pullenvale rural solar electric gate' }
    ];
    const specs = [
      { label: 'Solar Collector', value: '40W to 80W high-efficiency tier-1 monocrystalline solar panel on galvanised pole mount' },
      { label: 'Battery Bank', value: 'Dual 12V 18Ah – 35Ah deep-cycle AGM batteries in weatherproof lockable steel enclosure' },
      { label: 'Autonomous Reserve', value: '5 to 7 days of operation without direct sunlight (cloudy/rainy weather buffer)' },
      { label: 'Motor Voltage', value: 'Ultra-low standby drain 12V or 24V DC commercial-grade motors' },
      { label: 'Remote Control Range', value: 'Extended-range encrypted remote keyfobs (up to 80m – 100m line of sight)' },
      { label: 'Accessories', value: 'Solar wireless push-button exit wands, keypads, 4G cellular intercoms, and safety beams' }
    ];
    const faqs = [
      { q: 'Will my solar gate stop working during extended cloudy or rainy periods?', a: 'No. We deliberately oversize our solar collectors and battery banks for South East Queensland weather patterns. The battery system stores enough reserve power to operate the gate for 5 to 7 days of normal daily use (up to 30 cycles per day) even with zero sunlight.' },
      { q: 'How far away can the solar panel be placed from the gate?', a: 'If your gate is located in a heavily shaded tree canopy, we can mount the solar panel up to 25 metres away in a sunny location using heavy-gauge low-voltage UV-stabilized cabling.' },
      { q: 'Can visitors still buzz me if the gate is 200m from my house?', a: 'Yes! We install 4G cellular wireless intercoms directly into the solar gate pillar. When a visitor presses the intercom, it dials your mobile phone or landline directly. You can speak with them and press a button on your phone to open the gate.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">100% Off-Grid Acreage Specialist</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
              <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                <span>☀️ Zero Electrical Trenching</span>
                <span>🔋 5-7 Days Battery Autonomy</span>
                <span>⭐ 4.9★ Over 180 Reviews</span>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/solar-gates')}
          ${renderProjectGallery(galleryImages)}
          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 5: COMMERCIAL GATES (/commercial-gates)
  // =========================================================================
  if (cleanPath === '/commercial-gates') {
    const h1 = 'Commercial Gates Brisbane & Ipswich | Security Cantilever & Boom Gates';
    const subtitle = 'Heavy-duty commercial cantilever gates, automated boom barriers, high-cycle sliding gates and industrial access control. Custom engineered and fabricated in Yamanto for logistics depots, commercial properties, and industrial sites across Brisbane, Ipswich & Logan.';
    const heroImage = '/images/Sliding-Gates.jpg';
    const galleryImages = [
      { src: '/images/Sliding-Gates.jpg', alt: 'Heavy duty commercial cantilever sliding gate' },
      { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Commercial security perimeter gate Brisbane' },
      { src: '/images/Swinging-Gates.jpg', alt: 'Industrial security double swing gates' },
      { src: '/images/Dayboro-Design-Slide.webp', alt: 'Strata complex automatic access gate' }
    ];
    const specs = [
      { label: 'Engineering Standard', value: 'AS 1725 heavy commercial perimeter fencing & cantilever gate standards' },
      { label: 'Gate Drive Systems', value: 'Continuous-duty 100% industrial inverters rated up to 1,500kg and 1,000 cycles/day' },
      { label: 'Cantilever Carriage', value: 'Heavy-gauge internal roller carriages trackless system unaffected by debris' },
      { label: 'Access Integration', value: 'RFID card readers, 4G GSM intercoms, ANPR number plate recognition, induction vehicle loops' },
      { label: 'Safety Protections', value: 'Multi-layer infrared photocell beams, resistive rubber safety edges, emergency fire trip override' },
      { label: 'Structural Warranty', value: '10-Year Factory Structural Warranty; 2-Year Commercial automation warranty' }
    ];
    const faqs = [
      { q: 'Why is a cantilever gate better than a tracked gate for commercial depots?', a: 'Cantilever gates require zero ground track across the driveway opening. Semi-trailers and forklifts can drive through without damaging tracks, and gravel, dirt, or mud cannot jam the gate wheels because the gate is suspended entirely in mid-air.' },
      { q: 'Can your boom gates and commercial gates integrate with our security access system?', a: 'Yes. Our automated gate logic controllers feature standard dry contact and Wiegand relays that interface seamlessly with all commercial security systems, including RFID badges, wireless UHF long-range tags, intercoms, and fire service emergency release switches.' },
      { q: 'What is the turnaround time for a custom commercial gate installation?', a: 'Standard commercial gate fabrication typically takes 2 to 3 weeks from engineering sign-off, with rapid 1 to 2 day on-site commissioning to minimize disruption to your operational site.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Industrial & High-Cycle Security</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Request Commercial Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
              <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
                <span>🏭 AS 1725 Engineering</span>
                <span>🔄 1,000+ Daily Duty Cycles</span>
                <span>🛡️ QBCC Licensed #15579753</span>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/commercial-gates')}
          ${renderProjectGallery(galleryImages)}
          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 6: SERVICE & REPAIRS (/service & /repairs)
  // =========================================================================
  if (cleanPath === '/service' || cleanPath === '/repairs') {
    const h1 = 'Electric & Automatic Gate Repairs Brisbane | Gate Motor Service';
    const subtitle = 'Fast electric gate repairs across Brisbane, Ipswich, Logan and Gold Coast. Specialist motor replacements (Centurion, Nice, BFT, FAAC), track replacements, safety beam alignments, and emergency response | QBCC #15579753: (07) 3102 1801.';
    const heroImage = '/images/Sliding-Gates.jpg';
    const specs = [
      { label: 'Diagnostic Callout', value: 'Comprehensive electrical, mechanical and radio frequency diagnostics' },
      { label: 'Motor Brands Serviced', value: 'Centurion Smart, Nice Robus, BFT, FAAC, DEA, CAME, Merlin, ATA, Elsema' },
      { label: 'Common Repairs', value: 'Worn rack/rollers, blown capacitors, misaligned safety sensors, burnt logic boards' },
      { label: 'Emergency Response', value: 'Rapid priority technician dispatch across Greater Brisbane & Ipswich' }
    ];
    const faqs = [
      { q: 'Why is my electric gate not opening or closing?', a: 'Common causes include dirty or obstructed safety infrared beams, insect/ant damage inside the logic control board, flat backup batteries, or mechanical track obstruction. Our service technicians carry genuine replacement parts to fix most faults on the spot.' },
      { q: 'Can you replace my old broken gate motor with a modern smart motor?', a: 'Yes! We specialise in upgrading old, discontinued motors to high-speed Centurion D5/D10 Smart systems with smartphone app control, battery backup, and high-security remote keyfobs.' },
      { q: 'How much does an automatic gate repair callout cost in Brisbane?', a: 'Standard diagnostic service visits start at $198 incl. GST covering comprehensive on-site fault finding, limit switch calibration, safety beam alignment, and minor mechanical adjustments.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Emergency Repairs & Servicing</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Call Repair Dispatch: ${PHONE_NUMBER}</a>
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Book Service Online</a>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/service')}
          ${renderAccordions({ specs, pricing: defaultPricing, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 7: PRICING GUIDE (/pricing-guide)
  // =========================================================================
  if (cleanPath === '/pricing-guide') {
    const h1 = 'Automatic Gate Costs & Pricing Guide Brisbane [2026 Prices]';
    const subtitle = 'Complete 2026 automatic gate price guide for Brisbane and South East Queensland ($3,800–$12,500+). Transparent factory-direct prices on sliding gates, double swing gates, solar off-grid systems, and fencing.';
    const heroImage = '/images/Sliding-Gates.jpg';
    const specs = [
      { label: 'Single Leaf Sliding Gate', value: '$3,850 – $7,200 fully installed with motor' },
      { label: 'Double Swing Electric Gates', value: '$4,200 – $8,800 fully installed with dual motors' },
      { label: 'Solar Acreage Gate Package', value: '$5,200 – $9,500 complete with solar panel and battery bank' },
      { label: 'Cantilever Trackless Gate', value: '$6,500 – $14,000 depending on opening span & infill style' }
    ];
    const faqs = [
      { q: 'How much do automatic gates cost in Brisbane?', a: 'Standard residential automatic gates typically cost between $3,800 and $7,500 for a 4m–5m sliding gate with motor, or $4,200 to $8,800 for automated double swing gates. By manufacturing factory direct in Yamanto, we save homeowners $1,200+ on middleman retail margins.' },
      { q: 'Does your pricing include installation and electrical work?', a: 'Yes. Our quotes provide complete turn-key pricing including laser measure, CAD shop drawings, aluminium fabrication, powdercoating, track excavation/concreting, motor installation, wiring, safety beams, and remote programming.' },
      { q: 'Is there a warranty on your automatic gates?', a: 'Yes. We provide an ironclad 10-Year Factory Structural Warranty on all gate frames and welding, plus full 2 to 3-year manufacturer warranties on all automated gate motors.' }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">2026 Transparent Price Guide</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Your Exact Price Quote</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories('/pricing-guide')}
          ${renderAccordions({ specs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 8-11: SUBURB LANDING PAGES (Brisbane, Ipswich, Logan, Gold Coast)
  // =========================================================================
  if (cleanPath === '/gates-brisbane' || cleanPath === '/gates-ipswich' || cleanPath === '/gates-logan' || cleanPath === '/gates-gold-coast') {
    let regionName = 'Brisbane';
    let h1 = 'Custom Automatic Gates & Fencing Brisbane | Electric Driveway Gates';
    let subtitle = 'Factory direct custom aluminium sliding gates, dual swing gates, solar gates, and architectural slat fencing. Measured, fabricated, and installed across Brisbane Northside, Southside, and Western suburbs.';
    let heroImage = '/images/Sliding-Gates.jpg';

    if (cleanPath === '/gates-ipswich') {
      regionName = 'Ipswich & Yamanto';
      h1 = 'Custom Automatic Gates & Fencing Ipswich | Yamanto Factory Direct';
      subtitle = 'Buy direct from the manufacturer! Our state-of-the-art workshop is located at Shed 2, 43-45 Belar St, Yamanto. Eliminating middleman markups for Ipswich, Springfield, Brookwater, and Ripley homeowners.';
    } else if (cleanPath === '/gates-logan') {
      regionName = 'Logan & Redlands';
      h1 = 'Automatic Gates & Security Fencing Logan | Driveway & Commercial Gates';
      subtitle = 'Engineered for commercial security parks, residential estates, and acreage properties across Logan, Springwood, Berrinba, Browns Plains, and coastal Redland Bay.';
    } else if (cleanPath === '/gates-gold-coast') {
      regionName = 'Gold Coast';
      h1 = 'Custom Automatic Gates Gold Coast | Marine Grade Aluminium Automation';
      subtitle = 'Engineered specifically for coastal Queensland conditions. 100% corrosion-resistant 6060-T6 aluminium alloy, marine-grade powdercoating, and high-speed smart gate automation for Gold Coast homes, strata, and canal estates.';
    }

    const faqs = [
      { q: `How quickly can you measure and install automatic gates in ${regionName}?`, a: `We provide free on-site measures across ${regionName} within 24 to 48 hours. Typical fabrication takes 2 weeks from CAD approval, followed by a fast 1-day installation.` },
      { q: `Do your gates comply with local ${regionName} council fence regulations?`, a: `Yes. All our gate designs and front boundary slat fences comply with Queensland council setback guidelines, 50% open visual permeability for fences over 1.2m, and AS1926.1 pool safety barrier standards.` },
      { q: `Can I visit your Yamanto workshop to inspect gates and finishes?`, a: `Absolutely! Homeowners and builders are welcome to visit our manufacturing facility at Shed 2, 43-45 Belar St, Yamanto QLD 4305 to see our TIG welding, aluminium profiles, and live motor displays.` }
    ];

    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
          <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
            <div>
              <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">${regionName} Local Specialists</span>
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${h1}</h1>
              <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${subtitle}</p>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Book Free On-Site Measure</a>
                <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
              </div>
            </div>
            <div>
              <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <img src="${heroImage}" alt="${h1}" width="800" height="450" loading="eager" style="width:100%;height:auto;display:block;" />
              </div>
            </div>
          </section>

          ${renderGateCategories(cleanPath)}
          ${renderAccordions({ specs: defaultPricing, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs })}
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 12: QUOTE CONFIRMATION (/quote-confirmation)
  // =========================================================================
  if (cleanPath === '/quote-confirmation') {
    return `
      <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
        ${renderHeader()}
        <main class="page-container" style="max-width:800px;margin:4rem auto;padding:2rem 1.5rem;text-align:center;">
          <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.2);border:2px solid #10b981;color:#10b981;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem auto;font-size:2rem;font-weight:900;">✓</div>
          <h1 style="font-size:clamp(2rem,3.5vw,2.75rem);font-weight:900;color:#ffffff;margin-bottom:1rem;font-family:Outfit,sans-serif;">Quote Request Received!</h1>
          <p style="font-size:1.15rem;color:#cbd5e1;line-height:1.7;margin-bottom:2rem;">Thank you for contacting Custom Auto Gates & Fencing. Our Yamanto workshop estimators are reviewing your specifications and will reach out shortly with your free customized proposal and laser measure booking.</p>
          <div style="background:#111a2e;border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:1.5rem;max-width:500px;margin:0 auto 2.5rem auto;">
            <p style="margin:0 0 0.5rem 0;color:#fbbf24;font-weight:800;">Need Immediate Assistance?</p>
            <p style="margin:0 0 1rem 0;color:#94a3b8;font-size:0.9rem;">Speak directly with our fabrication workshop in Yamanto:</p>
            <a href="${PHONE_TEL}" style="display:inline-block;padding:0.75rem 1.5rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:10px;text-decoration:none;">${PHONE_NUMBER}</a>
          </div>
          <a href="/" style="color:#94a3b8;text-decoration:underline;font-size:0.95rem;">&larr; Return to Homepage</a>
        </main>
        ${renderFooter()}
      </div>
    `;
  }

  // =========================================================================
  // ROUTE 13: HOMEPAGE (/)
  // =========================================================================
  const homeH1 = 'Automatic & Electric Gates Brisbane | Custom Driveway Gates Yamanto Factory Direct';
  const homeSubtitle = 'Buy factory direct and save $1,200+ on premium custom electric driveway, sliding, and swing gates in Yamanto. 10-Year structural warranty, QBCC licensed (#15579753), Australian aluminium, Centurion & Nice smart motors.';
  const homeHeroImage = '/images/hero-monument-sliding.webp';
  const homeHeroImageMobile = '/images/hero-monument-sliding-mobile.webp';
  const homeGallery = [
    { src: '/images/Sliding-Gates.jpg', alt: 'Automatic sliding driveway gate Brisbane' },
    { src: '/images/Swinging-Gates.jpg', alt: 'Grand double swing electric gate' },
    { src: '/images/custom-automated-sliding-gate-brisbane.jpg', alt: 'Custom architectural driveway gate Yamanto' },
    { src: '/images/solar-gate-installation-1.jpg', alt: 'Off-grid solar automatic acreage gate' }
  ];
  const homeSpecs = [
    { label: 'Factory Direct Savings', value: 'Save $1,200 to $2,500 by buying direct from our Yamanto workshop' },
    { label: 'Structural Guarantee', value: '10-Year Factory Structural Warranty on all aluminium fabrication and welds' },
    { label: 'Automation Motors', value: 'Centurion Smart, Nice Robus, BFT, FAAC (Battery backup standard on all models)' },
    { label: 'Compliance & Safety', value: 'Dual infrared safety beams, QBCC #15579753, AS 1926.1 pool gate certification' }
  ];
  const homeFaqs = [
    { q: 'How much do automatic electric gates cost in Brisbane?', a: 'Standard custom automatic gates in Brisbane cost between $3,800 and $7,500 for single sliding gates, and $4,200 to $8,800 for automated double swing gates. Buying factory-direct from our Yamanto workshop eliminates middleman reseller markups, saving you $1,200+.' },
    { q: 'Can an automatic gate be installed without 240V mains power?', a: 'Yes! Our off-grid solar automatic gate packages feature high-efficiency solar collectors and deep-cycle battery banks providing 5 to 7 days of continuous power reserve during cloudy weather, saving thousands in electrical trenching fees.' },
    { q: 'What warranty is included with custom gates and motors?', a: 'We provide an ironclad 10-Year Factory Structural Warranty on our aluminium gate fabrication and powdercoat finishes, combined with a 2 to 3-year manufacturer replacement warranty on all smart automation motors.' },
    { q: 'How long does fabrication and installation take?', a: 'Once our licensed installer conducts a free on-site laser measure and CAD drawings are approved, fabrication at our Yamanto workshop takes 2 weeks, followed by a fast 1-day installation.' }
  ];

  return `
    <div class="prerendered-page" style="background:#090e1a;min-height:100vh;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
      ${renderHeader()}
      <main class="page-container" style="max-width:1200px;margin:0 auto;padding:2rem 1.5rem;">
        <section class="minimal-hero" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem;align-items:center;margin-bottom:2.5rem;">
          <div>
            <span style="display:inline-block;padding:0.35rem 0.85rem;background:rgba(251,191,36,0.18);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);border-radius:20px;font-size:0.8rem;font-weight:800;text-transform:uppercase;margin-bottom:1rem;">Factory Direct Savings &bull; QBCC #15579753</span>
            <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 1rem 0;font-family:Outfit,sans-serif;">${homeH1}</h1>
            <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;margin-bottom:1.75rem;">${homeSubtitle}</p>
            <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
              <a href="/#quote" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:#fbbf24;color:#090e1a;font-weight:800;border-radius:12px;text-decoration:none;font-size:1rem;">Get Instant Online Quote</a>
              <a href="${PHONE_TEL}" style="display:inline-flex;align-items:center;padding:0.85rem 1.75rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-weight:700;border-radius:12px;text-decoration:none;font-size:1rem;">Call ${PHONE_NUMBER}</a>
            </div>
            <div style="display:flex;gap:1.5rem;margin-top:1.5rem;font-size:0.85rem;color:#94a3b8;flex-wrap:wrap;">
              <span>🛡️ 10-Yr Structural Warranty</span>
              <span>🏭 Yamanto Workshop Direct</span>
              <span>⭐ 4.9★ Over 180 Verified Reviews</span>
            </div>
          </div>
          <div>
            <div style="border-radius:16px;overflow:hidden;border:2px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
              <picture>
                <source media="(min-width: 769px)" srcset="${homeHeroImage}" type="image/webp" />
                <img src="${homeHeroImageMobile}" alt="${homeH1}" width="800" height="450" loading="eager" fetchpriority="high" decoding="sync" style="width:100%;height:auto;display:block;" />
              </picture>
            </div>
          </div>
        </section>

        ${renderGateCategories('/')}
        ${renderProjectGallery(homeGallery)}
        ${renderAccordions({ specs: homeSpecs, pricing: defaultPricing, council: defaultCouncil, suburbs: seqSuburbs, faqs: homeFaqs })}
      </main>
      ${renderFooter()}
    </div>
  `;
}
