import React, { useState } from 'react';
import {
  Users, FileText, Download, Search, LifeBuoy, Wallet, BarChart, Megaphone, LogOut, Settings
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AdminPartnerStaffPage() {
  const [search, setSearch] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const [assignModal, setAssignModal] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showTimeline, setShowTimeline] = useState(null);
  const [reassignModal, setReassignModal] = useState(null);

  const pendingRequests = [
    { id: 'REQ-001', title: 'NIN Correction' },
    { id: 'REQ-002', title: 'BVN Retrieval' },
    { id: 'REQ-003', title: 'CAC Registration' },
  ];

  const partnerJobs = {
    1: [
      { id: 'REQ-001', title: 'NIN Correction', status: 'Completed', date: '2024-12-20' },
      { id: 'REQ-004', title: 'TIN Request', status: 'Assigned', date: '2025-01-02' },
    ],
    2: [
      { id: 'REQ-007', title: 'BVN Fix', status: 'Completed', date: '2024-11-11' },
    ],
    3: [
      { id: 'REQ-010', title: 'CAC Incorporation', status: 'Completed', date: '2025-02-18' },
      { id: 'REQ-012', title: 'NIN Validation', status: 'Assigned', date: '2025-03-04' },
    ]
  };

  const [staff, setStaff] = useState([
    { id: 1, name: 'David Moses', email: 'david@ineplug.com', status: 'Active', jobWallet: 12000, commission: 3000, jobsAssigned: 10, jobsCompleted: 8 },
    { id: 2, name: 'Blessing Okon', email: 'blessing@ineplug.com', status: 'Suspended', jobWallet: 4000, commission: 1000, jobsAssigned: 6, jobsCompleted: 5 },
    { id: 3, name: 'Samuel George', email: 'samuel@ineplug.com', status: 'Active', jobWallet: 7500, commission: 2500, jobsAssigned: 12, jobsCompleted: 12 },
  ]);

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Partner Staff Summary', 14, 10);
    const rows = filteredStaff.map(s => [
      s.name, s.email, s.status, `₦${s.jobWallet}`, `₦${s.commission}`,
      s.jobsAssigned, s.jobsCompleted, `${Math.round((s.jobsCompleted / s.jobsAssigned) * 100)}%`
    ]);
    doc.autoTable({
      head: [['Name', 'Email', 'Status', 'Job Wallet', 'Commission', 'Assigned', 'Completed', 'Success']],
      body: rows, startY: 20,
    });
    doc.save('partner_staff_report.pdf');
  };

  const handleStatusChange = (id, type) => {
    const updated = staff.map(s => s.id === id ? { ...s, status: type === 'suspend' ? 'Suspended' : 'Active' } : s);
    setStaff(updated);
    setConfirmAction(null);
  };

  const assignRequest = (partnerId, requestId) => {
    const updated = staff.map(s =>
      s.id === partnerId ? { ...s, jobsAssigned: s.jobsAssigned + 1 } : s
    );
    setStaff(updated);
    setAssignModal(null);
    alert(`Request ${requestId} assigned to Partner`);
  };

  const reassignRequest = (fromId, toId, requestId) => {
    setStaff(prev =>
      prev.map(s => {
        if (s.id === fromId) return { ...s, jobsAssigned: s.jobsAssigned - 1 };
        if (s.id === toId) return { ...s, jobsAssigned: s.jobsAssigned + 1 };
        return s;
      })
    );
    alert(`Request ${requestId} reassigned from Partner ${fromId} to ${toId}`);
    setReassignModal(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col justify-between min-h-screen">
        <div>
          <h1 className="text-xl font-bold text-blue-800 mb-8">Ineplug Admin</h1>
          <nav className="space-y-2 text-sm text-blue-800 font-medium">
            <a href="/admin" className="flex items-center gap-2 hover:text-blue-600"><BarChart size={18} /> Dashboard</a>
            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Management</p>
            <a href="/admin/users" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Users</a>
            <a href="/admin/partners" className="flex items-center gap-2 text-blue-900 font-semibold bg-blue-100 px-2 py-1 rounded"><Users size={18} /> Partner Staff</a>
            <a href="/admin/aggregators" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Aggregators</a>
            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Requests & Services</p>
            <a href="/admin/requests" className="flex items-center gap-2 hover:text-blue-600"><FileText size={18} /> Service Requests</a>
            <a href="/admin/services" className="flex items-center gap-2 hover:text-blue-600"><Wallet size={18} /> Services Manager</a>
            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Compliance</p>
            <a href="/admin/kyc" className="flex items-center gap-2 hover:text-blue-600"><LifeBuoy size={18} /> KYC & Compliance</a>
            <a href="/admin/transactions" className="flex items-center gap-2 hover:text-blue-600"><Wallet size={18} /> Transactions</a>
            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Communication</p>
            <a href="/admin/broadcast" className="flex items-center gap-2 hover:text-blue-600"><Megaphone size={18} /> Broadcast</a>
            <a href="/admin/faq" className="flex items-center gap-2 hover:text-blue-600"><LifeBuoy size={18} /> FAQ & Support</a>
            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">System</p>
            <a href="/admin/logs" className="flex items-center gap-2 hover:text-blue-600"><FileText size={18} /> Admin Logs</a>
            <a href="/admin/settings" className="flex items-center gap-2 hover:text-blue-600"><Settings size={18} /> Settings</a>
          </nav>
        </div>
        <div>
          <hr className="my-4 border-gray-200" />
          <a href="/" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
            <LogOut size={16} /> Logout
          </a>
        </div>
      </aside>

      {/* Main content continues... */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Partner Staff Overview</h2>
          <button
            onClick={exportPDF}
            className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow"><p>Total Staff</p><p className="text-2xl font-bold text-blue-800">{staff.length}</p></div>
          <div className="bg-white p-4 rounded shadow"><p>Jobs Assigned</p><p className="text-2xl font-bold text-blue-800">{staff.reduce((a, s) => a + s.jobsAssigned, 0)}</p></div>
          <div className="bg-white p-4 rounded shadow"><p>Jobs Completed</p><p className="text-2xl font-bold text-green-700">{staff.reduce((a, s) => a + s.jobsCompleted, 0)}</p></div>
          <div className="bg-white p-4 rounded shadow"><p>Commission Wallet</p><p className="text-2xl font-bold text-indigo-700">₦{staff.reduce((a, s) => a + s.commission, 0)}</p></div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/3"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Wallet</th>
                <th>Commission</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>Success</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-3 font-medium text-blue-800">{s.name}</td>
                  <td>{s.email}</td>
                  <td className={s.status === 'Active' ? 'text-green-700' : 'text-red-600'}>{s.status}</td>
                  <td>₦{s.jobWallet}</td>
                  <td>₦{s.commission}</td>
                  <td>{s.jobsAssigned}</td>
                  <td>{s.jobsCompleted}</td>
                  <td>{Math.round((s.jobsCompleted / s.jobsAssigned) * 100)}%</td>
                  <td className="space-x-2">
                    <button onClick={() => setSelectedPartner(s)} className="text-blue-700 text-xs hover:underline">View</button>
                    <button onClick={() => setAssignModal(s)} className="text-indigo-600 text-xs hover:underline">Assign</button>
                    <button onClick={() => setReassignModal(s)} className="text-yellow-700 text-xs hover:underline">Reassign</button>
                    {s.status === 'Suspended' ? (
                      <button onClick={() => setConfirmAction({ id: s.id, action: 'Reactivate' })} className="text-green-600 text-xs hover:underline">Reactivate</button>
                    ) : (
                      <button onClick={() => setConfirmAction({ id: s.id, action: 'Suspend' })} className="text-red-600 text-xs hover:underline">Suspend</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assign Modal */}
        {assignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h2 className="text-lg font-bold text-blue-800 mb-4">Assign Request to {assignModal.name}</h2>
              <select
                onChange={(e) => assignRequest(assignModal.id, e.target.value)}
                className="w-full border p-2 rounded mb-4"
              >
                <option>Select Request</option>
                {pendingRequests.map((r) => (
                  <option key={r.id} value={r.id}>{r.id} - {r.title}</option>
                ))}
              </select>
              <div className="flex justify-end">
                <button onClick={() => setAssignModal(null)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Reassign Modal */}
        {reassignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h2 className="text-lg font-bold text-blue-800 mb-4">Reassign Request from {reassignModal.name}</h2>
              <select
                onChange={(e) => reassignRequest(reassignModal.id, Number(e.target.value), 'REQ-XYZ')}
                className="w-full border p-2 rounded mb-4"
              >
                <option>Select New Partner</option>
                {staff.filter(p => p.id !== reassignModal.id).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div className="flex justify-end">
                <button onClick={() => setReassignModal(null)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* View Profile Modal */}
        {selectedPartner && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Partner Staff Profile</h2>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <p><strong>Name:</strong> {selectedPartner.name}</p>
                  <p><strong>Email:</strong> {selectedPartner.email}</p>
                  <p><strong>Status:</strong> <span className={selectedPartner.status === 'Active' ? 'text-green-700' : 'text-red-600'}>{selectedPartner.status}</span></p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Job Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <p><strong>Job Wallet:</strong> ₦{selectedPartner.jobWallet}</p>
                  <p><strong>Commission:</strong> ₦{selectedPartner.commission}</p>
                  <p><strong>Jobs Assigned:</strong> {selectedPartner.jobsAssigned}</p>
                  <p><strong>Jobs Completed:</strong> {selectedPartner.jobsCompleted}</p>
                  <p><strong>Success Rate:</strong> {Math.round((selectedPartner.jobsCompleted / selectedPartner.jobsAssigned) * 100)}%</p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button onClick={() => setShowTimeline(selectedPartner.id)} className="text-sm text-blue-700 hover:underline">View Job Timeline</button>
                <button onClick={() => setSelectedPartner(null)} className="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Modal */}
        {showTimeline && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Partner Job Timeline</h2>
              <ul className="space-y-3 text-sm max-h-72 overflow-y-auto">
                {(partnerJobs[showTimeline] || []).map((job, i) => (
                  <li key={i} className="border-b pb-2">
                    <p><strong>{job.title}</strong></p>
                    <p>Status: <span className={job.status === 'Completed' ? 'text-green-600' : 'text-yellow-700'}>{job.status}</span></p>
                    <p className="text-gray-500 text-xs">Date: {job.date}</p>
                  </li>
                ))}
                {(partnerJobs[showTimeline]?.length === 0 || !partnerJobs[showTimeline]) && (
                  <li className="text-center text-gray-500">No job history</li>
                )}
              </ul>
              <div className="flex justify-end mt-4">
                <button onClick={() => setShowTimeline(null)} className="bg-gray-200 px-4 py-2 rounded">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Suspend/Reactivate Confirm */}
        {confirmAction && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
              <h2 className="text-lg font-semibold text-blue-800 mb-3">{confirmAction.action} Partner Staff</h2>
              <p className="mb-4">Are you sure you want to {confirmAction.action.toLowerCase()} this staff member?</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmAction(null)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                <button
                  onClick={() => handleStatusChange(confirmAction.id, confirmAction.action.toLowerCase())}
                  className={`px-4 py-2 rounded text-white ${confirmAction.action === 'Suspend' ? 'bg-red-600' : 'bg-green-600'}`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
