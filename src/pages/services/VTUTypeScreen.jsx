import React from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../components/FooterNav";

const vtuServices = [
  { name: "Airtime", icon: "📞", link: "/services/vtu/airtime" },
  { name: "Data", icon: "🌐", link: "/services/vtu/data" },
  { name: "Electricity", icon: "💡", link: "/services/vtu/electricity" },
  { name: "Education", icon: "🎓", link: "/services/vtu/education" },
  { name: "Cable TV", icon: "📺", link: "/services/vtu/cable" },
  { name: "Insurance", icon: "🚗", link: "/services/vtu/insurance" },
];

const VTUTypeScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 px-4 pt-6 md:px-8">
      <Link to="/dashboard" className="text-sm text-blue-600 hover:underline block mb-4">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        VTU Services
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {vtuServices.map((service, idx) => (
          <Link
            key={idx}
            to={service.link}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow text-center py-6 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <div className="text-sm font-semibold text-gray-800 dark:text-white">{service.name}</div>
          </Link>
        ))}
      </div>

      <FooterNav />
    </div>
  );
};

export default VTUTypeScreen;
