import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutCTA from '../components/about/AboutCTA';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans overflow-hidden flex flex-col gap-12 lg:gap-20 pb-12 lg:pb-20">
      
      {/* Hero Section */}
      <AboutHero />

      {/* Our Story Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 w-full">
        <AboutStory />
      </div>

      {/* Our Values Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 w-full">
        <AboutValues />
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 w-full">
        <AboutCTA />
      </div>

    </div>
  );
};

export default AboutUs;
