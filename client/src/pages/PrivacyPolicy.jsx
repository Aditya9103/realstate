import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#fcf9f2] min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              At Luxora Real Estate, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, and your access times.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">3. Use of Your Information</h2>
            <p className="leading-relaxed mb-3">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage your account.</li>
              <li>Email you regarding your property inquiries or account.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">4. Security of Your Information</h2>
            <p className="leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2b3c] mb-3">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at: <br />
              <a href="mailto:privacy@luxora.in" className="text-[#D29F54] hover:underline font-semibold mt-2 inline-block">privacy@luxora.in</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
