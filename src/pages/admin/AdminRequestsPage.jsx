// src/pages/admin/AdminRequestsPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/requests").then((res) => {
      setRequests(res.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Service Requests</h2>
        <div className="bg-white shadow p-4 rounded">
          {requests.length === 0 ? (
            <p className="text-center text-gray-500">No requests yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-gray-600 border-b">
                  <th className="py-2">User</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{req.user_name}</td>
                    <td>{req.service_type}</td>
                    <td>
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                        {req.status}
                      </span>
                    </td>
                    <td>{new Date(req.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
