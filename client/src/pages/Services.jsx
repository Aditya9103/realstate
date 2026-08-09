import React, { useEffect } from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicesCTA from '../components/services/ServicesCTA';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans overflow-hidden flex flex-col gap-12 lg:gap-20 pb-12 lg:pb-20">
      
      {/* Hero Section */}
      <ServicesHero />

      {/* Services Grid Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 w-full">
        <ServicesGrid />
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 w-full">
        <ServicesCTA />
      </div>

    </div>
  );
};

export default Services;
