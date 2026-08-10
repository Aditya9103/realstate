import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyGallery = ({ property }) => {
  const images = [
    property.image,
    ...(property.gallery || [])
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="mb-8 relative">
      {/* Main Large Image Wrapper */}
      <div className="relative mb-4 group">
        
        {/* The actual image container */}
        <div 
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-crosshair"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img 
            src={images[currentIndex]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Photo Count Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1a2b3c] text-sm font-bold px-4 py-1.5 rounded-full shadow-sm z-10 pointer-events-none">
            {images.length} Photos
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Zoomed Pane (Amazon style - right side over sidebar) */}
        {showZoom && (
          <div 
            className="hidden lg:block absolute top-0 left-[calc(100%+3rem)] w-[calc(35/65*100%)] h-full bg-white border border-gray-200 shadow-2xl rounded-2xl z-[100] pointer-events-none"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
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
                className={`w-full h-full object-cover transition-opacity ${currentIndex === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              />
              {/* Overlay for remaining images on the last thumbnail */}
              {isLast && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-colors hover:bg-black/50" onClick={() => setCurrentIndex(0)}>
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
