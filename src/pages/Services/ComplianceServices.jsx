import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

const complianceServices = [
  {
    title: "NSITF Compliance Certificate",
    description: "Apply for NSITF compliance certificate.",
    price: 15000,
  },
  {
    title: "PenCom Compliance Certificate",
    description: "Request a PenCom certificate for compliance.",
    price: 17000,
  },
  {
    title: "Group Life Insurance Policy",
    description: "Comply with Group Life insurance law.",
    price: 18000,
  },
  {
    title: "ITF Compliance Certificate",
    description: "Request Industrial Training Fund compliance.",
    price: 12000,
  },
  {
    title: "Tax Clearance Certificate (TCC)",
    description: "Get your TCC certificate.",
    price: 20000,
  },
  {
    title: "TIN Registration",
    description: "Register your Tax Identification Number.",
    price: 5000,
  },
  {
    title: "BPP Registration",
    description: "Register with Bureau of Public Procurement.",
    price: 25000,
  },
];

const generateSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function ComplianceServices() {
  const [modalData, setModalData] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 justify-between">
      <div className="p-4 md:p-8 pb-24">
        <Link
          to="/dashboard"
          className="text-sm text-blue-600 font-medium hover:underline block mb-4"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Compliance Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {complianceServices.map((service, index) => (
            <div
              key={index}
              onClick={() =>
                setModalData({
                  title: service.title,
                  subServices: [
                    {
                      name: service.title,
                      price: service.price,
                      slug: generateSlug(service.title),
                    },
                  ],
                })
              }
              className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <h2 className="text-lg font-semibold text-blue-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FooterNav />

      {modalData && (
        <SubServiceModal
          title={modalData.title}
          subServices={modalData.subServices}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
}
