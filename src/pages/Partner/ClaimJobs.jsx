import React, { useState } from 'react';

export default function ClaimJobs() {
  const [requests, setRequests] = useState([
    { id: 'REQ-001', service: 'NIMC Enrollment', user: 'David Okon', date: '2024-04-12', status: 'Available' },
    { id: 'REQ-002', service: 'BVN Modification', user: 'Blessing Akpan', date: '2024-04-11', status: 'Available' },
    { id: 'REQ-003', service: 'TIN Request', user: 'Samuel George', date: '2024-04-10', status: 'Available' },
  ]);

  const handleClaim = (id) => {
    alert(`You have claimed request ${id}`);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Claimed' } : r))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Available Jobs to Claim</h2>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Request ID</th>
              <th>Service</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{r.id}</td>
                <td>{r.service}</td>
                <td>{r.user}</td>
                <td>{r.date}</td>
                <td className={r.status === 'Claimed' ? 'text-green-700' : 'text-blue-600'}>{r.status}</td>
                <td>
                  {r.status === 'Available' ? (
                    <button
                      onClick={() => handleClaim(r.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                    >
                      Claim
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500">Claimed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
