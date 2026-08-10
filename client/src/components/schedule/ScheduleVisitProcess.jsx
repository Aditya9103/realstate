import React from 'react';
import { ArrowRight } from 'lucide-react';

const ScheduleVisitProcess = () => {
  return (
    <div className="bg-[#fafafa] rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8 mt-10">
      
      {/* Title Area */}
      <div className="md:w-1/5 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6">
        <h3 className="text-[#1a2b3c] font-bold text-lg font-serif leading-tight">
          What<br/>happens next?
        </h3>
      </div>

      {/* Steps Container */}
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-2 w-full">
        
        {/* Step 1 */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full border-2 border-[#D29F54] text-[#D29F54] font-bold text-lg flex items-center justify-center flex-shrink-0 bg-[#D29F54]/5">
            1
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Schedule</h4>
            <p className="text-[11px] text-gray-900 leading-snug">Pick your date<br/>and time</p>
          </div>
        </div>

        <ArrowRight size={16} className="text-gray-300 hidden md:block flex-shrink-0 mx-2" />

        {/* Step 2 */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-900 font-bold text-lg flex items-center justify-center flex-shrink-0 bg-white">
            2
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Confirmation</h4>
            <p className="text-[11px] text-gray-900 leading-snug">We'll confirm your<br/>appointment</p>
          </div>
        </div>

        <ArrowRight size={16} className="text-gray-300 hidden md:block flex-shrink-0 mx-2" />

        {/* Step 3 */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-900 font-bold text-lg flex items-center justify-center flex-shrink-0 bg-white">
            3
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Visit</h4>
            <p className="text-[11px] text-gray-900 leading-snug">Meet our expert and<br/>explore the property</p>
          </div>
        </div>

        <ArrowRight size={16} className="text-gray-300 hidden md:block flex-shrink-0 mx-2" />

        {/* Step 4 */}
        <div className="flex items-start md:items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full border border-gray-300 text-gray-900 font-bold text-lg flex items-center justify-center flex-shrink-0 bg-white">
            4
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1a2b3c] mb-1">Decide</h4>
            <p className="text-[11px] text-gray-900 leading-snug">Make an informed<br/>final decision</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ScheduleVisitProcess;
