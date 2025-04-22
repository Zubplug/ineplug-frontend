import React from 'react';

const services = [
  { name: "BVN Linking", icon: "🧾" },
  { name: "NIN Verification", icon: "🆔" },
  { name: "CAC Registration", icon: "🏢" },
  { name: "NSITF Payment", icon: "💳" },
  { name: "B-Banking", icon: "🏦" },
  { name: "Airtime Purchase", icon: "📱" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-12">
          Core Services
        </h2>

        {/* Service Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-2">{service.icon}</div>
              <p className="text-sm font-medium text-gray-800">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Regional Highlight */}
        <div className="text-center mt-10 text-sm text-gray-500">
          Active Users in <strong>Abuja, Lagos, Kaduna...</strong>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
