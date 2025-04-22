import React, { useState } from 'react';

const faqs = [
  {
    question: "How do I get started?",
    answer: "Click the 'Register' button and complete your signup in under 2 minutes.",
  },
  {
    question: "Is Zubplug available nationwide?",
    answer: "Yes. Our services are accessible from anywhere in Nigeria.",
  },
  {
    question: "How do I fund my wallet?",
    answer: "Login to your dashboard and use your Zubplug virtual account to top up.",
  },
  {
    question: "Can I become an agent or staff?",
    answer: "Yes. After signing up, apply inside your dashboard to become a verified agent or partner staff.",
  },
];

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-blue-100 rounded-md">
              <button
                className="w-full text-left px-4 py-3 bg-blue-50 font-medium text-sm text-blue-800 hover:bg-blue-100 transition"
                onClick={() => toggle(index)}
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-sm text-gray-700 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
