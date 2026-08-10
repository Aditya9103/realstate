import React, { useState } from 'react';
import { Save, User, Lock, Bell, Moon, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';

const AdminSettings = () => {
  const { adminEmail, adminName } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c]">Settings</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your account preferences and system settings</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#D29F54] hover:bg-[#b88a44] text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="flex flex-col text-sm font-medium text-gray-600">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'profile' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <User size={18} />
                Profile Info
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'security' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <Lock size={18} />
                Security
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'notifications' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <Bell size={18} />
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'appearance' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <Moon size={18} />
                Appearance
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          
          {activeTab === 'profile' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-lg font-bold text-[#1a2b3c] mb-6 flex items-center gap-2">
                <User className="text-[#D29F54]" /> Profile Information
              </h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 border border-gray-200">
                  <User size={40} />
                </div>
                <div>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Upload Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" defaultValue={adminName || 'Admin User'} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" defaultValue={adminEmail || 'admin@luxora.com'} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 flex items-center gap-2 cursor-not-allowed">
                    <Shield size={16} className="text-[#D29F54]" /> Super Admin
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-lg font-bold text-[#1a2b3c] mb-6 flex items-center gap-2">
                <Lock className="text-[#D29F54]" /> Change Password
              </h3>
              
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-lg font-bold text-[#1a2b3c] mb-6 flex items-center gap-2">
                <Bell className="text-[#D29F54]" /> Notification Preferences
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-800">New Visit Requests</h4>
                    <p className="text-sm text-gray-600">Receive an email when a user schedules a property visit.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D29F54]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-800">New Contact Messages</h4>
                    <p className="text-sm text-gray-600">Receive an email for new inquiries via the contact form.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D29F54]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-lg font-bold text-[#1a2b3c] mb-6 flex items-center gap-2">
                <Moon className="text-[#D29F54]" /> Appearance Settings
              </h3>
              <p className="text-gray-600 mb-4">Dark mode for the admin panel is currently in development. It will automatically sync with your system preferences once released.</p>
              
              <div className="opacity-50 pointer-events-none p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                <span className="font-semibold text-gray-700">Enable Dark Mode</span>
                <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
