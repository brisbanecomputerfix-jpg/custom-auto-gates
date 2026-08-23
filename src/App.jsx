import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GateVisualizerQuote from './components/GateVisualizerQuote';
import ServicesSection from './components/ServicesSection';
import ProjectGallery from './components/ProjectGallery';
import WhyFactoryDirect from './components/WhyFactoryDirect';
import MotorShowcase from './components/MotorShowcase';
import ServiceAreaChecker from './components/ServiceAreaChecker';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import ContactModal from './components/ContactModal';
import TroubleshooterModal from './components/TroubleshooterModal';
import AboutUs from './components/AboutUs';
import ServiceRepairs from './components/ServiceRepairs';
import ContactUs from './components/ContactUs';
import Testimonials from './components/Testimonials';
import CouncilGuide from './components/CouncilGuide';
import TradeBuilders from './components/TradeBuilders';
import SuburbLandingPage from './components/SuburbLandingPage';
import QuickPayModal from './components/QuickPayModal';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import Footer from './components/Footer';
import QuickActionBar from './components/QuickActionBar';
import RemoteCursorEffect from './components/RemoteCursorEffect';
import { updateSeoMetadata } from './utils/seoManager';
import { useTheme } from './utils/useTheme';

export default function App() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'service' | 'contact' | 'testimonials' | 'council-guide' | 'suburbs'
  const [selectedRegion, setSelectedRegion] = useState('brisbane');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTroubleshootOpen, setIsTroubleshootOpen] = useState(false);
  const [isQuickPayOpen, setIsQuickPayOpen] = useState(false);
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
      } else if (hash === '#pay' || hash === '#pay-invoice' || hash === '#payment') {
        setIsQuickPayOpen(true);
      }

      if (hash === '#about' || path === '/about-us') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#service' || hash === '#repairs' || path === '/service' || path === '/service/' || path === '/repairs') {
        setCurrentPage('service');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash === '#contact-us' || path === '/contact-us' || path === '/contact-us/' || path === '/contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#testimonials' || hash === '#reviews' || path === '/testimonials' || path === '/testimonials/' || path === '/reviews') {
        setCurrentPage('testimonials');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#council-guide' || hash === '#council' || hash === '#pool-safety' || path === '/council-guide' || path === '/council-guide/' || path === '/planning-rules') {
        setCurrentPage('council-guide');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#trade' || hash === '#builders' || hash === '#commercial' || path === '/trade' || path === '/trade/' || path === '/builders') {
        setCurrentPage('trade');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#gates-brisbane' || hash === '#brisbane' || path === '/gates-brisbane' || path === '/gates-brisbane/' || path === '/automatic-gates-brisbane') {
        setSelectedRegion('brisbane');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#gates-ipswich' || hash === '#ipswich' || path === '/gates-ipswich' || path === '/gates-ipswich/' || path === '/automatic-gates-ipswich') {
        setSelectedRegion('ipswich');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#gates-logan' || hash === '#logan' || path === '/gates-logan' || path === '/gates-logan/' || path === '/automatic-gates-logan') {
        setSelectedRegion('logan');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#gates-gold-coast' || hash === '#goldcoast' || hash === '#gates-goldcoast' || path === '/gates-gold-coast' || path === '/gates-gold-coast/' || path === '/automatic-gates-gold-coast') {
        setSelectedRegion('goldcoast');
        setCurrentPage('suburbs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#suburbs' || path === '/service-areas') {
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

  const navigateTo = (page, region = 'brisbane') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    } else if (page === 'suburbs') {
      setSelectedRegion(region);
      window.location.hash = `gates-${region}`;
    } else {
      window.location.hash = '';
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
        onOpenPay={() => setIsQuickPayOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedServiceId(catId);
          if (currentPage !== 'home') navigateTo('home');
        }}
      />

      {/* Main Page Routing Content */}
      <main style={{ flex: 1 }}>
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
        ) : currentPage === 'trade' ? (
          /* Dedicated Trade, Builders & Commercial Wholesale Portal */
          <TradeBuilders 
            onOpenQuote={handleOpenQuote}
            onOpenContact={() => setIsContactOpen(true)}
            onNavigateHome={() => navigateTo('home')}
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
      </main>

      {/* Footer Section */}
      <Footer 
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPay={() => setIsQuickPayOpen(true)}
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
        onOpenPay={() => setIsQuickPayOpen(true)}
      />

      {/* Interactive Modals */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultGateStyle={selectedGalleryGate?.category || selectedServiceId}
      />

      <TroubleshooterModal 
        isOpen={isTroubleshootOpen}
        onClose={() => setIsTroubleshootOpen(false)}
        onOpenContact={() => {
          setIsTroubleshootOpen(false);
          setIsContactOpen(true);
        }}
      />

      {/* Quick Pay Invoice / Deposit Stripe Modal */}
      <QuickPayModal 
        isOpen={isQuickPayOpen}
        onClose={() => {
          setIsQuickPayOpen(false);
          if (window.location.hash === '#pay' || window.location.hash === '#pay-invoice') {
            window.location.hash = '';
          }
        }}
      />

      {/* Verified Stripe Payment Success Receipt Modal */}
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

      {/* Luxury Garage Remote Click Effect for Pointer Devices */}
      <RemoteCursorEffect />
    </div>
  );
}
