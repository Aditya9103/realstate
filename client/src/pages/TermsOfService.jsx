import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-[#fcf9f2] min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-6">Terms of Service</h1>
        <p className="text-gray-500 mb-8 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Mithila Legacy Realty ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">2. Intellectual Property Rights</h2>
            <p className="leading-relaxed">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">3. User Representations</h2>
            <p className="leading-relaxed mb-3">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">4. Property Listings and Accuracy</h2>
            <p className="leading-relaxed">
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the properties available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the properties will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual details of the properties. All property listings are subject to availability and we cannot guarantee that properties will be available for purchase, rent, or lease at any given time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">5. Limitations of Liability</h2>
            <p className="leading-relaxed">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">6. Contact Us</h2>
            <p className="leading-relaxed">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <br />
              <a href="mailto:legal@mithilalegacy.in" className="text-[#D29F54] hover:underline font-semibold mt-2 inline-block">legal@mithilalegacy.in</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
