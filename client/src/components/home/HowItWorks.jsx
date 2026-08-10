import React from 'react';
import { Search, Calendar, Handshake, Home, ArrowRight, Building } from 'lucide-react';

const steps = [
  {
    id: '01',
    icon: <Search size={24} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Explore\nProperties',
    description: 'Browse our verified listings and find properties that match your lifestyle and budget.'
  },
  {
    id: '02',
    icon: <Calendar size={24} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Schedule\na Viewing',
    description: 'Book a site visit with our expert agents at your convenience.'
  },
  {
    id: '03',
    icon: <Handshake size={24} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Make\na Smart Decision',
    description: 'Get professional advice, market insights and full support through negotiation.'
  },
  {
    id: '04',
    icon: <Home size={24} className="text-[#D29F54]" strokeWidth={1.5} />,
    title: 'Own Your\nDream Home',
    description: 'Complete the paperwork with ease and step into your new beginning.'
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-[#fafafa] py-12 md:py-16 px-4 md:px-16 text-[#1a2b3c] font-sans">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Top Layout (Left: Content & Steps, Right: Image) */}
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 mb-16">
          
          {/* Left Column */}
          <div className="w-full xl:w-[70%]">
            
            {/* Header */}
            <div className="mb-10">
              <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
                HOW IT WORKS
              </h4>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
                Your Dream Property <br />
                In <span className="text-[#D29F54]">4 Simple Steps</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                We make buying or selling a property effortless, transparent, and completely stress-free.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {steps.map((step) => (
                <div key={step.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[#D29F54] font-bold text-sm">{step.id}</div>
                    <div className="w-12 h-12 rounded-full bg-[#fcf9f2] flex items-center justify-center border border-[#f5e6ce]">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2b3c] mb-2 whitespace-pre-line leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 flex-grow leading-relaxed">
                    {step.description}
                  </p>
                  <button className="text-[#D29F54] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:text-[#b88a44] transition-colors mt-auto w-fit">
                    Learn More <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
            
          </div>

          {/* Right Column (Image + Overlay Card) */}
          <div className="w-full xl:w-[30%]">
            <div className="relative h-full min-h-[450px] xl:min-h-full rounded-[2rem] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Home" 
                className="w-full h-full object-cover"
              />
              
              {/* Dark Overlay Card inside the image */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#1a2b3c]/95 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
                  <div className="text-gray-300 text-[10px] font-semibold uppercase tracking-wider mb-2">
                    Ready to get started?
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-6 leading-tight">
                    Let's Find Your <br />
                    <span className="text-[#D29F54]">Perfect Property</span>
                  </h3>
                  <button className="w-full bg-[#D29F54] text-[#1a2b3c] font-bold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-[#b88a44] transition-colors flex items-center justify-center gap-2">
                    Talk to our experts <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="bg-[#faf6ef] rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#f5e6ce] shadow-sm">
          
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <div className="w-16 h-16 rounded-full bg-[#fcf9f2] border border-[#D29F54]/30 flex items-center justify-center flex-shrink-0">
              <Building size={28} className="text-[#D29F54]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] leading-tight">
                Your Next Chapter <br />
                <span className="text-[#D29F54]">Starts Here.</span>
              </h3>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-16 bg-[#D29F54]/20"></div>

          <div className="w-full lg:w-auto flex-1 max-w-md text-gray-600 font-medium">
            Whether you're buying, selling, or investing &mdash; we're here to help you make the right move.
          </div>

          <div className="w-full lg:w-auto flex-shrink-0">
            <button className="w-full lg:w-auto bg-[#0a192f] text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg">
              Contact our agent <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
