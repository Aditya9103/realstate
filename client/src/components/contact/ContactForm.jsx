import React, { useState } from 'react';
import { User, Mail, Phone, Tag, Send, Lock, Loader2 } from 'lucide-react';
import { useSubmitMessageMutation } from '../../redux/api/messageApiSlice';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitMessage, { isLoading, isSuccess, isError, error }] = useSubmitMessageMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    try {
      await submitMessage(formData).unwrap();
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Failed to submit message', err);
    }
  };
  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50 w-full h-full flex flex-col">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b3c] mb-3 font-serif">Send Us a Message</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>

      <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
        {isSuccess && (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-200">
            Thank you! Your message has been sent successfully. We will get back to you soon.
          </div>
        )}
        {isError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
            {error?.data?.message || 'Failed to send message. Please try again.'}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
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
              className="w-full bg-[#f8f9fa] border border-transparent rounded-xl pl-12 pr-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>

          {/* Email Address */}
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
              className="w-full bg-[#f8f9fa] border border-transparent rounded-xl pl-12 pr-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-900 placeholder-gray-500 font-medium"
            />
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
              placeholder="Phone Number"
              className="w-full bg-[#f8f9fa] border border-transparent rounded-xl pl-12 pr-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>

          {/* Subject */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Tag size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full bg-[#f8f9fa] border border-transparent rounded-xl pl-12 pr-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>

        {/* Interested In (Dropdown) */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-gray-800 mb-1.5 uppercase tracking-wider pl-1">I'm Interested In</label>
          <select
            className="w-full bg-[#f8f9fa] border border-transparent rounded-xl px-5 py-3.5 text-sm focus:bg-white focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-900 font-medium appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Select an option</option>
            <option value="buy">Buying a Property</option>
            <option value="rent">Renting a Property</option>
            <option value="sell">Selling a Property</option>
            <option value="manage">Property Management</option>
            <option value="other">Other</option>
          </select>
          {/* Custom Chevron for select */}
          <div className="absolute right-4 top-[38px] pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        {/* Message */}
        <div className="flex-1 min-h-[140px] flex flex-col">
          <label className="block text-[11px] font-bold text-gray-800 mb-1.5 uppercase tracking-wider pl-1">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us more about your requirements..."
            className="w-full flex-1 bg-[#f8f9fa] border border-transparent rounded-xl px-5 py-4 text-sm focus:bg-white focus:outline-none focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] transition-all text-gray-900 placeholder-gray-500 font-medium resize-none"
          ></textarea>
        </div>

        {/* Footer: Button & Lock Icon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#D29F54] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#b88a44] hover:shadow-lg hover:shadow-[#D29F54]/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Send Message'}
            {!isLoading && <Send size={16} />}
          </button>

          <div className="flex items-center gap-2 text-gray-500">
            <Lock size={14} />
            <span className="text-xs font-medium">Your information is secure and will never be shared.</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
