import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 py-6 px-4 md:px-16 flex items-center justify-between text-white border-b transition-all duration-300 bg-[#0a192f] border-[#1a2b3c]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-end text-[#D29F54]">
          {/* Logo icon representation */}
          <div className="w-1.5 h-6 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
          <div className="w-1.5 h-10 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
          <div className="w-1.5 h-8 bg-[#D29F54] mx-0.5 rounded-t-sm"></div>
        </Link>
        <Link to="/" className="flex flex-col tracking-wider">
          <span className="text-xl md:text-2xl font-semibold uppercase leading-none tracking-[0.2em]">Luxora</span>
          <span className="text-[0.6rem] text-gray-400 uppercase tracking-[0.3em] mt-1">Real Estate</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
        <Link to="/" className={`${location.pathname === '/' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>HOME</Link>
        <Link to="/properties" className={`${location.pathname === '/properties' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>PROPERTIES</Link>
        <Link to="/about" className={`${location.pathname === '/about' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>ABOUT US</Link>
        <Link to="/services" className={`${location.pathname === '/services' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>SERVICES</Link>
        <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-[#D29F54] border-b border-[#D29F54]' : 'hover:text-[#D29F54] transition-colors'} pb-1`}>CONTACT</Link>
      </div>

      {/* Action Button */}
      <div className="hidden lg:block">
        <Link
          to="/schedule-visit"
          className="flex items-center gap-2 border border-[#D29F54] bg-[#D29F54] text-white px-5 py-2.5 rounded text-sm font-bold hover:bg-[#b88a44] transition-colors"
        >
          <Calendar size={16} />
          Schedule a Visit
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-[#D29F54] transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden fixed top-[88px] left-0 w-full bg-[#0a192f] border-b border-[#1a2b3c] transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
      >
        <div className="flex flex-col px-6 space-y-4 font-medium text-sm">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`${location.pathname === '/' ? 'text-[#D29F54]' : 'text-gray-300 hover:text-[#D29F54]'}`}>HOME</Link>
          <Link to="/properties" onClick={() => setIsMobileMenuOpen(false)} className={`${location.pathname === '/properties' ? 'text-[#D29F54]' : 'text-gray-300 hover:text-[#D29F54]'}`}>PROPERTIES</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`${location.pathname === '/about' ? 'text-[#D29F54]' : 'text-gray-300 hover:text-[#D29F54]'}`}>ABOUT US</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`${location.pathname === '/services' ? 'text-[#D29F54]' : 'text-gray-300 hover:text-[#D29F54]'}`}>SERVICES</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`${location.pathname === '/contact' ? 'text-[#D29F54]' : 'text-gray-300 hover:text-[#D29F54]'}`}>CONTACT</Link>

          <div className="pt-4 border-t border-[#1a2b3c]">
            <Link
              to="/schedule-visit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 border border-[#D29F54] bg-[#D29F54] text-white px-5 py-3 rounded text-sm font-bold hover:bg-[#b88a44] transition-colors w-full"
            >
              <Calendar size={16} />
              Schedule a Visit
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
