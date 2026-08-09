import React, { useEffect } from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ContactFeatures from '../components/contact/ContactFeatures';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-12 lg:pb-20">
      
      {/* Hero Section */}
      <ContactHero />

      {/* Overlapping Content Container */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 -mt-24 md:-mt-32">
        
        {/* Form and Info Cards */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* Left Panel: Form */}
          <div className="w-full lg:w-1/2">
            <ContactForm />
          </div>

          {/* Right Panel: Info */}
          <div className="w-full lg:w-1/2">
            <ContactInfo />
          </div>

        </div>

        {/* Bottom Features Banner */}
        <ContactFeatures />

      </div>
      
    </div>
  );
};

export default Contact;
