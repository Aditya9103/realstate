import React, { useState } from 'react';
import { ChevronDown, Grid, List } from 'lucide-react';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ properties }) => {
  const [sortBy, setSortBy] = useState('newest');

  // Sort properties based on selected criteria
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceValue - b.priceValue;
    if (sortBy === 'price-high') return b.priceValue - a.priceValue;
    // newest first (assuming _id or createdAt can be used, or just reverse if no createdAt)
    return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
  });
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="font-bold text-[#1a2b3c]">
          <span className="text-[#D29F54]">{sortedProperties.length}</span> Properties Found
        </h2>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort by:</span>
            <div className="relative">
              <select 
                className="appearance-none border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-[#1a2b3c] font-medium outline-none focus:border-[#D29F54] bg-white cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 bg-white">
            <button className="p-1.5 bg-[#fcf9f2] text-[#D29F54] rounded shadow-sm border border-[#f5e6ce]">
              <Grid size={18} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-[#1a2b3c] transition-colors">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedProperties.map(property => (
            <PropertyCard key={property._id || property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-2">No properties found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
        </div>
      )}

      {/* Pagination Placeholder */}
      {sortedProperties.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#D29F54] hover:text-[#D29F54] transition-colors">
              &lt;
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#D29F54] text-white flex items-center justify-center font-bold shadow-md">
              1
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54] transition-colors font-medium">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54] transition-colors font-medium">
              3
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54] transition-colors">
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;
