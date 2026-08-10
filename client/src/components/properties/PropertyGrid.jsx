import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ properties }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when properties or sort criteria change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [properties, sortBy]);

  // Sort properties based on selected criteria
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceValue - b.priceValue;
    if (sortBy === 'price-high') return b.priceValue - a.priceValue;
    // newest first (assuming _id or createdAt can be used, or just reverse if no createdAt)
    return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
  });

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
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
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      {/* Grid */}
      {paginatedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedProperties.map(property => (
            <PropertyCard key={property._id || property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54]'}`}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <button 
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${currentPage === pageNum ? 'bg-[#D29F54] text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54]'}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:border-[#D29F54] hover:text-[#D29F54]'}`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;
