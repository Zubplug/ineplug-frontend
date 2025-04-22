import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServiceCategoryCard from "../../components/ServiceCategoryCard";
import RequestFormModal from "../../components/RequestFormModal";
import FooterNav from "../../components/FooterNav";

const cacCategories = [
  {
    title: "BUSINESS Name Registration",
    description: "Register your business under CAC.",
    price: 9000,
  },
  {
    title: "COMPANY INCORPORATION",
    description: "Incorporate your Limited Liability Company.",
    price: 15000,
  },
  {
    title: "NGOs",
    description: "Register an NGO or Trustee.",
    price: 35000,
  },
  {
    title: "Business Verification",
    description: "Check CAC record via API.",
    price: 1000,
  },
  {
    title: "POST INCORPORATION",
    description: "Make post-incorporation updates.",
    price: null,
    subServices: [
      { name: "Change of Director", price: 8000 },
      { name: "Change of Address", price: 7000 },
      { name: "Change of Business Name", price: 7500 },
    ],
  },
];

const CACServices = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900">
      <div className="p-4 md:p-8 pb-24">
        <Link
          to="/dashboard"
          className="text-sm text-blue-600 font-medium hover:underline block mb-4"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          CAC Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cacCategories.map((cat, index) => (
            <ServiceCategoryCard
              key={index}
              title={cat.title}
              description={cat.description}
              onClick={() =>
                cat.subServices
                  ? setActiveService({
                      title: cat.title,
                      isSubService: true,
                      subServices: cat.subServices,
                    })
                  : setActiveService({
                      title: cat.title,
                      price: cat.price,
                    })
              }
            />
          ))}
        </div>
      </div>

      <RequestFormModal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        serviceName={activeService}
      />

      <FooterNav />
    </div>
  );
};

export default CACServices;
