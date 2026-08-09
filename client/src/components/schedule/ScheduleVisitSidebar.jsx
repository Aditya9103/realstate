import React, { useState } from 'react';
import { Home, MapPin, Bed, Bath, Square, Calendar as CalendarIcon, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScheduleVisitSidebar = ({ 
  property,
  currentDate, setCurrentDate,
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime
}) => {
  // Mock default property if none passed
  const displayProperty = property || {
    id: 1,
    title: 'Luxury 4BHK Villa',
    location: 'Sector 62, Noida, Uttar Pradesh',
    beds: 4,
    baths: 4,
    sqft: '2800',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600'
  };

  // Time Slots
  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  // Calendar Helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // Generate calendar grid
  const days = [];
  // Empty slots for start of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="text-center p-2 text-gray-300 text-xs"></div>);
  }
  // Days of month
  for (let i = 1; i <= daysInMonth; i++) {
    const isSelected = selectedDate === i;
    days.push(
      <button 
        key={i} 
        onClick={() => setSelectedDate(i)}
        className={`text-center p-2 w-8 h-8 flex items-center justify-center rounded-full text-xs mx-auto transition-colors ${
          isSelected 
            ? 'bg-[#D29F54] text-white font-bold shadow-md shadow-[#D29F54]/30' 
            : 'text-gray-700 hover:bg-gray-100 font-medium'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 flex flex-col h-full border border-gray-100">
      
      {/* Property Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-[#f8f9fa] border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
            <Home size={20} />
          </div>
          <h2 className="text-lg font-bold text-[#1a2b3c] font-serif">Property You're Interested In</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <img src={displayProperty.image} alt={displayProperty.title} className="w-full sm:w-32 h-24 object-cover rounded-lg" />
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-[#1a2b3c] text-sm mb-1">{displayProperty.title}</h3>
            <p className="flex items-center gap-1 text-[11px] text-gray-500 mb-3">
              <MapPin size={12} className="text-[#D29F54]" />
              {displayProperty.location}
            </p>
            
            <div className="flex items-center gap-4 text-[10px] text-gray-500 font-medium mb-3">
              <div className="flex items-center gap-1">
                <Bed size={12} className="text-[#D29F54]" /> {displayProperty.beds} Beds
              </div>
              <div className="flex items-center gap-1">
                <Bath size={12} className="text-[#D29F54]" /> {displayProperty.baths} Baths
              </div>
              <div className="flex items-center gap-1">
                <Square size={12} className="text-[#D29F54]" /> {displayProperty.sqft} Sq. Ft.
              </div>
            </div>

            <Link to={`/properties/${displayProperty._id || displayProperty.id}`} className="text-[#D29F54] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 hover:text-[#b88a44] transition-colors">
              View Property Details <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Date Picker Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-[#f8f9fa] border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
            <CalendarIcon size={20} />
          </div>
          <h2 className="text-lg font-bold text-[#1a2b3c] font-serif">Select Date</h2>
        </div>

        <div className="px-2">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-[#1a2b3c]">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="text-gray-400 hover:text-[#D29F54] transition-colors"><ChevronLeft size={18} /></button>
              <button onClick={nextMonth} className="text-gray-400 hover:text-[#D29F54] transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-400 mb-2">{day}</div>
            ))}
            {days}
          </div>
        </div>
      </div>

      {/* Time Picker Section */}
      <div>
        <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-[#f8f9fa] border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#D29F54]">
            <Clock size={20} />
          </div>
          <h2 className="text-lg font-bold text-[#1a2b3c] font-serif">Select Time</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 px-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-2 rounded-lg text-[11px] font-bold transition-colors border ${
                selectedTime === time 
                  ? 'bg-[#D29F54] text-white border-[#D29F54] shadow-md shadow-[#D29F54]/20' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#D29F54]/50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ScheduleVisitSidebar;
