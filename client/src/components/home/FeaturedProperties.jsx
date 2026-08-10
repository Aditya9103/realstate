import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, BedDouble, Bath, Square, ArrowRight } from 'lucide-react';
import { useGetPropertiesQuery } from '../../redux/api/propertyApiSlice';

const FeaturedProperties = () => {
  const { data: propertiesData = [], isLoading, isError } = useGetPropertiesQuery();
  
  // Get only first 4 properties for the featured section
  const properties = propertiesData.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-px bg-[#D29F54]"></div>
              <span className="text-[#D29F54] font-bold tracking-widest text-sm uppercase">Curated Collection</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2b3c] font-serif leading-tight">
              Featured Properties
            </h2>
          </div>
          <Link to="/properties" className="hidden md:flex items-center gap-2 text-[#D29F54] font-semibold hover:text-[#b88a44] transition-colors uppercase tracking-wide group">
            Explore Collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-10 font-bold text-gray-600">Loading Featured Properties...</div>
        ) : isError ? (
          <div className="text-center py-10 font-bold text-red-500">Failed to load properties.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property) => (
              <Link to={`/properties/${property._id}`} key={property._id} className="bg-white rounded-[1.25rem] overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group/card cursor-pointer flex flex-col">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Gradient overlay on image bottom to make it blend into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-4 left-4 bg-[#1a2b3c]/90 backdrop-blur-md text-[#D29F54] text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
                    {property.status === 'Buy' ? 'FOR SALE' : 'FOR RENT'}
                  </div>
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full text-[#1a2b3c] hover:text-white hover:bg-[#D29F54] transition-colors shadow-sm flex items-center justify-center"
                    onClick={(e) => { e.preventDefault(); /* prevent navigating to details */ }}
                  >
                    <Heart size={18} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#1a2b3c] mb-1.5 group-hover/card:text-[#D29F54] transition-colors truncate">{property.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-4 font-medium truncate">
                    <MapPin size={16} className="mr-1.5 text-gray-500 flex-shrink-0" /> <span className="truncate">{property.location}</span>
                  </div>

                  <div className="text-[#D29F54] font-bold text-xl mb-6 mt-auto">
                    {property.priceDisplay}
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center justify-between text-gray-600 text-sm border-t border-gray-100 pt-5 mt-auto font-medium">
                    <div className="flex items-center gap-2">
                      <BedDouble size={18} className="text-[#D29F54]" strokeWidth={1.5} />
                      <span>{property.beds || 0} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={18} className="text-[#D29F54]" strokeWidth={1.5} />
                      <span>{property.baths || 0} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square size={18} className="text-[#D29F54]" strokeWidth={1.5} />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <Link to="/properties" className="md:hidden w-full flex justify-center items-center gap-2 text-[#D29F54] font-semibold mt-8 hover:text-[#b88a44] transition-colors uppercase tracking-wide">
          View All Properties <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
