import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PartnerJobFeed = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const partnerId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/partner/job-feed")
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const requestAssignment = async (requestId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/partner/request-assignment`, {
        request_id: requestId,
        partner_id: partnerId,
      });
      alert("Assignment request sent!");
      window.location.reload();
    } catch (err) {
      alert("Failed to request assignment.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading jobs...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Available Jobs</h1>
      <div className="grid gap-4">
        {requests.map(req => (
          <div key={req.id} className="bg-white p-4 rounded shadow border">
            <p><strong>Service:</strong> {req.service_name}</p>
            <p><strong>User:</strong> {req.user_name}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <button
              onClick={() => requestAssignment(req.id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Request Assignment
            </button>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-center text-gray-500">No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default PartnerJobFeed;
