import React, { useState } from 'react';
import {
  Users, Wallet, FileText, LifeBuoy, BarChart, Megaphone, Settings, LogOut, Download, Search, Link2
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AdminAggregatorPageFinal() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [referralFilter, setReferralFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgg, setSelectedAgg] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [walletHistoryModal, setWalletHistoryModal] = useState(null);
  const [referralTreeModal, setReferralTreeModal] = useState(null);

  const aggregators = [
    {
      id: 1,
      name: 'Samuel George',
      email: 'samuel@ineplug.com',
      phone: '08030000001',
      status: 'Active',
      walletBalance: 12500,
      commission: 3400,
      referrals: 14,
      joined: '2024-11-04',
      referralLink: 'https://ineplug.com/ref/SG001',
      performance: 'Top Referrer',
      walletHistory: [{ date: '2025-04-12', amount: 5000 }],
    },
    {
      id: 2,
      name: 'Blessing Akpan',
      email: 'blessing@ineplug.com',
      phone: '08030000002',
      status: 'Suspended',
      walletBalance: 3800,
      commission: 900,
      referrals: 9,
      joined: '2025-01-17',
      referralLink: 'https://ineplug.com/ref/BA002',
      performance: 'Low Activity',
      walletHistory: [],
    },
  ];

  const mockReferralTree = [
    { name: 'John Doe', role: 'User', joined: '2024-10-21' },
    { name: 'Grace Peter', role: 'Agent', joined: '2025-01-11' },
    { name: 'Evelyn Mike', role: 'User', joined: '2025-02-04' },
  ];

  const filtered = aggregators.filter(a =>
    (statusFilter === 'All' || a.status === statusFilter) &&
    (referralFilter === 'All' || (referralFilter === '10+' ? a.referrals >= 10 : a.referrals < 10)) &&
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'Phone', 'Status', 'Wallet', 'Commission', 'Referrals', 'Performance', 'Joined'],
      ...filtered.map(a => [
        a.name, a.email, a.phone, a.status,
        `₦${a.walletBalance}`, `₦${a.commission}`, a.referrals, a.performance, a.joined
      ])
    ];
    const blob = new Blob([rows.map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aggregators_${statusFilter}_${referralFilter}.csv`;
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Aggregator Report', 14, 10);
    const rows = filtered.map(a => [
      a.name, a.email, a.status,
      `₦${a.walletBalance}`, `₦${a.commission}`,
      a.referrals, a.performance
    ]);
    doc.autoTable({
      head: [['Name', 'Email', 'Status', 'Wallet', 'Commission', 'Referrals', 'Performance']],
      body: rows,
      startY: 20,
    });
    doc.save('aggregator_report.pdf');
  };

  const updateStatus = (id, newStatus) => {
    setConfirmAction(null);
    alert(`Aggregator ${id} is now ${newStatus}`);
  };

  const copyReferralLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Referral link copied!');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col justify-between min-h-screen">
  <div>
    <h1 className="text-2xl font-bold text-blue-800 mb-8">Ineplug Admin</h1>

    <nav className="space-y-2 text-sm text-blue-800 font-medium">
      <a href="/admin" className="flex items-center gap-2 hover:text-blue-600"><BarChart size={18} /> Dashboard</a>

      <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Management</p>
      <a href="/admin/users" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Users</a>
      <a href="/admin/partners" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Partner Staff</a>
      <a href="/admin/aggregators" className="flex items-center gap-2 bg-blue-100 text-blue-900 px-2 py-1 rounded font-semibold">
        <Users size={18} /> Aggregators
      </a>

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
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Aggregator Management</h2>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"><Download size={14} /> CSV</button>
            <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"><FileText size={14} /> PDF</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Total Aggregators</p>
    <p className="text-2xl font-bold text-blue-800">{aggregators.length}</p>
  </div>
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Total Referrals</p>
    <p className="text-2xl font-bold text-indigo-700">
      {aggregators.reduce((sum, a) => sum + a.referrals, 0)}
    </p>
  </div>
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Commission Wallet</p>
    <p className="text-2xl font-bold text-green-700">
      ₦{aggregators.reduce((sum, a) => sum + a.commission, 0)}
    </p>
  </div>
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">Top Referrer</p>
    <p className="text-lg font-semibold text-purple-700">
      {aggregators.sort((a, b) => b.referrals - a.referrals)[0]?.name || 'N/A'}
    </p>
  </div>
</div>


        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <select value={referralFilter} onChange={e => setReferralFilter(e.target.value)} className="border px-3 py-2 rounded">
            <option value="All">All Referrals</option>
            <option value="10+">10+ Referrals</option>
            <option value="<10">Below 10</option>
          </select>
          <div className="flex items-center w-full md:w-1/2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Wallet</th>
                <th>Commission</th>
                <th>Referrals</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b hover:bg-blue-50">
                  <td className="p-2 font-medium text-blue-800">{a.name}</td>
                  <td>{a.email}</td>
                  <td className={a.status === 'Active' ? 'text-green-700' : 'text-red-600'}>{a.status}</td>
                  <td>₦{a.walletBalance}</td>
                  <td>₦{a.commission}</td>
                  <td>{a.referrals}</td>
                  <td><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{a.performance}</span></td>
                  <td className="space-y-1">
                    <button onClick={() => setSelectedAgg(a)} className="text-blue-700 text-xs hover:underline block">View</button>
                    <button onClick={() => copyReferralLink(a.referralLink)} className="text-xs text-gray-600 hover:underline flex items-center gap-1"><Link2 size={12} /> Copy</button>
                    <button onClick={() => setWalletHistoryModal(a)} className="text-xs text-indigo-600 hover:underline block">Wallet History</button>
                    <button onClick={() => setReferralTreeModal(mockReferralTree)} className="text-xs text-blue-500 hover:underline block">View Tree</button>
                    {a.status === 'Suspended' ? (
                      <button onClick={() => setConfirmAction({ id: a.id, action: 'Reactivate' })} className="text-green-700 text-xs hover:underline block">Reactivate</button>
                    ) : (
                      <button onClick={() => setConfirmAction({ id: a.id, action: 'Suspend' })} className="text-red-700 text-xs hover:underline block">Suspend</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       {/* View Profile Modal */}
{selectedAgg && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">Aggregator Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <p><strong>Name:</strong> {selectedAgg.name}</p>
        <p><strong>Email:</strong> {selectedAgg.email}</p>
        <p><strong>Phone:</strong> {selectedAgg.phone}</p>
        <p><strong>Status:</strong> {selectedAgg.status}</p>
        <p><strong>Wallet:</strong> ₦{selectedAgg.walletBalance}</p>
        <p><strong>Commission:</strong> ₦{selectedAgg.commission}</p>
        <p><strong>Referrals:</strong> {selectedAgg.referrals}</p>
        <p><strong>Performance:</strong> {selectedAgg.performance}</p>
        <p className="col-span-2"><strong>Joined:</strong> {selectedAgg.joined}</p>
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={() => setSelectedAgg(null)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Close</button>
      </div>
      <button onClick={() => setSelectedAgg(null)} className="absolute top-2 right-3 text-gray-500 hover:text-gray-700">✕</button>
    </div>
  </div>
)}

{/* Wallet History Modal */}
{walletHistoryModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">Wallet Top-up History</h2>
      {walletHistoryModal.walletHistory.length ? (
        <ul className="text-sm space-y-3">
          {walletHistoryModal.walletHistory.map((entry, idx) => (
            <li key={idx} className="flex justify-between p-2 border rounded bg-gray-50">
              <span>{entry.date}</span>
              <span className="font-semibold text-blue-700">₦{entry.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No top-up records found.</p>
      )}
      <div className="flex justify-end mt-6">
        <button onClick={() => setWalletHistoryModal(null)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Close</button>
      </div>
      <button onClick={() => setWalletHistoryModal(null)} className="absolute top-2 right-3 text-gray-500 hover:text-gray-700">✕</button>
    </div>
  </div>
)}

{/* Referral Tree Modal */}
{referralTreeModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">Referral Tree</h2>
      <ul className="text-sm space-y-2">
        {referralTreeModal.map((ref, idx) => (
          <li key={idx} className="border rounded p-2 bg-gray-50">
            <p><strong>{ref.name}</strong> — <span className="text-gray-600">{ref.role}</span></p>
            <p className="text-xs text-gray-500">Joined: {ref.joined}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-6">
        <button onClick={() => setReferralTreeModal(null)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Close</button>
      </div>
      <button onClick={() => setReferralTreeModal(null)} className="absolute top-2 right-3 text-gray-500 hover:text-gray-700">✕</button>
    </div>
  </div>
)}

{/* Suspend / Reactivate Confirm Modal */}
{confirmAction && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
      <h2 className="text-lg font-semibold text-blue-800 mb-3">{confirmAction.action} Aggregator</h2>
      <p className="mb-4">Are you sure you want to {confirmAction.action.toLowerCase()} this aggregator?</p>
      <div className="flex justify-center gap-4">
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setConfirmAction(null)}>Cancel</button>
        <button
          className={`px-4 py-2 rounded text-white ${confirmAction.action === 'Suspend' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
          onClick={() => updateStatus(confirmAction.id, confirmAction.action === 'Suspend' ? 'Suspended' : 'Active')}
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
