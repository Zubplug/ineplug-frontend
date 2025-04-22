import React from 'react';

const audiences = [
  {
    title: "Users",
    desc: "Request services like NIN, BVN, CAC, and more from your dashboard.",
    icon: "👤"
  },
  {
    title: "Agents",
    desc: "Earn commission by offering Zubplug services to others.",
    icon: "🧑‍💼"
  },
  {
    title: "Aggregators",
    desc: "Manage multiple agents and earn from their transactions.",
    icon: "🤝"
  },
  {
    title: "Partner Staff",
    desc: "Pick jobs, fulfill requests, and get paid per approved service.",
    icon: "🛠️"
  }
];

const AudienceSection = () => {
  return (
    <section className="bg-blue-50 px-6 py-12 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-10">
        Zubplug for Everyone
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {audiences.map((aud, index) => (
          <div key={index} className="bg-white rounded-lg p-5 shadow hover:shadow-md transition text-center">
            <div className="text-4xl mb-3">{aud.icon}</div>
            <h3 className="text-md font-semibold text-blue-700">{aud.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{aud.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudienceSection;
