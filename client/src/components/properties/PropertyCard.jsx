import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Determine tag styling
  const firstTag = property.tags && property.tags.length > 0 ? property.tags[0] : null;
  let tagClass = 'hidden';
  if (firstTag === 'Featured') tagClass = 'bg-[#D29F54] text-white';
  else if (firstTag === 'New') tagClass = 'bg-green-500 text-white';
  else if (firstTag === 'Hot Deal') tagClass = 'bg-red-500 text-white';
  else if (firstTag === 'Premium') tagClass = 'bg-purple-600 text-white';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col group">
      
      {/* Image & Tags Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        
        {/* Top Left Tag */}
        {firstTag && (
          <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-md ${tagClass}`}>
            {firstTag}
          </div>
        )}

        {/* Top Right Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'text-red-500' : ''} />
        </button>

        {/* Bottom Left Type Tag (Overlapping) */}
        <div className="absolute -bottom-4 left-4 bg-white px-3 py-1.5 rounded-md text-xs font-bold text-[#1a2b3c] shadow-sm flex items-center gap-1.5 z-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D29F54]"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          {property.type}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 pt-8 flex-grow flex flex-col">
        <h3 className="font-bold text-[#1a2b3c] text-lg mb-1 truncate">{property.title}</h3>
        <div className="flex items-center text-gray-500 text-xs mb-4">
          <MapPin size={12} className="mr-1 text-gray-400" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Amenities Row */}
        <div className="flex items-center gap-4 text-gray-600 text-xs font-medium mb-5">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-gray-400" />
            {property.beds} Beds
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-gray-400" />
            {property.baths} Baths
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={14} className="text-gray-400" />
            {property.sqft} Sq.Ft
          </div>
        </div>

        {/* Footer: Price & Button */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="text-[#D29F54] font-bold text-xl">
            {property.priceDisplay}
          </div>
          <Link to={`/properties/${property._id || property.id}`} className="px-4 py-2 border border-[#D29F54] text-[#D29F54] rounded-md text-xs font-bold hover:bg-[#D29F54] hover:text-white transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
