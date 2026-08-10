import React, { useState } from 'react';
import { Save, User, Lock, Bell, Shield, Loader2, Upload } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateAdminProfileMutation } from '../../redux/api/adminApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';

const AdminSettings = () => {
  const { adminEmail, adminName, adminToken, adminPhoto, notificationPreferences } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [updateProfile, { isLoading: isUpdating }] = useUpdateAdminProfileMutation();

  const [activeTab, setActiveTab] = useState('profile');
  
  // Form States
  const [name, setName] = useState(adminName || '');
  const [email, setEmail] = useState(adminEmail || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(adminPhoto || '');

  const [emailVisits, setEmailVisits] = useState(notificationPreferences?.emailVisits ?? true);
  const [emailMessages, setEmailMessages] = useState(notificationPreferences?.emailMessages ?? true);
  const [notificationEmail, setNotificationEmail] = useState(notificationPreferences?.notificationEmail || '');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (activeTab === 'profile') {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (imageFile) {
          formData.append('profilePhoto', imageFile);
        }

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ 
          name: res.name, 
          email: res.email, 
          token: res.token || adminToken, 
          profilePhoto: res.profilePhoto,
          notificationPreferences: res.notificationPreferences
        }));
        setSuccessMsg('Profile updated successfully!');
      } else if (activeTab === 'security') {
        if (!currentPassword) {
          setErrorMsg('Current password is required.');
          return;
        }
        if (!newPassword || newPassword !== confirmPassword) {
          setErrorMsg('New passwords do not match or are empty.');
          return;
        }
        
        // Use JSON for security update since no files are attached
        const res = await updateProfile({ 
          currentPassword, 
          newPassword 
        }).unwrap();
        
        dispatch(setCredentials({ 
          name: res.name, 
          email: res.email, 
          token: res.token || adminToken,
          profilePhoto: res.profilePhoto,
          notificationPreferences: res.notificationPreferences
        }));
        
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccessMsg('Password updated successfully!');
      } else if (activeTab === 'notifications') {
        const res = await updateProfile({
          notificationPreferences: JSON.stringify({
            emailVisits,
            emailMessages,
            notificationEmail
          })
        }).unwrap();
        
        dispatch(setCredentials({ 
          name: res.name, 
          email: res.email, 
          token: res.token || adminToken,
          profilePhoto: res.profilePhoto,
          notificationPreferences: res.notificationPreferences
        }));
        
        setSuccessMsg('Notification preferences updated successfully!');
      } else {
        setSuccessMsg('Settings saved successfully!');
      }
    } catch (err) {
      setErrorMsg(err?.data?.message || 'An error occurred while saving.');
    }
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
          disabled={isUpdating}
          className="flex items-center gap-2 bg-[#D29F54] hover:bg-[#b88a44] text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}
      
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-sm">
          {successMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="flex flex-col text-sm font-medium text-gray-600">
              <button 
                onClick={() => { setActiveTab('profile'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'profile' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <User size={18} />
                Profile Info
              </button>
              <button 
                onClick={() => { setActiveTab('security'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'security' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <Lock size={18} />
                Security
              </button>
              <button 
                onClick={() => { setActiveTab('notifications'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${activeTab === 'notifications' ? 'bg-[#fcf9f2] text-[#D29F54] border-l-2 border-[#D29F54]' : 'hover:bg-gray-50'}`}
              >
                <Bell size={18} />
                Notifications
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
                <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center text-gray-500 border border-gray-200 shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} />
                  )}
                </div>
                <div>
                  <input 
                    type="file" 
                    id="profile-photo" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="profile-photo"
                    className="inline-block bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Upload Photo
                  </label>
                  <p className="text-xs text-gray-500 mt-2">All image types allowed. Max 5MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" 
                  />
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
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors" 
                  />
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
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dedicated Notification Email Address</label>
                  <p className="text-xs text-gray-500 mb-2">If left blank, notifications will be sent to your primary admin login email.</p>
                  <input 
                    type="email" 
                    placeholder="e.g. alerts@luxora.com"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#D29F54] transition-colors max-w-md" 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-800">New Visit Requests</h4>
                    <p className="text-sm text-gray-600">Receive an email when a user schedules a property visit.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={emailVisits} onChange={(e) => setEmailVisits(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D29F54]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-800">New Contact Messages</h4>
                    <p className="text-sm text-gray-600">Receive an email for new inquiries via the contact form.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={emailMessages} onChange={(e) => setEmailMessages(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D29F54]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
