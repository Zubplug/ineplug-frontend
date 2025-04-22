import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white p-4 pb-24">
      {children}
    </div>
  );
}
