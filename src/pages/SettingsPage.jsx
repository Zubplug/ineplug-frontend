import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser, FaKey, FaLock, FaListAlt, FaHistory,
  FaSignal, FaPowerOff, FaBell, FaQuestionCircle
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const settingsOptions = [
  { label: "Profile", icon: <FaUser />, path: "/profile" },
  { label: "Change Payment PIN", icon: <FaKey />, path: "/change-pin" },
  { label: "Change Login Password", icon: <FaLock />, path: "/change-password" },
  { label: "My Requests", icon: <FaListAlt />, path: "/my-requests" },
  { label: "Transactions", icon: <FaHistory />, path: "/transactions" },
  { label: "Account Limit & KYC", icon: <FaSignal />, path: "/account-limit" },
  { label: "Notifications Settings", icon: <FaBell />, path: "/notifications" },
  { label: "Help & Support", icon: <FaQuestionCircle />, path: "/support" },
  { label: "Close Account", icon: <FaPowerOff />, path: "/close-account" },
  { label: "Sign Out", icon: <FaPowerOff />, path: "/logout", isLogout: true },
];

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleNavigation = async (path, isLogout = false) => {
    if (isLogout) {
      localStorage.clear();
      sessionStorage.clear();
      toast.success("✅ You’ve been signed out.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-6 pb-20">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-semibold text-center text-blue-900 dark:text-white mb-6">Settings</h2>

      <div className="grid grid-cols-1 gap-4">
        {settingsOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(option.path, option.isLogout)}
            className="flex items-center justify-between bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
          >
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <div className="text-xl">{option.icon}</div>
              <span className="font-medium">{option.label}</span>
            </div>
            <div className="text-gray-400 text-lg">&gt;</div>
          </div>
        ))}
      </div>

      {/* Footer navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-2 flex justify-between text-xs text-gray-700 dark:text-gray-200 md:text-sm z-50">
        <Link to="/dashboard" className="flex flex-col items-center">
          <span>🏠</span><span>Home</span>
        </Link>
        <Link to="/transactions" className="flex flex-col items-center">
          <span>⏱</span><span>Transactions</span>
        </Link>
        <Link to="/my-requests" className="flex flex-col items-center">
          <span>📄</span><span>My Requests</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center font-bold text-blue-700 dark:text-blue-400">
          <span>⚙️</span><span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
