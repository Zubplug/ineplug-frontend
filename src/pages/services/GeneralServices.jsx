import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

const generalServiceCategories = [
  {
    title: "Legal Services",
    description: "File for legal advice, company agreement, affidavit etc.",
    subServices: [
      { name: "Company Legal Advisory", price: 5000 },
      { name: "Legal Agreement Drafting", price: 10000 },
    ],
  },
  {
    title: "Body Massage",
    description: "Book massage and physical therapy experts.",
    subServices: [
      { name: "Home Massage", price: 7000 },
      { name: "Spa Massage", price: 10000 },
    ],
  },
  {
    title: "Medical Services",
    description: "Request for test results, doctor consults, scans etc.",
    subServices: [
      { name: "General Medical Report", price: 8000 },
      { name: "Doctor Home Visit", price: 15000 },
    ],
  },
  {
    title: "Estate Services",
    description: "Get property documents, rental help, search etc.",
    subServices: [
      { name: "Property Search", price: 10000 },
      { name: "Property Verification", price: 15000 },
    ],
  },
  {
    title: "Hospitality Services",
    description: "Hire hotels, reservations, food and drinks.",
    subServices: [
      { name: "Hotel Reservation", price: 10000 },
      { name: "Wedding Reception Planning", price: 20000 },
    ],
  },
  {
    title: "Government Contracts",
    description: "Request application help for government jobs/contracts.",
    subServices: [
      { name: "Contract Documentation", price: 15000 },
      { name: "Government Application Assistance", price: 12000 },
    ],
  },
  {
    title: "Event Planning",
    description: "Hire decorators, DJ, MCs, ushers, and full planning.",
    subServices: [
      { name: "MC and DJ Combo", price: 30000 },
      { name: "Decoration & Setup", price: 50000 },
    ],
  },
];

export default function GeneralServices() {
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
          General Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {generalServiceCategories.map((service, index) => (
            <div
              key={index}
              onClick={() =>
                setModalData({
                  title: service.title,
                  subServices: service.subServices,
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
