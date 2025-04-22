// File: src/pages/admin/Dashboard.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, FileText, LifeBuoy, Wallet, BarChart, Megaphone, LogOut, Settings
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const navigate = useNavigate();

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = [
    { label: 'Total Users', value: 680, icon: <Users size={20} /> },
    { label: 'Revenue', value: '₦850,000', icon: <Wallet size={20} /> },
    { label: 'Active Tickets', value: 12, icon: <LifeBuoy size={20} /> },
    { label: 'Completed Requests', value: 211, icon: <FileText size={20} /> },
  ];

  const activity = [
    { date: 'Apr 13', user: 'Inemesit Akpan', action: 'Approved BVN Request', status: 'Completed' },
    { date: 'Apr 12', user: 'Grace Smith', action: 'Upgraded to Aggregator', status: 'Completed' },
    { date: 'Apr 12', user: 'Uche Samuel', action: 'Ticket Raised', status: 'Pending' },
  ];

  const chartData = {
    labels: ['Apr 10', 'Apr 11', 'Apr 12', 'Apr 13'],
    datasets: [
      {
        label: 'Daily Earnings (₦)',
        data: [10000, 15000, 20000, 25000],
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col justify-between min-h-screen">
        <div>
          <h1 className="text-xl font-bold text-blue-800 mb-8">Ineplug Admin</h1>
          <nav className="space-y-2 text-sm text-blue-800 font-medium">
            <a href="/admin" className="flex items-center gap-2 text-blue-900 font-semibold bg-blue-100 px-2 py-1 rounded"><BarChart size={18} /> Dashboard</a>

            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Management</p>
            <a href="/admin/users" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Users</a>
            <a href="/admin/partners" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Partner Staff</a>
            <a href="/admin/aggregators" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Aggregators</a>

            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Requests & VTU</p>
            <a href="/admin/services" className="flex items-center gap-2 hover:text-blue-600"><FileText size={18} /> Service Requests</a>
            <a href="/admin/requests" className="flex items-center gap-2 hover:text-blue-600"><Wallet size={18} /> Services Manager</a>
            <a href="/admin/vtu-services" className="flex items-center gap-2 hover:text-blue-600"><Wallet size={18} /> VTU Manager</a>

            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Compliance</p>
            <a href="/admin/kyc" className="flex items-center gap-2 hover:text-blue-600"><LifeBuoy size={18} /> KYC & Compliance</a>
            <a href="/admin/transactions" className="flex items-center gap-2 hover:text-blue-600"><Wallet size={18} /> Transactions</a>

            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Communication</p>
            <a href="/admin/broadcast" className="flex items-center gap-2 hover:text-blue-600"><Megaphone size={18} /> Broadcast</a>
            <a href="/admin/address-verifications" className="flex items-center gap-2 hover:text-blue-600"><LifeBuoy size={18} /> FAQ & Support</a>

            <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">System</p>
            <a href="/admin/logs" className="flex items-center gap-2 hover:text-blue-600"><FileText size={18} /> Admin Logs</a>
            <a href="/admin/settings" className="flex items-center gap-2 hover:text-blue-600"><Settings size={18} /> Settings</a>
          </nav>
        </div>
        <div>
          <hr className="my-4 border-gray-200" />
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Dashboard Overview</h2>
          <div className="text-sm text-gray-600">Welcome back, Admin</div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
              <div className="bg-blue-100 text-blue-800 rounded-full p-2">{item.icon}</div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-lg font-bold text-blue-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart & Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-800 font-semibold">Earnings Analytics</h3>
              <BarChart size={20} className="text-blue-600" />
            </div>
            <Bar data={chartData} options={chartOptions} height={120} />
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-blue-800 font-semibold mb-2">Admin Activity Log</h3>
            <table className="w-full text-sm">
              <thead className="text-gray-600 border-b">
                <tr>
                  <th className="py-2">Date</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{item.date}</td>
                    <td>{item.user}</td>
                    <td>{item.action}</td>
                    <td className={`text-xs font-semibold ${item.status === 'Completed' ? 'text-green-700' : 'text-yellow-700'}`}>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
