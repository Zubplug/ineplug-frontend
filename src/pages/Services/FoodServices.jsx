import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";
import SubServiceModal from "../../components/SubServiceModal";

const foodCategories = [
  {
    title: "Request for Chef",
    description: "Hire a private or event chef on demand.",
    price: 25000,
  },
  {
    title: "Request for Food",
    description: "Order meals for delivery, bulk or events.",
    subServices: [
      { name: "Single Order", price: 10000 },
      { name: "Bulk Order", price: 25000 },
      { name: "Event Catering", price: 40000 },
    ],
  },
  {
    title: "Agricultural Products",
    description: "Buy fresh produce directly from farms.",
    price: 5000,
  },
  {
    title: "Restaurant",
    description: "Register or manage restaurant services.",
    price: 15000,
  },
  {
    title: "Cake",
    description: "Order cakes for birthdays or special events.",
    price: 12000,
  },
  {
    title: "Food Service",
    description: "Access catering, bulk orders, or food plans.",
    price: 18000,
  },
];

export default function FoodServices() {
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
          Food Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {foodCategories.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                item.subServices
                  ? setModalData({
                      title: item.title,
                      subServices: item.subServices,
                    })
                  : setModalData({
                      title: item.title,
                      subServices: [{ name: item.title, price: item.price }],
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
