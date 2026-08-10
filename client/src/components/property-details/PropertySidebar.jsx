import React from 'react';
import { Calendar, MessageSquare, ShieldCheck, Star, Phone, Mail, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icon for properties
const propertyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PropertySidebar = ({ property }) => {
  return (
    <div className="space-y-6 lg:sticky lg:top-28">

      {/* Price & Schedule Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-3xl font-bold text-[#D29F54] mb-1">
          {property.priceDisplay}
        </h2>
        <p className="text-sm text-gray-600 mb-8">Price Negotiable</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
            </div>
            <div className="font-bold text-[#1a2b3c]">{property.beds}</div>
            <div className="text-xs text-gray-600">Beds</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="flex justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="10" x2="8" y1="5" y2="7" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="7" x2="7" y1="19" y2="21" /><line x1="17" x2="17" y1="19" y2="21" /></svg>
            </div>
            <div className="font-bold text-[#1a2b3c]">{property.baths}</div>
            <div className="text-xs text-gray-600">Baths</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="flex justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 13h-4" /><path d="M22 17h-4" /><path d="M14 13h-4" /><path d="M14 17h-4" /><path d="M6 13H2" /><path d="M6 17H2" /></svg>
            </div>
            <div className="font-bold text-[#1a2b3c]">{property.sqft}</div>
            <div className="text-xs text-gray-600">Sq.Ft</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="flex justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </div>
            <div className="font-bold text-[#1a2b3c] truncate px-1">{property.type}</div>
            <div className="text-xs text-gray-600">Property Type</div>
          </div>
        </div>

        <Link 
          to={`/schedule-visit?propertyId=${property._id}`}
          className="w-full bg-[#D29F54] hover:bg-[#b88a44] text-white font-bold py-3.5 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors"
        >
          <Calendar size={18} /> Schedule a Visit
        </Link>
        <Link 
          to="/contact"
          className="w-full bg-transparent border border-[#D29F54] text-[#D29F54] hover:bg-[#fcf9f2] font-bold py-3.5 rounded-lg mb-6 flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare size={18} /> Request More Info
        </Link>

        <div className="flex items-center justify-center gap-2 text-sm text-[#1a2b3c] font-medium">
          <ShieldCheck size={16} className="text-[#D29F54]" />
          100% Verified Property
        </div>
      </div>

      {/* Agent Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-5 md:p-6 pb-5">
        <div className="flex gap-4 md:gap-5 mb-5 md:mb-6">
          <div className="w-[100px] h-[100px] rounded-[20px] overflow-hidden flex-shrink-0 bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Rahul Sharma"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-gray-600 mb-1">Property Expert</p>
            <h3 className="font-bold text-[#1a2b3c] text-xl md:text-[22px] mb-2 leading-none" style={{ fontFamily: 'Georgia, serif' }}>Rahul Sharma</h3>

            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
              <div className="flex">
                <Star size={16} className="text-[#b88a44] fill-[#b88a44]" />
                <Star size={16} className="text-[#b88a44] fill-[#b88a44]" />
                <Star size={16} className="text-[#b88a44] fill-[#b88a44]" />
                <Star size={16} className="text-[#b88a44] fill-[#b88a44]" />
                <div className="relative">
                  <Star size={16} className="text-gray-300" />
                  <div className="absolute inset-0 overflow-hidden w-[60%]">
                    <Star size={16} className="text-[#b88a44] fill-[#b88a44]" />
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-700 ml-1">(4.9/5)</span>
            </div>

            <p className="text-[13px] font-medium text-gray-600">10+ Years of Real Estate Experience</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <button className="bg-[#b88a44] hover:bg-[#a67c3d] text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Phone size={18} fill="currentColor" /> <span className="text-[15px]">Call Now</span>
          </button>
          <Link 
            to="/contact"
            className="bg-white border-2 border-[#b88a44] text-[#b88a44] hover:bg-[#fcf9f2] font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare size={18} fill="currentColor" /> <span className="text-[15px]">Message</span>
          </Link>
        </div>
      </div>

      {/* Quick Highlights */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#1a2b3c] mb-4">Quick Highlights</h3>
        <ul className="space-y-3">
          {[
            `Premium location in ${property.location ? property.location.split(',')[0] : 'prime area'}`,
            property.type === 'Villa' || property.type === 'Penthouse' ? 'Private terrace & views' : 'Modern interior design',
            'Landscaped garden & open spaces',
            'Smart home automation readiness',
            '24/7 security with CCTV surveillance',
            'Close to major hubs & amenities'
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
              <Check size={16} className="text-[#D29F54] mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Map Location */}
      {property.coordinates?.lat && property.coordinates?.lng && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
          <h3 className="font-bold text-[#1a2b3c] mb-4">Location Map</h3>
          <div className="h-[250px] w-full rounded-xl overflow-hidden border border-gray-200 z-0 relative">
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
                icon={propertyIcon}
              >
                <Popup>
                  <div className="font-bold text-center">{property.title}</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertySidebar;
