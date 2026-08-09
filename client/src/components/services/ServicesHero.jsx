import React from 'react';

const ServicesHero = () => {
  return (
    <div className="relative pt-12 pb-10 md:pt-20 md:pb-12 px-4 md:px-16 flex items-center bg-[#fafafa] overflow-hidden">
      
      {/* Right Side Background Image */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Real Estate Interior" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col justify-between pt-8">
        
        {/* Left Side: Text Content */}
        <div className="w-full max-w-2xl pr-4 relative z-10">
          <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
            OUR SERVICES
          </h4>
          
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a2b3c] leading-[1.2] mb-6 font-serif">
            End-to-End Real Estate<br/>
            Solutions, <span className="text-[#D29F54]">Tailored for You</span>
          </h1>

          {/* Gold Underline */}
          <div className="w-16 h-[2px] bg-[#D29F54] mb-6"></div>
          
          <p className="text-gray-600 max-w-md text-sm leading-relaxed mb-8">
            Whether you're buying, renting, selling, or investing, we offer expert guidance and personalized solutions at every step of your real estate journey.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ServicesHero;
