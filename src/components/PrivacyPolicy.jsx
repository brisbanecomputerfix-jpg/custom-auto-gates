import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Server, 
  CreditCard, 
  UserCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Share2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Database,
  Building,
  RefreshCw
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function PrivacyPolicy({ onNavigateHome, onOpenQuote, onOpenContact }) {
  const [activeSection, setActiveSection] = useState('overview');

  const SECTIONS = [
    { id: 'overview', title: '1. Overview & Commitment', icon: ShieldCheck },
    { id: 'collection', title: '2. Information We Collect', icon: Database },
    { id: 'usage', title: '3. How We Use Your Data', icon: Eye },
    { id: 'payments', title: '4. Stripe & Payment Security', icon: CreditCard },
    { id: 'disclosure', title: '5. Sharing & Disclosures', icon: Share2 },
    { id: 'storage', title: '6. Storage & Data Security', icon: Server },
    { id: 'cookies', title: '7. Cookies & Analytics', icon: RefreshCw },
    { id: 'rights', title: '8. Your Rights & Access', icon: UserCheck },
    { id: 'marketing', title: '9. Marketing & Opt-Out', icon: Mail },
    { id: 'contact', title: '10. Privacy Officer Contact', icon: Building }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', color: 'var(--text-main)', paddingBottom: '5rem' }}>
      {/* Breadcrumb Bar */}
      <div style={{
        backgroundColor: 'var(--bg-card-subtle)',
        borderBottom: '1px solid var(--border-light)',
        padding: '0.85rem 1.5rem',
        fontSize: '0.85rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <button 
              onClick={onNavigateHome}
              style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', padding: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ArrowLeft size={14} /> Home
            </button>
            <span>/</span>
            <span>Legal & Compliance</span>
            <span>/</span>
            <span style={{ color: 'var(--text-heading)', fontWeight: '600' }}>Privacy Policy</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Clock size={13} style={{ color: 'var(--accent-gold)' }} />
            <span>Effective Date: <strong>28 August 2026</strong></span>
            <span>•</span>
            <span>Version: <strong>2.4 (APP Compliant)</strong></span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-body) 100%)',
        borderBottom: '1px solid var(--border-light)',
        padding: '3.5rem 1.5rem 2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--badge-gold-bg)', border: '1px solid var(--badge-gold-border)', color: 'var(--badge-gold-text)', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
            <ShieldCheck size={16} /> AUSTRALIAN PRIVACY PRINCIPLES COMPLIANT
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900', color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Privacy Policy & <span style={{ color: 'var(--accent-gold)' }}>Data Protection</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-muted)', maxWidth: '820px', lineHeight: 1.6, marginBottom: '2rem' }}>
            At <strong>Custom Auto Gates Pty Ltd</strong> (trading as Custom Auto Gates & Fencing), your privacy and the security of your property data are paramount. This policy outlines how we collect, use, protect, and manage your personal information in accordance with the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles (APPs).
          </p>

          {/* Key Privacy Highlights 4-Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.1rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.2rem' }}>APP 1988 Compliant</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Governed strictly by Australian Federal and Queensland State privacy legislation.</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.1rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Lock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.2rem' }}>Zero Data Selling</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>We never sell, rent, or trade your personal info, site address, or photos to third parties.</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.1rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--badge-gold-bg)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CreditCard size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.2rem' }}>Stripe PCI-DSS Level 1</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Bank-grade encryption. We never store raw credit card numbers or CVVs on our servers.</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.1rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <UserCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.2rem' }}>Your Data Control</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Access, correct, or request deletion of your records anytime with our privacy team.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar Nav */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Sticky Navigation on Desktop */}
        <aside style={{
          position: 'sticky',
          top: '100px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem', paddingLeft: '0.5rem' }}>
            Policy Table of Contents
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid var(--accent-gold)' : '1px solid transparent',
                    background: isSelected ? 'var(--badge-gold-bg)' : 'transparent',
                    color: isSelected ? 'var(--accent-gold)' : 'var(--text-main)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Icon size={16} style={{ color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                    <span>{sec.title}</span>
                  </div>
                  {isSelected && <ChevronRight size={14} />}
                </button>
              );
            })}
          </nav>

          {/* Direct Support Card */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--bg-card-subtle)',
            borderRadius: '10px',
            border: '1px solid var(--border-light)',
            fontSize: '0.82rem'
          }}>
            <div style={{ fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>Need Privacy Assistance?</div>
            <div style={{ color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              Our dedicated Privacy Officer in Yamanto is available Mon–Fri 9am–4pm.
            </div>
            <a 
              href={`mailto:${COMPANY_INFO.email}?subject=Privacy%20Policy%20Enquiry`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--accent-gold)',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              <Mail size={13} /> {COMPANY_INFO.email}
            </a>
          </div>
        </aside>

        {/* Right Policy Content (2-Column Grid Item takes remaining width) */}
        <main style={{ gridColumn: 'span 2' }}>
          
          {/* SECTION 1: Overview */}
          <article id="overview" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} /> Section 1
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              1. Overview & Commitment to Privacy
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Custom Auto Gates Pty Ltd (ABN 64 615 938 255, QBCC License #15579753), trading as <strong>Custom Auto Gates & Fencing</strong> (“we”, “us”, “our”), operates the website <a href="https://customautogates.com.au" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>customautogates.com.au</a> and our custom fabrication facility located at <strong>Shed 2, 43-45 Belar Street, Yamanto QLD 4305</strong>.
            </p>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              We are committed to safeguarding the privacy of our residential clients, commercial property managers, builders, strata bodies corporate, and website visitors. We comply unconditionally with the <strong>Australian Privacy Principles (APPs)</strong> contained in Schedule 1 of the <em>Privacy Act 1988 (Cth)</em> and applicable Queensland privacy guidelines.
            </p>
            <div style={{ background: 'var(--bg-card-subtle)', borderLeft: '4px solid var(--accent-gold)', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <strong>Scope:</strong> This Privacy Policy governs all personal data collected through our online cost estimator, contact forms, invoice quick-pay modal, email, telephone calls, on-site laser measure consultations, and in-person workshop showroom visits across South East Queensland.
            </div>
          </article>

          {/* SECTION 2: Information We Collect */}
          <article id="collection" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-blue)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <Database size={18} /> Section 2
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              2. Information We Collect
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              To engineer, manufacture, install, and service custom automated gate systems and security fencing, we collect only information that is strictly necessary for our legitimate trade operations:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserCheck size={16} /> Contact & Identification
                </h3>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                  <li>Full name and company/strata name (if applicable)</li>
                  <li>Billing and physical installation site address</li>
                  <li>Primary telephone number and mobile contact</li>
                  <li>Email address for quote blueprints and invoices</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} /> Project Specifications & Site Data
                </h3>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                  <li>Driveway opening width, height, and slope gradients</li>
                  <li>Site photographs provided for quote assessment</li>
                  <li>Gate automation type (sliding, swing, solar, boom)</li>
                  <li>Power supply status (240V mains vs solar low-voltage)</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-emerald)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard size={16} /> Transaction & Billing Records
                </h3>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                  <li>Invoice and quote reference numbers</li>
                  <li>Deposit / progress payment timestamps and amounts</li>
                  <li>Stripe transaction identifiers and confirmation receipts</li>
                  <li><em>Note: We NEVER store raw credit card numbers or CVVs</em></li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#c084fc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Server size={16} /> Gate Telemetry & Warranty History
                </h3>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                  <li>Gate motor serial numbers and hardware batch identifiers</li>
                  <li>Remote control transmitter registers</li>
                  <li>Scheduled maintenance records and fault logs</li>
                  <li>10-year structural warranty registration details</li>
                </ul>
              </div>
            </div>
          </article>

          {/* SECTION 3: How We Use Your Data */}
          <article id="usage" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <Eye size={18} /> Section 3
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              3. How We Use Your Information
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              We use the collected personal information strictly to fulfill trade obligations, fabricate products to your exact dimensional tolerances, and ensure seamless installation:
            </p>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              <li><strong>Custom Quoting & Blueprint Generation:</strong> Calculating accurate factory-direct material costs, motor requirements, and council setback compliance.</li>
              <li><strong>Free On-Site Laser Measures:</strong> Dispatching our qualified estimators to your address to take high-precision electronic measurements.</li>
              <li><strong>Workshop Fabrication:</strong> Cutting, TIG-welding, and powdercoating aluminium gate panels to your specific order in Yamanto.</li>
              <li><strong>Installation & Electrical Commissioning:</strong> Coordinating our in-house trade installation crews and licensed electricians for on-site automation hookup.</li>
              <li><strong>Warranty & Preventative Servicing:</strong> Maintaining structural warranty registries and dispatching mobile emergency technicians for gate repairs.</li>
              <li><strong>Invoice & Payment Fulfillment:</strong> Processing initial 50% fabrication deposits, progress draws, and completed job sign-offs.</li>
              <li><strong>Customer Service & Notifications:</strong> Sending automated SMS/email arrival alerts, installation status updates, and operation manuals.</li>
            </ul>
          </article>

          {/* SECTION 4: Stripe & Payment Security */}
          <article id="payments" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <CreditCard size={18} /> Section 4
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              4. Payment Security & Stripe PCI-DSS Processing
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              We prioritize financial security. All credit card and electronic payments initiated through our QuickPay modal (<a href="#pay" onClick={onOpenContact} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Pay Invoice</a>) are processed directly by <strong>Stripe Australia Pty Ltd</strong> (ACN 149 694 130).
            </p>
            
            <div style={{ background: 'var(--bg-card-subtle)', border: '1.5px solid var(--border-light)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Lock size={22} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontWeight: '800', color: 'var(--text-heading)', fontSize: '1.05rem' }}>Our Payment Security Standards:</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
                <li><strong>PCI-DSS Level 1 Certified:</strong> Stripe is certified to the highest level of payment card industry security standards.</li>
                <li><strong>Tokenization:</strong> Your full credit card number, expiry date, and CVV security code are sent directly to Stripe via end-to-end TLS 1.3 encryption. They never touch or reside on our servers.</li>
                <li><strong>Dynamic 3D Secure 2.0:</strong> Automatic fraud detection and cardholder verification compliant with Australian banking mandates.</li>
                <li><strong>Currency:</strong> All payments are processed in Australian Dollars (AUD) and are fully inclusive of 10% Australian GST.</li>
              </ul>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              For more details on Stripe’s privacy and security measures, you may review the <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>Stripe Privacy Policy <ExternalLink size={12} /></a>.
            </p>
          </article>

          {/* SECTION 5: Sharing & Disclosures */}
          <article id="disclosure" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#c084fc', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <Share2 size={18} /> Section 5
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              5. Sharing & Disclosure of Personal Data
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              <strong>We do NOT sell, rent, or trade your personal information.</strong> We disclose personal details only to trusted trade partners and service providers strictly required to complete your project:
            </p>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              <li><strong>Certified Subcontractors & Electricians:</strong> Providing your site address and access contact to our licensed Queensland electrical contractors for 240V power isolator and motor hookups.</li>
              <li><strong>Freight & Delivery Logistics:</strong> Sharing delivery address and phone number with our heavy-vehicle logistics drivers transporting large 6m–10m gate frames.</li>
              <li><strong>Motor Hardware Manufacturers:</strong> Sharing motor serial numbers with authorised hardware manufacturers and distributors solely for warranty claims and hardware replacements.</li>
              <li><strong>Legal & Regulatory Authorities:</strong> Where required by law, Queensland Building and Construction Commission (QBCC) reporting, or lawful police request in connection with security investigations.</li>
            </ul>
          </article>

          {/* SECTION 6: Data Storage & Security */}
          <article id="storage" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-blue)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <Server size={18} /> Section 6
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              6. Data Storage, Retention & Security Measures
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              We maintain robust physical, electronic, and managerial safeguards to protect your personal information from unauthorized access, misuse, alteration, or disclosure:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card-subtle)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.3rem' }}>🔒 256-Bit SSL/TLS</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>All web traffic and form submissions are encrypted via high-grade SSL/TLS certificates.</div>
              </div>
              <div style={{ background: 'var(--bg-card-subtle)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.3rem' }}>🛡️ Role-Based Access</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Only authorized workshop estimators, fabricators, and managers hold credentialed database access.</div>
              </div>
              <div style={{ background: 'var(--bg-card-subtle)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.3rem' }}>📅 10-Year Warranty Retention</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Fabrication blueprints & warranty logs are retained for 10 years to honor our structural guarantee.</div>
              </div>
            </div>
          </article>

          {/* SECTION 7: Cookies & Analytics */}
          <article id="cookies" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <RefreshCw size={18} /> Section 7
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              7. Cookies, Pixels & Web Analytics
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Our website uses cookies and similar tracking technologies to deliver a fast, responsive user experience:
            </p>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              <li><strong>Essential Functional Cookies:</strong> Required to preserve your quote builder selections, visualizer configurations, and theme preference (Day / Night Mode).</li>
              <li><strong>Performance & Analytics:</strong> We use Google Analytics with IP anonymization to analyze aggregate page load speeds, suburb traffic patterns, and navigation flow across South East Queensland.</li>
            </ul>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              You may modify your web browser settings to block or notify you when cookies are set. Note that disabling essential cookies may impact your ability to use the interactive Gate Visualizer Quote Builder.
            </p>
          </article>

          {/* SECTION 8: Your Rights & Access */}
          <article id="rights" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <UserCheck size={18} /> Section 8
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              8. Your Privacy Rights Under Australian Law
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Under the Australian Privacy Principles, you possess full legal rights regarding the personal data we hold about you:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div><strong>Right to Access:</strong> You can request a digital copy of all personal details, site dimensions, and invoices on record.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div><strong>Right to Rectification:</strong> You can update or correct outdated phone numbers, email addresses, or billing contacts anytime.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div><strong>Right to Erasure / Deletion:</strong> You can request deletion of your contact records, provided there are no active statutory building warranty or accounting retention requirements under Australian taxation law.</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              To exercise any of these rights, email our Privacy Officer at <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: 'var(--accent-gold)' }}>{COMPANY_INFO.email}</a>. We respond to all verified requests within 14 business days with zero administration fees.
            </p>
          </article>

          {/* SECTION 9: Marketing & Opt-Out */}
          <article id="marketing" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-blue)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <Mail size={18} /> Section 9
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              9. Direct Marketing & Opt-Out Policy
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1rem' }}>
              We do not engage in unsolicited mass spam marketing. We send only transactional communications regarding your ongoing quotes, measurements, fabrication progress, or annual preventative gate motor maintenance reminders if opted in.
            </p>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)' }}>
              You may opt out of promotional or maintenance reminder emails at any time by clicking the <strong>“Unsubscribe”</strong> link at the footer of any automated email, or by contacting our office.
            </p>
          </article>

          {/* SECTION 10: Privacy Officer Contact & OAIC */}
          <article id="contact" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <Building size={18} /> Section 10
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '1rem' }}>
              10. Privacy Officer Contact Details & Complaints
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              If you have questions regarding this Privacy Policy, wish to file a privacy inquiry, or need to escalate a data concern, please contact our designated Privacy Officer:
            </p>

            <div style={{ background: 'var(--bg-card-subtle)', border: '1.5px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Custom Auto Gates Pty Ltd — Privacy Officer
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Phone size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                  <a href={COMPANY_INFO.tel} style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: '700' }}>
                    {COMPANY_INFO.phone}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Mail size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                  <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '700' }}>
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Clock size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <span>Mon – Fri: 9:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong>External OAIC Escalation:</strong> If you believe your privacy complaint has not been adequately addressed by our team within 30 days, you have the right to lodge a formal complaint with the <em>Office of the Australian Information Commissioner (OAIC)</em> via <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>www.oaic.gov.au</a> or by calling <strong>1300 363 992</strong>.
            </div>
          </article>

          {/* Bottom Action CTA */}
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-card) 100%)',
            border: '1.5px solid var(--accent-gold)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-glow-gold)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              Ready to Design Your Custom Automatic Gate?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
              Experience factory-direct pricing with total data security and our 10-year structural warranty across Brisbane, Ipswich & SE Queensland.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuote}
                className="btn-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: '800' }}
              >
                Instant Online Quote Builder →
              </button>
              <button
                onClick={onOpenContact}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: '700' }}
              >
                Book Free Laser Measure
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
