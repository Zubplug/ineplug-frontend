// src/pages/admin/AdminKycComplianceDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AdminKycComplianceDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [summary, setSummary] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [reasonModal, setReasonModal] = useState({ open: false, id: null, reason: '' });

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/kyc-compliance?filter=${filter}`);
      setUsers(res.data.users);
      setSummary(res.data.summary || { pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handlePNDToggle = async (userId) => {
    try {
      await api.post(`/admin/users/${userId}/toggle-pnd`);
      toast.success('PND status updated');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update PND');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-64 p-4 border-r bg-white">
        <h2 className="font-bold text-blue-900 mb-4 text-lg">User Filter</h2>
        {[
          { key: 'all', label: 'All Users' },
          { key: 'pnd', label: 'PND Users' },
          { key: 'level_0', label: 'KYC Level 0' },
          { key: 'level_1', label: 'KYC Level 1' },
          { key: 'level_2', label: 'KYC Level 2' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`block w-full text-left p-2 rounded mb-2 ${filter === f.key ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'}`}
          >
            {f.label}
          </button>
        ))}
        <Link
          to="/admin"
          className="block mt-6 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
        >
          ← Back to Dashboard
        </Link>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">KYC & Compliance Dashboard</h1>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-100 p-4 rounded-xl text-yellow-800 shadow">
            <p className="text-sm">Pending Verifications</p>
            <h2 className="text-xl font-bold">{summary.pending}</h2>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-green-800 shadow">
            <p className="text-sm">Approved</p>
            <h2 className="text-xl font-bold">{summary.approved}</h2>
          </div>
          <div className="bg-red-100 p-4 rounded-xl text-red-800 shadow">
            <p className="text-sm">Rejected</p>
            <h2 className="text-xl font-bold">{summary.rejected}</h2>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          {loading ? (
            <p className="p-4">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>KYC</th>
                  <th>PND</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="p-2 font-medium">{u.name}</td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                    <td>{u.kyc_level}</td>
                    <td className={u.pnd ? 'text-red-600' : 'text-green-600'}>{u.pnd ? 'Yes' : 'No'}</td>
                    <td>{u.address_verified ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        onClick={() => handlePNDToggle(u.id)}
                        className="text-xs text-blue-700 hover:underline"
                      >
                        {u.pnd ? 'Remove PND' : 'Place PND'}
                      </button>
                      <button
                        onClick={() => setReasonModal({ open: true, id: u.id, reason: '' })}
                        className="ml-2 text-xs text-red-700 hover:underline"
                      >
                        Reject Address
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {reasonModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow w-96">
              <h3 className="font-bold text-lg mb-3">Reason for Rejection</h3>
              <textarea
                className="w-full border rounded p-2 mb-3"
                rows={4}
                placeholder="Enter reason..."
                value={reasonModal.reason}
                onChange={(e) => setReasonModal(prev => ({ ...prev, reason: e.target.value }))}
              />
              <div className="flex justify-between">
                <button
                  onClick={async () => {
                    try {
                      await api.post(`/admin/address-verifications/${reasonModal.id}/reject`, {
                        reason: reasonModal.reason
                      });
                      toast.success('Address rejected');
                      fetchUsers();
                    } catch {
                      toast.error('Failed to reject address');
                    } finally {
                      setReasonModal({ open: false, id: null, reason: '' });
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setReasonModal({ open: false, id: null, reason: '' })}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
