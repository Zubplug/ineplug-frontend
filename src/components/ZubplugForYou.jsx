import React from 'react';

const ZubplugForYou = () => {
  return (
    <section className="bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left: Zubplug For You */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-5 rounded-md shadow-sm">
            <p className="text-sm text-blue-700 font-semibold mb-1">
              For Business? <span className="text-black">Owners</span>
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Register & verify your business in one click using CAC and compliance tools.
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-md shadow-sm">
            <p className="text-sm text-blue-700 font-semibold mb-1">Backed by</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Nigerian Compliance Laws and government-recognized platforms.
            </p>
          </div>
        </div>

        {/* Right: Testimonials & Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Center stat */}
          <div className="sm:col-span-2 bg-white border border-gray-200 shadow p-5 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-800 mb-1">30,000+</p>
            <p className="text-sm text-gray-600">Services Delivered</p>
          </div>

          {/* Logos or support notes */}
          <div className="bg-white border border-gray-200 shadow p-5 rounded-md text-center">
            <p className="text-sm text-gray-700 font-semibold">✓ Trusted Partners</p>
            <p className="text-xs text-gray-500 mt-1">Moniepoint, Peerlend, CBN Agents</p>
          </div>

          <div className="bg-white border border-gray-200 shadow p-5 rounded-md text-center">
            <p className="text-sm text-gray-700 font-semibold">For Agents</p>
            <p className="text-xs text-gray-500 mt-1">Serve. Earn. Grow.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZubplugForYou;
