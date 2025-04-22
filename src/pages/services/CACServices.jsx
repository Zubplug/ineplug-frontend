import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

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
    type: "api",
    slug: "business-verification",
  },
  {
    title: "POST INCORPORATION",
    description: "Make post-incorporation updates.",
    subServices: [
      { name: "Change of Director", price: 8000 },
      { name: "Change of Address", price: 7000 },
      { name: "Change of Business Name", price: 7500 },
    ],
  },
];

const generateSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function CACServices() {
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  const handleClick = (cat) => {
    if (cat.type === "api" && cat.slug) {
      navigate(`/services/api/${cat.slug}`);
    } else if (cat.subServices) {
      setModalData({
        title: cat.title,
        subServices: cat.subServices.map((s) => ({
          ...s,
          slug: generateSlug(s.name),
        })),
      });
    } else {
      setModalData({
        title: cat.title,
        subServices: [
          {
            name: cat.title,
            price: cat.price,
            slug: generateSlug(cat.title),
          },
        ],
      });
    }
  };

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
          CAC Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cacCategories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleClick(cat)}
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
