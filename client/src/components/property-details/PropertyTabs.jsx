import React from 'react';
import { HelpCircle, FileText, Blocks, Map, Grid3X3, Video, MapPin, Bus, TrendingUp, ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const tabs = [
  { id: 'overview', label: 'Overview', icon: HelpCircle },
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'amenities', label: 'Amenities', icon: Blocks },
  { id: 'location', label: 'Location', icon: Map },
  { id: 'floor', label: 'Floor Plan', icon: Grid3X3 },
  { id: 'walkthrough', label: 'Walkthrough', icon: FileText },
];

const PropertyTabs = ({ property, activeTab, setActiveTab }) => {
  return (
    <div id="property-tabs" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-gray-200 mb-8 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 px-4 whitespace-nowrap font-semibold text-sm transition-colors border-b-2 ${
                isActive 
                  ? 'border-[#D29F54] text-[#D29F54]' 
                  : 'border-transparent text-gray-500 hover:text-[#1a2b3c]'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Description */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1a2b3c] mb-4">About this Property</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Experience luxury living in this beautifully designed {property.beds}BHK {property.type.toLowerCase()} located in the 
                heart of {property.location.split(',')[0]}. With world-class amenities, modern architecture, and spacious interiors, 
                this property offers the perfect blend of comfort and elegance.
              </p>
              <button className="text-[#D29F54] font-semibold text-sm flex items-center gap-1 mt-4 hover:underline">
                Read More <ChevronDown size={14} />
              </button>
            </div>
            
            {/* Grid Specs */}
            <div className="flex-1 bg-[#fafafa] rounded-xl p-5 border border-gray-100">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Property ID</div>
                  <div className="text-sm font-semibold text-[#1a2b3c]">HRZ{(property._id || '').slice(-6).toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Posted On</div>
                  <div className="text-sm font-semibold text-[#1a2b3c]">{property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '12 May, 2024'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Possession</div>
                  <div className="text-sm font-semibold text-[#1a2b3c]">{property.status === 'Buy' ? 'Ready to Move' : 'Immediate'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Ownership</div>
                  <div className="text-sm font-semibold text-[#1a2b3c]">{property.status === 'Buy' ? 'Freehold' : 'Leasehold'}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-500 mb-1">RERA ID</div>
                  <div className="text-sm font-semibold text-[#1a2b3c]">PRM/RERA/{(property._id || '123456').slice(-6).toUpperCase()}/{new Date(property.createdAt || Date.now()).getFullYear()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#fcf9f2] p-2.5 rounded-lg text-[#D29F54]">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2b3c] text-sm mb-1">Located in Prime Area</h4>
                <p className="text-xs text-gray-500">Well-connected to major hubs</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#fcf9f2] p-2.5 rounded-lg text-[#D29F54]">
                <Bus size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2b3c] text-sm mb-1">Excellent Connectivity</h4>
                <p className="text-xs text-gray-500">Close to metro, schools, malls</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#fcf9f2] p-2.5 rounded-lg text-[#D29F54]">
                <TrendingUp size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2b3c] text-sm mb-1">High Investment Value</h4>
                <p className="text-xs text-gray-500">Great ROI & future appreciation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="animate-fade-in space-y-6">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-4">Property Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-[#fafafa] rounded-xl p-6 border border-gray-100">
            <div><p className="text-sm text-gray-500 mb-1">Property ID</p><p className="font-semibold text-[#1a2b3c]">HRZ{(property._id || '').slice(-6).toUpperCase()}</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Property Type</p><p className="font-semibold text-[#1a2b3c]">{property.type}</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Property Status</p><p className="font-semibold text-[#1a2b3c]">{property.status || 'For Sale'}</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Property Size</p><p className="font-semibold text-[#1a2b3c]">{property.sqft} Sq.Ft</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Bedrooms</p><p className="font-semibold text-[#1a2b3c]">{property.beds}</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Bathrooms</p><p className="font-semibold text-[#1a2b3c]">{property.baths}</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Year Built</p><p className="font-semibold text-[#1a2b3c]">{property.yearBuilt || '2022'}</p></div>
            <div><p className="text-sm text-gray-500 mb-1">Furnishing</p><p className="font-semibold text-[#1a2b3c]">{property.furnishing || 'Semi-Furnished'}</p></div>
          </div>
        </div>
      )}

      {/* Amenities Tab */}
      {activeTab === 'amenities' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-6">Property Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(property.amenities || ['Swimming Pool', 'Gymnasium', '24/7 Security', 'Club House', 'Power Backup', 'Car Parking']).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="bg-[#fcf9f2] p-2 rounded-full text-[#D29F54]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-medium text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location Tab */}
      {activeTab === 'location' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-4">Location Map</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2 mb-6"><MapPin size={16} className="text-[#D29F54]"/> {property.location}</p>
          
          {property.coordinates?.lat && property.coordinates?.lng ? (
            <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden relative border border-gray-100 z-0">
              <MapContainer 
                center={[property.coordinates.lat, property.coordinates.lng]} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={[property.coordinates.lat, property.coordinates.lng]}
                >
                  <Popup>
                    <div className="font-bold text-center">{property.title}</div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <div className="w-full h-[400px] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 text-gray-500">
              No exact coordinates available for this property.
            </div>
          )}
        </div>
      )}

      {/* Floor Plan Tab */}
      {activeTab === 'floor' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-6">Floor Plan Details</h3>
          
          <div className="bg-[#fcf9f2] rounded-xl p-6 md:p-8 border border-[#D29F54]/20">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-[#D29F54]/20 pb-6 mb-6">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-[#D29F54] uppercase tracking-wider mb-1">Total Super Built-up Area</p>
                <h4 className="text-3xl font-bold text-[#1a2b3c]">{property.sqft} <span className="text-lg text-gray-500 font-normal">sq.ft.</span></h4>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1a2b3c] font-bold text-lg mx-auto mb-2 border border-gray-100">{property.beds}</div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1a2b3c] font-bold text-lg mx-auto mb-2 border border-gray-100">{property.baths}</div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Bathrooms</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: property.beds }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-[#1a2b3c]">{i === 0 ? 'Master Bedroom' : `Bedroom ${i + 1}`}</h5>
                    <p className="text-xs text-gray-500 mt-1">With attached balcony & ventilation</p>
                  </div>
                  {i === 0 && property.baths > 0 && <span className="text-[10px] bg-[#D29F54]/10 text-[#D29F54] px-2 py-1 rounded font-bold uppercase">Ensuite</span>}
                </div>
              ))}
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-[#1a2b3c]">Living & Dining Area</h5>
                  <p className="text-xs text-gray-500 mt-1">Spacious open-concept layout</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-[#1a2b3c]">Modern Kitchen</h5>
                  <p className="text-xs text-gray-500 mt-1">Utility area included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Walkthrough Tab */}
      {activeTab === 'walkthrough' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-[#1a2b3c] mb-6">Property Walkthrough</h3>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm leading-relaxed text-gray-600">
            <p className="mb-4">
              Welcome to this breathtaking <span className="font-semibold text-[#1a2b3c]">{property.type}</span> located in the highly sought-after neighborhood of <span className="font-semibold text-[#1a2b3c]">{property.location.split(',')[0]}</span>. 
              As you approach the property, you are immediately greeted by its stunning modern architecture and premium finish.
            </p>
            <p className="mb-4">
              Step inside, and you'll find yourself in a massive, sun-drenched living and dining area spanning a significant portion of this <span className="font-semibold text-[#1a2b3c]">{property.sqft} sq.ft.</span> layout. The open-concept design seamlessly connects the living space to a state-of-the-art modern kitchen, making it perfect for both entertaining guests and relaxing with family.
            </p>
            <p className="mb-4">
              This home features <span className="font-semibold text-[#1a2b3c]">{property.beds} luxurious bedrooms</span> and <span className="font-semibold text-[#1a2b3c]">{property.baths} well-appointed bathrooms</span>. The master suite is a true retreat, offering ample space, natural ventilation, and premium fittings. 
            </p>
            {property.amenities && property.amenities.length > 0 && (
              <p>
                Beyond the interiors, residents have exclusive access to world-class amenities including a <span className="font-semibold text-[#1a2b3c]">{property.amenities.slice(0, 3).join(', ')}</span>, ensuring a lifestyle of utmost convenience and luxury.
              </p>
            )}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
               <span className="text-sm font-semibold text-[#D29F54]">Ready to experience it yourself?</span>
               <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs bg-[#1a2b3c] text-white px-4 py-2 rounded-lg hover:bg-[#D29F54] transition-colors">
                 Schedule a Visit
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper chevron
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default PropertyTabs;
