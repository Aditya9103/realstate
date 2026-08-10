import React from 'react';
import { ClipboardList, User, Mail, Phone, Video, Users, Lock, Calendar, Loader2 } from 'lucide-react';

const ScheduleVisitForm = ({ 
  formData, setFormData, handleSubmit, isLoading, isSuccess, isError, error 
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 flex flex-col h-full border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
        <div className="w-10 h-10 rounded-full bg-[#f8f9fa] border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
          <ClipboardList size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1a2b3c] font-serif">Your Details</h2>
          <p className="text-gray-500 text-xs">Please fill in your information</p>
        </div>
      </div>

      <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
        
        {isSuccess && (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-200">
            Thank you! Your visit request has been sent successfully. We will get back to you to confirm.
          </div>
        )}
        {isError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
            {error?.data?.message || 'Failed to submit request. Please try again.'}
          </div>
        )}
        
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={16} className="text-gray-500" />
            </div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name" 
              className="w-full bg-white border border-gray-200 rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={16} className="text-gray-500" />
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address" 
              className="w-full bg-white border border-gray-200 rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Phone size={16} className="text-gray-500" />
          </div>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number" 
            className="w-full bg-white border border-gray-200 rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Interested In Dropdown */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-gray-600 mb-1.5 pl-1">I'm Interested In</label>
          <select 
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-700 appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Select an option</option>
            <option value="buy">Buying this property</option>
            <option value="rent">Renting this property</option>
            <option value="visit">Just looking / Visit</option>
            <option value="other">Other</option>
          </select>
          <div className="absolute right-4 top-[36px] pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        {/* Message Box */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-gray-600 mb-1.5 pl-1">Additional Message (Optional)</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific requirements or questions?"
            className="w-full flex-1 bg-white border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-700 placeholder-gray-400 resize-none min-h-[100px]"
          ></textarea>
        </div>

        {/* Preferred Visit Options Divider */}
        <div className="flex items-center gap-3 mt-4 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#f8f9fa] border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
            <Calendar size={16} />
          </div>
          <h3 className="text-sm font-bold text-[#1a2b3c]">Preferred Visit Options</h3>
        </div>

        {/* Toggle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            type="button"
            onClick={() => setFormData({...formData, visitType: 'in-person'})}
            className={`flex-1 rounded-xl p-4 text-left border transition-all flex items-start gap-4 ${
              formData.visitType === 'in-person' 
                ? 'bg-[#fcf9f2] border-[#D29F54] shadow-sm' 
                : 'bg-white border-gray-200 hover:border-[#D29F54]/50 hover:bg-[#fafafa]'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${formData.visitType === 'in-person' ? 'bg-[#D29F54]/10 text-[#D29F54]' : 'bg-gray-50 text-gray-500'}`}>
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2b3c] mb-0.5">In-Person Visit</h4>
              <p className="text-[11px] text-gray-600">Visit the property in person</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => setFormData({...formData, visitType: 'virtual'})}
            className={`flex-1 rounded-xl p-4 text-left border transition-all flex items-start gap-4 ${
              formData.visitType === 'virtual' 
                ? 'bg-[#fcf9f2] border-[#D29F54] shadow-sm' 
                : 'bg-white border-gray-200 hover:border-[#D29F54]/50 hover:bg-[#fafafa]'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${formData.visitType === 'virtual' ? 'bg-[#D29F54]/10 text-[#D29F54]' : 'bg-gray-50 text-gray-500'}`}>
              <Video size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2b3c] mb-0.5">Virtual Tour</h4>
              <p className="text-[11px] text-gray-600">Schedule a live virtual tour</p>
            </div>
          </button>
        </div>

        {/* Security Banner */}
        <div className="bg-[#fafafa] border border-gray-100 rounded-lg p-4 flex items-center gap-3 mt-2">
          <Lock size={16} className="text-[#D29F54]" />
          <p className="text-[11px] text-gray-600 font-medium">Your information is secure and will never be shared with third parties.</p>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="bg-[#D29F54] text-white font-bold text-sm w-full py-4 rounded-lg mt-2 hover:bg-[#b88a44] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#D29F54]/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
          {isLoading ? 'Submitting...' : 'Schedule My Visit'}
        </button>
        <p className="text-center text-[10px] text-gray-500 mt-1 flex items-center justify-center gap-1">
          <span>&copy;</span> We'll confirm your appointment via email or phone.
        </p>

      </form>
    </div>
  );
};

export default ScheduleVisitForm;
