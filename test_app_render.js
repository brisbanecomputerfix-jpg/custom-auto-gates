import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';
import AboutUs from './src/components/AboutUs.jsx';
import ServiceRepairs from './src/components/ServiceRepairs.jsx';
import ContactUs from './src/components/ContactUs.jsx';
import Testimonials from './src/components/Testimonials.jsx';
import CouncilGuide from './src/components/CouncilGuide.jsx';
import SuburbLandingPage from './src/components/SuburbLandingPage.jsx';
import GateVisualizerQuote from './src/components/GateVisualizerQuote.jsx';
import ServicesSection from './src/components/ServicesSection.jsx';
import ProjectGallery from './src/components/ProjectGallery.jsx';
import WhyFactoryDirect from './src/components/WhyFactoryDirect.jsx';
import MotorShowcase from './src/components/MotorShowcase.jsx';
import ServiceAreaChecker from './src/components/ServiceAreaChecker.jsx';
import ReviewsSection from './src/components/ReviewsSection.jsx';
import FaqSection from './src/components/FaqSection.jsx';
import ContactModal from './src/components/ContactModal.jsx';
import TroubleshooterModal from './src/components/TroubleshooterModal.jsx';

const components = [
  { name: 'App', elem: React.createElement(App) },
  { name: 'AboutUs', elem: React.createElement(AboutUs) },
  { name: 'ServiceRepairs', elem: React.createElement(ServiceRepairs) },
  { name: 'ContactUs', elem: React.createElement(ContactUs) },
  { name: 'Testimonials', elem: React.createElement(Testimonials) },
  { name: 'CouncilGuide', elem: React.createElement(CouncilGuide) },
  { name: 'SuburbLandingPage', elem: React.createElement(SuburbLandingPage, { initialRegion: 'brisbane' }) },
  { name: 'GateVisualizerQuote', elem: React.createElement(GateVisualizerQuote) },
  { name: 'ServicesSection', elem: React.createElement(ServicesSection) },
  { name: 'ProjectGallery', elem: React.createElement(ProjectGallery) },
  { name: 'WhyFactoryDirect', elem: React.createElement(WhyFactoryDirect) },
  { name: 'MotorShowcase', elem: React.createElement(MotorShowcase) },
  { name: 'ServiceAreaChecker', elem: React.createElement(ServiceAreaChecker) },
  { name: 'ReviewsSection', elem: React.createElement(ReviewsSection) },
  { name: 'FaqSection', elem: React.createElement(FaqSection) },
  { name: 'ContactModal', elem: React.createElement(ContactModal, { isOpen: true }) },
  { name: 'TroubleshooterModal', elem: React.createElement(TroubleshooterModal, { isOpen: true }) },
];

let allPassed = true;
for (const comp of components) {
  try {
    const html = renderToString(comp.elem);
    console.log(`[PASS] ${comp.name} rendered (${html.length} chars)`);
  } catch (err) {
    allPassed = false;
    console.error(`[FAIL] ${comp.name}:`, err);
  }
}

if (allPassed) {
  console.log("\n>>> ALL 17 COMPONENTS RENDERED SUCCESSFULLY WITH 0 ERRORS! <<<");
}
