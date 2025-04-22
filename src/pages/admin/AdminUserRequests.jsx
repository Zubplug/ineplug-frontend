import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminUserRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/requests/pending-verification");
      setRequests(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch user requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">User Submitted Requests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <div className="bg-white shadow rounded p-4">
            {requests.map((req) => (
              <div key={req.id} className="border-b py-3">
                <p><strong>User ID:</strong> {req.user_id}</p>
                <p><strong>Service:</strong> {req.service?.name || "N/A"}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Submitted:</strong> {new Date(req.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
