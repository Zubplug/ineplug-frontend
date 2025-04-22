import React from 'react';

const testimonials = [
  {
    name: "Chidinma A.",
    text: "Zubplug helped me fix my NIMC data. The process was smooth and fast!"
  },
  {
    name: "Suleiman B.",
    text: "As an agent, I earn daily helping people register their BVN and CAC."
  },
  {
    name: "Peace E.",
    text: "I tracked my food delivery and downloaded my CAC certificate — all in one place!"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white px-6 py-12 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-10">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-700 mb-4">“{t.text}”</p>
            <h4 className="text-sm font-semibold text-blue-700">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
