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
import Footer from './components/Footer';
import QuickActionBar from './components/QuickActionBar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'about'
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTroubleshootOpen, setIsTroubleshootOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('sliding-gates');
  const [selectedGalleryGate, setSelectedGalleryGate] = useState(null);

  // Sync with browser URL hash/pathname if user visits /about-us or #about
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#about' || path === '/about-us') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'about') {
      window.location.hash = 'about';
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
        onNavigate={navigateTo}
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenTroubleshoot={() => setIsTroubleshootOpen(true)}
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

            {/* 600+ Real Project Gallery */}
            <ProjectGallery 
              onOpenQuoteWithProject={handleOpenQuoteWithProject}
            />

            {/* Motor Hardware Automation Specs */}
            <MotorShowcase 
              onOpenQuote={handleOpenQuote}
            />

            {/* Brisbane Inner Suburbs & SE QLD Area Checker */}
            <ServiceAreaChecker 
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* Customer Testimonials & Reviews */}
            <ReviewsSection />

            {/* Frequently Asked Questions */}
            <FaqSection 
              onOpenQuote={handleOpenQuote}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={navigateTo}
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedServiceId(catId);
          if (currentPage !== 'home') navigateTo('home');
        }}
      />

      {/* Floating Bottom Quick Action Bar for Mobile */}
      <QuickActionBar 
        onOpenQuote={handleOpenQuote}
        onOpenContact={() => setIsContactOpen(true)}
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
    </div>
  );
}
