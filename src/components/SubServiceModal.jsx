import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubServiceModal = ({ title, subServices, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = subServices.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-3">{title}</h2>

        {/* Search Field */}
        <input
          type="text"
          placeholder="Search sub-service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-3 py-2 text-sm border rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        {/* Sub-services List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredServices.length > 0 ? (
            filteredServices.map((sub, i) => {
              const slug = sub.name.toLowerCase().replaceAll(" ", "-");
              return (
                <Link
                  key={i}
                  to={`/services/manual/${slug}`}
                  className="block bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm py-2 px-3 rounded-md transition"
                >
                  {sub.name} – ₦{sub.price.toLocaleString()}
                </Link>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No matches found.</p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SubServiceModal;
