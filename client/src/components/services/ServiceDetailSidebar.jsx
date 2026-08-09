import React from 'react';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceDetailSidebar = ({ service }) => {
  return (
    <div className="sticky top-32">
      
      {/* Contact Form Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 mb-8">
        <h3 className="text-2xl font-bold text-[#1a2b3c] mb-2 font-serif">Get Started</h3>
        <p className="text-gray-500 text-sm mb-6">
          Interested in our {service.title} service? Fill out the form below and we'll be in touch shortly.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Message</label>
            <textarea 
              rows="4"
              placeholder={`I'd like more information about your ${service.title} service...`}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="button"
            className="w-full bg-[#1a2b3c] text-white font-bold px-6 py-3.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-2"
          >
            Send Message
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      {/* Direct Contact Card */}
      <div className="bg-[#0a192f] rounded-2xl p-8 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D29F54]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <h3 className="text-xl font-bold text-white mb-6 font-serif relative z-10">Need Immediate Help?</h3>
        
        <div className="space-y-4 relative z-10">
          <a href="tel:+919876543210" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D29F54] group-hover:text-[#1a2b3c] transition-colors">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Call Us</p>
              <p className="font-semibold">+91 98765 43210</p>
            </div>
          </a>

          <a href="mailto:contact@horizon.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D29F54] group-hover:text-[#1a2b3c] transition-colors">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Email Us</p>
              <p className="font-semibold">contact@horizon.com</p>
            </div>
          </a>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetailSidebar;
