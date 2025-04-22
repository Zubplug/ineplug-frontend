import React from 'react';

const testimonials = [
  {
    name: "Helen S.",
    text: "Recharged airtime and tracked my request instantly.",
  },
  {
    name: "Emmanuel I.",
    text: "Sold airtime and data — earned per transaction.",
  },
  {
    name: "Tunde A.",
    text: "Handled BVN linking easily. I got paid same day.",
  }
];

const MobileAppShowcase = () => {
  return (
    <section className="bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Mobile UI Image */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <img
            src="/mobile-ui.png"
            alt="Zubplug Mobile App"
            className="w-[260px] mx-auto md:mx-0 rounded-lg shadow-lg border"
          />
        </div>

        {/* Right: App Info + Testimonial Cards */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Get Zubplug on Android</h3>
          <p className="text-sm text-gray-700 mb-6">Access wallet, request services, earn commissions.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-md shadow-sm text-sm text-gray-700">
                <strong className="block text-blue-800 mb-1">{t.name}</strong>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppShowcase;
