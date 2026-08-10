import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a2b3c] text-white pt-20 pb-10 px-4 md:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="lg:pr-8">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="flex items-end">
                <div className="w-1.5 h-6 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
                <div className="w-1.5 h-10 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
                <div className="w-1.5 h-8 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
              </div>
              <div className="flex flex-col tracking-wider">
                <span className="text-2xl font-semibold uppercase leading-none tracking-[0.2em] text-white">Luxora</span>
                <span className="text-[0.6rem] text-[#D29F54] uppercase tracking-[0.3em] mt-1">Real Estate</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Redefining luxury living. We provide an unparalleled real estate experience, helping you find exceptional properties in premium locations with absolute transparency.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D29F54] hover:text-[#1a2b3c] transition-all duration-300 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D29F54] hover:text-[#1a2b3c] transition-all duration-300 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D29F54] hover:text-[#1a2b3c] transition-all duration-300 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D29F54] hover:text-[#1a2b3c] transition-all duration-300 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Properties', 'Agents', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-300 hover:text-[#D29F54] transition-colors flex items-center gap-2 group text-sm">
                    <ArrowRight size={14} className="text-[#D29F54]/0 group-hover:text-[#D29F54] -ml-4 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Our Services</h4>
            <ul className="space-y-4">
              {['Buy a Home', 'Rent a Home', 'Sell Property', 'Property Management', 'Commercial Real Estate', 'Legal Advisory'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-300 hover:text-[#D29F54] transition-colors flex items-center gap-2 group text-sm">
                    <ArrowRight size={14} className="text-[#D29F54]/0 group-hover:text-[#D29F54] -ml-4 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
                  <MapPin size={18} />
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Our Location</h5>
                  <p className="text-gray-300 text-sm">Unit 402, Trade Centre, Bandra Kurla Complex, Mumbai, India</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
                  <Phone size={18} />
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Phone Number</h5>
                  <p className="text-gray-300 text-sm">+91 (22) 1234 5678</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
                  <Mail size={18} />
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Email Address</h5>
                  <p className="text-gray-300 text-sm">contact@luxora.in</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          {/* Left: Copyright */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Luxora Real Estate. All rights reserved.
            </p>
          </div>

          {/* Center: Developer Badge */}
          <div className="flex-1 flex justify-center">
            <a
              href="https://primeimpact.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D29F54]/30 bg-[#D29F54]/5 hover:border-[#D29F54]/80 hover:bg-[#D29F54]/10 transition-all duration-300 shadow-lg shadow-[#D29F54]/5"
            >
              <span className="text-[10px] text-gray-400 tracking-wider font-medium">
                ✦ Designed &amp; Developed by
              </span>
              <span className="text-[12px] font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#D29F54] to-[#e6b872]">
                Prime Impact IT Solutions
              </span>
            </a>
          </div>

          {/* Right: Links */}
          <div className="flex-1 flex justify-center md:justify-end gap-6">
            <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
