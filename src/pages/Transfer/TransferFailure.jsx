import React from "react";
import { useLocation, Link } from "react-router-dom";

const TransferFailure = () => {
  const location = useLocation();
  const { message } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-28 px-4 pt-6 md:px-8">
      <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
        Transfer Failed
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-sm text-gray-800 dark:text-gray-200 space-y-2">
        <p><strong>Reason:</strong> {message || "Transaction could not be completed."}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/bank-transfer"
          className="w-full text-center py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry Transfer
        </Link>

        <Link
          to="/dashboard"
          className="w-full text-center py-2 border border-gray-400 dark:border-gray-700 rounded text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Return to Dashboard
        </Link>
      </div>

      {/* Footer Nav */}
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
    </div>
  );
};

export default TransferFailure;
