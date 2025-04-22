// File: src/pages/admin/PendingRequests.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/requests/pending-verification").then(res => {
      setRequests(res.data);
    });
  }, []);

  const handleVerify = async (id, status) => {
    const formData = new FormData();
    formData.append("request_id", id);
    formData.append("status", status);
    formData.append("admin_note", "Verified from frontend");

    try {
      await axios.post("http://127.0.0.1:8000/api/admin/requests/verify", formData);
      alert("Updated!");
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending verifications</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Service</th>
              <th>Partner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} className="border-t">
                <td>{req.id}</td>
                <td>{req.service?.name}</td>
                <td>{req.assigned_partner?.name}</td>
                <td>{req.status}</td>
                <td className="flex gap-2">
                  <button className="text-green-600" onClick={() => handleVerify(req.id, "completed")}>✅ Complete</button>
                  <button className="text-red-600" onClick={() => handleVerify(req.id, "failed")}>❌ Fail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
