import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GateVisualizerQuote from './components/GateVisualizerQuote';
import ServicesSection from './components/ServicesSection';
import CoreSolutionsSection from './components/CoreSolutionsSection';
import ProjectGallery from './components/ProjectGallery';
import WhyFactoryDirect from './components/WhyFactoryDirect';
import MotorShowcase from './components/MotorShowcase';
import ServiceAreaChecker from './components/ServiceAreaChecker';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import QuickActionBar from './components/QuickActionBar';
import RemoteCursorEffect from './components/RemoteCursorEffect';
import { updateSeoMetadata } from './utils/seoManager';
import { useTheme } from './utils/useTheme';

// Code-split subpages & modals with React.lazy for high Core Web Vitals (LCP & TBT)
const AboutUs = lazy(() => import('./components/AboutUs'));
const ServiceRepairs = lazy(() => import('./components/ServiceRepairs'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CouncilGuide = lazy(() => import('./components/CouncilGuide'));
const TradeBuilders = lazy(() => import('./components/TradeBuilders'));
const SuburbLandingPage = lazy(() => import('./components/SuburbLandingPage'));
const DedicatedServicePage = lazy(() => import('./components/DedicatedServicePage'));
const PricingGuide = lazy(() => import('./components/PricingGuide'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const ContactModal = lazy(() => import('./components/ContactModal'));
const TroubleshooterModal = lazy(() => import('./components/TroubleshooterModal'));
const PaymentSuccessModal = lazy(() => import('./components/PaymentSuccessModal'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(212, 163, 89, 0.2)', borderTop: '3px solid #d4a359', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
);


export default function App() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'service' | 'contact' | 'testimonials' | 'council-guide' | 'suburbs'
  const [selectedRegion, setSelectedRegion] = useState('brisbane');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTroubleshootOpen, setIsTroubleshootOpen] = useState(false);

  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [paymentSessionId, setPaymentSessionId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('sliding-gates');
  const [selectedGalleryGate, setSelectedGalleryGate] = useState(null);

  // Sync with browser URL hash/pathname
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash.includes('#payment-success') || window.location.search.includes('session_id')) {
        const hashParams = hash.includes('?') ? hash.split('?')[1] : '';
        const searchStr = window.location.search ? window.location.search.substring(1) : hashParams;
        const urlParams = new URLSearchParams(searchStr);
        const sid = urlParams.get('session_id') || 'cs_live_verified';
        setPaymentSessionId(sid);
        setIsPaymentSuccessOpen(true);
      }

      const cleanPath = path.toLowerCase().replace(/\/$/, '');
      const cleanHash = hash.toLowerCase();

      if (cleanHash === '#about' || cleanPath === '/about-us' || cleanPath === '/about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#book-service' || cleanHash === '#book-technician' || cleanHash === '#service-booking' || cleanHash === '#repairs-booking') {
        setCurrentPage('service');
        setTimeout(() => {
          const el = document.getElementById('book-service');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (
        cleanHash === '#service' || 
        cleanHash === '#repairs' || 
        cleanHash === '#gate-repairs' ||
        cleanPath === '/service' || 
        cleanPath === '/repairs' ||
        cleanPath === '/gate-repairs' ||
        cleanPath === '/gate-repairs-brisbane' ||
        cleanPath === '/electric-gate-repairs' ||
        cleanPath === '/automatic-gate-repairs'
      ) {
        setCurrentPage('service');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#contact' || cleanHash === '#contact-us' || cleanPath === '/contact-us' || cleanPath === '/contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#testimonials' || cleanHash === '#reviews' || cleanPath === '/testimonials' || cleanPath === '/reviews') {
        setCurrentPage('testimonials');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#council-guide' || cleanHash === '#council' || cleanHash === '#pool-safety' || cleanPath === '/council-guide' || cleanPath === '/planning-rules') {
        setCurrentPage('council-guide');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#gates-brisbane' || cleanHash === '#brisbane' || cleanPath === '/gates-brisbane' || cleanPath === '/automatic-gates-brisbane') {
        setSelectedRegion('brisbane');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#gates-ipswich' || cleanHash === '#ipswich' || cleanPath === '/gates-ipswich' || cleanPath === '/automatic-gates-ipswich') {
        setSelectedRegion('ipswich');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#gates-logan' || cleanHash === '#logan' || cleanPath === '/gates-logan' || cleanPath === '/automatic-gates-logan') {
        setSelectedRegion('logan');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#gates-gold-coast' || cleanHash === '#goldcoast' || cleanHash === '#gates-goldcoast' || cleanPath === '/gates-gold-coast' || cleanPath === '/automatic-gates-gold-coast') {
        setSelectedRegion('goldcoast');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#driveway-gates' || cleanPath === '/driveway-gates' || cleanPath === '/gates/driveway-gates' || cleanPath === '/gates/automatic-gates') {
        setCurrentPage('driveway-gates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#sliding-gates' || cleanHash === '#automatic-sliding-gates' || cleanPath === '/automatic-sliding-gates' || cleanPath === '/sliding-gates' || cleanPath === '/gates/automatic-sliding-gates-brisbane') {
        setCurrentPage('automatic-sliding-gates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#swing-gates' || cleanHash === '#automatic-swing-gates' || cleanPath === '/swing-gates' || cleanPath === '/gates/swing-gates' || cleanPath === '/automatic-swing-gates') {
        setCurrentPage('swing-gates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#solar-gates' || cleanHash === '#solar-automatic-gates' || cleanPath === '/solar-gates' || cleanPath === '/solar-automatic-gates' || cleanPath === '/gate-automation/solar-automatic-gates') {
        setCurrentPage('solar-gates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#pricing-guide' || cleanHash === '#pricing' || cleanPath === '/pricing-guide' || cleanPath === '/gate-cost-guide' || cleanPath === '/pricing') {
        setCurrentPage('pricing-guide');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        cleanHash === '#commercial-gates' || 
        cleanHash === '#industrial-gates' || 
        cleanHash === '#boom-gates' ||
        cleanHash === '#boom-barriers' ||
        cleanHash === '#commercial' ||
        cleanPath === '/commercial-gates' || 
        cleanPath === '/commercial-security-gates' || 
        cleanPath === '/gates/commercial-gates' ||
        cleanPath === '/gates/security-commercial-electric-gates' ||
        cleanPath === '/boom-gates' ||
        cleanPath === '/commercial-boom-gates' ||
        cleanPath === '/gate-automation/automatic-boom-gates'
      ) {
        setCurrentPage('commercial-gates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#gallery' || cleanHash === '#gallery-gates' || cleanPath === '/gates/gallery-gates') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('gallery');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (cleanHash === '#privacy' || cleanHash === '#privacy-policy' || cleanPath === '/privacy' || cleanPath === '/privacy-policy') {
        setCurrentPage('privacy-policy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (cleanHash === '#suburbs' || cleanPath === '/service-areas') {
        setSelectedRegion('brisbane');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic canonical tag, title, meta description, and social graph
  useEffect(() => {
    updateSeoMetadata(currentPage, selectedRegion);
  }, [currentPage, selectedRegion]);

  // Central Navigation Handler
  const navigateTo = (page, region = 'brisbane') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Update hash for deep linking
    if (page === 'about') {
      window.location.hash = 'about';
    } else if (page === 'service') {
      window.location.hash = 'service';
    } else if (page === 'contact') {
      window.location.hash = 'contact';
    } else if (page === 'testimonials') {
      window.location.hash = 'testimonials';
    } else if (page === 'council-guide') {
      window.location.hash = 'council-guide';
    } else if (page === 'trade') {
      window.location.hash = 'trade';
    } else if (page === 'privacy-policy' || page === 'privacy') {
      window.location.hash = 'privacy-policy';
    } else if (page === 'driveway-gates') {
      window.location.hash = 'driveway-gates';
    } else if (page === 'automatic-sliding-gates' || page === 'sliding-gates') {
      window.location.hash = 'automatic-sliding-gates';
    } else if (page === 'swing-gates') {
      window.location.hash = 'swing-gates';
    } else if (page === 'solar-gates') {
      window.location.hash = 'solar-gates';
    } else if (page === 'pricing-guide' || page === 'pricing') {
      window.location.hash = 'pricing-guide';
    } else if (page === 'suburbs') {
      setSelectedRegion(region);
      window.location.hash = `gates-${region}`;
    } else {
      window.location.hash = '';
    }
  };

  const handleBookTechnician = () => {
    if (currentPage !== 'service') {
      setCurrentPage('service');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        const el = document.getElementById('book-service');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('book-service');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const elem = document.getElementById('gate-visualizer');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const elem = document.getElementById('gate-visualizer');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleConfigureGate = (serviceId) => {
    setSelectedServiceId(serviceId);
    handleOpenQuote();
  };

  const handleOpenQuoteWithProject = (project) => {
    setSelectedGalleryGate(project);
    setIsContactOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Navigation */}
      <Navbar 
        currentPage={currentPage}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={navigateTo}
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenTroubleshoot={() => setIsTroubleshootOpen(true)}
        onBookTechnician={handleBookTechnician}
        onSelectCategory={(catId) => {
          setSelectedServiceId(catId);
          if (currentPage !== 'home') navigateTo('home');
        }}
      />

      {/* Main Page Routing Content */}
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          {currentPage === 'about' ? (
            /* Dedicated About Us Page */
            <AboutUs 
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
            />
          ) : currentPage === 'service' ? (
            /* Dedicated Service, Repairs & Warranty Page */
            <ServiceRepairs 
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
            />
          ) : currentPage === 'contact' ? (
            /* Dedicated Interactive Contact Us Page */
            <ContactUs 
              onOpenQuote={handleOpenQuote}
              onOpenTroubleshoot={() => setIsTroubleshootOpen(true)}
              onNavigateHome={() => navigateTo('home')}
              onNavigateService={() => navigateTo('service')}
            />
          ) : currentPage === 'testimonials' ? (
            /* Dedicated Testimonials & Verified Case Studies Page (Google EEAT) */
            <Testimonials 
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
            />
          ) : currentPage === 'council-guide' ? (
            /* Dedicated Queensland Council & Pool Safety Guide */
            <CouncilGuide 
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
            />
          ) : currentPage === 'privacy-policy' ? (
            /* Dedicated Australian Privacy Principles Compliant Policy Page */
            <PrivacyPolicy 
              onNavigateHome={() => navigateTo('home')}
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
            />
          ) : currentPage === 'suburbs' ? (
            /* Dedicated Suburb Silo Landing Pages (Brisbane, Ipswich, Logan, Gold Coast) */
            <SuburbLandingPage 
              initialRegion={selectedRegion}
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
              onNavigateCouncilGuide={() => navigateTo('council-guide')}
            />
          ) : currentPage === 'driveway-gates' || currentPage === 'automatic-sliding-gates' || currentPage === 'swing-gates' || currentPage === 'solar-gates' || currentPage === 'commercial-gates' ? (
            /* Dedicated Comprehensive Service & Gate Style Guides */
            <DedicatedServicePage 
              serviceKey={currentPage}
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
              onNavigateService={() => navigateTo('service')}
            />
          ) : currentPage === 'pricing-guide' ? (
            /* Dedicated Automatic Gate Cost & Pricing Guide (2026) */
            <PricingGuide 
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
              onNavigateHome={() => navigateTo('home')}
            />
          ) : (
            /* Main Home Page Experience */
            <>
              {/* Hero Section with Vimeo Background Video */}
              <Hero 
                onOpenQuote={handleOpenQuote}
                onOpenContact={() => setIsContactOpen(true)}
                onExploreVisualizer={handleOpenQuote}
                onNavigateAbout={() => navigateTo('about')}
              />

              {/* Core Custom Gates and Fencing Solutions (8-Card Grid) */}
              <CoreSolutionsSection 
                onSelectService={(id) => setSelectedServiceId(id)}
                onOpenQuote={handleOpenQuote}
              />

              {/* 600+ Real Project Gallery - High-Trust Visual Proof Section */}
              <ProjectGallery 
                onOpenQuoteWithProject={handleOpenQuoteWithProject}
              />

              {/* Live Custom Gate Cost Estimator */}
              <GateVisualizerQuote />

              {/* Comprehensive Services Deep Dive */}
              <ServicesSection 
                selectedServiceId={selectedServiceId}
                onSelectService={(id) => setSelectedServiceId(id)}
                onConfigureGate={handleConfigureGate}
                onOpenContact={() => setIsContactOpen(true)}
              />

              {/* Why Factory Direct Yamanto Comparison */}
              <WhyFactoryDirect 
                onOpenQuote={handleOpenQuote}
                onNavigateAbout={() => navigateTo('about')}
              />

              {/* Motor Hardware Automation Specs */}
              <MotorShowcase 
                onOpenQuote={handleOpenQuote}
              />

              {/* Brisbane Inner Suburbs & SE QLD Area Checker */}
              <ServiceAreaChecker 
                onOpenContact={() => setIsContactOpen(true)}
                onNavigateSuburbs={() => navigateTo('suburbs')}
              />

              {/* Customer Testimonials & Reviews */}
              <ReviewsSection 
                onNavigateTestimonials={() => navigateTo('testimonials')}
              />

              {/* Frequently Asked Questions */}
              <FaqSection 
                onOpenContact={() => setIsContactOpen(true)}
                onOpenQuote={handleOpenQuote}
              />
            </>
          )}
        </Suspense>
      </main>

      {/* Footer Section */}
      <Footer 
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
        onBookTechnician={handleBookTechnician}
        onSelectCategory={(catId) => {
          setSelectedServiceId(catId);
          if (currentPage !== 'home') navigateTo('home');
        }}
        onNavigate={navigateTo}
      />

      {/* Floating Bottom Quick Action Bar for Mobile */}
      <QuickActionBar 
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenTroubleshoot={() => setIsTroubleshootOpen(true)}
      />

      {/* Interactive Lazy-Loaded Modals */}
      <Suspense fallback={null}>
        {isContactOpen && (
          <ContactModal 
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            defaultGateStyle={selectedGalleryGate?.category || selectedServiceId}
          />
        )}

        {isTroubleshootOpen && (
          <TroubleshooterModal 
            isOpen={isTroubleshootOpen}
            onClose={() => setIsTroubleshootOpen(false)}
            onOpenContact={() => {
              setIsTroubleshootOpen(false);
              setIsContactOpen(true);
            }}
          />
        )}



        {/* Verified Stripe Payment Success Receipt Modal */}
        {isPaymentSuccessOpen && (
          <PaymentSuccessModal 
            isOpen={isPaymentSuccessOpen}
            sessionId={paymentSessionId}
            onClose={() => {
              setIsPaymentSuccessOpen(false);
              if (window.location.hash.includes('#payment-success')) {
                window.location.hash = '';
              }
            }}
          />
        )}
      </Suspense>

      {/* Luxury Garage Remote Click Effect for Pointer Devices */}
      <RemoteCursorEffect />
    </div>
  );
}

