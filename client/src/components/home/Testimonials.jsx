import React, { useState, useEffect, useRef } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, Users, Home, Award, Handshake } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Home Buyer',
    location: 'Bandra West, Mumbai',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    text: 'Luxora Real Estate made our home buying journey so smooth and enjoyable. Their team was knowledgeable, responsive, and truly cared about our needs.'
  },
  {
    id: 2,
    name: 'Sneha Desai',
    role: 'Property Seller',
    location: 'Cyber City, Gurgaon',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    text: 'We sold our villa within weeks at the best price possible. The marketing strategy and negotiation skills of their agents are simply outstanding!'
  },
  {
    id: 3,
    name: 'Arjun Mehta',
    role: 'Real Estate Investor',
    location: 'ECR, Chennai',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200',
    text: 'As an investor, I value data and insights. Luxora provided me with excellent guidance and helped me find a high-yield property in a prime location.'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'First-time Buyer',
    location: 'Indiranagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    text: 'I was nervous about buying my first home, but the team here was so patient. They answered all my questions and found me a beautiful apartment within budget.'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 4000); // Auto-slide every 4 seconds
  };

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered]);

  // Robust reset to prevent blank spaces when tab is in background
  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex % testimonials.length);
      }, 500); // 500ms matches the transition duration
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(testimonials.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(testimonials.length - 1);
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex >= testimonials.length * 2 - 1) return; // Prevent spamming
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  return (
    <section className="bg-[#fafafa] py-12 md:py-16 px-4 md:px-16 text-[#1a2b3c] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
            CLIENT TESTIMONIALS
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
            What Our <span className="text-[#D29F54]">Clients Say</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-6">
            Real stories from real people who found their dream properties with Luxora Real Estate.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#1a2b3c] font-bold text-lg">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-[#D29F54]" fill="#D29F54" />
              ))}
            </div>
            <span className="ml-2">4.9/5</span>
            <span className="text-gray-400 text-sm font-normal ml-2">(From 2,800+ Happy Clients)</span>
          </div>
        </div>

        {/* Slider Section */}
        <div 
          className="relative mb-20 px-4 md:px-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#1a2b3c] hover:bg-[#D29F54] hover:text-white transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Track Container */}
          <div className="overflow-hidden">
            <div className="flex">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                <div 
                  key={`${testimonial.id}-${idx}`} 
                  className={`w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full h-[320px]">
                    
                    {/* Top Row: Quote Mark & Stars */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-[#D29F54] text-7xl font-serif leading-none h-12">
                        “
                      </div>
                      <div className="flex items-center gap-0.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-[#D29F54]" fill="#D29F54" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-[#1a2b3c] text-sm md:text-base leading-relaxed flex-grow font-medium">
                      {testimonial.text}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-gray-100 my-6"></div>

                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a2b3c] text-sm leading-tight mb-1">{testimonial.name}</h4>
                        <p className="text-gray-400 text-xs mb-1">{testimonial.role}</p>
                        <div className="flex items-center text-[#D29F54] text-[10px] font-semibold">
                          <MapPin size={10} className="mr-1" /> {testimonial.location}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#1a2b3c] hover:bg-[#D29F54] hover:text-white transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mb-20">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                (currentIndex % testimonials.length) === idx 
                  ? 'w-2.5 h-2.5 bg-[#D29F54]' 
                  : 'w-2.5 h-2.5 bg-gray-200 hover:bg-[#D29F54]/50'
              }`}
            />
          ))}
        </div>

        {/* Bottom Stats Banner */}
        <div className="bg-[#fff9f0] rounded-3xl flex flex-col lg:flex-row overflow-hidden shadow-sm border border-[#f5e6ce]">
          
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 md:p-12 items-center divide-x divide-[#D29F54]/20">
            
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Users size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">2,800+</h3>
              <p className="text-gray-500 text-xs font-semibold">Happy Clients</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Home size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">5,000+</h3>
              <p className="text-gray-500 text-xs font-semibold">Properties Sold</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Award size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">10+</h3>
              <p className="text-gray-500 text-xs font-semibold">Years of Experience</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-full border border-[#D29F54]/30 flex items-center justify-center mb-4">
                <Handshake size={24} className="text-[#D29F54]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">25+</h3>
              <p className="text-gray-500 text-xs font-semibold">Expert Agents</p>
            </div>

          </div>

          {/* Right Image Fade */}
          <div className="w-full lg:w-[400px] h-64 lg:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff9f0] to-transparent z-10 hidden lg:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
              alt="Living Room" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
