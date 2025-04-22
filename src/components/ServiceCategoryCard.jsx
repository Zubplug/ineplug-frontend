import React from "react";

const ServiceCategoryCard = ({ title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 shadow hover:shadow-lg hover:scale-105 transition p-5 cursor-pointer"
    >
      <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-1">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default ServiceCategoryCard;
