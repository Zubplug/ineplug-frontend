import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

const nimcServices = [
  {
    title: "NIMC Enrollment License",
    description: "Request enrollment agent license.",
    subServices: [
      { name: "New Enrollment Agent", price: 35000 },
      { name: "License Renewal", price: 15000 },
    ],
  },
  {
    title: "NIMC Modifications",
    description: "Make changes to your NIN details.",
    subServices: [
      { name: "Change of Name", price: 7000 },
      { name: "Change of Date of Birth", price: 10000 },
      { name: "Change of Address", price: 5000 },
    ],
  },
  {
    title: "Retrieval of Lost NIMC",
    description: "Retrieve lost or misplaced NIN slip.",
    subServices: [
      { name: "Lost Slip Recovery", price: 5000 },
    ],
  },
  {
    title: "Non-appearance Enrollment",
    description: "Enroll without visiting a center physically.",
    subServices: [
      { name: "Remote NIN Enrollment", price: 15000 },
    ],
  },
  {
    title: "NIMC Device",
    description: "Request biometric kit or license.",
    subServices: [
      { name: "Full Biometric Kit", price: 95000 },
      { name: "Software License", price: 25000 },
    ],
  },
  {
    title: "IPE Clearance",
    description: "Apply for IPE certificate clearance.",
    subServices: [
      { name: "IPE Processing", price: 12000 },
    ],
  },
  {
    title: "Personalization",
    description: "NIN personalization (via API).",
    subServices: [
      { name: "NIN Personalization", price: 3000 },
    ],
  },
  {
    title: "Validation",
    description: "Validate a NIN number or record.",
    subServices: [
      { name: "NIN Validation", price: 2500 },
    ],
  },
  {
    title: "Verification",
    description: "Verify user identity (via API).",
    subServices: [
      { name: "NIN Verification", price: 2500 },
    ],
  },
];

const generateSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function NIMCServices() {
  const [modalData, setModalData] = useState(null);

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
          NIMC Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nimcServices.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setModalData({
                  title: item.title,
                  subServices: item.subServices.map((s) => ({
                    ...s,
                    slug: generateSlug(s.name),
                  })),
                })
              }
              className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <h2 className="text-lg font-semibold text-blue-900 dark:text-white">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.description}
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
