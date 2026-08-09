import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyGallery = ({ property }) => {
  
  // we repeat it with different Unsplash images for the demo.
  const images = [
    property.image,
    ...(property.gallery || [])
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="mb-8">
      {/* Main Large Image */}
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-4 group">
        <img 
          src={images[currentIndex]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        
        {/* Photo Count Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1a2b3c] text-sm font-bold px-4 py-1.5 rounded-full shadow-sm z-10">
          {images.length} Photos
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.slice(0, 5).map((img, idx) => {
          const isLast = idx === 4;
          return (
            <div 
              key={idx} 
              className={`relative h-24 min-w-[120px] flex-1 rounded-xl overflow-hidden cursor-pointer ${currentIndex === idx && !isLast ? 'ring-2 ring-[#D29F54]' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
              {/* Overlay for remaining images on the last thumbnail */}
              {isLast && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors hover:bg-black/40" onClick={() => setCurrentIndex(0)}>
                  <span className="text-white font-semibold text-lg">+{images.length - 5}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyGallery;
