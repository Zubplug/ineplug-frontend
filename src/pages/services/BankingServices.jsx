import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

const bankingCategories = [
  {
    title: "POS Request",
    description: "Apply for POS terminal.",
    subServices: [
      { name: "New POS Request", price: 25000 },
      { name: "Replace Damaged POS", price: 15000 },
    ],
  },
  {
    title: "Account Opening",
    description: "Open a personal or business bank account.",
    subServices: [
      { name: "Personal Account", price: 500 },
      { name: "Business Account", price: 1000 },
    ],
  },
  {
    title: "Loan Request",
    description: "Access quick business or salary loans.",
    subServices: [
      { name: "Salary Loan", price: 1000 },
      { name: "SME Loan", price: 1500 },
    ],
  },
  {
    title: "Agency Banking Request",
    description: "Apply as a bank agent.",
    subServices: [
      { name: "FCMB Agency", price: 3000 },
      { name: "Wema Bank Agency", price: 3000 },
    ],
  },
  {
    title: "Mortgage Services",
    description: "Apply for property or housing support.",
    subServices: [
      { name: "Housing Loan", price: 25000 },
      { name: "Mortgage Advisory", price: 5000 },
    ],
  },
  {
    title: "BVN/NIN Linking",
    description: "Link your BVN or NIN to bank account.",
    subServices: [
      { name: "Link BVN", price: 1000 },
      { name: "Link NIN", price: 1000 },
    ],
  },
  {
    title: "Account Upgrade",
    description: "Upgrade your account tier or limit.",
    subServices: [
      { name: "Tier 1 to Tier 2", price: 1500 },
      { name: "Tier 2 to Tier 3", price: 2000 },
    ],
  },
  {
    title: "Account Reactivation",
    description: "Reactivate dormant or locked account.",
    subServices: [
      { name: "Dormant Account Reactivation", price: 2000 },
    ],
  },
  {
    title: "CBN Services",
    description: "Request compliance services under CBN.",
    subServices: [
      { name: "CBN License Request", price: 45000 },
      { name: "Other Regulatory Docs", price: 5000 },
    ],
  },
];

export default function BankingServices() {
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
          Banking Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bankingCategories.map((cat, index) => (
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
