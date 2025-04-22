// File: src/pages/admin/AdminServiceRequests.jsx

import React from "react";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminServiceRequests() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">All Service Requests</h1>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">This page will display all service requests submitted by users.</p>
          <p className="text-sm mt-2 text-gray-400">We’ll add table, filters, actions, and job tracking later.</p>
        </div>
      </main>
    </div>
  );
}
