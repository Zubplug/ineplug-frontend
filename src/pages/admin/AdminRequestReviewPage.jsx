import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminRequestReviewPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/pending-requests")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAction = async (id, status) => {
    const reason = status === "failed" || status === "cancelled"
      ? prompt("Enter reason for " + status)
      : null;

    try {
      await axios.post(`http://127.0.0.1:8000/api/admin/verify-request/${id}`, {
        status,
        reason,
      });
      alert("Status updated!");
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      alert("Action failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Requests for Review</h2>
      {requests.map(r => (
        <div key={r.id} className="border p-4 mb-4 rounded shadow">
          <p><strong>User:</strong> {r.user.name}</p>
          <p><strong>Service:</strong> {r.service.name}</p>
          <p><strong>Status:</strong> {r.status}</p>
          {r.result_file && (
            <a
              href={`http://127.0.0.1:8000/storage/results/${r.result_file}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View Uploaded Result
            </a>
          )}
          <div className="mt-3 space-x-2">
            <button onClick={() => handleAction(r.id, "completed")} className="bg-green-600 text-white px-3 py-1 rounded">Mark Completed</button>
            <button onClick={() => handleAction(r.id, "failed")} className="bg-red-600 text-white px-3 py-1 rounded">Mark Failed</button>
            <button onClick={() => handleAction(r.id, "cancelled")} className="bg-yellow-500 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminRequestReviewPage;
