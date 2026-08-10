import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  CalendarCheck,
  Briefcase,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const AdminSidebar = () => {
  const dispatch = useDispatch();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Properties', path: '/admin/properties', icon: Building2 },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Visits', path: '/admin/visits', icon: CalendarCheck },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="w-64 bg-[#1a2b3c] min-h-screen text-gray-300 flex flex-col font-sans shrink-0 border-r border-[#2a3b4c]">
      {/* Brand Logo */}
      <div className="h-20 flex items-center px-6 bg-[#13202e] border-b border-[#2a3b4c]">
        <div className="w-10 h-10 bg-[#D29F54] rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <ShieldCheck className="text-white" size={20} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">Luxora</h2>
          <p className="text-[10px] text-[#D29F54] uppercase tracking-widest font-bold">Admin Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Management</p>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-[#D29F54]/10 text-[#D29F54]'
                  : 'text-gray-300 hover:bg-[#2a3b4c] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-[#D29F54]' : 'text-gray-300 group-hover:text-gray-300'}`}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          );
        })}
        {/* 
        <div className="pt-8 pb-2">
          <p className="px-4 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">System</p>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive
                ? 'bg-[#D29F54]/10 text-[#D29F54]'
                : 'text-gray-300 hover:bg-[#2a3b4c] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-[#D29F54]' : 'text-gray-300 group-hover:text-gray-300'}`}
                />
                Settings
              </>
            )}
          </NavLink>
        </div> */}
      </nav>

      {/* Bottom Profile / Logout */}
      <div className="p-4 border-t border-[#2a3b4c] bg-[#13202e]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-500/10 rounded-xl transition-all group"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
          <span className="group-hover:text-red-400 transition-colors">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
