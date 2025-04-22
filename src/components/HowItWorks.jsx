import React from 'react';

const steps = [
  {
    icon: "📝",
    title: "Create an Account",
    desc: "Sign up and access your dashboard instantly.",
  },
  {
    icon: "💰",
    title: "Fund Your Wallet",
    desc: "Top up via your virtual account — no delays.",
  },
  {
    icon: "🛠️",
    title: "Request a Service",
    desc: "Select from CAC, NIN, BVN, VTU and more.",
  },
  {
    icon: "📄",
    title: "Track or Download",
    desc: "Monitor your request or download approved files.",
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-blue-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-12">
          How Zubplug Works
        </h2>

        {/* Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow hover:shadow-md transition">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
