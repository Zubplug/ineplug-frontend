import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ZubplugForYou from '../components/ZubplugForYou';
import AudienceSection from '../components/AudienceSection';
import TestimonialsSection from '../components/TestimonialsSection';
import MobileAppShowcase from '../components/MobileAppShowcase';
import HowItWorks from '../components/HowItWorks';
import FAQsSection from '../components/FAQsSection';
import Footer from '../components/Footer';

const LandingHome = () => {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ZubplugForYou />
      <AudienceSection />
      <TestimonialsSection />
      <MobileAppShowcase />
      <HowItWorks />
      <FAQsSection />
      <Footer />
    </div>
  );
};

export default LandingHome;
