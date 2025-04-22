import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

const bvnServices = [
  {
    title: "BVN Enrollment License",
    description: "Request BVN enrollment license.",
    subServices: [
      { name: "New License Request", price: 35000 },
      { name: "License Renewal", price: 20000 },
    ],
  },
  {
    title: "BVN Modifications",
    description: "Modify your BVN data.",
    subServices: [
      { name: "Change of Name", price: 7000 },
      { name: "Change of Date of Birth", price: 10000 },
      { name: "Change of Phone/Email", price: 5000 },
    ],
  },
  {
    title: "Retrieval of Lost BVN",
    description: "Retrieve your BVN slip or number.",
    subServices: [
      { name: "BVN Number Recovery", price: 3000 },
      { name: "BVN Printout", price: 2000 },
    ],
  },
  {
    title: "Non Appearance Enrollment",
    description: "BVN enrollment without physical presence.",
    subServices: [
      { name: "Remote BVN Enrollment", price: 15000 },
    ],
  },
  {
    title: "BVN Device",
    description: "Request biometric kits for BVN.",
    subServices: [
      { name: "Full Biometric Kit", price: 95000 },
      { name: "Device Software License", price: 25000 },
    ],
  },
  {
    title: "NIBSS Services",
    description: "BVN-related services under NIBSS.",
    subServices: [
      { name: "NIBSS Validation", price: 5000 },
      { name: "NIBSS Verification", price: 4000 },
    ],
  },
];

export default function BVNServices() {
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
          BVN Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bvnServices.map((cat, index) => (
            <div
              key={index}
              onClick={() => setModalData(cat)}
              className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <h2 className="text-lg font-semibold text-blue-900 dark:text-white">
                {cat.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {modalData && (
        <SubServiceModal
          title={modalData.title}
          subServices={modalData.subServices}
          onClose={() => setModalData(null)}
        />
      )}

      <FooterNav />
    </div>
  );
}
