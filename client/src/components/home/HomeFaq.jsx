import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "What is the process of buying a property through Mithila Legacy Realty?",
    answer: "Our process is simple and transparent. First, you explore our listings or consult with our agents. Then, we arrange site visits. Once you select a property, our legal and financial teams help you with the paperwork, negotiation, and final registration."
  },
  {
    id: 2,
    question: "Do you charge a brokerage fee?",
    answer: "Yes, we charge a standard industry brokerage fee for our services. However, this varies depending on whether you are buying, selling, or renting, and the specific property type. We ensure complete transparency regarding all fees upfront before any commitments are made."
  },
  {
    id: 3,
    question: "Are the properties listed on your website verified?",
    answer: "Absolutely. Every property listed with Mithila Legacy Realty undergoes a rigorous 50-point verification process by our legal team to ensure clean titles, clear ownership, and compliance with local real estate regulations."
  },
  {
    id: 4,
    question: "Can you help with home loans and financing?",
    answer: "Yes! We have partnered with top national and international banks to provide you with seamless home loan assistance. Our financial advisors will help you secure the best interest rates with minimal paperwork."
  },
  {
    id: 5,
    question: "Do you offer property management services?",
    answer: "Yes, we offer comprehensive property management for NRIs and investors. This includes finding reliable tenants, rent collection, regular maintenance, and handling all legal documentation."
  }
];

const HomeFaq = () => {
  const [openId, setOpenId] = useState(1); // First item open by default

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-16 text-[#1a2b3c] font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column: Header & Intro */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-32">
            <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-4">
              HAVE QUESTIONS?
            </h4>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-serif mb-6 leading-tight">
              Frequently Asked <span className="text-[#D29F54]">Questions</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              We know that buying, selling, or renting a property can be overwhelming. Here are answers to some of the most common questions we receive to help guide you.
            </p>
            
            <div className="p-6 bg-[#fafafa] border border-gray-100 rounded-2xl">
              <h5 className="font-bold mb-2">Still have questions?</h5>
              <p className="text-sm text-gray-600 mb-4">Can't find the answer you're looking for? Please chat to our friendly team.</p>
              <a href="/contact" className="inline-block bg-[#1a2b3c] hover:bg-[#2a3b4c] text-white text-sm font-bold py-3 px-6 rounded-lg transition-colors">
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id} 
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-[#D29F54] bg-[#fcf9f2]' : 'border-gray-200 bg-white hover:border-[#D29F54]/50'}`}
              >
                <button 
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-bold pr-8 ${isOpen ? 'text-[#D29F54]' : 'text-[#1a2b3c]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'bg-[#D29F54] text-white rotate-180' : 'bg-gray-100 text-gray-600'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeFaq;
