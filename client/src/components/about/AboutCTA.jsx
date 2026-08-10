import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <div className="bg-[#0f172a] rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
      
      {/* Background Graphic Simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 w-full h-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* Left side: Logo & Title */}
      <div className="relative z-10 flex flex-col md:flex-row items-center lg:items-start gap-6 lg:w-[45%] text-center lg:text-left">
        {/* Abstract Logo */}
        <div className="text-[#D29F54] flex-shrink-0 mt-1">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight font-serif">
          Let's Find the Right Place<br/>
          <span className="text-[#D29F54]">for You to Call Home.</span>
        </h2>
      </div>

      {/* Middle Text */}
      <div className="relative z-10 lg:w-[35%] text-center lg:text-left">
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
          Whether you're buying, selling, or investing, our experts are here to guide you every step of the way.
        </p>
      </div>

      {/* Right side: Button */}
      <div className="relative z-10 flex-shrink-0">
        <Link to="/contact" className="bg-[#b88a44] hover:bg-[#a67c3d] text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-lg">
          Get in Touch <ArrowRight size={18} />
        </Link>
      </div>

    </div>
  );
};

export default AboutCTA;
