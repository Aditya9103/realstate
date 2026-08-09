import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50 w-full h-full flex flex-col xl:flex-row gap-10">
      
      {/* Left Column: Contact Details */}
      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-[#1a2b3c] mb-2 font-serif">Get in Touch</h2>
          <p className="text-gray-500 text-sm">
            Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {/* Office Address */}
          <div className="flex items-start gap-5 p-4 rounded-xl bg-[#fafafa] border border-gray-100 hover:border-[#D29F54]/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#D29F54]">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Our Office</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Horizon Real Estate, 6th Floor, Skyline Tower,<br/>
                Sector 62, Noida, Uttar Pradesh 201301
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start gap-5 p-4 rounded-xl bg-[#fafafa] border border-gray-100 hover:border-[#D29F54]/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#D29F54]">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Phone Number</h4>
              <p className="text-sm text-gray-500 mb-0.5">+91 98765 43210</p>
              <p className="text-[11px] text-gray-400">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-start gap-5 p-4 rounded-xl bg-[#fafafa] border border-gray-100 hover:border-[#D29F54]/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#D29F54]">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Email Address</h4>
              <p className="text-sm text-gray-500 mb-0.5">hello@horizonrealestate.com</p>
              <p className="text-[11px] text-gray-400">We'll reply within 24 hours</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex items-center gap-5 p-4 rounded-xl bg-[#fafafa] border border-gray-100 mt-auto">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#D29F54]">
              <Clock size={20} /> {/* Used as placeholder icon matching image, though usually social is network */}
            </div>
            <div className="flex-1 flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#1a2b3c]">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#D29F54] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#D29F54] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#D29F54] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#D29F54] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visuals */}
      <div className="w-full xl:w-[45%] flex flex-col gap-4">
        
        {/* Map Placeholder Image -> Google Maps Embed */}
        <div className="w-full h-48 md:h-[220px] rounded-xl overflow-hidden relative border border-gray-100 bg-[#f0f3f5]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0612140411833!2d77.3610993150824!3d28.627928282419515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456ef36d9f%3A0x3b7191b128613608!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1689260113115!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>

        {/* Office Image Card */}
        <div className="w-full flex-1 rounded-xl overflow-hidden border border-gray-100 bg-white flex flex-col">
          <div className="w-full h-32 md:h-40 relative">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600" 
              alt="Our Office Interior" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Visit Our Office</h4>
            <p className="text-[13px] text-gray-500 mb-4">We'd love to meet you in person!</p>
            <Link to="#" className="inline-flex items-center gap-2 text-[#D29F54] text-xs font-bold uppercase tracking-wider hover:text-[#b88a44] transition-colors">
              Get Directions
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ContactInfo;
