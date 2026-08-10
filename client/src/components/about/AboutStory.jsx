import React from 'react';

const AboutStory = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

      {/* Left Text Column */}
      <div className="flex-1">
        <h4 className="text-[#D29F54] font-bold text-sm tracking-widest uppercase mb-4">
          Our Story
        </h4>
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a2b3c] leading-[1.2] mb-6 font-serif">
          Driven by Passion.<br />
          Guided by <span className="text-[#D29F54]">Purpose.</span>
        </h2>
        <p className="text-gray-600 text-[15px] leading-relaxed mb-10 text-justify">
          Mithila Legacy Realty was founded with a simple mission – to make real estate experiences transparent, seamless, and rewarding. What started as a small team of passionate professionals has grown into a trusted brand known for integrity, expertise, and client-first service.
        </p>

        {/* Signature Area */}
        <div className="flex flex-col">
          {/* Cursive Signature Simulation */}
          <div className="font-serif italic text-3xl text-gray-800 mb-2" style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
            Rahul Malhotra
          </div>
          <h4 className="font-bold text-[#1a2b3c] text-sm">Rahul Malhotra</h4>
          <p className="text-xs text-gray-600 font-medium">Founder & CEO, Mithila Legacy Realty</p>
        </div>
      </div>

      {/* Right Image Column */}
      <div className="flex-1 w-full relative pt-8 lg:pt-0">
        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-[400px] mx-auto lg:ml-auto lg:mr-0 shadow-2xl shadow-gray-200">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
            alt="Modern luxury property"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient at bottom for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Floating "Specializing In" Card */}
        <div className="absolute -bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-12 bg-[#0f172a] rounded-2xl p-6 shadow-xl w-[90%] max-w-[340px]">
          <p className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">Specializing In</p>
          <div className="flex items-center justify-between gap-4 text-white">
            <span className="font-serif font-bold text-[15px] tracking-wide">Luxury Homes</span>
            <span className="font-bold text-[15px] tracking-tight text-[#D29F54]">Estates</span>
            <span className="font-serif text-[15px] tracking-tight text-center">Villas</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutStory;
