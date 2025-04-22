import React, { useEffect, useState } from "react";
import axios from "axios";

const PartnerAssignedRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [uploading, setUploading] = useState(null);

  const partnerId = localStorage.getItem("userId"); // Adjust if needed

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/partner/assigned-requests/${partnerId}`)
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUpload = async (id, file) => {
    setUploading(id);
    const formData = new FormData();
    formData.append("result", file);
    try {
      await axios.post(`http://127.0.0.1:8000/api/partner/submit-result/${id}`, formData);
      alert("Uploaded successfully");
    } catch (e) {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assigned Jobs</h2>
      {requests.map((r) => (
        <div key={r.id} className="border p-4 mb-4 rounded shadow">
          <p><strong>Service:</strong> {r.service.name}</p>
          <p><strong>Status:</strong> {r.status}</p>
          <input type="file" onChange={e => handleUpload(r.id, e.target.files[0])} />
          {uploading === r.id && <p>Uploading...</p>}
        </div>
      ))}
    </div>
  );
};

export default PartnerAssignedRequestsPage;
