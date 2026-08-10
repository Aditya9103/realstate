import React from 'react';
import { Headset, Mail, MapPin } from 'lucide-react';

const ScheduleVisitCTA = () => {
  return (
    <div className="bg-[#051120] rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-10 shadow-2xl">
      
      {/* Phone CTA */}
      <div className="flex items-center gap-6 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-800 pb-6 md:pb-0 md:pr-6">
        <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center flex-shrink-0">
          <Headset size={28} className="text-[#D29F54]" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Prefer to talk?</h3>
          <p className="text-gray-500 text-sm mb-4">Our experts are just a call away.</p>
          <button className="bg-[#D29F54] text-white font-bold text-sm px-6 py-2.5 rounded hover:bg-[#b88a44] transition-colors flex items-center gap-2">
            <Headset size={16} />
            +91 98765 43210
          </button>
        </div>
      </div>

      {/* Email CTA */}
      <div className="flex items-center gap-6 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-800 pb-6 md:pb-0 md:px-6">
        <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center flex-shrink-0">
          <Mail size={28} className="text-[#D29F54]" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
          <a href="mailto:hello@horizonrealestate.com" className="text-gray-300 text-sm hover:text-[#D29F54] transition-colors mb-2 block">hello@horizonrealestate.com</a>
          <p className="text-gray-600 text-xs">We'll reply within 24 hours</p>
        </div>
      </div>

      {/* Office CTA */}
      <div className="flex items-center gap-6 flex-1 w-full md:pl-6">
        <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center flex-shrink-0">
          <MapPin size={28} className="text-[#D29F54]" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Visit Our Office</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            6th Floor, Skyline Tower, Sector 62,<br/>Noida, Uttar Pradesh 201301
          </p>
          <p className="text-gray-600 text-xs">Mon - Sat: 9:00 AM - 7:00 PM</p>
        </div>
      </div>

    </div>
  );
};

export default ScheduleVisitCTA;
