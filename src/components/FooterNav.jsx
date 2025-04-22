import React from "react";
import { Link } from "react-router-dom";

const FooterNav = () => (
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
    <Link to="/settings" className="flex flex-col items-center">
      <span>⚙️</span><span>Settings</span>
    </Link>
  </div>
);

export default FooterNav;
